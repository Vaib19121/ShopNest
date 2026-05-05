import { OptimizedImage } from '@/components/ui/optimized-image'
import authImage from '@/assets/images/login.webp'

/**
 * Shared right-panel for all auth pages.
 * Uses OptimizedImage for lazy loading + shimmer skeleton.
 */
export function AuthImage() {
  return (
    <OptimizedImage
      src={authImage}
      alt="ShopNest — discover your perfect style"
      containerClassName="relative hidden lg:block"
      className="absolute inset-0 h-full w-full object-cover"
      skeleton
    />
  )
}
