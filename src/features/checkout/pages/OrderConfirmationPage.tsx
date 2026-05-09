import { useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import {
  CheckCircle2,
  Package,
  ShoppingBag,
  ArrowRight,
  ListOrdered,
  XCircle,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useCartStore } from '@/features/cart/store/cartStore'
import { useOrderById } from '@/features/orders/hooks/useOrderById'
import { STATUS_CONFIG } from '@/features/account/data/profile.data'
import type { ApiOrderStatus } from '@/features/orders/types/orders.types'

type RedirectStatus = 'succeeded' | 'processing' | 'requires_payment_method' | string | null

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso))
}

export default function OrderConfirmationPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const clearCart = useCartStore((s) => s.clearCart)

  const orderIdStr = params.get('orderId')
  const orderId = orderIdStr ? Number(orderIdStr) : null
  const redirectStatus: RedirectStatus = params.get('redirect_status')

  const isFailure =
    redirectStatus !== null &&
    redirectStatus !== 'succeeded' &&
    redirectStatus !== 'processing'

  const isProcessing = redirectStatus === 'processing'

  const { data: order, isLoading, isError } = useOrderById(isFailure ? null : orderId)

  useEffect(() => {
    if (!isFailure) clearCart()
  }, [isFailure, clearCart])

  useEffect(() => {
    if (!orderId && !redirectStatus) navigate('/', { replace: true })
  }, [orderId, redirectStatus, navigate])

  if (isFailure) return <FailurePage />

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-6">

        {/* Icon + heading */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="flex items-center justify-center size-20 rounded-full bg-emerald-50 dark:bg-emerald-950/40 ring-8 ring-emerald-50/50 dark:ring-emerald-950/20">
            <CheckCircle2 className="size-10 text-emerald-600 dark:text-emerald-400" strokeWidth={1.75} />
          </div>
          <div className="space-y-1.5 mt-2">
            {isProcessing ? (
              <>
                <h1 className="text-2xl font-bold text-foreground">Payment Processing</h1>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Your payment is being processed. We'll email you once it's confirmed.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-foreground">Order Confirmed!</h1>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Thank you for your purchase. Your order has been placed successfully.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Order details card */}
        <Card className="p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Package className="size-4 text-primary shrink-0" />
            <span className="text-sm font-semibold text-foreground">Order Details</span>
          </div>

          <Separator />

          {isLoading ? (
            <div className="flex items-center justify-center py-6 gap-2 text-muted-foreground text-sm">
              <Loader2 className="size-4 animate-spin" />
              Loading order details…
            </div>
          ) : isError ? (
            <div className="flex items-center gap-2 text-sm text-destructive py-2">
              <AlertCircle className="size-4 shrink-0" />
              Could not load order details.
            </div>
          ) : order ? (
            <div className="space-y-3">
              {/* Product row */}
              <div className="flex items-center gap-3">
                {order.image ? (
                  <div className="size-14 rounded-lg overflow-hidden shrink-0 bg-muted ring-1 ring-border/50">
                    <img src={order.image} alt={order.product} className="size-full object-cover" />
                  </div>
                ) : (
                  <div className="size-14 rounded-lg shrink-0 bg-muted flex items-center justify-center">
                    <Package className="size-6 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{order.product}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    ₹{order.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-mono font-semibold text-foreground">#{order.id}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                {(() => {
                  const cfg = STATUS_CONFIG[order.status as ApiOrderStatus] ?? STATUS_CONFIG.PENDING
                  return (
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.className}`}>
                      {cfg.label}
                    </span>
                  )
                })()}
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span className="text-foreground">{formatDate(order.date)}</span>
              </div>
            </div>
          ) : orderId ? (
            /* Fallback if API returned no content */
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-mono font-semibold text-foreground">#{orderId}</span>
            </div>
          ) : null}
        </Card>

        {/* What's next */}
        <Card className="p-5 space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            What's next
          </p>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="size-4 text-emerald-500 mt-0.5 shrink-0" />
              You'll receive an email confirmation shortly.
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="size-4 text-emerald-500 mt-0.5 shrink-0" />
              Track your order status in the Orders section.
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="size-4 text-emerald-500 mt-0.5 shrink-0" />
              Estimated delivery within 3–7 business days.
            </li>
          </ul>
        </Card>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Button asChild className="h-11 font-semibold">
            <Link to="/orders">
              <ListOrdered className="size-4 mr-2" />
              View My Orders
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <Link to="/products">
              <ShoppingBag className="size-4 mr-2" />
              Continue Shopping
              <ArrowRight className="size-4 ml-auto" />
            </Link>
          </Button>
        </div>

      </div>
    </div>
  )
}

// ─── Payment failure screen ───────────────────────────────────────────────────

function FailurePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center justify-center size-20 rounded-full bg-red-50 dark:bg-red-950/40 ring-8 ring-red-50/50 dark:ring-red-950/20">
            <XCircle className="size-10 text-red-600 dark:text-red-400" strokeWidth={1.75} />
          </div>
          <div className="space-y-1.5 mt-2">
            <h1 className="text-2xl font-bold text-foreground">Payment Failed</h1>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Your payment could not be processed. No charge was made to your account.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Button asChild className="h-11 font-semibold">
            <Link to="/checkout">Try Again</Link>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
