import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import Subscriber, SubscriberCreate, SubscriberPublic, SubscribersPublic, SubscriberUpdate, Message

router = APIRouter()


@router.get("/", response_model=SubscribersPublic)
def read_subscribers(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve subscribers.
    """

    if current_user.is_superuser:
        count_statement = select(func.count()).select_from(Subscriber)
        count = session.exec(count_statement).one()
        statement = select(Subscriber).offset(skip).limit(limit)
        subscribers = session.exec(statement).all()

    return SubscribersPublic(data=subscribers, count=count)


@router.get("/{id}", response_model=SubscriberPublic)
def read_subscriber(session: SessionDep, current_user: CurrentUser, id: uuid.UUID) -> Any:
    """
    Get subscriber by ID.
    """
    subscriber = session.get(Subscriber, id)
    if not subscriber:
        raise HTTPException(status_code=404, detail="Subscriber not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return subscriber


@router.post("/", response_model=SubscriberPublic)
def create_subscriber(
    *, session: SessionDep, subscriber_in: SubscriberCreate
) -> Any:
    """
    Create new subscriber.
    """
    subscriber = Subscriber.model_validate(subscriber_in)
    session.add(subscriber)
    session.commit()
    session.refresh(subscriber)
    return subscriber


@router.put("/{id}", response_model=SubscriberPublic)
def update_subscriber(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    subscriber_in: SubscriberUpdate,
) -> Any:
    """
    Update a subscriber.
    """
    subscriber = session.get(Subscriber, id)
    if not subscriber:
        raise HTTPException(status_code=404, detail="Subscriber not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    update_dict = subscriber_in.model_dump(exclude_unset=True)
    subscriber.sqlmodel_update(update_dict)
    session.add(subscriber)
    session.commit()
    session.refresh(subscriber)
    return subscriber


@router.delete("/{id}")
def delete_subscriber(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Message:
    """
    Delete a subscriber.
    """
    subscriber = session.get(Subscriber, id)
    if not subscriber:
        raise HTTPException(status_code=404, detail="Subscriber not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(subscriber)
    session.commit()
    return Message(message="Subscriber deleted successfully")
