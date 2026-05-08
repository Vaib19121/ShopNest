import { Link } from 'react-router-dom'
import { Heart, Trash2, ShoppingCart, AlertCircle, Loader2, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useWishlistQuery, useRemoveFromWishlist, useClearWishlist } from '../hooks/useWishlistHooks'
import { useAuthStore } from '@/features/Auth/store/authStore'
import { useAddToCart } from '@/features/cart/hooks/useCartHooks'

export default function WishlistPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const { data: wishlist, isLoading, isError } = useWishlistQuery()
  const { mutate: removeItem, isPending: isRemoving } = useRemoveFromWishlist()
  const { mutate: clearWishlist, isPending: isClearing } = useClearWishlist()
  const { mutate: addToCartApi } = useAddToCart()

  const handleRemove = (wishlistItemId: number, name: string) => {
    removeItem(wishlistItemId, {
      onSuccess: () => toast.success(`"${name}" removed from wishlist`),
      onError: () => toast.error('Failed to remove item'),
    })
  }

  const handleClear = () => {
    clearWishlist(undefined, {
      onSuccess: () => toast.success('Wishlist cleared'),
      onError: () => toast.error('Failed to clear wishlist'),
    })
  }

  const handleMoveToCart = (productId: number, name: string, wishlistItemId: number) => {
    addToCartApi({ productId, quantity: 1 }, {
      onSuccess: () => {
        toast.success(`"${name}" added to cart`)
        removeItem(wishlistItemId)
      },
      onError: () => toast.error('Failed to add to cart'),
    })
  }

  // ── Loading ──────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  // ── Error ────────────────────────────────────────────────────────────────
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-3" />
          <p className="text-lg font-semibold">Failed to load wishlist</p>
          <p className="text-muted-foreground text-sm mt-1">Please try again later.</p>
        </div>
      </div>
    )
  }

  // ── Not authenticated ────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Sign in to view your wishlist</h2>
          <p className="text-muted-foreground mb-6">Save your favourite items and access them anytime.</p>
          <Button asChild>
            <Link to="/auth/login">Sign In</Link>
          </Button>
        </div>
      </div>
    )
  }

  const items = wishlist?.items ?? []

  // ── Empty ────────────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">Browse products and save your favourites here.</p>
          <Button asChild>
            <Link to="/products">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Browse Products
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // ── Wishlist items ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Wishlist</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
              My Wishlist
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          <Button
            variant="ghost"
            className="text-destructive hover:text-destructive hover:bg-destructive/10 text-sm"
            onClick={handleClear}
            disabled={isClearing}
          >
            {isClearing ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Trash2 className="w-4 h-4 mr-1" />}
            Clear Wishlist
          </Button>
        </div>

        <Separator className="mb-6" />

        {/* Items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="group border rounded-xl overflow-hidden bg-card hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <Link to={`/products/${item.productId}`} className="block relative aspect-square overflow-hidden bg-muted">
                <img
                  src={item.imageUrl}
                  alt={item.productName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Badge variant="secondary" className="text-xs">Out of Stock</Badge>
                  </div>
                )}
                {item.discountPercentage > 0 && (
                  <Badge className="absolute top-2 left-2 bg-rose-500 text-white text-xs">
                    -{item.discountPercentage}%
                  </Badge>
                )}
              </Link>

              {/* Info */}
              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-0.5">{item.brand}</p>
                <Link
                  to={`/products/${item.productId}`}
                  className="font-semibold text-sm leading-tight line-clamp-2 hover:text-primary transition-colors"
                >
                  {item.productName}
                </Link>

                {/* Price */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-bold text-base">₹{item.price.toLocaleString()}</span>
                  {item.originalPrice > item.price && (
                    <span className="text-muted-foreground line-through text-xs">
                      ₹{item.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    className="flex-1 text-xs"
                    disabled={!item.inStock}
                    onClick={() => handleMoveToCart(item.productId, item.productName, item.id)}
                  >
                    <ShoppingCart className="w-3.5 h-3.5 mr-1" />
                    {item.inStock ? 'Move to Cart' : 'Out of Stock'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-9 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                    disabled={isRemoving}
                    onClick={() => handleRemove(item.productId, item.productName)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-10">
          <Button variant="ghost" asChild>
            <Link to="/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
