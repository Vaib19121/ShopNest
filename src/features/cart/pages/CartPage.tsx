import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Minus,
  Plus,
  Trash2,
  Heart,
  ShoppingBag,
  Tag,
  Truck,
  ChevronRight,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'
import { useCart, useCartQuery, useRemoveFromCart, useUpdateCartItem, useClearCart } from '../hooks/useCartHooks'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '@/features/Auth/store/authStore'

export default function CartPage() {
  const navigate = useNavigate()
  const { items, totalItems, subtotal, totalDiscount, deliveryCharge, freeShipping, total, removeItem, updateQuantity, clearCart } = useCart()
  const { clearCart: storeClear, addItem } = useCartStore()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const { data: apiCart, isLoading: isLoadingCart, isError: isCartError } = useCartQuery()
  const { mutate: removeFromCartApi } = useRemoveFromCart()
  const { mutate: updateCartItemApi } = useUpdateCartItem()
  const { mutate: clearCartApi } = useClearCart()
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)

  // Sync server cart into Zustand store when authenticated
  useEffect(() => {
    if (!apiCart) return
    storeClear()
    apiCart.items.forEach((item) => {
      addItem({
        id: item.productId,
        cartItemId: item.id,
        title: item.productName,
        brand: null,
        price: item.price,
        originalPrice: null,
        discountPercentage: null,
        image: item.productImage,
        color: null,
        size: null,
        quantity: item.quantity,
        inStock: true,
      })
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiCart])

  const handleRemove = (id: number, color: string | null, size: string | null, title: string, cartItemId: number | null) => {
    removeItem(id, color, size)
    if (isAuthenticated && cartItemId !== null) {
      removeFromCartApi(cartItemId)
    }
    toast.success(`"${title}" removed from cart`)
  }

  const handleMoveToWishlist = (id: number, color: string | null, size: string | null, title: string, cartItemId: number | null) => {
    removeItem(id, color, size)
    if (isAuthenticated && cartItemId !== null) {
      removeFromCartApi(cartItemId)
    }
    toast.success(`"${title}" moved to wishlist`)
  }

  const handleApplyCoupon = () => {
    if (!coupon.trim()) return
    if (coupon.toUpperCase() === 'SAVE10') {
      setCouponApplied(true)
      toast.success('Coupon applied! 10% off your order.')
    } else {
      toast.error('Invalid coupon code')
    }
  }

  // ── Loading State (authenticated + fetching) ─────────────────────────────
  if (isAuthenticated && isLoadingCart) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-sm">Loading your cart...</p>
        </div>
      </div>
    )
  }

  // ── Error State ────────────────────────────────────────────────────────────
  if (isAuthenticated && isCartError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <AlertCircle className="w-8 h-8 text-destructive" />
          <p className="font-semibold">Failed to load cart</p>
          <p className="text-sm text-muted-foreground">Please refresh the page and try again.</p>
        </div>
      </div>
    )
  }

  // ── Empty State ───────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Cart</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col items-center justify-center py-24 space-y-6 text-center">
            <div className="w-28 h-28 bg-muted rounded-full flex items-center justify-center">
              <ShoppingBag className="w-14 h-14 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Your cart is empty</h2>
              <p className="text-muted-foreground max-w-sm">
                Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
              </p>
            </div>
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 h-12 px-8"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // ── Filled Cart ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Cart</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <Button
            variant="ghost"
            className="text-destructive hover:text-destructive hover:bg-destructive/10 text-sm"
            onClick={() => {
              clearCart()
              if (isAuthenticated) clearCartApi()
              toast.success('Cart cleared')
            }}
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Cart Items ────────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card
                key={`${item.id}__${item.color}__${item.size}`}
                className={cn('overflow-hidden', !item.inStock && 'opacity-60')}
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Image */}
                    <Link to={`/products/${item.id}`} className="shrink-0">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg border overflow-hidden bg-muted">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          {item.brand && (
                            <p className="text-xs text-muted-foreground">{item.brand}</p>
                          )}
                          <Link to={`/products/${item.id}`}>
                            <h3 className="font-medium text-sm sm:text-base leading-snug hover:text-indigo-600 transition-colors line-clamp-2">
                              {item.title}
                            </h3>
                          </Link>
                        </div>
                        {!item.inStock && (
                          <Badge variant="destructive" className="shrink-0 text-xs">Out of Stock</Badge>
                        )}
                      </div>

                      {/* Variant badges */}
                      <div className="flex flex-wrap gap-2">
                        {item.size && (
                          <Badge variant="secondary" className="text-xs">Size: {item.size}</Badge>
                        )}
                        {item.color && (
                          <Badge variant="secondary" className="text-xs">Color: {item.color}</Badge>
                        )}
                      </div>

                      {/* Price row */}
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-base sm:text-lg">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{(item.originalPrice * item.quantity).toLocaleString()}
                          </span>
                        )}
                        {item.discountPercentage && item.discountPercentage > 0 && (
                          <span className="text-xs text-green-600 font-medium">
                            {item.discountPercentage}% off
                          </span>
                        )}
                      </div>

                      {/* Actions row */}
                      <div className="flex items-center justify-between pt-1 flex-wrap gap-3">
                        {/* Quantity stepper */}
                        <div className="flex items-center border rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              if (item.quantity > 1) {
                                updateQuantity(item.id, item.color, item.size, item.quantity - 1)
                                if (isAuthenticated && item.cartItemId !== null) {
                                  updateCartItemApi({ cartItemId: item.cartItemId, quantity: item.quantity - 1 })
                                }
                              } else {
                                handleRemove(item.id, item.color, item.size, item.title, item.cartItemId)
                              }
                            }}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              if (item.quantity < 10) {
                                updateQuantity(item.id, item.color, item.size, item.quantity + 1)
                                if (isAuthenticated && item.cartItemId !== null) {
                                  updateCartItemApi({ cartItemId: item.cartItemId, quantity: item.quantity + 1 })
                                }
                              } else {
                                toast.error('Max 10 per item')
                              }
                            }}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>

                        {/* Item actions */}
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-muted-foreground h-8"
                            onClick={() => handleMoveToWishlist(item.id, item.color, item.size, item.title, item.cartItemId)}
                          >
                            <Heart className="w-3.5 h-3.5 mr-1" />
                            Wishlist
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-destructive hover:text-destructive hover:bg-destructive/10 h-8"
                            onClick={() => handleRemove(item.id, item.color, item.size, item.title, item.cartItemId)}
                          >
                            <Trash2 className="w-3.5 h-3.5 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Continue shopping */}
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => navigate('/products')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </div>

          {/* ── Order Summary ─────────────────────────────────────────────── */}
          <div className="space-y-4">
            {/* Coupon */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Tag className="w-4 h-4 text-indigo-600" />
                  Apply Coupon
                </CardTitle>
              </CardHeader>
              <CardContent>
                {couponApplied ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-green-700">SAVE10 applied</p>
                      <p className="text-xs text-green-600">10% discount added</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-destructive hover:text-destructive h-7"
                      onClick={() => { setCouponApplied(false); setCoupon(''); toast.success('Coupon removed') }}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                      className="h-9 text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0 h-9"
                      onClick={handleApplyCoupon}
                    >
                      Apply
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Price breakdown */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Price Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Price ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                  </span>
                  <span>₹{(subtotal + totalDiscount).toLocaleString()}</span>
                </div>

                {totalDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="text-green-600">−₹{totalDiscount.toLocaleString()}</span>
                  </div>
                )}

                {couponApplied && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Coupon (SAVE10)</span>
                    <span className="text-green-600">−₹{Math.round(subtotal * 0.1).toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Charges</span>
                  {freeShipping ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    <span>₹{deliveryCharge}</span>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-base">
                  <span>Total Amount</span>
                  <span>
                    ₹{(couponApplied ? Math.round(total - subtotal * 0.1) : total).toLocaleString()}
                  </span>
                </div>

                {totalDiscount > 0 && (
                  <p className="text-sm text-green-600 font-medium text-center bg-green-50 py-2 rounded-lg">
                    You save ₹{(totalDiscount + (couponApplied ? Math.round(subtotal * 0.1) : 0)).toLocaleString()} on this order!
                  </p>
                )}

                {/* Free shipping progress */}
                {!freeShipping && (
                  <div className="pt-1 text-xs text-muted-foreground text-center">
                    <Truck className="w-3.5 h-3.5 inline mr-1" />
                    Add ₹{(500 - subtotal).toLocaleString()} more for free shipping
                  </div>
                )}

                <Button
                  className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 mt-2"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
              {[
                { icon: '🔒', label: 'Secure Payments' },
                { icon: '↩️', label: '30-Day Returns' },
                { icon: '🚚', label: 'Fast Delivery' },
                { icon: '✅', label: '100% Authentic' },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-2 p-2 border rounded-lg">
                  <span>{b.icon}</span>
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
