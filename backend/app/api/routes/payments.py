import requests
from datetime import datetime
from pydantic import EmailStr
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from app.core.config import settings
from fastapi import APIRouter, Request, HTTPException, Header
from app.models import Order, Message
from app.api.deps import SessionDep
from app.utils import send_email


router = APIRouter()


class MonoBankCallback(BaseModel):
    invoiceId: str
    status: str
    # "created" | "processing" | "hold" | "success" | "failure" | "reversed" |"expired"
    amount: int
    ccy: int
    failureReason: str
    errCode: str
    createdDate: datetime
    modifiedDate: int
    reference: str
    destination: str


@router.post("/create")
async def create_payment(request_data: dict):
    try:
        response = requests.post(
            f"{settings.MONOBANK_ACQUIRING_API}/api/merchant/invoice/create",
            json=request_data,
            headers={
              "X-Token": settings.REACT_APP_MONO_ACQUIRE_TOKEN,
              "Content-Type": "application/json"
            }
        )
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=400, detail=str(e))
        

# !!!!!!!!!!!!!!!!! TODO: Test Monobank Callback
import base64
import hashlib
import ecdsa
async def verify_monobank_signature(request: Request, x_sign: str = Header(...)):
    """ Verify Monobank webhook signature """
    try:
        body_bytes = await request.body()
        signature_bytes = base64.b64decode(x_sign)

        pub_key = ecdsa.VerifyingKey.from_pem(settings.MONO_PUB_KEY.decode())
        is_valid = pub_key.verify(
            signature_bytes, body_bytes, sigdecode=ecdsa.util.sigdecode_der, hashfunc=hashlib.sha256
        )
        
        print("\n VERIFIED!")

        if not is_valid:
            raise HTTPException(status_code=403, detail="Invalid webhook signature")
        
    except Exception as e:
        print("❌ Signature verification failed:", str(e))
        raise HTTPException(status_code=403, detail="Signature verification failed")


@router.get("/send-receipt")
async def send_receipt_email(invoiceId: str, email: EmailStr):
    response = requests.get(
            f"{settings.MONOBANK_ACQUIRING_API}/api/merchant/invoice/receipt?invoiceId={invoiceId}",
            headers={
              "X-Token": settings.REACT_APP_MONO_ACQUIRE_TOKEN,
              "Content-Type": "application/json",
            }
        )
    if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Failed to fetch receipt")
        
    receipt_base64 = response.json().get("file", "")
    receipt_pdf_bytes = base64.b64decode(receipt_base64)

    
    email_subject = "Your Payment Receipt from Monobank"
    html_content = "Please find your payment receipt attached."
    send_email(
        email_to=email,
        subject=email_subject,
        html_content=html_content,
        attachments=[("receipt.pdf", receipt_pdf_bytes, "application/pdf")]
    )
    return Message(message="Newsletter subscription email sent")


@router.post("/callback")
async def payment_callback(
    request: Request,
    session: SessionDep,
    x_sign: str = Header(...),
):
    """ Monobank Payment Callback """
    
    print("\n\n\nCallback Request Triggered!!! ", request)
    print("\n\n\nX-Sign ", x_sign)
    
    await verify_monobank_signature(request, x_sign)

    try:
        data = await request.json()
        print("✅ Received Monobank Callback:", data)

        invoice_id = data.get("invoiceId")
        status = data.get("status")
        modified_date = data.get("modifiedDate")

        if not invoice_id or not status or not modified_date:
            raise HTTPException(status_code=400, detail="Missing required fields")

        # ✅ Step 1: Fetch the Order
        order = session.exec(Order).filter(Order.invoiceId == invoice_id).first()
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")

        # ✅ Step 2: Process payment statuses
        if status == "success":
            print(f"✅ Payment successful for Order {order.id}")
            order.payment_status = "success"

        elif status == "failure":
            print(f"❌ Payment failed for Order {order.id}")
            order.payment_status = "failure"

        elif status == "processing":
            print(f"🔄 Payment processing for Order {order.id}")
            order.payment_status = "processing"

        # ✅ Step 3: Update the Order
        order.modified_at = modified_date  
        session.add(order)
        session.commit()
        session.refresh(order)

        return {"message": "Callback processed successfully"}

    except Exception as e:
        print("❌ Error processing Monobank callback:", str(e))
        raise HTTPException(status_code=400, detail="Invalid callback payload")