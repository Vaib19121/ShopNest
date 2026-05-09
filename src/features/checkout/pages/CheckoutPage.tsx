import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import {
  ShoppingBag,
  ChevronLeft,
  AlertCircle,
  Loader2,
  CreditCard,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useCartStore } from '@/features/cart/store/cartStore'
import { useCreatePaymentIntent } from '@/features/checkout/hooks/usePaymentIntent'
import { StripePaymentForm } from '@/features/checkout/components/StripePaymentForm'
import { ShippingForm } from '@/features/checkout/components/ShippingForm'
import type { ShippingDetails } from '@/features/checkout/types/payment.types'

// ─── Stripe singleton (lazy) ──────────────────────────────────────────────────
const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined
const stripePromise = STRIPE_KEY ? loadStripe(STRIPE_KEY) : null

// ─── Order Summary sidebar ────────────────────────────────────────────────────

function OrderSummary() {
  const items = useCartStore((s) => s.items)
  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0)
  const shipping = subtotal > 75 ? 0 : 6.99
  const total = subtotal + shipping

  return (
    <Card className="p-5 space-y-4 sticky top-24">
      <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
        <ShoppingBag className="size-4 text-primary" />
        Order Summary
      </h2>

      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={`${item.id}-${item.color}-${item.size}`} className="flex items-start gap-3">
            <div className="size-12 rounded-lg overflow-hidden shrink-0 bg-muted ring-1 ring-border/50">
              <img src={item.image} alt={item.name} className="size-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">{item.name}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Qty {item.quantity}
                {item.color && ` · ${item.color}`}
                {item.size && ` · ${item.size}`}
              </p>
            </div>
            <span className="text-xs font-semibold text-foreground shrink-0">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <Separator />

      <div className="space-y-1.5 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span>{shipping === 0 ? <span className="text-emerald-600">Free</span> : `$${shipping.toFixed(2)}`}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between font-bold text-foreground">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {subtotal <= 75 && (
        <p className="text-[11px] text-muted-foreground">
          Add <span className="font-medium text-foreground">${(75 - subtotal).toFixed(2)}</span> more for free shipping.
        </p>
      )}
    </Card>
  )
}

// ─── Payment step ─────────────────────────────────────────────────────────────

interface PaymentStepProps {
  productId: number
  quantity: number
  description: string
  shippingDetails: ShippingDetails | null
}

function PaymentStep({ productId, quantity, description, shippingDetails }: PaymentStepProps) {
  const navigate = useNavigate()
  const { mutate, data: intent, isPending, isError, error, isSuccess } =
    useCreatePaymentIntent()

  function handleInitiate() {
    mutate({ productId, quantity, description })
  }

  function handlePaymentSuccess(orderId: number) {
    navigate(`/checkout/confirmation?orderId=${orderId}`)
  }

  function handlePaymentError(message: string) {
    // surface error inline — no navigation
    console.error('[Stripe] Payment error:', message)
  }

  // ── Not yet initiated ──────────────────────────────────────────────────────
  if (!isSuccess || !intent) {
    return (
      <div className="space-y-4">
        {isError && (
          <div className="flex items-center gap-3 p-3 rounded-xl border border-destructive/30 bg-destructive/5 text-destructive text-sm">
            <AlertCircle className="size-4 shrink-0" />
            <span>{(error as Error)?.message ?? 'Could not initiate payment.'}</span>
          </div>
        )}

        <Button
          onClick={handleInitiate}
          disabled={isPending || !shippingDetails}
          className="w-full h-11 text-sm font-semibold"
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 mr-2 animate-spin" />
              Preparing payment…
            </>
          ) : (
            <>
              <CreditCard className="size-4 mr-2" />
              Proceed to payment
            </>
          )}
        </Button>
      </div>
    )
  }

  // ── Stripe Elements ────────────────────────────────────────────────────────
  if (!stripePromise) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-xl border border-destructive/30 bg-destructive/5 text-destructive text-sm">
        <AlertCircle className="size-4 shrink-0" />
        <span>Stripe is not configured. Set VITE_STRIPE_PUBLISHABLE_KEY in your .env file.</span>
      </div>
    )
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: intent.clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: 'hsl(var(--primary))',
            borderRadius: '8px',
          },
        },
      }}
    >
      <StripePaymentForm
        orderId={intent.orderId}
        amount={intent.amount}
        currency={intent.currency}
        shippingDetails={shippingDetails!}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
    </Elements>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const navigate = useNavigate()
  const items = useCartStore((s) => s.items)

  // For single-product checkout we use the first cart item.
  // If cart has multiple items the payment intent is created once per session;
  // the backend handles the cart via the authenticated userId.
  const firstItem = items[0]

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails | null>(null)

  const productId = useMemo(() => firstItem?.id ?? 0, [firstItem])
  const totalQuantity = useMemo(
    () => items.reduce((acc, i) => acc + i.quantity, 0),
    [items],
  )
  const description = useMemo(() => {
    const names = items.map((i) => `${i.name} x${i.quantity}`).join(', ')
    return `ShopNest Order: ${names}`.slice(0, 255) // Stripe max is 255 chars
  }, [items])

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <ShoppingBag className="size-14 text-muted-foreground opacity-30" />
        <p className="text-base font-semibold text-foreground">Your cart is empty</p>
        <Button variant="outline" onClick={() => navigate('/products')}>
          Browse products
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Header ── */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center size-9 rounded-full border border-border hover:bg-muted transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft className="size-4 text-muted-foreground" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">Checkout</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Complete your purchase securely</p>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">

          {/* Left — Shipping + Payment */}
          <div className="space-y-6">
            <Card className="p-5">
              <ShippingForm onChange={setShippingDetails} />
            </Card>

            <Card className="p-5 space-y-5">
              <div className="flex items-center gap-2">
                <CreditCard className="size-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground">Payment</h2>
              </div>

              {errorMessage && (
                <div className="flex items-center gap-3 p-3 rounded-xl border border-destructive/30 bg-destructive/5 text-destructive text-sm">
                  <AlertCircle className="size-4 shrink-0" />
                  <span>{errorMessage}</span>
                  <button
                    onClick={() => setErrorMessage(null)}
                    className="ml-auto text-xs underline underline-offset-2"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              <PaymentStep
                productId={productId}
                quantity={totalQuantity}
                description={description}
                shippingDetails={shippingDetails}
              />
            </Card>
          </div>

          {/* Right — Order summary */}
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}
