// ─── Request ──────────────────────────────────────────────────────────────────
export interface CreatePaymentIntentRequest {
  productId: number
  quantity: number
  description: string  // required by Stripe for Indian accounts
}

// ─── Shipping / billing details (required for Indian Stripe accounts) ──────────
export interface ShippingDetails {
  name: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string   // two-letter ISO code, e.g. 'IN'
}

// ─── Response ─────────────────────────────────────────────────────────────────
export interface PaymentIntentData {
  clientSecret: string
  paymentIntentId: string
  orderId: number
  amount: number     // in smallest currency unit (e.g. cents)
  currency: string
}

export interface CreatePaymentIntentResponse {
  success: boolean
  message: string
  data: PaymentIntentData
  timestamp: string
}
