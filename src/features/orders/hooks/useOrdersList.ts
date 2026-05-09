import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ordersService } from '../services/orders.service'
import type { ApiOrderStatus } from '../types/orders.types'
import { orderKeys } from './useOrders'

export type StatusFilter = ApiOrderStatus | 'ALL'

export function useOrdersList(pageSize = 10) {
  const [page, setPage] = useState(0)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL')

  const query = useQuery({
    queryKey: [...orderKeys.list(page, pageSize), statusFilter],
    queryFn: () => ordersService.getOrders({ page, size: pageSize }),
  })

  const allOrders = query.data?.data?.content ?? []
  const orders =
    statusFilter === 'ALL'
      ? allOrders
      : allOrders.filter((o) => o.status === statusFilter)

  const totalPages = query.data?.data?.totalPages

  return {
    orders,
    totalPages,
    page,
    setPage,
    statusFilter,
    setStatusFilter,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as Error | null,
  }
}
