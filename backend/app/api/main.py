from fastapi import APIRouter

from app.api.routes import login, users, products, utils, subscribers, payments

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
api_router.include_router(products.router, prefix="/products", tags=["products"])
api_router.include_router(subscribers.router, prefix="/subscribers", tags=["subscribers"])
api_router.include_router(payments.router, prefix="/payments", tags=["payments"])
