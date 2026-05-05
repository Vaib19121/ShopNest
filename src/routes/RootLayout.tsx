import { Outlet, useLocation } from 'react-router-dom'
import { ErrorBoundary } from '@/components/ErrorBoundary'

/**
 * Top-level layout that catches render errors from any child route.
 * Uses resetKey (not `key`) so the error state clears on navigation
 * without unmounting the entire tree and triggering lazy-load spinners.
 */
export default function RootLayout() {
  const { pathname } = useLocation()
  return (
    <ErrorBoundary resetKey={pathname}>
      <Outlet />
    </ErrorBoundary>
  )
}
