import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ordersService } from '../services/orders.service'
import type { OrderApiItem } from '../types/orders.types'
import { orderKeys } from './useOrders'

export const orderDetailKeys = {
  detail: (id: number) => [...orderKeys.all, 'detail', id] as const,
}

export function useOrderById(id: number | null) {
  const queryClient = useQueryClient()

  return useQuery<OrderApiItem | null, Error>({
    queryKey: orderDetailKeys.detail(id ?? 0),
    queryFn: async () => {
      if (!id) return null
      const res = await ordersService.getOrderById(id)
      return res.data
    },
    enabled: id !== null && id > 0,
    staleTime: 2 * 60 * 1000, // treat as fresh for 2 min → no re-fetch on quick revisits
    placeholderData: () => {
      // Search every cached orders-list page for this order so the UI renders
      // immediately without showing the loading skeleton on re-visits.
      const allListEntries = queryClient.getQueriesData<OrderApiItem[]>({
        queryKey: orderKeys.all,
      })
      for (const [, data] of allListEntries) {
        if (!Array.isArray(data)) continue
        const found = data.find((o) => o.id === id)
        if (found) return found
      }
      return undefined
    },
  })
}
