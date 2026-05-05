import axios from 'axios'
import Cookies from 'js-cookie'

const ACCESS_TOKEN_KEY = 'access-token'
const REFRESH_TOKEN_KEY = 'refresh-token'

export function saveTokens(accessToken: string, refreshToken?: string) {
  Cookies.set(ACCESS_TOKEN_KEY, accessToken, { sameSite: 'strict' })
  if (refreshToken) {
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { sameSite: 'strict' })
  }
}

export function clearTokens() {
  Cookies.remove(ACCESS_TOKEN_KEY)
  Cookies.remove(REFRESH_TOKEN_KEY)
}

export function getAccessToken(): string | undefined {
  return Cookies.get(ACCESS_TOKEN_KEY)
}

/** Axios instance shared by all feature services */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json' },
})

// ── Request interceptor — attach JWT ────────────────────────────────────────
api.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ── Response interceptor — handle 401 / 500 globally ───────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearTokens()
      window.location.href = '/auth/login'
    }
    // Surface the server error message if available
    const message =
      error.response?.data?.message ?? error.response?.data?.detail ?? error.message
    return Promise.reject(new Error(message))
  },
)
