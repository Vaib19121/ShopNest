export interface ProductListItem {
  id: number
  title: string
  brand: string | null
  category: string | null
  price: number
  originalPrice: number | null
  discountPercentage: number | null
  rating: number
  reviewCount: number
  images: string[]
  inStock: boolean
  isNew: boolean
}

export interface ProductsPage {
  content: ProductListItem[]
  totalPages: number
  totalElements: number
  pageNumber: number
  pageSize: number
  last: boolean
  first: boolean
}

export interface ProductsResponse {
  data: ProductsPage
  message: string
  success: boolean
  timestamp: string
}
