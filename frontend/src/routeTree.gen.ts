/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as MainlayoutImport } from './routes/_main_layout'
import { Route as LayoutImport } from './routes/_layout'
import { Route as AuthlayoutImport } from './routes/_auth_layout'
import { Route as MainlayoutIndexImport } from './routes/_main_layout/index'
import { Route as MainlayoutThankYouImport } from './routes/_main_layout/thank-you'
import { Route as MainlayoutContactUsImport } from './routes/_main_layout/contact-us'
import { Route as MainlayoutCheckoutImport } from './routes/_main_layout/checkout'
import { Route as AuthlayoutSignupImport } from './routes/_auth_layout/signup'
import { Route as AuthlayoutResetPasswordImport } from './routes/_auth_layout/reset-password'
import { Route as AuthlayoutRecoverPasswordImport } from './routes/_auth_layout/recover-password'
import { Route as AuthlayoutLoginImport } from './routes/_auth_layout/login'
import { Route as LayoutAdminIndexImport } from './routes/_layout/admin/index'
import { Route as MainlayoutProjectsIndexImport } from './routes/_main_layout/projects/$index'
import { Route as MainlayoutProductsCategoryImport } from './routes/_main_layout/products/$category'
import { Route as LayoutAdminUsersImport } from './routes/_layout/admin/users'
import { Route as LayoutAdminSubscribersImport } from './routes/_layout/admin/subscribers'
import { Route as LayoutAdminSettingsImport } from './routes/_layout/admin/settings'
import { Route as LayoutAdminProductsImport } from './routes/_layout/admin/products'

// Create/Update Routes

const MainlayoutRoute = MainlayoutImport.update({
  id: '/_main_layout',
  getParentRoute: () => rootRoute,
} as any)

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const AuthlayoutRoute = AuthlayoutImport.update({
  id: '/_auth_layout',
  getParentRoute: () => rootRoute,
} as any)

const MainlayoutIndexRoute = MainlayoutIndexImport.update({
  path: '/',
  getParentRoute: () => MainlayoutRoute,
} as any)

const MainlayoutThankYouRoute = MainlayoutThankYouImport.update({
  path: '/thank-you',
  getParentRoute: () => MainlayoutRoute,
} as any)

const MainlayoutContactUsRoute = MainlayoutContactUsImport.update({
  path: '/contact-us',
  getParentRoute: () => MainlayoutRoute,
} as any)

const MainlayoutCheckoutRoute = MainlayoutCheckoutImport.update({
  path: '/checkout',
  getParentRoute: () => MainlayoutRoute,
} as any)

const AuthlayoutSignupRoute = AuthlayoutSignupImport.update({
  path: '/signup',
  getParentRoute: () => AuthlayoutRoute,
} as any)

const AuthlayoutResetPasswordRoute = AuthlayoutResetPasswordImport.update({
  path: '/reset-password',
  getParentRoute: () => AuthlayoutRoute,
} as any)

const AuthlayoutRecoverPasswordRoute = AuthlayoutRecoverPasswordImport.update({
  path: '/recover-password',
  getParentRoute: () => AuthlayoutRoute,
} as any)

const AuthlayoutLoginRoute = AuthlayoutLoginImport.update({
  path: '/login',
  getParentRoute: () => AuthlayoutRoute,
} as any)

const LayoutAdminIndexRoute = LayoutAdminIndexImport.update({
  path: '/admin/',
  getParentRoute: () => LayoutRoute,
} as any)

const MainlayoutProjectsIndexRoute = MainlayoutProjectsIndexImport.update({
  path: '/projects/$index',
  getParentRoute: () => MainlayoutRoute,
} as any)

const MainlayoutProductsCategoryRoute = MainlayoutProductsCategoryImport.update(
  {
    path: '/products/$category',
    getParentRoute: () => MainlayoutRoute,
  } as any,
)

const LayoutAdminUsersRoute = LayoutAdminUsersImport.update({
  path: '/admin/users',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutAdminSubscribersRoute = LayoutAdminSubscribersImport.update({
  path: '/admin/subscribers',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutAdminSettingsRoute = LayoutAdminSettingsImport.update({
  path: '/admin/settings',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutAdminProductsRoute = LayoutAdminProductsImport.update({
  path: '/admin/products',
  getParentRoute: () => LayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth_layout': {
      preLoaderRoute: typeof AuthlayoutImport
      parentRoute: typeof rootRoute
    }
    '/_layout': {
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/_main_layout': {
      preLoaderRoute: typeof MainlayoutImport
      parentRoute: typeof rootRoute
    }
    '/_auth_layout/login': {
      preLoaderRoute: typeof AuthlayoutLoginImport
      parentRoute: typeof AuthlayoutImport
    }
    '/_auth_layout/recover-password': {
      preLoaderRoute: typeof AuthlayoutRecoverPasswordImport
      parentRoute: typeof AuthlayoutImport
    }
    '/_auth_layout/reset-password': {
      preLoaderRoute: typeof AuthlayoutResetPasswordImport
      parentRoute: typeof AuthlayoutImport
    }
    '/_auth_layout/signup': {
      preLoaderRoute: typeof AuthlayoutSignupImport
      parentRoute: typeof AuthlayoutImport
    }
    '/_main_layout/checkout': {
      preLoaderRoute: typeof MainlayoutCheckoutImport
      parentRoute: typeof MainlayoutImport
    }
    '/_main_layout/contact-us': {
      preLoaderRoute: typeof MainlayoutContactUsImport
      parentRoute: typeof MainlayoutImport
    }
    '/_main_layout/thank-you': {
      preLoaderRoute: typeof MainlayoutThankYouImport
      parentRoute: typeof MainlayoutImport
    }
    '/_main_layout/': {
      preLoaderRoute: typeof MainlayoutIndexImport
      parentRoute: typeof MainlayoutImport
    }
    '/_layout/admin/products': {
      preLoaderRoute: typeof LayoutAdminProductsImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/admin/settings': {
      preLoaderRoute: typeof LayoutAdminSettingsImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/admin/subscribers': {
      preLoaderRoute: typeof LayoutAdminSubscribersImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/admin/users': {
      preLoaderRoute: typeof LayoutAdminUsersImport
      parentRoute: typeof LayoutImport
    }
    '/_main_layout/products/$category': {
      preLoaderRoute: typeof MainlayoutProductsCategoryImport
      parentRoute: typeof MainlayoutImport
    }
    '/_main_layout/projects/$index': {
      preLoaderRoute: typeof MainlayoutProjectsIndexImport
      parentRoute: typeof MainlayoutImport
    }
    '/_layout/admin/': {
      preLoaderRoute: typeof LayoutAdminIndexImport
      parentRoute: typeof LayoutImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  AuthlayoutRoute.addChildren([
    AuthlayoutLoginRoute,
    AuthlayoutRecoverPasswordRoute,
    AuthlayoutResetPasswordRoute,
    AuthlayoutSignupRoute,
  ]),
  LayoutRoute.addChildren([
    LayoutAdminProductsRoute,
    LayoutAdminSettingsRoute,
    LayoutAdminSubscribersRoute,
    LayoutAdminUsersRoute,
    LayoutAdminIndexRoute,
  ]),
  MainlayoutRoute.addChildren([
    MainlayoutCheckoutRoute,
    MainlayoutContactUsRoute,
    MainlayoutThankYouRoute,
    MainlayoutIndexRoute,
    MainlayoutProductsCategoryRoute,
    MainlayoutProjectsIndexRoute,
  ]),
])

/* prettier-ignore-end */
