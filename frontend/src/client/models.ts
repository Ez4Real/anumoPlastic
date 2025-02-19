export type Body_login_login_access_token = {
  grant_type?: string | null
  username: string
  password: string
  scope?: string
  client_id?: string | null
  client_secret?: string | null
}

export type HTTPValidationError = {
  detail?: Array<ValidationError>
}


enum ProductCategory {
  CARABINER = "Carabiner",
  BOOK_HOLDER = "Book holder",
  CHOKER = "Choker",
  PLATE = "Plate",
  SOAP_HOLDER = "Soap holder",
  IVAN_THE_TABLE = "Ivan the table",
}

export enum CarabinerTags {
  BUNNY = "bunny",
  HEART = "heart",
  SHURIKEN = "shuriken",
  SPIKELET = "spikelet",
}

type ProductImage = {
  url: string;
  alt_text?: string | undefined; 
  order: number;   
}
export type CartProductImageItem = {
  url: string;
  alt_text?: string | undefined; 
}
export type ImageItem = {
  id: string;
  file: File;
  url: string;
}

type ProductBase = {
  category: ProductCategory;
  title_en: string;
  title_uk: string;
  material_en: string;
  material_uk: string;
  price_usd: number;
  price_uah: number;
  size_en: string | Array<string>;
  size_uk: string | Array<string>;
  weight_en?: string | null;       
  weight_uk?: string | null;       
  tag?: CarabinerTags | null;      
}

export type ProductCreate = ProductBase & {
  images?: Array<ProductImage> | null; 
};

export type ProductPublic = ProductBase & {
  id: string
  owner_id: string
  created_at: Date
  images?: Array<ProductImage>;
}

export type ProductUpdate = ProductBase & {
  category?: ProductCategory | null;
  title_en?: string | null;
  title_uk?: string | null;
  material_en?: string | null;
  material_uk?: string | null;
  price_usd?: number | null;
  price_uah?: number | null;
  size_en: string | Array<string> | null;
  size_uk: string | Array<string> | null;
  weight_en?: string | null;       
  weight_uk?: string | null;  
  images?: Array<ProductImage> | null;
}


export type CartProduct = {
  id: string
  category: ProductCategory;
  title_en: string;
  title_uk: string;
  material_en: string;
  material_uk: string;
  price_usd: number;
  price_uah: number;
  size: string;
  weight_en?: string | null;       
  weight_uk?: string | null;       
  tag?: CarabinerTags | null;      
  image?: CartProductImageItem | null;
  count: number
};

type BasketItem = {
  productId: string
  name: string
  qty: number
  sum: number
  total: number
  icon: string
  code: string
  unit?: string
}
type SaveCardData = {
  saveCard: boolean // Ознака зберігання картки (токенізації) після оплати
  walletId: string // Ідентифікатор гаманця користувача
}
type MerchantPaymentInfo = { // при активній звʼязці з ПРРО https://web.monobank.ua
  reference: string // order id
  destination: string // Призначення платежу
  basketOrder: Array<BasketItem>
  customerEmails: Array<string>
  comment?: string 
}
export type PaymentCreate = {
  amount: number;
  ccy?: 980 | 840;  //(UKR HRYVNA | US DOLLAR)
  merchantPaymInfo: MerchantPaymentInfo;
  redirectUrl: string;
  webHookUrl: string;
  displayType?: string;
  invoiceId?: string;

  validity?: number; // Строк дії в секундах, за замовчуванням рахунок перестає бути дійсним через 24 години
  paymentType?: "debit" | "hold" // Для значення hold термін складає 9 днів. Якщо через 9 днів холд не буде фіналізовано — він скасовується
  qrId?: string; // Ідентифікатор QR-каси для встановлення суми оплати на існуючих QR-кас
  code?: string; // Код терміналу субмерчанта, з апі “Список субмерчантів”.
  saveCardData?: null | SaveCardData
}

export type PaymentCreateResponse = {
  invoiceId: string
  pageUrl: string
}

type Contacts = {
  first_name: string
  last_name: string
  email: string
  phone: string
}
export type DeliveryTypeUkraine = "branch" | "postomat" | "address"
type DeliveryBase = {
  region: "ukraine" | "europe" | "overseas" | null
  country: string
  city: string
  postalCode?: string 
  streetAddress?: string
  type?: DeliveryTypeUkraine
  warehouse?: string
}

type OrderBase = {
  contacts: Contacts
  delivery: DeliveryBase
  amount: number
  currency: "USD" | "UAH"
  basketOrder: Array<BasketItem>
  mailing: boolean
  comment?: string
  payment_status: "created" | "processing" | "hold" | "success" | "failure" | "reversed" | "expired"
  created_at: Date
}

export type OrderCreate = OrderBase & {
  id: string
  invoiceId: string
}

export type OrderPublic = OrderBase & {
  id: string
  invoiceId: string
}
export type OrdersPublic = {
  data: Array<OrderPublic>
  count: number
}


export type ProductsPublic = {
  data: Array<ProductPublic>
  count: number
}

type SubscriberBase = {
  email: string
}
export type SubscriberCreate = SubscriberBase

export type SubscriberPublic = SubscriberBase & {
  is_active?: boolean
  mailing_language?: string | null
  id: string
}

export type SubscribersPublic = {
  data: Array<SubscriberPublic>
  count: number
}

export type Message = {
  message: string
}

export type NewPassword = {
  token: string
  new_password: string
}

export type Token = {
  access_token: string
  token_type?: string
}

export type UpdatePassword = {
  current_password: string
  new_password: string
}

export type UserCreate = {
  email: string
  is_active?: boolean
  is_superuser?: boolean
  full_name?: string | null
  password: string
}

export type UserPublic = {
  email: string
  is_active?: boolean
  is_superuser?: boolean
  full_name?: string | null
  id: string
}

export type UserRegister = {
  email: string
  password: string
  full_name?: string | null
}

export type UserUpdate = {
  email?: string | null
  is_active?: boolean
  is_superuser?: boolean
  full_name?: string | null
  password?: string | null
}

export type UserUpdateMe = {
  full_name?: string | null
  email?: string | null
}

export type UsersPublic = {
  data: Array<UserPublic>
  count: number
}

export type ValidationError = {
  loc: Array<string | number>
  msg: string
  type: string
}
