import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { wishlistService } from '../services/wishlist.service'
import { useAuthStore } from '@/features/Auth/store/authStore'
import type { WishlistApiData, AddToWishlistPayload } from '../types/wishlist.types'

// ─── Query Keys ──────────────────────────────────────────────────────────────

export const wishlistKeys = {
  all: ['wishlist'] as const,
  detail: () => [...wishlistKeys.all, 'detail'] as const,
}

// ─── GET wishlist ─────────────────────────────────────────────────────────────

export const useWishlistQuery = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  return useQuery<WishlistApiData, Error>({
    queryKey: wishlistKeys.detail(),
    queryFn: () => wishlistService.getWishlist().then((res) => res.data),
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 2,
  })
}

// ─── POST add to wishlist ─────────────────────────────────────────────────────

export const useAddToWishlist = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: AddToWishlistPayload) => wishlistService.addToWishlist(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wishlistKeys.detail() })
    },
  })
}

// ─── DELETE remove from wishlist ──────────────────────────────────────────────

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (wishlistItemId: number) => wishlistService.removeFromWishlist(wishlistItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wishlistKeys.detail() })
    },
  })
}

// ─── DELETE clear wishlist ────────────────────────────────────────────────────

export const useClearWishlist = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => wishlistService.clearWishlist(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wishlistKeys.detail() })
    },
  })
}
