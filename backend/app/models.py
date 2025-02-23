import uuid
import json
from datetime import datetime, timezone
from typing import List, Optional
from enum import Enum
from sqlmodel import SQLModel, Field, Relationship, JSON
from sqlalchemy import UniqueConstraint, TypeDecorator
from pydantic import BaseModel, EmailStr, field_validator
from fastapi import UploadFile, File

# Shared properties
class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    is_superuser: bool = False
    full_name: str | None = Field(default=None, max_length=255)

# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40)

class UserRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=40)
    full_name: str | None = Field(default=None, max_length=255)

# Properties to receive via API on update, all are optional
class UserUpdate(UserBase):
    email: EmailStr | None = Field(default=None, max_length=255)  # type: ignore
    password: str | None = Field(default=None, min_length=8, max_length=40)

class UserUpdateMe(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)

class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)

# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str
    products: List["Product"] = Relationship(back_populates="owner", cascade_delete=True)

# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: uuid.UUID

class UsersPublic(SQLModel):
    data: List[UserPublic]
    count: int


class ProductCategory(str, Enum):
    CARABINER = "Carabiner"
    BOOK_HOLDER = "Book holder"
    CHOKER = "Choker"
    PLATE = "Plate"
    SOAP_HOLDER = "Soap holder"
    IVAN_THE_TABLE = "Ivan the table"

class CarabinerTags(str, Enum):
    BUNNY = "bunny"
    HEART = "heart"
    SHURIKEN = "shuriken"
    SPIKELET = "spikelet"


