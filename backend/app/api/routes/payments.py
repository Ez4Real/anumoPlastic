import requests
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from app.core.config import settings


router = APIRouter()


class MonoBankCallback(BaseModel):
    invoiceId: str
    status: str
    amount: int
    ccy: int
    reference: str
    modifiedDate: int


@router.post("/create")
async def create_payment(request_data: dict):
    headers = {
        "X-Token": settings.MONOBANK_ACQUIRING_TOKEN,
        "Content-Type": "application/json",
    }
    
    try:
        response = requests.post(
            f"{settings.MONOBANK_ACQUIRING_API}/api/merchant/invoice/create",
            json=request_data,
            headers=headers
        )
        # response.raise_for_status()  # Raise an error for bad status codes
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=400, detail=str(e))
        

@router.post("/callback")
async def monobank_callback(request: Request, payload: MonoBankCallback):
    """
    Callback endpoint to handle Monobank payment status updates.
    """
    try:
        # Log the incoming webhook data
        data = payload.dict()
        print("Received Monobank callback:", data)

        # Example: Process order status
        if data["status"] == "success":
            print(f"✅ Payment successful for Order {data['reference']} (Invoice {data['invoiceId']})")
            # Update order in database (pseudo-code)
            # update_order_status(order_id=data["reference"], status="paid")

        elif data["status"] == "failure":
            print(f"❌ Payment failed for Order {data['reference']}")
            # update_order_status(order_id=data["reference"], status="failed")

        elif data["status"] == "processing":
            print(f"🔄 Payment processing for Order {data['reference']}")
            # update_order_status(order_id=data["reference"], status="processing")

        elif data["status"] == "expired":
            print(f"⌛ Payment expired for Order {data['reference']}")
            # update_order_status(order_id=data["reference"], status="expired")

        return {"message": "Callback received successfully"}

    except Exception as e:
        print("Error processing Monobank callback:", str(e))
        raise HTTPException(status_code=400, detail="Invalid callback payload")