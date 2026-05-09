import { useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart, Star, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { toast } from 'sonner'
import { useAuthStore } from '@/features/Auth/store/authStore'
import { useCartStore } from '@/features/cart/store/cartStore'
import { useAddToCart } from '@/features/cart/hooks/useCartHooks'
import { useWishlistQuery, useAddToWishlist, useRemoveFromWishlist } from '@/features/wishlist/hooks/useWishlistHooks'
import { useProducts } from '@/features/catalog/hooks/useProducts'
import type { Product } from '@/features/catalog/types/product.types'

// ────────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────────

const BG_GRADIENTS = [
  'from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30',
  'from-slate-50 to-gray-50 dark:from-slate-950/30 dark:to-gray-950/30',
  'from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30',
  'from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30',
  'from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30',
  'from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30',
  'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30',
  'from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/30',
]

function getBadge(product: Product): { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' } | null {
  if (product.isNew) return { label: 'New', variant: 'default' }
  if (product.discountPercent > 0) return { label: `${product.discountPercent}% Off`, variant: 'destructive' }
  return null
}

function SectionHeader() {
  const navigate = useNavigate()
  return (
    <div className="flex items-end justify-between mb-10">
      <div>
        <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Hand-picked</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Featured Products</h2>
        <p className="text-muted-foreground mt-2">Our most popular items this season</p>
      </div>
      <Button variant="ghost" className="hidden sm:flex gap-1 text-sm" onClick={() => navigate('/products')}>
        View All <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────────
// Product Card
// ────────────────────────────────────────────────────────────────────────────────

interface ProductCardProps {
  product: Product
  bg: string
  isWishlisted: boolean
  onToggleWishlist: (id: string) => void
  onAddToCart: (product: Product) => void
  onViewProduct: (id: string) => void
}

function FeaturedProductCard({ product, bg, isWishlisted, onToggleWishlist, onAddToCart, onViewProduct }: ProductCardProps) {
  const badge = getBadge(product)
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/60 p-0">
      {/* Image */}
      <div className={`relative bg-gradient-to-br ${bg} overflow-hidden aspect-square`}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onViewProduct(product.id)}
            className="opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
          >
            View Product
          </Button>
        </div>
        {badge && (
          <Badge variant={badge.variant} className="absolute top-3 left-3 text-xs">
            {badge.label}
          </Badge>
        )}
        <button
          onClick={() => onToggleWishlist(product.id)}
          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
        >
          <Heart className={`h-4 w-4 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
        </button>
      </div>

      <CardContent className="p-4 pb-2">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{product.brand}</p>
        <h3 className="font-semibold text-foreground mt-0.5 text-sm leading-snug line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3.5 w-3.5 ${
                  star <= Math.floor(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : star - product.rating < 1
                    ? 'fill-amber-200 text-amber-200'
                    : 'fill-muted text-muted'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product?.reviewCount?.toLocaleString()})</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-bold text-foreground">${product.price.toFixed(2)}</span>
          {product.originalPrice !== product.price && (
            <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-2">
        <Button
          size="sm"
          className="w-full gap-2"
          disabled={!product.inStock}
          onClick={() => onAddToCart(product)}
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  )
}

// ────────────────────────────────────────────────────────────────────────────────
// Loading Skeleton
// ────────────────────────────────────────────────────────────────────────────────

function FeaturedProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-border/60 overflow-hidden">
          <div className="aspect-square bg-muted animate-pulse" />
          <div className="p-4 space-y-2">
            <div className="h-3 w-1/3 rounded bg-muted animate-pulse" />
            <div className="h-4 w-4/5 rounded bg-muted animate-pulse" />
            <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
            <div className="h-4 w-1/4 rounded bg-muted animate-pulse" />
          </div>
          <div className="px-4 pb-4">
            <div className="h-8 rounded bg-muted animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────────────────────────────────────

export function FeaturedProducts() {
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const addItem = useCartStore((s) => s.addItem)
  const { mutate: addToCartApi } = useAddToCart()
  const { data: wishlistData } = useWishlistQuery()
  const { mutate: addToWishlistApi } = useAddToWishlist()
  const { mutate: removeFromWishlistApi } = useRemoveFromWishlist()

  const { data, isLoading } = useProducts(0, 'newest', 8)
  const featuredProducts = data?.content ?? []

  const requireAuth = (action: () => void) => {
    if (!isAuthenticated) {
      navigate('/auth/login')
    } else {
      action()
    }
  }

  const handleToggleWishlist = (id: string) =>
    requireAuth(() => {
      const numId = Number(id)
      const existing = wishlistData?.items.find((i) => i.productId === numId)
      if (existing) {
        removeFromWishlistApi(existing.id, {
          onError: () => toast.error('Failed to remove from wishlist'),
        })
      } else {
        addToWishlistApi({ productId: numId }, {
          onSuccess: () => toast.success('Added to wishlist!'),
          onError: () => toast.error('Failed to add to wishlist'),
        })
      }
    })

  const handleAddToCart = (product: Product) =>
    requireAuth(() => {
      if (!product.inStock) {
        toast.error('Product is out of stock')
        return
      }
      addItem({
        id: Number(product.id),
        cartItemId: null,
        name: product.name,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice,
        discountPercentage: product.discountPercent,
        image: product.image,
        color: null,
        size: null,
        inStock: product.inStock,
        quantity: 1,
      })
      addToCartApi({ productId: Number(product.id), quantity: 1 })
      toast.success('Added to cart!', {
        description: product.name,
        action: { label: 'View Cart', onClick: () => navigate('/cart') },
      })
    })

  const handleViewProduct = (id: string) => navigate(`/products/${id}`)

  return (
    <section id="shop" className="py-16 md:py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader />

        {isLoading ? (
          <FeaturedProductsSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {featuredProducts.map((product, index) => (
              <FeaturedProductCard
                key={product.id}
                product={product}
                bg={BG_GRADIENTS[index % BG_GRADIENTS.length]}
                isWishlisted={!!wishlistData?.items.find((i) => i.productId === Number(product.id))}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
                onViewProduct={handleViewProduct}
              />
            ))}
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" className="gap-1" onClick={() => navigate('/products')}>
            View All Products <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
