import { Heart, ShoppingCart, Star, Eye } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { OptimizedImage } from '@/components/ui/optimized-image'
import type { Product } from '../types/product.types'

interface ProductCardProps {
  product: Product
  view?: 'grid' | 'list'
}

export function ProductCard({ product, view = 'grid' }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false)

  if (view === 'list') {
    return (
      <Card className="group overflow-hidden border hover:shadow-md transition-shadow duration-200 py-0">
        <CardContent className="p-0 flex">
          {/* Image */}
          <div className="relative w-44 shrink-0 overflow-hidden">
            <OptimizedImage
              src={product.image}
              alt={product.title}
              containerClassName="w-full h-44"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.isNew && (
              <Badge className="absolute top-2 left-2 text-xs px-1.5 py-0">New</Badge>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                <span className="text-xs font-medium text-muted-foreground">Out of stock</span>
              </div>
            )}
            {/* View Product overlay */}
            <Link
              to={`/products/${product.id}`}
              className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <span className="flex items-center gap-1.5 bg-white text-foreground text-xs font-semibold px-3 py-1.5 rounded-full shadow-md translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
                <Eye className="size-3.5" />
                View Product
              </span>
            </Link>
          </div>

          {/* Info */}
          <div className="flex flex-1 flex-col justify-between p-4">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">{product.brand}</p>
              <h3 className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {product.title}
              </h3>
              <div className="flex items-center gap-1 mt-1.5">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-3 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted-foreground'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold">₹{product.price.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                <Badge variant="secondary" className="text-xs text-green-600 bg-green-50 px-1.5 py-0">
                  {product.discountPercent}% off
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 shrink-0"
                  onClick={() => setWishlisted((w) => !w)}
                >
                  <Heart className={`size-4 transition-colors ${wishlisted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                </Button>
                <Button size="sm" disabled={!product.inStock} className="gap-1.5 text-xs">
                  <ShoppingCart className="size-3.5" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group overflow-hidden border hover:shadow-md transition-shadow duration-200 py-0">
      <CardContent className="p-0 flex flex-col">
        {/* Image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <OptimizedImage
            src={product.image}
            alt={product.title}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.isNew && (
            <Badge className="absolute top-2 left-2 text-xs px-1.5 py-0">New</Badge>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground">Out of stock</span>
            </div>
          )}
          {/* Wishlist */}
          <button
            onClick={() => setWishlisted((w) => !w)}
            className="absolute top-2 right-2 size-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
          >
            <Heart className={`size-4 transition-colors ${wishlisted ? 'fill-red-500 text-red-500' : 'text-foreground'}`} />
          </button>
          {/* View Product overlay */}
          <Link
            to={`/products/${product.id}`}
            className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <span className="flex items-center gap-1.5 bg-white text-foreground text-xs font-semibold px-3 py-2 rounded-full shadow-md translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
              <Eye className="size-3.5" />
              View Product
            </span>
          </Link>
        </div>

        {/* Info */}
        <div className="p-3 flex flex-col gap-1">
          <p className="text-xs text-muted-foreground">{product.brand}</p>
          <h3 className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`size-3 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted-foreground'}`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
            <span className="text-sm font-bold">₹{product.price.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
            <Badge variant="secondary" className="text-xs text-green-600 bg-green-50 px-1.5 py-0">
              {product.discountPercent}% off
            </Badge>
          </div>

          {/* Add to Cart */}
          <Button
            size="sm"
            disabled={!product.inStock}
            className="mt-2 w-full gap-1.5 text-xs"
          >
            <ShoppingCart className="size-3.5" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function ProductCardSkeleton({ view = 'grid' }: { view?: 'grid' | 'list' }) {
  if (view === 'list') {
    return (
      <Card className="overflow-hidden border py-0">
        <CardContent className="p-0 flex">
          <div className="w-44 h-44 bg-muted animate-pulse shrink-0" />
          <div className="flex-1 p-4 flex flex-col gap-3">
            <div className="h-3 w-16 bg-muted animate-pulse rounded" />
            <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
            <div className="h-3 w-24 bg-muted animate-pulse rounded" />
            <div className="h-4 w-32 bg-muted animate-pulse rounded mt-auto" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden border py-0">
      <CardContent className="p-0">
        <div className="aspect-[4/5] w-full bg-muted animate-pulse" />
        <div className="p-3 flex flex-col gap-2">
          <div className="h-3 w-12 bg-muted animate-pulse rounded" />
          <div className="h-4 w-4/5 bg-muted animate-pulse rounded" />
          <div className="h-3 w-20 bg-muted animate-pulse rounded" />
          <div className="h-4 w-24 bg-muted animate-pulse rounded" />
          <div className="h-8 w-full bg-muted animate-pulse rounded mt-1" />
        </div>
      </CardContent>
    </Card>
  )
}
