import type { CancelablePromise } from "./core/CancelablePromise"
import { OpenAPI } from "./core/OpenAPI"
import { request as __request } from "./core/request"

import type {
  Body_login_login_access_token,
  Message,
  NewPassword,
  Token,
  UserPublic,
  UpdatePassword,
  UserCreate,
  UserRegister,
  UsersPublic,
  UserUpdate,
  UserUpdateMe,
  ProductCreate,
  ProductPublic,
  ProductsPublic,
  ProductUpdate,
  SubscribersPublic,
  SubscriberPublic
} from "./models"

export type TDataLoginAccessToken = {
  formData: Body_login_login_access_token
}
export type TDataRecoverPassword = {
  email: string
}
export type TDataResetPassword = {
  requestBody: NewPassword
}
export type TDataRecoverPasswordHtmlContent = {
  email: string
}

export class LoginService {
  /**
   * Login Access Token
   * OAuth2 compatible token login, get an access token for future requests
   * @returns Token Successful Response
   * @throws ApiError
   */
  public static loginAccessToken(
    data: TDataLoginAccessToken,
  ): CancelablePromise<Token> {
    const { formData } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/login/access-token",
      formData: formData,
      mediaType: "application/x-www-form-urlencoded",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Test Token
   * Test access token
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static testToken(): CancelablePromise<UserPublic> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/login/test-token",
    })
  }

  /**
   * Recover Password
   * Password Recovery
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static recoverPassword(
    data: TDataRecoverPassword,
  ): CancelablePromise<Message> {
    const { email } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/password-recovery/{email}",
      path: {
        email,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Reset Password
   * Reset password
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static resetPassword(
    data: TDataResetPassword,
  ): CancelablePromise<Message> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/reset-password/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Recover Password Html Content
   * HTML Content for Password Recovery
   * @returns string Successful Response
   * @throws ApiError
   */
  public static recoverPasswordHtmlContent(
    data: TDataRecoverPasswordHtmlContent,
  ): CancelablePromise<string> {
    const { email } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/password-recovery-html-content/{email}",
      path: {
        email,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export type TDataReadUsers = {
  limit?: number
  skip?: number
}
export type TDataCreateUser = {
  requestBody: UserCreate
}
export type TDataUpdateUserMe = {
  requestBody: UserUpdateMe
}
export type TDataUpdatePasswordMe = {
  requestBody: UpdatePassword
}
export type TDataRegisterUser = {
  requestBody: UserRegister
}
export type TDataReadUserById = {
  userId: string
}
export type TDataUpdateUser = {
  requestBody: UserUpdate
  userId: string
}
export type TDataDeleteUser = {
  userId: string
}

export class UsersService {
  /**
   * Read Users
   * Retrieve users.
   * @returns UsersPublic Successful Response
   * @throws ApiError
   */
  public static readUsers(
    data: TDataReadUsers = {},
  ): CancelablePromise<UsersPublic> {
    const { limit = 100, skip = 0 } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/users/",
      query: {
        skip,
        limit,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create User
   * Create new user.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static createUser(
    data: TDataCreateUser,
  ): CancelablePromise<UserPublic> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/users/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read User Me
   * Get current user.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static readUserMe(): CancelablePromise<UserPublic> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/users/me",
    })
  }

  /**
   * Delete User Me
   * Delete own user.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteUserMe(): CancelablePromise<Message> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/users/me",
    })
  }

  /**
   * Update User Me
   * Update own user.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static updateUserMe(
    data: TDataUpdateUserMe,
  ): CancelablePromise<UserPublic> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/v1/users/me",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Password Me
   * Update own password.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static updatePasswordMe(
    data: TDataUpdatePasswordMe,
  ): CancelablePromise<Message> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/v1/users/me/password",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Register User
   * Create new user without the need to be logged in.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static registerUser(
    data: TDataRegisterUser,
  ): CancelablePromise<UserPublic> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/users/signup",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read User By Id
   * Get a specific user by id.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static readUserById(
    data: TDataReadUserById,
  ): CancelablePromise<UserPublic> {
    const { userId } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/users/{user_id}",
      path: {
        user_id: userId,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update User
   * Update a user.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static updateUser(
    data: TDataUpdateUser,
  ): CancelablePromise<UserPublic> {
    const { requestBody, userId } = data
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/v1/users/{user_id}",
      path: {
        user_id: userId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Delete User
   * Delete a user.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteUser(data: TDataDeleteUser): CancelablePromise<Message> {
    const { userId } = data
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/users/{user_id}",
      path: {
        user_id: userId,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export type TDataTestEmail = {
  emailTo: string
}

export class UtilsService {
  /**
   * Test Email
   * Test emails.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static testEmail(data: TDataTestEmail): CancelablePromise<Message> {
    const { emailTo } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/utils/test-email/",
      query: {
        email_to: emailTo,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Health Check
   * @returns boolean Successful Response
   * @throws ApiError
   */
  public static healthCheck(): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/utils/health-check/",
    })
  }
}

