import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Package,
  CalendarDays,
  Hash,
  IndianRupee,
  User,
  Loader2,
  AlertCircle,
  ShoppingBag,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useOrderById } from '@/features/orders/hooks/useOrderById'
import { STATUS_CONFIG } from '@/features/account/data/profile.data'
import type { ApiOrderStatus } from '@/features/orders/types/orders.types'

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso))
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className="mt-0.5 shrink-0 size-8 rounded-md bg-muted flex items-center justify-center">
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0 flex items-center justify-between gap-4">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-medium text-foreground text-right">{value}</span>
      </div>
    </div>
  )
}

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const orderId = id ? Number(id) : null

  const { data: order, isLoading, isPlaceholderData, isError, error } = useOrderById(orderId)

  const cfg = order
    ? (STATUS_CONFIG[order.status as ApiOrderStatus] ?? STATUS_CONFIG.PENDING)
    : null

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* Back button + heading */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="size-9 shrink-0"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="size-4" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-foreground leading-tight">Order Details</h1>
            {order && (
              <p className="text-xs text-muted-foreground mt-0.5">#{order.id}</p>
            )}
          </div>
          {isPlaceholderData && (
            <Loader2 className="size-4 animate-spin text-muted-foreground shrink-0" />
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          <Card className="p-10 flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <Loader2 className="size-4 animate-spin" />
            Loading order…
          </Card>
        )}

        {/* Error */}
        {isError && (
          <Card className="p-6 flex items-center gap-3 text-destructive">
            <AlertCircle className="size-5 shrink-0" />
            <div>
              <p className="text-sm font-medium">Failed to load order</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {(error as Error)?.message ?? 'Something went wrong. Please try again.'}
              </p>
            </div>
          </Card>
        )}

        {/* Order content */}
        {order && (
          <>
            {/* Product card */}
            <Card className="overflow-hidden">
              <div className="flex gap-4 p-5">
                {order.image ? (
                  <div className="size-24 rounded-xl overflow-hidden shrink-0 bg-muted ring-1 ring-border/50">
                    <img
                      src={order.image}
                      alt={order.product}
                      className="size-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="size-24 rounded-xl shrink-0 bg-muted flex items-center justify-center">
                    <Package className="size-8 text-muted-foreground" />
                  </div>
                )}

                <div className="flex-1 min-w-0 space-y-2">
                  <p className="text-base font-semibold text-foreground leading-snug">
                    {order.product}
                  </p>

                  <div className="flex items-center gap-1.5 text-lg font-bold text-foreground">
                    <IndianRupee className="size-4" />
                    {order.price.toFixed(2)}
                  </div>

                  {cfg && (
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.className}`}
                    >
                      <cfg.icon className="size-3" />
                      {cfg.label}
                    </span>
                  )}
                </div>
              </div>
            </Card>

            {/* Details card */}
            <Card className="px-5 divide-y divide-border">
              <DetailRow
                icon={Hash}
                label="Order ID"
                value={<span className="font-mono">#{order.id}</span>}
              />
              <DetailRow
                icon={CalendarDays}
                label="Placed on"
                value={formatDate(order.date)}
              />
              <DetailRow
                icon={User}
                label="User ID"
                value={order.userId}
              />
              <DetailRow
                icon={IndianRupee}
                label="Amount paid"
                value={`₹${order.price.toFixed(2)}`}
              />
            </Card>

            {/* Status timeline */}
            <Card className="p-5 space-y-4">
              <h2 className="text-sm font-semibold text-foreground">Order Status</h2>
              <div className="space-y-0">
                {(['PENDING', 'IN_TRANSIT', 'DELIVERED'] as ApiOrderStatus[]).map(
                  (step, i, arr) => {
                    const stepCfg = STATUS_CONFIG[step]
                    const statuses: ApiOrderStatus[] = ['PENDING', 'IN_TRANSIT', 'DELIVERED']
                    const currentIdx = statuses.indexOf(order.status as ApiOrderStatus)
                    const stepIdx = statuses.indexOf(step)
                    const isDone = currentIdx >= stepIdx
                    const isCurrent = order.status === step
                    const isCancelled = order.status === 'CANCELLED'

                    return (
                      <div key={step} className="flex gap-3">
                        {/* Track line */}
                        <div className="flex flex-col items-center">
                          <div
                            className={`size-7 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              isCancelled
                                ? 'border-border bg-muted'
                                : isDone
                                  ? 'border-primary bg-primary'
                                  : 'border-border bg-background'
                            }`}
                          >
                            <stepCfg.icon
                              className={`size-3.5 ${
                                isCancelled
                                  ? 'text-muted-foreground'
                                  : isDone
                                    ? 'text-primary-foreground'
                                    : 'text-muted-foreground'
                              }`}
                            />
                          </div>
                          {i < arr.length - 1 && (
                            <div
                              className={`w-0.5 h-8 mt-0.5 ${
                                !isCancelled && currentIdx > stepIdx
                                  ? 'bg-primary'
                                  : 'bg-border'
                              }`}
                            />
                          )}
                        </div>

                        {/* Label */}
                        <div className="pb-6 pt-0.5">
                          <p
                            className={`text-sm font-medium ${
                              isCurrent && !isCancelled
                                ? 'text-foreground'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {stepCfg.label}
                          </p>
                          {isCurrent && !isCancelled && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {formatDate(order.date)}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  },
                )}

                {/* Cancelled state */}
                {order.status === 'CANCELLED' && (
                  <div className="flex gap-3 mt-1">
                    <div className="flex flex-col items-center">
                      <div className="size-7 rounded-full border-2 border-destructive bg-destructive/10 flex items-center justify-center shrink-0">
                        <STATUS_CONFIG.CANCELLED.icon className="size-3.5 text-destructive" />
                      </div>
                    </div>
                    <div className="pt-0.5">
                      <p className="text-sm font-medium text-destructive">Cancelled</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatDate(order.date)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              <Button asChild variant="outline" className="flex-1 h-10">
                <Link to="/orders">
                  <ShoppingBag className="size-4 mr-2" />
                  All Orders
                </Link>
              </Button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}

