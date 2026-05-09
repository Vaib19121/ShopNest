import { Package, ChevronRight, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { STATUS_CONFIG } from '@/features/account/data/profile.data'
import { SectionHeading, OrderStatusPill } from './shared/ProfileShared'
import { useOrders } from '@/features/orders/hooks/useOrders'

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(iso))
}

function OrderSkeleton() {
  return (
    <Card className="py-0 overflow-hidden">
      <div className="flex items-center gap-4 p-4 animate-pulse">
        <div className="size-14 rounded-lg bg-muted shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-1/3" />
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="h-5 w-20 bg-muted rounded-full" />
          <div className="h-4 w-16 bg-muted rounded" />
        </div>
      </div>
    </Card>
  )
}

const navigateToOrdersDetail = (id: string) => {
    navigation.navigate(`/orders/${id}`)
}

export function RecentOrders() {
  const { data: orders, isLoading, isError, error } = useOrders()

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <SectionHeading icon={Package} title="Recent Orders" />
        <Link
          to="/orders"
          className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
        >
          View all <ChevronRight className="size-3.5" />
        </Link>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <OrderSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="flex items-center gap-3 p-4 rounded-xl border border-destructive/30 bg-destructive/5 text-destructive text-sm">
          <AlertCircle className="size-4 shrink-0" />
          <span>{error?.message ?? 'Failed to load orders. Please try again.'}</span>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && orders?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
          <Package className="size-10 mb-3 opacity-30" />
          <p className="text-sm font-medium">No orders yet</p>
          <p className="text-xs mt-1">Your recent orders will appear here.</p>
        </div>
      )}

      {/* Order list */}
      {!isLoading && !isError && orders && orders.length > 0 && (
        <div className="space-y-3">
          {orders.map((order) => (
            <Card
              key={order.id}
                onClick={() => navigateToOrdersDetail(order.id.toString())}
              className="hover:shadow-md transition-all cursor-pointer group/order py-0 overflow-hidden"
            >
              <div className="flex items-center gap-4 p-4">
                <div className="size-14 rounded-lg overflow-hidden shrink-0 bg-muted ring-1 ring-border/50">
                  <img
                    src={order.image}
                    alt={order.product}
                    className="size-full object-cover group-hover/order:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{order.product}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    #{order.id} · {formatDate(order.date)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <OrderStatusPill status={order.status} config={STATUS_CONFIG} />
                  <span className="text-sm font-semibold text-foreground">
                    ${order.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}
