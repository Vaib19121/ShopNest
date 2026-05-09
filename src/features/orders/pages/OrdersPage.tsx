import { useNavigate } from 'react-router-dom'
import {
  Package,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Truck,
  XCircle,
  LayoutList,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useOrdersList, type StatusFilter } from '@/features/orders/hooks/useOrdersList'
import { STATUS_CONFIG } from '@/features/account/data/profile.data'
import { OrderStatusPill } from '@/features/account/components/shared/ProfileShared'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(iso))
}

// ─── Filter tabs config ───────────────────────────────────────────────────────

const TABS: { key: StatusFilter; label: string; icon: React.ElementType }[] = [
  { key: 'ALL', label: 'All Orders', icon: LayoutList },
  { key: 'PENDING', label: 'Pending', icon: Truck },
  { key: 'DELIVERED', label: 'Delivered', icon: CheckCircle2 },
  { key: 'IN_TRANSIT', label: 'In Transit', icon: Truck },
  { key: 'CANCELLED', label: 'Cancelled', icon: XCircle },
]

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function OrderSkeleton() {
  return (
    <Card className="py-0 overflow-hidden">
      <div className="flex items-center gap-4 p-4 sm:p-5 animate-pulse">
        <div className="size-16 rounded-xl bg-muted shrink-0 hidden sm:block" />
        <div className="flex-1 space-y-2.5">
          <div className="h-3.5 bg-muted rounded w-2/3" />
          <div className="h-3 bg-muted rounded w-1/3" />
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="h-5 w-24 bg-muted rounded-full" />
          <div className="h-4 w-16 bg-muted rounded" />
        </div>
      </div>
    </Card>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function OrdersPage() {
  const navigate = useNavigate()
  const {
    orders,
    totalPages,
    page,
    setPage,
    statusFilter,
    setStatusFilter,
    isLoading,
    isError,
    error,
  } = useOrdersList(10)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* ── Header ── */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center size-9 rounded-full border border-border hover:bg-muted transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft className="size-4 text-muted-foreground" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">My Orders</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Track and manage your purchases</p>
          </div>
        </div>

        {/* ── Status filter tabs ── */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {TABS.map(({ key, label, icon: Icon }) => {
            const active = statusFilter === key
            return (
              <button
                key={key}
                onClick={() => { setStatusFilter(key); setPage(0) }}
                className={[
                  'flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap transition-all',
                  active
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground',
                ].join(' ')}
              >
                <Icon className="size-3.5" />
                {label}
              </button>
            )
          })}
        </div>

        {/* ── Loading ── */}
        {isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <OrderSkeleton key={i} />
            ))}
          </div>
        )}

        {/* ── Error ── */}
        {isError && (
          <div className="flex items-center gap-3 p-4 rounded-xl border border-destructive/30 bg-destructive/5 text-destructive text-sm">
            <AlertCircle className="size-4 shrink-0" />
            <span>{error?.message ?? 'Failed to load orders. Please try again.'}</span>
          </div>
        )}

        {/* ── Empty ── */}
        {!isLoading && !isError && orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
            <div className="flex items-center justify-center size-16 rounded-2xl bg-muted mb-4">
              <Package className="size-8 opacity-40" />
            </div>
            <p className="text-base font-semibold text-foreground">No orders found</p>
            <p className="text-sm mt-1">
              {statusFilter === 'ALL'
                ? "You haven't placed any orders yet."
                : `No ${statusFilter.toLowerCase().replace('_', ' ')} orders.`}
            </p>
            {statusFilter !== 'ALL' && (
              <button
                onClick={() => setStatusFilter('ALL')}
                className="mt-4 text-xs text-primary underline underline-offset-2"
              >
                View all orders
              </button>
            )}
          </div>
        )}

        {/* ── Order list ── */}
        {!isLoading && !isError && orders.length > 0 && (
          <div className="space-y-3">
            {orders.map((order) => (
              <Card
                key={order.id}
                onClick={() => navigate(`/orders/${order.id}`)}
                className="hover:shadow-md transition-all cursor-pointer group/order py-0 overflow-hidden"
              >
                <div className="flex items-center gap-4 p-4 sm:p-5">
                  {/* Thumbnail */}
                  <div className="size-16 rounded-xl overflow-hidden shrink-0 bg-muted ring-1 ring-border/50 hidden sm:block">
                    <img
                      src={order.image}
                      alt={order.product}
                      className="size-full object-cover group-hover/order:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate leading-tight">
                      {order.product}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Order #{order.id}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(order.date)}
                    </p>
                  </div>

                  {/* Right col */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <OrderStatusPill status={order.status} config={STATUS_CONFIG} />
                    <span className="text-sm font-bold text-foreground">
                      ${order.price.toFixed(2)}
                    </span>
                    <ChevronRight className="size-3.5 text-muted-foreground group-hover/order:text-foreground transition-colors" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* ── Pagination ── */}
        {!isLoading && !isError && (totalPages == null ? page > 0 || orders.length === 10 : totalPages > 1) && (
          <div className="flex items-center justify-between pt-2">
            <button
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="size-4" />
              Previous
            </button>

            <span className="text-xs text-muted-foreground">
              Page {page + 1}{totalPages != null ? ` of ${totalPages}` : ''}
            </span>

            <button
              disabled={totalPages != null ? page + 1 >= totalPages : orders.length < 10}
              onClick={() => setPage((p) => p + 1)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Next
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
