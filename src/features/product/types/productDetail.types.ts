export interface ProductColor {
  name: string
  hex: string
  available: boolean
}

export interface ProductSeller {
  name: string
  rating: number
  id: string
}

export interface ProductOffer {
  title: string
  description: string
}

export interface ProductSpecification {
  label: string
  value: string
}

export interface ProductReview {
  id: string
  name: string
  avatar: string
  rating: number
  date: string
  comment: string
  helpful: number
}

export interface RatingDistribution {
  stars: number
  percentage: number
}

export interface ProductQna {
  id: string
  question: string
  answer: string
  askedBy: string
  answeredDate: string
}

export interface ProductDetail {
  id: number
  brand: string | null
  title: string
  rating: number
  reviewCount: number
  originalPrice: number | null
  price: number
  discountPercentage: number | null
  description: string
  images: string[]
  colors: ProductColor[]
  sizes: string[]
  inStock: boolean
  isNew: boolean
  estimatedDelivery: string | null
  freeShipping: boolean
  seller: ProductSeller | null
  offers: ProductOffer[]
  specifications: ProductSpecification[]
  reviews: ProductReview[]
  ratingDistribution: RatingDistribution[]
  qna: ProductQna[]
}

export interface ProductDetailResponse {
  data: ProductDetail
  message: string
  success: boolean
  timestamp: string
}
