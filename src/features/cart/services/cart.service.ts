import { api } from '@/api/interceptor'
import ENDPOINTS from '@/api/endpoints'
import type { CartApiResponse, AddToCartPayload } from '../types/cart.types'

export const cartService = {
  getCart: async (): Promise<CartApiResponse> => {
    const response = await api.get<CartApiResponse>(ENDPOINTS.CART.GET_CART)
    return response.data
  },

  addToCart: async (payload: AddToCartPayload): Promise<CartApiResponse> => {
    const response = await api.post<CartApiResponse>(ENDPOINTS.CART.ADD_TO_CART, payload)
    return response.data
  },

  removeFromCart: async (cartItemId: number): Promise<void> => {
    await api.delete(ENDPOINTS.CART.REMOVE_FROM_CART_BY_ID(cartItemId))
  },

  updateCartItem: async (cartItemId: number, quantity: number): Promise<CartApiResponse> => {
    const response = await api.put<CartApiResponse>(ENDPOINTS.CART.UPDATE_CART_ITEM_BY_ID(cartItemId), { quantity })
    return response.data
  },

  clearCart: async (): Promise<void> => {
    await api.delete(ENDPOINTS.CART.CLEAR_CART)
  },
}
