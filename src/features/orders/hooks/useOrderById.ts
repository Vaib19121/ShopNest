import { useQuery } from '@tanstack/react-query'
import { ordersService } from '../services/orders.service'
import type { OrderApiItem } from '../types/orders.types'
import { orderKeys } from './useOrders'

export const orderDetailKeys = {
  detail: (id: number) => [...orderKeys.all, 'detail', id] as const,
}

export function useOrderById(id: number | null) {
  return useQuery<OrderApiItem | null, Error>({
    queryKey: orderDetailKeys.detail(id ?? 0),
    queryFn: async () => {
      if (!id) return null
      const res = await ordersService.getOrderById(id)
      return res.data
    },
    enabled: id !== null && id > 0,
  })
}
