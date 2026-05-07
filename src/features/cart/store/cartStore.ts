import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '../types/cart.types'

// Unique key per variant (product + color + size)
const itemKey = (id: number, color: string | null, size: string | null) =>
  `${id}__${color ?? ''}__${size ?? ''}`

interface CartState {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (id: number, color: string | null, size: string | null) => void
  updateQuantity: (id: number, color: string | null, size: string | null, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const key = itemKey(item.id, item.color, item.size)
        const existing = get().items.find(
          (i) => itemKey(i.id, i.color, i.size) === key
        )
        if (existing) {
          set({
            items: get().items.map((i) =>
              itemKey(i.id, i.color, i.size) === key
                ? { ...i, quantity: Math.min(i.quantity + (item.quantity ?? 1), 10) }
                : i
            ),
          })
        } else {
          set({ items: [...get().items, { ...item, quantity: item.quantity ?? 1 }] })
        }
      },

      removeItem: (id, color, size) => {
        const key = itemKey(id, color, size)
        set({ items: get().items.filter((i) => itemKey(i.id, i.color, i.size) !== key) })
      },

      updateQuantity: (id, color, size, quantity) => {
        const key = itemKey(id, color, size)
        set({
          items: get().items.map((i) =>
            itemKey(i.id, i.color, i.size) === key ? { ...i, quantity } : i
          ),
        })
      },

      clearCart: () => set({ items: [] }),
    }),
    { name: 'cart-storage' }
  )
)
