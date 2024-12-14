from fastapi import APIRouter, Depends
from pydantic.networks import EmailStr

from app.api.deps import get_current_active_superuser
from app.models import Message
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
def newsletter_subscription(email_to: EmailStr) -> Message:
    """
    Newsletter subscription emails
    """
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
