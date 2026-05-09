import { useQuery } from '@tanstack/react-query'
import { ordersService } from '../services/orders.service'
import type { OrderApiItem } from '../types/orders.types'

export const orderKeys = {
  all: ['orders'] as const,
  list: (page: number, size: number) =>
    [...orderKeys.all, 'list', { page, size }] as const,
}

export function useOrders(page = 0, size = 4) {
  return useQuery<OrderApiItem[], Error>({
    queryKey: orderKeys.list(page, size),
    queryFn: () =>
      ordersService.getOrders({ page, size }).then((res) => res.data.content),
  })
}
