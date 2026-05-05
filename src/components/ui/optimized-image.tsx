import { useState } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  containerClassName?: string
  /** Show a shimmer skeleton while the image is loading. Defaults to true. */
  skeleton?: boolean
}

/**
 * OptimizedImage
 *
 * - Native lazy loading + async decoding
 * - Shimmer skeleton placeholder while loading
 * - Smooth fade-in on load
 * - Error fallback state
 * - Forwards all standard img attributes (sizes, srcSet, style, etc.)
 */
export function OptimizedImage({
  src,
  alt,
  className,
  containerClassName,
  skeleton = true,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      {/* Shimmer skeleton */}
      {skeleton && !isLoaded && !hasError && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}

      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            'transition-opacity duration-500 ease-in-out',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className,
          )}
          {...props}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <p className="text-sm text-muted-foreground">Image unavailable</p>
        </div>
      )}
    </div>
  )
}
