export interface Product {
  id: string
  title: string
  brand: string
  category: string
  price: number
  originalPrice: number
  discountPercent: number
  rating: number
  reviewCount: number
  image: string
  colors: string[]
  inStock: boolean
  isNew: boolean
}

export type SortOption = 'price_asc' | 'price_desc' | 'newest' | 'best_rated'
export type ViewMode = 'grid' | 'list'

export interface FilterState {
  categories: string[]
  priceRange: [number, number]
  brands: string[]
  rating: number | null
  inStockOnly: boolean
  colors: string[]
}
