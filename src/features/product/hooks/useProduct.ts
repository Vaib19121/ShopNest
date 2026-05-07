import { useQuery } from '@tanstack/react-query'
import { productService } from '../services/product.service'

export const productKeys = {
  all: ['product'] as const,
  detail: (id: number) => [...productKeys.all, 'detail', id] as const,
}

export const useProductDetail = (id: number) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productService.getProductDetail(id),
    enabled: !!id,
    select: (res) => res.data,
  })
}
