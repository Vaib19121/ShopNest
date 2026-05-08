import { useQuery } from '@tanstack/react-query'
import { catalogService } from '../services/catalog.service'
import type { Product, SortOption, FilterState } from '../types/product.types'
import type { ProductsPage } from '../types/catalogApi.types'
import { PRICE_MIN, PRICE_MAX } from '../data/mockProducts'

export const catalogKeys = {
  all: ['catalog'] as const,
  products: (page: number, sortBy: string, sortDir: string) =>
    [...catalogKeys.all, 'products', { page, sortBy, sortDir }] as const,
  filtered: (filters: FilterState, page: number, sortBy: string, sortDir: string) =>
    [...catalogKeys.all, 'filtered', { filters, page, sortBy, sortDir }] as const,
    categories: () => [...catalogKeys.all, 'categories'] as const,
  search: (query: string, page: number, size: number) =>
    [...catalogKeys.all, 'search', { query, page, size }] as const,
}

const SORT_MAP: Record<SortOption, { sortBy: string; sortDir: 'ASC' | 'DESC' }> = {
  newest: { sortBy: 'id', sortDir: 'DESC' },
  price_asc: { sortBy: 'price', sortDir: 'ASC' },
  price_desc: { sortBy: 'price', sortDir: 'DESC' },
  best_rated: { sortBy: 'rating', sortDir: 'DESC' },
}

interface MappedProductsPage extends Omit<ProductsPage, 'content'> {
  content: Product[]
}

const selectMapped = (pageData: ProductsPage): MappedProductsPage => ({
  ...pageData,
  content: pageData.content.map((item) => ({
    id: String(item.id),
    name: item.name,
    brand: item.brand ?? '',
    category: item.category ?? '',
    price: item.price,
    originalPrice: item.originalPrice ?? item.price,
    discountPercent: item.discountPercentage ?? 0,
    rating: item.rating,
    reviewCount: item.reviewCount,
    image: item.images?.[0] ?? '',
    colors: [],
    inStock: item.stockQuantity > 0,
    isNew: item.isNew,
  })),
})

export const useProducts = (page: number, sort: SortOption, size = 10) => {
  const { sortBy, sortDir } = SORT_MAP[sort]
  return useQuery<ProductsPage, Error, MappedProductsPage>({
    queryKey: catalogKeys.products(page, sortBy, sortDir),
    queryFn: () =>
      catalogService.getProducts({ page, size, sortBy, sortDir }).then((res) => res.data),
    select: selectMapped,
  })
}

export const useFilteredProducts = (
  filters: FilterState,
  page: number,
  sort: SortOption,
  size = 10,
) => {
  const { sortBy, sortDir } = SORT_MAP[sort]

  return useQuery<ProductsPage, Error, MappedProductsPage>({
    queryKey: catalogKeys.filtered(filters, page, sortBy, sortDir),
    queryFn: () =>
      catalogService.filterProducts({
        categories: filters.categories.length ? filters.categories : undefined,
        brands: filters.brands.length ? filters.brands : undefined,
        colors: filters.colors.length ? filters.colors : undefined,
        sizes: filters.sizes.length ? filters.sizes : undefined,
        priceMin: filters.priceRange[0] !== PRICE_MIN ? filters.priceRange[0] : undefined,
        priceMax: filters.priceRange[1] !== PRICE_MAX ? filters.priceRange[1] : undefined,
        inStock: filters.inStockOnly || undefined,
        minRating: filters.rating ?? undefined,
        searchQuery: filters.searchQuery.trim() || undefined,
        page,
        size,
        sortBy,
        sortDir,
      }).then((res) => res.data),
    select: selectMapped,
  })
}

export const useCategories = () => {
  return useQuery({
    queryKey: catalogKeys.categories(),
    queryFn: () => catalogService.getCategories().then((res) => res.data),
    staleTime: 10 * 60 * 1000, // 10 min — categories rarely change
  })
}

export const useSearchProducts = (query: string, page: number, size = 10) => {
  return useQuery({
    queryKey: catalogKeys.search(query, page, size),
    queryFn: () => catalogService.searchProducts(query.trim(), page, size),
    enabled: query.trim().length > 0,
    select: (res) => ({
      content: res.data.content.map((item): Product => ({
        id: String(item.id),
        name: item.name,
        brand: item.brand ?? '',
        category: item.categoryName,
        price: item.price,
        originalPrice: item.originalPrice ?? item.price,
        discountPercent: item.discountPercentage ?? 0,
        rating: 0,
        reviewCount: 0,
        image: item.images?.[0] ?? '',
        colors: [],
        inStock: item.stockQuantity > 0,
        isNew: item.isNew,
      })),
      totalPages: res.data.totalPages,
      totalElements: res.data.totalElements,
      currentPage: res.data.number,
      isLast: res.data.last,
      isFirst: res.data.first,
    }),
  })
}
