export const $Body_login_login_access_token = {
  properties: {
    grant_type: {
      type: "any-of",
      contains: [
        {
          type: "string",
          pattern: "password",
        },
        {
          type: "null",
        },
      ],
    },
    username: {
      type: "string",
      isRequired: true,
    },
    password: {
      type: "string",
      isRequired: true,
    },
    scope: {
      type: "string",
      default: "",
    },
    client_id: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    client_secret: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $HTTPValidationError = {
  properties: {
    detail: {
      type: "array",
      contains: {
        type: "ValidationError",
      },
    },
  },
} as const

export const $ProductBase = {
  properties: {
    category: {
      type: "string",
      enum: ["Carabiner", "Book holder", "Choker", "Plate", "Soap holder"],
      isRequired: true,
    },
    title_en: {
      type: "string",
      isRequired: true,
      maxLength: 255,
      minLength: 5,
    },
    title_uk: {
      type: "string",
      isRequired: true,
      maxLength: 255,
      minLength: 5,
    },
    material_en: {
      type: "string",
      isRequired: true,
      maxLength: 255,
      minLength: 5,
    },
    material_uk: {
      type: "string",
      isRequired: true,
      maxLength: 255,
      minLength: 5,
    },
    price_usd: {
      type: "number",
      isRequired: true,
      minimum: 0.9,
      maximum: 99999,
    },
    price_uah: {
      type: "number",
      isRequired: true,
      minimum: 0.9,
      maximum: 99999,
    },
    size_en: {
      type: "any-of",
      contains: [
        { type: "string" },
        { type: "array", items: { type: "string" } }
      ],
    },
    size_uk: {
      type: "any-of",
      contains: [
        { type: "string" },
        { type: "array", items: { type: "string" } }
      ],
    },
    weight_en: {
      type: "any-of",
      contains: [
        { type: "string", maxLength: 50 },
        { type: "null" },
      ],
    },
    weight_uk: {
      type: "any-of",
      contains: [
        { type: "string", maxLength: 50 },
        { type: "null" },
      ],
    },
    tag: {
      type: "any-of",
      contains: [
        {
          type: "string",
          enum: ["bunny", "heart", "shuriken", "spikelet"],
        },
        { type: "null" },
      ],
    },
  },
} as const;

//@ts-ignore
const $ProductImage = { 
  properties: {
    url: { type: "string", isRequired: true },
    alt_text: { type: "string", maxLength: 255 },
    order: { type: "number", isRequired: true },
  },
} as const;

export const $ProductCreate = {
  allOf: [
    { $ref: "#/$ProductBase" },
    {
      properties: {
        images: {
          type: "array",
          contains: {
            type: "ProductImage",
          },
          isRequired: true,
        },
      },
    },
  ],
} as const;

export const $ProductPublic = {
  allOf: [
    { $ref: "#/$ProductBase" },
    {
      properties: {
        id: { type: "string", isRequired: true, format: "uuid" },
        created_at: { type: "string", isRequired: true, format: "date-time" },
        owner_id: { type: "string", isRequired: true, format: "uuid" },
        images: {
          type: "array",
          contains: {
            type: "ProductImage",
          },
          isRequired: true,
        },
      },
    },
  ],
} as const;

export const $ProductUpdate = {
  allOf: [
    {
      properties: Object.fromEntries(
        Object.entries($ProductBase.properties).map(([key, value]) => [
          key,
          { ...value, isRequired: false },
        ])
      ),
    },
    {
      properties: {
        images: {
          type: "any-of",
          contains: [
            {
              type: "array",
              contains: {
                type: "ProductImage",
              },
            },
            {
              type: "null",
            },
          ],
          isRequired: false,
        },
      },
    },
  ],
} as const;

export const $ProductsPublic = {
  properties: {
    data: {
      type: "array",
      contains: {
        type: "ProductPublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      isRequired: true,
    },
  },
} as const


export const $SubscriberPublic = {
  properties: {
    email: {
      type: "string",
      isRequired: true,
      format: "email",
      maxLength: 255,
    },
    is_active: {
      type: "boolean",
      isRequired: true,
    },
    mailing_language: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 2,
        },
        {
          type: "null",
        },
      ],
      isRequired: false,
    },
    id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const;

export const $SubscribersPublic = {
  properties: {
    data: {
      type: "array",
      contains: {
        type: "SubscriberPublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $Message = {
  properties: {
    message: {
      type: "string",
      isRequired: true,
    },
  },
} as const

export const $NewPassword = {
  properties: {
    token: {
      type: "string",
      isRequired: true,
    },
    new_password: {
      type: "string",
      isRequired: true,
      maxLength: 40,
      minLength: 8,
    },
  },
} as const

export const $Token = {
  properties: {
    access_token: {
      type: "string",
      isRequired: true,
    },
    token_type: {
      type: "string",
      default: "bearer",
    },
  },
} as const

export const $UpdatePassword = {
  properties: {
    current_password: {
      type: "string",
      isRequired: true,
      maxLength: 40,
      minLength: 8,
    },
    new_password: {
      type: "string",
      isRequired: true,
      maxLength: 40,
      minLength: 8,
    },
  },
} as const

export const $UserCreate = {
  properties: {
    email: {
      type: "string",
      isRequired: true,
      format: "email",
      maxLength: 255,
    },
    is_active: {
      type: "boolean",
      default: true,
    },
    is_superuser: {
      type: "boolean",
      default: false,
    },
    full_name: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 255,
        },
        {
          type: "null",
        },
      ],
    },
    password: {
      type: "string",
      isRequired: true,
      maxLength: 40,
      minLength: 8,
    },
  },
} as const

export const $UserPublic = {
  properties: {
    email: {
      type: "string",
      isRequired: true,
      format: "email",
      maxLength: 255,
    },
    is_active: {
      type: "boolean",
      default: true,
    },
    is_superuser: {
      type: "boolean",
      default: false,
    },
    full_name: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 255,
        },
        {
          type: "null",
        },
      ],
    },
    id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $UserRegister = {
  properties: {
    email: {
      type: "string",
      isRequired: true,
      format: "email",
      maxLength: 255,
    },
    password: {
      type: "string",
      isRequired: true,
      maxLength: 40,
      minLength: 8,
    },
    full_name: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 255,
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $UserUpdate = {
  properties: {
    email: {
      type: "any-of",
      contains: [
        {
          type: "string",
          format: "email",
          maxLength: 255,
        },
        {
          type: "null",
        },
      ],
    },
    is_active: {
      type: "boolean",
      default: true,
    },
    is_superuser: {
      type: "boolean",
      default: false,
    },
    full_name: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 255,
        },
        {
          type: "null",
        },
      ],
    },
    password: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 40,
          minLength: 8,
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $UserUpdateMe = {
  properties: {
    full_name: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 255,
        },
        {
          type: "null",
        },
      ],
    },
    email: {
      type: "any-of",
      contains: [
        {
          type: "string",
          format: "email",
          maxLength: 255,
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $UsersPublic = {
  properties: {
    data: {
      type: "array",
      contains: {
        type: "UserPublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $ValidationError = {
  properties: {
    loc: {
      type: "array",
      contains: {
        type: "any-of",
        contains: [
          {
            type: "string",
          },
          {
            type: "number",
          },
        ],
      },
      isRequired: true,
    },
    msg: {
      type: "string",
      isRequired: true,
    },
    type: {
      type: "string",
      isRequired: true,
    },
  },
} as const