export type TDataReadProducts = {
  limit?: number
  skip?: number
}
export type TDataReadProductsByCategory = {
  category: string
}
export type TDataCreateProduct = {
  requestBody: ProductCreate
}
export type TDataReadProduct = {
  id: string
}
export type TDataUpdateProduct = {
  id: string
  requestBody: ProductUpdate
}
export type TDataDeleteProduct = {
  id: string
}

export class ProductsService {
  /**
   * Read Products
   * Retrieve products.
   * @returns ProductsPublic Successful Response
   * @throws ApiError
   */
  public static readProducts(
    data: TDataReadProducts = {},
  ): CancelablePromise<ProductsPublic> {
    const { limit = 100, skip = 0 } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/products/",
      query: {
        skip,
        limit,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Products by Category
   * Retrieve products by category.
   * @returns ProductsPublic Successful Response
   * @throws ApiError
   */
  public static readProductsByCategory(
    data: TDataReadProductsByCategory
  ): CancelablePromise<ProductsPublic> {
    const { category } = data;
  
    return __request(OpenAPI, {
      method: "GET",
      url: `/api/v1/products/${category}`, 
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Create Product
   * Create new product.
   * @returns ProductPublic Successful Response
   * @throws ApiError
   */
  public static createProduct(
    data: TDataCreateProduct,
  ): CancelablePromise<ProductPublic> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/products/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Upload Product Images
   * Upload new product images.
   * @returns Array of image URLs
   * @throws ApiError
   */
  public static uploadImages(
    formData: FormData
  ): CancelablePromise<{ urls: string[] }> {    
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/products/upload-images",
      body: formData,
      mediaType: "multipart/form-data",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Read Product
   * Get product by ID.
   * @returns ProductPublic Successful Response
   * @throws ApiError
   */
  public static readProduct(data: TDataReadProduct): CancelablePromise<ProductPublic> {
    const { id } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/products/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Product
   * Update an product.
   * @returns ProductPublic Successful Response
   * @throws ApiError
   */
  public static updateProduct(
    data: TDataUpdateProduct,
  ): CancelablePromise<ProductPublic> {
    const { id, requestBody } = data
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/products/{id}",
      path: {
        id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Delete Product
   * Delete an product.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteProduct(data: TDataDeleteProduct): CancelablePromise<Message> {
    const { id } = data
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/products/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export type TDataReadSubscribers = {
  limit?: number
  skip?: number
}
export type TDataReadSubscriber = {
  id: string
}

export class SubscribersService {
  /**
   * Read Subscribers
   * Retrieve products.
   * @returns SubscribersPublic Successful Response
   * @throws ApiError
   */
  public static readSubscribers(
    data: TDataReadSubscribers = {},
  ): CancelablePromise<SubscribersPublic> {
    const { limit = 100, skip = 0 } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/subscribers/",
      query: {
        skip,
        limit,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Subscriber
   * Get product by ID.
   * @returns SubscriberPublic Successful Response
   * @throws ApiError
   */
  public static readSubscriber(data: TDataReadSubscriber): CancelablePromise<SubscriberPublic> {
    const { id } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/products/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}
