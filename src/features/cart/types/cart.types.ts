export interface CartItem {
  id: number
  cartItemId: number | null  // API cart item ID, used for DELETE /cart/items/:id
  name: string
  brand: string | null
  price: number
  originalPrice: number | null
  discountPercentage: number | null
  image: string
  color: string | null
  size: string | null
  quantity: number
  inStock: boolean
}

// ── API response types ────────────────────────────────────────────────────────

export interface CartApiItem {
  id: number
  productId: number
  productName: string
  productImage: string
  price: number
  quantity: number
  subtotal: number
}

export interface CartApiData {
  id: number
  userId: number
  items: CartApiItem[]
  totalPrice: number
  totalItems: number
}

export interface CartApiResponse {
  success: boolean
  message: string
  data: CartApiData
  timestamp: string
}

export interface AddToCartPayload {
  productId: number
  quantity: number
}
