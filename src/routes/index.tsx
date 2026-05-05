import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import ProtectedRoute from './ProtectedRoute'
import RootLayout from './RootLayout'
import MainLayout from './MainLayout'

// ────────────────────────────────────────────────────────────────────────────────
// Lazy-loaded Pages
// ────────────────────────────────────────────────────────────────────────────────

// Auth pages
const AuthLayout = lazy(() => import('@/features/Auth/layout/AuthLayout'))
const LoginPage = lazy(() => import('@/features/Auth/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/features/Auth/pages/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('@/features/Auth/pages/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('@/features/Auth/pages/ResetPasswordPage'))

// Public pages
const LandingPage = lazy(() => import('@/features/landingpage').then((m) => ({ default: m.LandingPage })))
const ProductsPage = lazy(() => import('@/features/catalog').then((m) => ({ default: m.ProductsPage })))
const ProductDetailPage = lazy(() => import('@/features/product/pages/ProductDetailPage'))

// Protected pages
const CartPage = lazy(() => import('@/features/cart/pages/CartPage'))
const CheckoutPage = lazy(() => import('@/features/checkout/pages/CheckoutPage'))
const OrderConfirmationPage = lazy(() => import('@/features/checkout/pages/OrderConfirmationPage'))
const OrdersPage = lazy(() => import('@/features/orders/pages/OrdersPage'))
const OrderDetailPage = lazy(() => import('@/features/orders/pages/OrderDetailPage'))
const WishlistPage = lazy(() => import('@/features/wishlist/pages/WishlistPage'))
const AccountPage = lazy(() => import('@/features/account/pages/AccountPage'))
const ProfilePage = lazy(() => import('@/features/account/pages/ProfilePage'))

// ────────────────────────────────────────────────────────────────────────────────
// Auth Loading Fallback (used only for the auth layout group)
// ────────────────────────────────────────────────────────────────────────────────

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}

// ── 404 ───────────────────────────────────────────────────────────────────────
function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <p className="text-muted-foreground text-lg">Page not found</p>
      </div>
    </div>
  )
}

export const router = createBrowserRouter([
  {
    // RootLayout wraps every route — ErrorBoundary resets on each navigation
    element: <RootLayout />,
    children: [
      // ── Auth routes (no navbar) ────────────────────────────────────────────
      {
        element: (
          <Suspense fallback={<PageLoader />}>
            <AuthLayout />
          </Suspense>
        ),
        children: [
          {
            path: '/auth/login',
            element: <LoginPage />,
          },
          {
            path: '/auth/register',
            element: <RegisterPage />,
          },
          {
            path: '/auth/forgot-password',
            element: (
              <ForgotPasswordPage />
            ),
          },
          {
            path: '/auth/reset-password',
            element: <ResetPasswordPage />,
          },
        ],
      },

      // ── All other routes get the common Navbar via MainLayout ──────────────
      {
        element: <MainLayout />,
        children: [
          // Public
          {
            path: '/',
            element: <LandingPage />,
          },
          {
            path: '/products',
            element: <ProductsPage />,
          },
          {
            path: '/products/:id',
            element: <ProductDetailPage />,
          },
          { path: '*', element: <NotFoundPage /> },

          // Protected
          {
            element: <ProtectedRoute />,
            children: [
              { path: '/cart', element: <CartPage /> },
              { path: '/checkout', element: <CheckoutPage /> },
              { path: '/checkout/confirmation', element: <OrderConfirmationPage /> },
              { path: '/orders', element: <OrdersPage /> },
              { path: '/orders/:id', element: <OrderDetailPage /> },
              { path: '/wishlist', element: <WishlistPage /> },
              { path: '/account', element: <AccountPage /> },
              { path: '/account/profile', element: <ProfilePage /> },
            ],
          },
        ],
      },
    ],
  },
])
