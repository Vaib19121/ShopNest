import { api } from '@/api/interceptor'
import ENDPOINTS from '@/api/endpoints'
import type { ProductDetailResponse } from '../types/productDetail.types'

export const productService = {
  getProductDetail: async (id: number): Promise<ProductDetailResponse> => {
    const response = await api.get<ProductDetailResponse>(ENDPOINTS.PRODUCTS.GET_PRODUCT_DETAIL(id))
    return response.data
},
}
