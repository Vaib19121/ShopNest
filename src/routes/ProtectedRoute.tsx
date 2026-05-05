import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/features/Auth'

/**
 * Wraps protected routes. Unauthenticated users are redirected to /auth/login,
 * and the original location is preserved in state so they can be sent back after login.
 */
export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
