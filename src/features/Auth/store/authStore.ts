import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { saveTokens, clearTokens } from '@/api/interceptor'

interface User {
  email: string
  role: string
  first_name?: string
  last_name?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  logout: () => void
  setUser: (user: User, token?: { accessToken?: string; refreshToken?: string }) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      logout: () => {
        set({ user: null, isAuthenticated: false })
        clearTokens()
      },
      setUser: (user: User, token?: { accessToken?: string; refreshToken?: string }) => {
        set({ user, isAuthenticated: true })
        if (token?.accessToken) {
          saveTokens(token.accessToken, token.refreshToken)
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
