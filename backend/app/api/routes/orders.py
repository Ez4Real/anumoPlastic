import uuid
from typing import Any
from fastapi import APIRouter, HTTPException
from sqlmodel import func, select
from app.api.deps import SessionDep, CurrentUser
from app.models import Order, OrderCreate, OrderPublic, OrdersPublic


router = APIRouter()

@router.get("/", response_model=OrdersPublic)
def read_orders(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve orders.
    """

    if current_user.is_superuser:
        count_statement = select(func.count()).select_from(Order)
        count = session.exec(count_statement).one()
        statement = select(Order).offset(skip).limit(limit).order_by(Order.created_at.desc())
        orders = session.exec(statement).all()

    return OrdersPublic(data=orders, count=count)

@router.get("/{id}", response_model=OrderPublic)
def read_order(session: SessionDep, current_user: CurrentUser, id: uuid.UUID) -> Any:
    """
    Get order by ID.
    """
    order = session.get(Order, id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return order

@router.post("/create", response_model=OrderPublic)
def create_order(
    *, session: SessionDep, order_in: OrderCreate
) -> Any:
    """
    Create new product.
    """
    order = Order.model_validate(order_in)
    session.add(order)
    session.commit()
    session.refresh(order)
    
    return order

