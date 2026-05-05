# E-Commerce React App — Architecture

## Overview

This project uses a **feature-based architecture** where code is organized by domain/business capability rather than by technical role. Each feature module is self-contained and owns its components, state, API calls, types, and validation logic.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | React + TypeScript |
| Build Tool | Vite |
| Package Manager | Bun |
| UI Components | shadcn/ui |
| Styling | Tailwind CSS |
| State Management | Zustand (per-feature stores) |
| API Client | Axios with interceptors |
| Form Validation | React Hook Form + Zod |
| Routing | React Router v6 |

---

## Directory Structure

```
src/
├── api/                    # Global API configuration
│   ├── client.ts           # Axios instance with auth interceptors
│   └── endpoints.ts        # Centralized endpoint constants
│
├── components/             # Shared, reusable UI components
│   ├── ui/                 # Primitive UI components (shadcn/ui)
│   ├── layout/             # App shell components
│   └── seo/                # Meta tag components
│
├── features/               # Domain feature modules (core)
│   ├── landingpage/
│   ├── auth/
│   ├── catalog/
│   ├── product/
│   ├── cart/
│   ├── checkout/
│   ├── orders/
│   ├── wishlist/
│   ├── account/
│   └── notifications/
│
├── hooks/                  # Global reusable hooks
├── lib/                    # Utility functions and constants
├── routes/                 # Route definitions and guards
├── App.tsx
└── main.tsx
```

---

## Feature Module Structure

Every feature follows a consistent internal structure:

```
features/<feature-name>/
├── components/     # UI components scoped to this feature
├── pages/          # Route-level page components
├── hooks/          # Feature-specific React hooks
├── services/       # API calls and data-fetching logic
├── store/          # Zustand store for local state
├── schema/         # Zod validation schemas
├── types/          # TypeScript type definitions
├── utils/          # Feature-specific helper functions
└── index.ts        # Public API — only export what other features need
```

The `index.ts` file acts as a **module boundary**. Other features import only through this file, never from internal paths.

---

## Feature Modules

### `landingpage/`
The public-facing landing page composed of Navbar, HeroSection, CategoriesSection, FeaturedProducts, Testimonials, NewsletterSection, and Footer.

Key exports: `LandingPage`

### `auth/`
Handles user authentication flows — login, registration, OAuth, and session management.

Key exports: `useAuth`, `authStore`, `ProtectedRoute`

### `catalog/`
Product listing with filtering, sorting, search, and category browsing.

Key exports: `Catalog`, `CategoryPage`, `useFilters`, `useProducts`

### `product/`
Product detail page with image gallery, variant selection, reviews, and related products.

Key exports: `ProductDetail`, `useProduct`, `useReviews`

### `cart/`
Shopping cart state and UI — drawer, item list, quantity controls, and add-to-cart actions.

Key exports: `CartDrawer`, `AddToCartButton`, `useCart`, `cartStore`

### `checkout/`
Multi-step checkout covering address entry, shipping selection, promo codes, and payment.

Key exports: `Checkout`, `OrderConfirmation`, `useCheckout`, `usePayment`

### `orders/`
Order history list and order detail view with timeline tracking.

Key exports: `Orders`, `OrderDetail`, `useOrders`

### `wishlist/`
Save and manage products for later with a persistent wishlist.

Key exports: `Wishlist`, `WishlistButton`, `useWishlist`, `wishlistStore`

### `account/`
User profile management, saved addresses, and payment methods.

Key exports: `Account`, `Profile`, `useAccount`

### `notifications/`
Toast alerts and a notification center for system-wide messaging.

Key exports: `Toast`, `NotificationCenter`, `useNotifications`, `notificationStore`

---

## State Management

State is managed at the **feature level** using Zustand stores. There is no single global store.

```
Global state → shared across features     → notificationStore, authStore
Local state  → scoped to a single feature → cartStore, wishlistStore
Server state → managed via hooks + axios  → useProducts, useOrders
```

Each Zustand store lives in `features/<name>/store/` and is accessed only through the feature's public `index.ts` or its own hooks.

---

## API Layer

All HTTP communication goes through a single Axios client defined in `src/api/client.ts`.

- **Auth interceptor** — automatically attaches the JWT token to every request
- **Error interceptor** — handles 401 (redirect to login) and 500 (show toast) globally
- **Endpoint constants** — all URLs are defined in `src/api/endpoints.ts`, never hardcoded in service files

Each feature has its own `services/` folder containing functions that call this shared client.

---

## Routing

Routes are defined in `src/routes/index.tsx` using React Router v6.

```
/                      → LandingPage
/products/:id          → ProductDetail
/cart                  → CartDrawer (overlay)
/checkout              → Checkout
/checkout/confirmation → OrderConfirmation
/orders                → Orders
/orders/:id            → OrderDetail
/wishlist              → Wishlist
/account               → Account
  /account/profile     → Profile
/auth/login            → Login
/auth/register         → Register
/auth/forgot-password  → ForgotPassword
```

Routes under `/account`, `/orders`, `/checkout`, and `/wishlist` are wrapped in `ProtectedRoute`, which redirects unauthenticated users to `/auth/login`.

---

## Import Conventions

### Absolute imports (cross-feature or shared)
```typescript
import { Button } from '@/components/ui/button';
import apiClient from '@/api/client';
import { useAuth } from '@/features/auth';
```

### Relative imports (within the same feature)
```typescript
import useCartStore from '../store/cartStore';
import CartItem from '../components/CartItem';
```

### Feature public API
Each feature exposes only what other parts of the app need via `index.ts`:

```typescript
// features/cart/index.ts
export { default as CartDrawer } from './components/CartDrawer';
export { default as AddToCartButton } from './components/AddToCartButton';
export { default as useCart } from './hooks/useCart';
export type { CartItem, CartState } from './types/cart.types';
```

Internal files (stores, services, schemas) are **not exported** from `index.ts` unless needed externally.

---

## Shared Components vs Feature Components

| Location | Use when |
|---|---|
| `src/components/ui/` | Primitive UI elements (Button, Input, Modal, Badge) used everywhere |
| `src/components/layout/` | App shell (Header, Footer, Sidebar) |
| `features/<name>/components/` | Components that only make sense within that feature |

If a component in a feature becomes needed by two or more other features, it should be promoted to `src/components/`.

---

## Validation

Form validation uses **React Hook Form** for form state and **Zod** for schema definition. Schemas live in `features/<name>/schema/` and are reused for both client-side validation and type inference.

```typescript
// features/checkout/schema/addressSchema.ts
import { z } from 'zod';

export const addressSchema = z.object({
  fullName: z.string().min(2),
  line1: z.string().min(5),
  city: z.string().min(2),
  pincode: z.string().regex(/^\d{6}$/),
  phone: z.string().regex(/^\d{10}$/),
});

export type AddressFormData = z.infer<typeof addressSchema>;
```

---

## Key Architectural Decisions

**Feature isolation** — features don't import from each other's internal files. All cross-feature communication goes through `index.ts` public APIs or shared state.

**No prop drilling** — shared state (auth, cart, notifications) is accessed directly from Zustand stores inside any component that needs it.

**Server state is not in Zustand** — data fetched from the API lives in custom hooks using Axios directly. Zustand is reserved for client-side state (cart contents, UI toggles, session data).

**Flat over nested** — the feature-based structure keeps nesting shallow. A developer looking for the checkout payment form goes to `features/checkout/components/PaymentForm.tsx` — no deeper traversal needed.
