import { api } from '@/api/interceptor'
import ENDPOINTS from '@/api/endpoints'
import type { ProductsResponse, FilterProductsRequest, CategoriesResponse, SearchProductsResponse } from '../types/catalogApi.types'

export interface GetProductsParams {
  page: number
  size: number
  sortBy: string
  sortDir: 'ASC' | 'DESC'
}

export const catalogService = {
  getProducts: async (params: GetProductsParams): Promise<ProductsResponse> => {
    const response = await api.get<ProductsResponse>(ENDPOINTS.PRODUCTS.GET_PRODUCTS, { params })
    return response.data
  },

  filterProducts: async (body: FilterProductsRequest): Promise<ProductsResponse> => {
    const response = await api.post<ProductsResponse>(ENDPOINTS.PRODUCTS.FILTER_PRODUCTS, body)
    return response.data
  },

  getCategories: async (): Promise<CategoriesResponse> => {
    const response = await api.get<CategoriesResponse>(ENDPOINTS.CATEGORIES.GET_CATEGORIES)
    return response.data
  },

  searchProducts: async (q: string, page: number, size: number): Promise<SearchProductsResponse> => {
    const response = await api.get<SearchProductsResponse>(ENDPOINTS.PRODUCTS.SEARCH_PRODUCTS, {
      params: { q, page, size },
    })
    return response.data
  },
}
