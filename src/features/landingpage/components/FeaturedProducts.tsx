import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart, Star, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useAuthStore } from '@/features/Auth/store/authStore'

// ────────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────────

interface Product {
  id: number
  name: string
  brand: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  badge?: string
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline'
  bg: string
}

// ────────────────────────────────────────────────────────────────────────────────
// Mock Data
// ────────────────────────────────────────────────────────────────────────────────

const products: Product[] = [
  {
    id: 1,
    name: 'Premium Leather Sneakers',
    brand: 'UrbanStep',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviews: 1243,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format',
    badge: 'Sale',
    badgeVariant: 'destructive',
    bg: 'from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30',
  },
  {
    id: 2,
    name: 'Minimalist Watch Pro',
    brand: 'TimeCraft',
    price: 199.00,
    rating: 4.9,
    reviews: 876,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&auto=format',
    badge: 'New',
    badgeVariant: 'default',
    bg: 'from-slate-50 to-gray-50 dark:from-slate-950/30 dark:to-gray-950/30',
  },
  {
    id: 3,
    name: 'Wireless Noise-Cancelling Headphones',
    brand: 'SoundWave',
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.7,
    reviews: 2105,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format',
    badge: '25% Off',
    badgeVariant: 'destructive',
    bg: 'from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30',
  },
  {
    id: 4,
    name: 'Linen Summer Dress',
    brand: 'Bloom & Co.',
    price: 59.99,
    rating: 4.6,
    reviews: 532,
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400&h=400&fit=crop&auto=format',
    badge: 'Trending',
    badgeVariant: 'secondary',
    bg: 'from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30',
  },
  {
    id: 5,
    name: 'Smart Backpack 30L',
    brand: 'TrailBlaze',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviews: 788,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&auto=format',
    badge: 'Sale',
    badgeVariant: 'destructive',
    bg: 'from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30',
  },
  {
    id: 6,
    name: 'Bamboo Skincare Set',
    brand: 'PureGlow',
    price: 44.99,
    rating: 4.8,
    reviews: 1634,
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38233?w=400&h=400&fit=crop&auto=format',
    badge: 'Best Seller',
    badgeVariant: 'secondary',
    bg: 'from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30',
  },
  {
    id: 7,
    name: 'Ergonomic Office Chair',
    brand: 'ComfortZone',
    price: 299.00,
    originalPrice: 399.00,
    rating: 4.7,
    reviews: 421,
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop&auto=format',
    badge: 'Sale',
    badgeVariant: 'destructive',
    bg: 'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30',
  },
  {
    id: 8,
    name: 'Stainless Steel Water Bottle',
    brand: 'HydraMax',
    price: 34.99,
    rating: 4.9,
    reviews: 3210,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&auto=format',
    badge: 'Top Rated',
    badgeVariant: 'outline',
    bg: 'from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/30',
  },
]


function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-3.5 w-3.5 ${
            star <= Math.floor(rating)
              ? 'fill-amber-400 text-amber-400'
              : star - rating < 1
              ? 'fill-amber-200 text-amber-200'
              : 'fill-muted text-muted'
          }`}
        />
      ))}
    </div>
  )
}

function SectionHeader() {
  return (
    <div className="flex items-end justify-between mb-10">
      <div>
        <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Hand-picked</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Featured Products</h2>
        <p className="text-muted-foreground mt-2">Our most popular items this season</p>
      </div>
      <Button variant="ghost" className="hidden sm:flex gap-1 text-sm">
        View All <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

interface ProductCardProps {
  product: Product
  isWishlisted: boolean
  onToggleWishlist: (id: number) => void
  onAddToCart: (id: number) => void
  onViewProduct: (id: number) => void
}

function ProductCard({ product, isWishlisted, onToggleWishlist, onAddToCart, onViewProduct }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/60 p-0">
      {/* Product Image Area */}
      <div className={`relative bg-gradient-to-br ${product.bg} overflow-hidden aspect-square`}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Hover overlay + View Product button */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onViewProduct(product.id)}
            className="opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 shadow-lg"
          >
            View Product
          </Button>
        </div>

        {product.badge && (
          <Badge variant={product.badgeVariant} className="absolute top-3 left-3 text-xs">
            {product.badge}
          </Badge>
        )}

        <button
          onClick={() => onToggleWishlist(product.id)}
          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
            }`}
          />
        </button>
      </div>

      <CardContent className="p-4 pb-2">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{product.brand}</p>
        <h3 className="font-semibold text-foreground mt-0.5 text-sm leading-snug line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-bold text-foreground">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-2">
        <Button size="sm" className="w-full gap-2" onClick={() => onAddToCart(product.id)}>
          <ShoppingCart className="h-3.5 w-3.5" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}


export function FeaturedProducts() {
  const [wishlist, setWishlist] = useState<number[]>([])
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const navigate = useNavigate()

  const requireAuth = (action: () => void) => {
    if (!isAuthenticated) {
      navigate('/login')
    } else {
      action()
    }
  }

  const toggleWishlist = (id: number) =>
    requireAuth(() =>
      setWishlist((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
    )

  const handleAddToCart = (id: number) =>
    requireAuth(() => {
      // TODO: wire up addToCart mutation
      console.log('add to cart', id)
    })

  const handleViewProduct = (id: number) =>
    requireAuth(() => navigate(`/products/${id}`))

  return (
    <section id="shop" className="py-16 md:py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader />

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={toggleWishlist}
              onAddToCart={handleAddToCart}
              onViewProduct={handleViewProduct}
            />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" className="gap-1">
            View All Products <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
