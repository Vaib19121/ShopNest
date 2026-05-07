import { api } from '@/api/interceptor'
import ENDPOINTS from '@/api/endpoints'
import type { ProductsResponse } from '../types/catalogApi.types'

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
}
