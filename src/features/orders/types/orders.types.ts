// ─── API Status (matches server enum) ────────────────────────────────────────
export type ApiOrderStatus = 'PENDING' | 'DELIVERED' | 'IN_TRANSIT' | 'CANCELLED'

// ─── Single order item returned by the API ───────────────────────────────────
export interface OrderApiItem {
  id: number
  product: string
  image: string
  status: ApiOrderStatus
  price: number
  userId: number
  date: string // ISO-8601
}

// ─── Spring Page object (nested inside data) ─────────────────────────────────
export interface OrdersPage {
  content: OrderApiItem[]
  totalElements: number
  totalPages: number
  size: number
  number: number        // current page (0-based)
  numberOfElements: number
  first: boolean
  last: boolean
  empty: boolean
}

// ─── Top-level API response wrapper (list) ────────────────────────────────────
export interface OrdersApiResponse {
  success: boolean
  message: string
  data: OrdersPage
  timestamp: string
}

// ─── Top-level API response wrapper (single order) ────────────────────────────
export interface OrderDetailApiResponse {
  success: boolean
  message: string
  data: OrderApiItem
  timestamp: string
}

// ─── Query params for the orders list endpoint ────────────────────────────────
export interface OrdersParams {
  page?: number
  size?: number
  sortBy?: string
  sortDir?: 'ASC' | 'DESC'
}
