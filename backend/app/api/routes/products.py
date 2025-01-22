import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import Product, ProductCreate, ProductUpdate, \
    ProductImage, ProductPublic, ProductsPublic, Message

router = APIRouter()

# !!!!!!!
from pathlib import Path
UPLOAD_DIR = Path("uploads/productImages")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.get("/", response_model=ProductsPublic)
def read_products(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve products.
    """

    if current_user.is_superuser:
        count_statement = select(func.count()).select_from(Product)
        count = session.exec(count_statement).one()
        statement = select(Product).offset(skip).limit(limit)
        products = session.exec(statement).all()
    else:
        count_statement = (
            select(func.count())
            .select_from(Product)
            .where(Product.owner_id == current_user.id)
        )
        count = session.exec(count_statement).one()
        statement = (
            select(Product)
            .where(Product.owner_id == current_user.id)
            .offset(skip)
            .limit(limit)
        )
        products = session.exec(statement).all()

    return ProductsPublic(data=products, count=count)


@router.get("/{id}", response_model=ProductPublic)
def read_product(session: SessionDep, current_user: CurrentUser, id: uuid.UUID) -> Any:
    """
    Get product by ID.
    """
    product = session.get(Product, id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if not current_user.is_superuser and (product.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return product


@router.post("/", response_model=ProductPublic)
def create_product(
    *, session: SessionDep, current_user: CurrentUser, product_in: ProductCreate
) -> Any:
    """
    Create new product.
    """
    product = Product.model_validate(
        product_in.dict(exclude={"images"}),
        update={"owner_id": current_user.id}
    )
    session.add(product)

    if product_in.images:
        for image_in in product_in.images:
            image = ProductImage.model_validate(image_in, update={"product_id": product.id})
            session.add(image)

    session.commit() 
    session.refresh(product)
    return product


# !!!!!!!
from fastapi import APIRouter, UploadFile, File
from typing import List
import os
@router.post("/upload-images")
async def upload_images(images: List[UploadFile] = File(...)):
    """
    Upload multiple product images and save them to local storage.
    """
    print('\n\nImage ROUTE START\n\n')
    image_urls = []

    for image in images:
        extension = os.path.splitext(image.filename)[1]
        filename = f"{uuid.uuid4().hex}{extension}"
        image_path = UPLOAD_DIR / filename
        
        with open(image_path, "wb") as f:
            f.write(await image.read())

        file_url = f"/{UPLOAD_DIR}/{filename}"
        image_urls.append(file_url)

    return { "urls": image_urls }


@router.put("/{id}", response_model=ProductPublic)
def update_product(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    product_in: ProductUpdate,
) -> Any:
    """
    Update a product.
    """
    product = session.get(Product, id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if not current_user.is_superuser and (product.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    
    update_dict = product_in.model_dump(exclude_unset=True)
    product.sqlmodel_update(update_dict)
    
    if product_in.images:
        session.query(ProductImage).filter(ProductImage.product_id == id).delete()
        for image_in in product_in.images:
            image = ProductImage.model_validate(image_in, update={"product_id": product.id})
            session.add(image)
    
    session.add(product)
    session.commit()
    session.refresh(product)
    return product


@router.delete("/{id}")
def delete_product(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Message:
    """
    Delete a product.
    """
    product = session.get(Product, id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if not current_user.is_superuser and (product.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(product)
    session.commit()
    return Message(message="Product deleted successfully")