class ProductBase(SQLModel):
    # Required Product fields:
    category: ProductCategory = Field(index=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    title_en: str = Field(min_length=5, max_length=255)
    title_uk: str = Field(min_length=5, max_length=255)
    material_en: str = Field(min_length=5, max_length=255)
    material_uk: str = Field(min_length=5, max_length=255)
    price_usd: float = Field(ge=0.9, le=99999.0)
    price_uah: float = Field(ge=0.9, le=99999.0)
    size_en: str | List[str] = Field(sa_type=JSON)
    size_uk: str | List[str] = Field(sa_type=JSON)
    # Optional Product fields:
    weight_en: str | None = Field(max_length=50, default=None)
    weight_uk: str | None = Field(max_length=50, default=None)
    tag: CarabinerTags | None = Field(default=None)
    
    @field_validator('size_en', 'size_uk')
    def validate_size(cls, value):
        if value is None:
            return value
        if isinstance(value, str):
            if not value.strip():
                raise ValueError("Size string cannot be empty.")
        elif isinstance(value, list):
            if not all(isinstance(size, str) and size.strip() for size in value):
                raise ValueError("All sizes in the list must be non-empty strings.")
        else:
            raise ValueError("Size must be either a string or a list of strings.")
        return value
    
class ProductCreate(ProductBase):
    images: List["ProductImageCreate"] | None = Field(default=None)

class ProductUpdate(ProductBase):
    category: ProductCategory | None = Field(default=None)
    title_en: str | None = Field(default=None, min_length=5, max_length=255)
    title_uk: str | None = Field(default=None, min_length=5, max_length=255)
    material_en: str | None = Field(default=None, min_length=5, max_length=255)
    material_uk: str | None = Field(default=None, min_length=5, max_length=255)
    price_usd: float | None = Field(default=None, ge=0.9, le=99999.0)
    price_uah: float | None = Field(default=None, ge=0.9, le=99999.0)
    size_en: Optional[str | List[str]] = Field(default=None)
    size_uk: Optional[str | List[str]] = Field(default=None)
    weight_en: str | None = Field(default=None, max_length=50)
    weight_uk: str | None = Field(default=None, max_length=50)
    images: List["ProductImageCreate"] | None = Field(default=None)

class Product(ProductBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    owner_id: uuid.UUID = Field(
        foreign_key="user.id", nullable=False, ondelete="CASCADE"
    )
    owner: User | None = Relationship(back_populates="products")
    images: list["ProductImage"] = Relationship(back_populates="product", cascade_delete=True)

class ProductPublic(ProductBase):
    id: uuid.UUID
    owner_id: uuid.UUID
    images: list["ProductImage"]

class ProductsPublic(SQLModel):
    data: List[ProductPublic]
    count: int


class ProductImageBase(SQLModel):
    url: str
    alt_text: str | None = None

class ImagesUpload(BaseModel):
    images: List[UploadFile] = File(...)
    
class ProductImageCreate(ProductImageBase):
    order: int | None = Field(default=None)
    
class ProductImageUpdate(ProductImageBase):
    id: uuid.UUID
    order: int | None = None

class ProductImage(ProductImageBase, table=True):
    __tablename__ = "product_image"
    __table_args__ = (UniqueConstraint("product_id", "order", name="unique_product_image_order"),)
    
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    product_id: uuid.UUID = Field(
        foreign_key="product.id", nullable=False, ondelete="CASCADE"
    )
    product: Product | None = Relationship(back_populates="images")
    order: int = Field(default=None)
    

# Order Models
class Contacts(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: str


class DeliveryRegion(str, Enum):
    UKRAINE = "ukraine"
    EUROPE = "europe"
    OVERSEAS = "overseas"
class DeliveryUkraine(str, Enum):
    BRANCH = "branch"
    POSTOMAT = "postomat"
    ADDRESS = "address"
    
class Delivery(SQLModel):
    region: DeliveryRegion
    country: str = Field(max_length=255)
    city: str = Field(max_length=255)
    postalCode: str | None = Field(default=None, max_length=25)
    streetAddress: str = Field(default=None, max_length=255)
    type: DeliveryUkraine | None = Field(default=None)
    warehouse: str | None = Field(default=None, max_length=255)

class PydanticJSONType(TypeDecorator):
    impl = JSON

    def __init__(self, pydantic_model: type[BaseModel], *args, **kwargs):
        self.pydantic_model = pydantic_model
        super().__init__(*args, **kwargs)

    def process_bind_param(self, value, dialect):
        if value is None:
            return None
        return json.loads(value.json())

    def process_result_value(self, value, dialect):
        if value is None:
            return None
        return self.pydantic_model.model_validate(value)
    
    
class CartProduct(SQLModel):
    name: str = Field(min_length=5, max_length=255)
    qty: int = Field(gt=0)
    sum: int = Field(gt=0)
    total: int = Field(gt=0)
    icon: str
    code: str
    unit: str = Field(default="шт.")

class PydanticJSONListType(TypeDecorator):
    impl = JSON

    def __init__(self, pydantic_model: type[BaseModel], *args, **kwargs):
        self.pydantic_model = pydantic_model
        super().__init__(*args, **kwargs)

    def process_bind_param(self, value, dialect):
        if value is None:
            return None
        return [json.loads(item.json()) for item in value]

    def process_result_value(self, value, dialect):
        if value is None:
            return None
        return [self.pydantic_model.model_validate(item) for item in value]


class Currency(str, Enum):
    USD = "USD"
    UAH = "UAH"
class PaymentStatus(str, Enum):
    CREATED = "created"
    PROCESSING = "processing"
    HOLD = "hold"
    SUCCESS = "success"
    FAILURE = "failure"
    REVERSED = "reversed"
    EXPIRED = "expired"
class OrderBase(SQLModel):
    contacts: Contacts = Field(sa_type=PydanticJSONType(Contacts))
    delivery: Delivery = Field(sa_type=PydanticJSONType(Delivery))
    amount: int
    currency: Currency
    basketOrder: List[CartProduct] = Field(sa_type=PydanticJSONListType(CartProduct))
    mailing: bool = Field(default=False)
    comment: str
    payment_status: PaymentStatus = Field(default="created")
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    
    class Config:
        arbitrary_types_allowed = True

class OrderCreate(OrderBase):
    invoiceId: str = Field(unique=True)
    
class Order(OrderBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    invoiceId: str = Field(unique=True)
    
class OrderPublic(OrderBase):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    invoiceId: str = Field(unique=True)

class OrdersPublic(SQLModel):
    data: List[OrderPublic]
    count: int
    

# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenPayload(SQLModel):
    sub: str | None = None


class NewPassword(SQLModel):
    token: str
    new_password: str = Field(min_length=8, max_length=40)
    

class MailingLanguage(str, Enum):
    EN = "en"
    UK = "uk"


class SubscriberBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = Field(default=False)
    mailing_language: MailingLanguage | None = Field(default=None)

class SubscriberCreate(SubscriberBase):
    pass

class SubscriberUpdate(SubscriberBase):
    email: EmailStr | None = None
    is_active: bool | None = Field(default=None)
    mailing_language: MailingLanguage | None = Field(default=None)

class Subscriber(SubscriberBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)

class SubscriberPublic(SubscriberBase):
    id: uuid.UUID

class SubscribersPublic(SQLModel):
    data: List[SubscriberPublic]
    count: int


# Generic message
class Message(SQLModel):
    message: str