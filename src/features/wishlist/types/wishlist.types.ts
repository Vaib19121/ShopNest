export interface WishlistApiItem {
  id: number
  productId: number
  productName: string
  brand: string
  price: number
  originalPrice: number
  discountPercentage: number
  imageUrl: string
  inStock: boolean
  addedDate: string
}

export interface WishlistApiData {
  id: number
  totalItems: number
  items: WishlistApiItem[]
  createdDate: string
  lastModifiedDate: string
}

export interface WishlistApiResponse {
  success: boolean
  message: string
  data: WishlistApiData
  timestamp: string
}

export interface AddToWishlistPayload {
  productId: number
}
