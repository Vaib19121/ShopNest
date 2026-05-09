import { api } from '@/api/interceptor'
import ENDPOINTS from '@/api/endpoints'
import type { OrdersApiResponse, OrderDetailApiResponse, OrdersParams } from '../types/orders.types'

export const ordersService = {
  getOrders: async (params: OrdersParams = {}): Promise<OrdersApiResponse> => {
    const response = await api.get<OrdersApiResponse>(ENDPOINTS.ORDERS.GET_ORDERS, {
      params: {
        page: params.page ?? 0,
        size: params.size ?? 10,
        sortBy: params.sortBy ?? 'createdDate',
        sortDir: params.sortDir ?? 'DESC',
      },
    })
    return response.data
  },

  getOrderById: async (id: number): Promise<OrderDetailApiResponse> => {
    const response = await api.get<OrderDetailApiResponse>(ENDPOINTS.ORDERS.GET_ORDER_DETAIL(id))
    return response.data
  },
}
