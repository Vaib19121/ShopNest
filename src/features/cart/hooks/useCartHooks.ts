import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { cartService } from '../services/cart.service'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '@/features/Auth/store/authStore'
import type { CartApiData, AddToCartPayload } from '../types/cart.types'

// ─── Query Keys ──────────────────────────────────────────────────────────────

export const cartKeys = {
  all: ['cart'] as const,
  detail: () => [...cartKeys.all, 'detail'] as const,
}

// ─── Local cart (Zustand) ─────────────────────────────────────────────────────

const FREE_SHIPPING_THRESHOLD = 500
const DELIVERY_CHARGE = 49

export const useCart = () => {
  const items = useCartStore((s) => s.items)
  const addItem = useCartStore((s) => s.addItem)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const clearCart = useCartStore((s) => s.clearCart)

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const totalDiscount = items.reduce((sum, i) => {
    if (i.originalPrice) return sum + (i.originalPrice - i.price) * i.quantity
    return sum
  }, 0)
  const deliveryCharge = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : DELIVERY_CHARGE
  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD
  const total = subtotal + deliveryCharge

  return { items, totalItems, subtotal, totalDiscount, deliveryCharge, freeShipping, total, addItem, removeItem, updateQuantity, clearCart }
}

// ─── GET cart ─────────────────────────────────────────────────────────────────

export const useCartQuery = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  return useQuery<CartApiData, Error>({
    queryKey: cartKeys.detail(),
    queryFn: () => cartService.getCart().then((res) => res.data),
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 2,
  })
}

// ─── POST add to cart ─────────────────────────────────────────────────────────

export const useAddToCart = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: AddToCartPayload) => cartService.addToCart(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.detail() })
    },
  })
}

// ─── PUT update cart item ─────────────────────────────────────────────────────

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ cartItemId, quantity }: { cartItemId: number; quantity: number }) =>
      cartService.updateCartItem(cartItemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.detail() })
    },
  })
}

// ─── DELETE remove from cart ──────────────────────────────────────────────────

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (cartItemId: number) => cartService.removeFromCart(cartItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.detail() })
    },
  })
}

// ─── DELETE clear entire cart ─────────────────────────────────────────────────

export const useClearCart = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => cartService.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.detail() })
    },
  })
}
