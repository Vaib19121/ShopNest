import { useQuery } from '@tanstack/react-query'
import { catalogService } from '../services/catalog.service'
import type { Product } from '../types/product.types'
import type { SortOption } from '../types/product.types'
import type { ProductsPage } from '../types/catalogApi.types'

export const catalogKeys = {
  all: ['catalog'] as const,
  products: (page: number, sortBy: string, sortDir: string) =>
    [...catalogKeys.all, 'products', { page, sortBy, sortDir }] as const,
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

export const useProducts = (page: number, sort: SortOption, size = 10) => {
  const { sortBy, sortDir } = SORT_MAP[sort]

  return useQuery<ProductsPage, Error, MappedProductsPage>({
    queryKey: catalogKeys.products(page, sortBy, sortDir),
    queryFn: () =>
      catalogService.getProducts({ page, size, sortBy, sortDir }).then((res) => res.data),
    select: (pageData): MappedProductsPage => ({
      ...pageData,
      content: pageData.content.map((item) => ({
        id: String(item.id),
        title: item.title,
        brand: item.brand ?? '',
        category: item.category ?? '',
        price: item.price,
        originalPrice: item.originalPrice ?? item.price,
        discountPercent: item.discountPercentage ?? 0,
        rating: item.rating,
        reviewCount: item.reviewCount,
        image: item.images?.[0] ?? '',
        colors: [],
        inStock: item.inStock,
        isNew: item.isNew,
      })),
    }),
  })
}
