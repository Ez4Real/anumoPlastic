from sqlmodel import Session

from app import crud
from app.models import Product, ProductCreate
from app.tests.utils.user import create_random_user
from app.tests.utils.utils import random_lower_string


def create_random_product(db: Session) -> Product:
    user = create_random_user(db)
    owner_id = user.id
    assert owner_id is not None
    title = random_lower_string()
    description = random_lower_string()
    product_in = ProductCreate(title=title, description=description)
    return crud.create_product(session=db, product_in=product_in, owner_id=owner_id)
