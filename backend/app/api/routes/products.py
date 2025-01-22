import uuid
from typing import Any, List
from pathlib import Path

from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import Product, ProductCreate, ProductUpdate, \
    ProductImage, ProductPublic, ProductsPublic, Message

router = APIRouter()


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
async def create_product(
    *, session: SessionDep, current_user: CurrentUser,
    # product_in: ProductCreate
    category: str = Form(...),
    title_en: str = Form(...),
    title_uk: str = Form(...),
    price_usd: str = Form(...),
    price_uah: str = Form(...),
    size: str = Form(...),
    material_en: str = Form(...),
    material_uk: str = Form(...),
    images: List[UploadFile] | None = File(None)
) -> Any:
    """
    Create new product.
    """
    product_data = {
        "category": category,
        "title_en": title_en,
        "title_uk": title_uk,
        "title_uk": title_uk,
        "price_usd": price_usd,
        "price_uah": price_uah,
        "size": size,
        "material_en": material_en,
        "material_uk": material_uk,
        "owner_id": current_user.id,
    }
    product = Product.model_validate(product_data)
    
    
    # product = Product.model_validate(
    #     product_in.dict(exclude={"images"}),
    #     update={"owner_id": current_user.id}
    # )
    session.add(product)
    session.commit()
    
    if images:
        for index, image in enumerate(images):
            file_extension = image.filename.split(".")[-1]
            unique_filename = f"{uuid.uuid4().hex}.{file_extension}"
            file_path = UPLOAD_DIR / unique_filename

            # Write the uploaded file to disk
            with open(file_path, "wb") as f:
                f.write(await image.read())

            # Create and associate image to product
            image_data = ProductImage.model_validate(
                {"product_id": product.id,
                 "url": str(file_path),
                 "order": index + 1,
                 "alt_text": title_en
                }
            )
            session.add(image_data)
    # if product_in.images:
    #     for image_in in product_in.images:
    #         # print("\n\nImage IN: ", image_in)
            
    #         file_extension = image_in.filename.split(".")[-1]
    #         unique_filename = f"{uuid.uuid4().hex}.{file_extension}"
    #         file_path = UPLOAD_DIR / unique_filename
            
    #         with open(file_path, "wb") as f:
    #             f.write(image_in.file.read())
            
    #         image = ProductImage.model_validate(
    #             image_in,
    #             update={"product_id": product.id, "url": str(file_path),}
    #         )
    #         session.add(image)

    session.commit() 
    session.refresh(product)
    return product


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
