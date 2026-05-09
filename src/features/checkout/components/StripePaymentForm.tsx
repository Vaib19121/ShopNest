import { useState } from 'react'
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { Loader2, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ShippingDetails } from '../types/payment.types'

interface StripePaymentFormProps {
  orderId: number
  amount: number      // in cents
  currency: string
  shippingDetails: ShippingDetails
  onSuccess: (orderId: number) => void
  onError: (message: string) => void
}

export function StripePaymentForm({
  orderId,
  amount,
  currency,
  shippingDetails,
  onSuccess,
  onError,
}: StripePaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)

  const displayAmount = (amount / 100).toFixed(2)
  const displayCurrency = currency.toUpperCase()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return

    setIsProcessing(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/confirmation?orderId=${orderId}`,
        payment_method_data: {
          billing_details: {
            name: shippingDetails.name,
            address: {
              line1: shippingDetails.addressLine1,
              line2: shippingDetails.addressLine2 || undefined,
              city: shippingDetails.city,
              state: shippingDetails.state,
              postal_code: shippingDetails.postalCode,
              country: shippingDetails.country,
            },
          },
        },
      },
      redirect: 'if_required',
    })

    if (error) {
      onError(error.message ?? 'Payment failed. Please try again.')
      setIsProcessing(false)
    } else {
      onSuccess(orderId)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Stripe-hosted card / wallet fields */}
      <PaymentElement
        options={{
          layout: 'tabs',
        }}
      />

      {/* Amount summary */}
      <div className="flex items-center justify-between py-3 border-t border-border text-sm">
        <span className="text-muted-foreground">Total due</span>
        <span className="text-base font-bold text-foreground">
          {displayCurrency} ${displayAmount}
        </span>
      </div>

      <Button
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        className="w-full h-11 text-sm font-semibold"
      >
        {isProcessing ? (
          <>
            <Loader2 className="size-4 mr-2 animate-spin" />
            Processing…
          </>
        ) : (
          <>
            <ShieldCheck className="size-4 mr-2" />
            Pay {displayCurrency} ${displayAmount}
          </>
        )}
      </Button>

      <p className="text-center text-[11px] text-muted-foreground">
        Payments are secured and encrypted by Stripe.
      </p>
    </form>
  )
}
