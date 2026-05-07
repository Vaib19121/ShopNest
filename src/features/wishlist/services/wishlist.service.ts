import { api } from '@/api/interceptor'
import ENDPOINTS from '@/api/endpoints'
import type { WishlistApiResponse, AddToWishlistPayload } from '../types/wishlist.types'

export const wishlistService = {
  getWishlist: async (): Promise<WishlistApiResponse> => {
    const response = await api.get<WishlistApiResponse>(ENDPOINTS.WISHLIST.GET_WISHLIST)
    return response.data
  },

  addToWishlist: async (payload: AddToWishlistPayload): Promise<WishlistApiResponse> => {
    const response = await api.post<WishlistApiResponse>(ENDPOINTS.WISHLIST.ADD_TO_WISHLIST, payload)
    return response.data
  },

  removeFromWishlist: async (wishlistItemId: number): Promise<void> => {
    await api.delete(ENDPOINTS.WISHLIST.REMOVE_FROM_WISHLIST_BY_ID(wishlistItemId))
  },

  clearWishlist: async (): Promise<void> => {
    await api.delete(ENDPOINTS.WISHLIST.CLEAR_WISHLIST)
  },
}
