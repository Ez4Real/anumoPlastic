from fastapi import APIRouter, Depends, HTTPException
from pydantic.networks import EmailStr

from app import crud
from app.api.deps import get_current_active_superuser, SessionDep
from app.models import Message, SubscriberCreate
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
    
    email_data = generate_newsletter_subscription_email(email_to=email_to)
    
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


@router.get("/health-check/")
async def health_check() -> bool:
    return True
