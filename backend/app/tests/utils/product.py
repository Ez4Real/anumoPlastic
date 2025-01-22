from sqlmodel import Session

from random import choice, uniform
from app import crud
from app.models import Product, ProductCreate, ProductImageCreate, ProductCategory, CarabinerTags
from app.tests.utils.user import create_random_user
from app.tests.utils.utils import random_lower_string


def create_random_product(db: Session) -> Product:
    user = create_random_user(db)
    owner_id = user.id
    assert owner_id is not None
    
    category = choice(list(ProductCategory)) 
    title_en = f"{random_lower_string()} EN"
    title_uk = f"{random_lower_string()} UK"
    material_en = f"{random_lower_string()} material EN"
    material_uk = f"{random_lower_string()} material UK"
    price_usd = round(uniform(1.0, 1000.0), 2)
    price_uah = round(uniform(1.0, 1000.0), 2) 
    size = f"{choice(['XS', 'S', 'M', 'L', 'XL', 'XXL'])}"
    weight = f"{round(uniform(0.5, 5.0), 2)} kg" if choice([True, False]) else None
    tag = choice(list(CarabinerTags)) if category=="Carabiner" else None
    
    # !!!
    images = [
        ProductImageCreate(
            url=f"https://example.com/image_{i}.jpg",
            alt_text=f"Image {i} alt text",
            order=i
        )
        for i in range(choice([1, 3, 5])) 
    ]
    
    product_in = ProductCreate(
        category=category,
        title_en=title_en,
        title_uk=title_uk,
        material_en=material_en,
        material_uk=material_uk,
        price_usd=price_usd,
        price_uah=price_uah,
        size=size,
        weight=weight,
        tag=tag,
        images=images,
    )

    return crud.create_product(session=db, product_in=product_in, owner_id=owner_id)
