export interface ProductListItem {
  id: number
  name: string
  brand: string | null
  category: string | null
  price: number
  originalPrice: number | null
  discountPercentage: number | null
  rating: number
  reviewCount: number
  images: string[]
  stockQuantity: number
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

export interface CategoryItem {
  id: number
  name: string
  description: string
  createdAt: string
  productCount: number
}

export interface CategoriesResponse {
  data: CategoryItem[]
  message: string
  success: boolean
  timestamp: string
}

export interface FilterProductsRequest {
  categories?: string[]
  brands?: string[]
  colors?: string[]
  priceMin?: number
  priceMax?: number
  inStock?: boolean
  isNew?: boolean
  freeShipping?: boolean
  sizes?: string[]
  minRating?: number
  searchQuery?: string
  page: number
  size: number
  sortBy: string
  sortDir: 'ASC' | 'DESC'
}

export interface SearchProductItem {
  id: number
  name: string
  brand: string | null
  description: string
  price: number
  originalPrice: number | null
  discountPercentage: number | null
  stockQuantity: number
  images: string[]
  active: boolean
  isNew: boolean
  categoryId: number
  categoryName: string
  createdAt: string
  updatedAt: string
}

export interface SearchProductsPage {
  content: SearchProductItem[]
  totalPages: number
  totalElements: number
  number: number
  size: number
  last: boolean
  first: boolean
  empty: boolean
  numberOfElements: number
}

export interface SearchProductsResponse {
  data: SearchProductsPage
  message: string
  success: boolean
  timestamp: string
}
