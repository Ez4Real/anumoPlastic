from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException
from pydantic.networks import EmailStr

from app import crud
from app.api.deps import get_current_active_superuser, SessionDep
from app.core.config import settings
from app.core.security import create_access_token, verify_activation_token
from app.models import Message, SubscriberCreate, SubscriberUpdate
from app.utils import generate_test_email, send_email, \
    generate_newsletter_subscription_email

router = APIRouter()


@router.post(
    "/test-email/",
    dependencies=[Depends(get_current_active_superuser)],
    status_code=201,
)
def test_email(email_to: EmailStr) -> Message:
    """
    Test emails.
    """
    email_data = generate_test_email(email_to=email_to)
    send_email(
        email_to=email_to,
        subject=email_data.subject,
        html_content=email_data.html_content,
    )
    return Message(message="Test email sent")


@router.post(
    "/newsletter-subscription/",
    status_code=201,
)
def newsletter_subscription(email_to: EmailStr, session: SessionDep) -> Message:
    """
    Newsletter subscription emails
    """
    subscriber = crud.get_subscriber_by_email(session=session, email=email_to)
    if not subscriber:
        subscriber_in = SubscriberCreate(email=email_to)
        subscriber = crud.create_subscriber(session=session, subscriber_in=subscriber_in)
    if subscriber.is_active:
        raise HTTPException(status_code=400, detail="Subscriber already exists.")
    
    token = create_access_token(
        email_to,
        timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    activation_link = f"{settings.BACKEND_HOST}/api/v1/utils/newsletter-subscription/activate/{token}/"
    
    email_data = generate_newsletter_subscription_email(
        email_to=email_to,
        activation_link=activation_link
    )
    
    logo_filename = 'logo-black.png'
    logo_attachment = {
        'filename': logo_filename,
        'content_disposition': "inline",
        'file_path': f"./assets/images/{logo_filename}",
        'cid': logo_filename,
    }
    
    send_email(
        email_to=email_to,
        subject=email_data.subject,
        html_content=email_data.html_content,
        attachments=[logo_attachment],
    )
    return Message(message="Newsletter subscription email sent")


@router.get("/newsletter-subscription/activate/{token}/{lang}")
def activate_subscription(token: str, lang: str, session: SessionDep):
    """
    Activate a newsletter subscription using a token.
    """
    email = verify_activation_token(token)
    if not email:
        raise HTTPException(status_code=400, detail="Invalid or expired activation token.")
    
    subscriber = crud.get_subscriber_by_email(session=session, email=email)
    if not subscriber:
        raise HTTPException(status_code=404, detail="Subscriber not found.")
    
    if subscriber.is_active:
        return {"message": "Subscription already activated."}
    
    subscriber_in_update = SubscriberUpdate(is_active=True, mailing_language=lang)
    subscriber = crud.update_subscriber(
        session=session,
        db_subscriber=subscriber,
        subscriber_in=subscriber_in_update
    )
    success_message = {
        "en": "Your subscription has been successfully activated!",
        "uk": "Ваша підписка успішно активована!"
    }
    return Message(message=success_message[lang])


@router.get("/health-check/")
async def health_check() -> bool:
    return True
