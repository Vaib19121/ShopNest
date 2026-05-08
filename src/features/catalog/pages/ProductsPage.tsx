import { useState } from 'react'
import { PackageX, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { FiltersPanel } from '../components/FiltersPanel'
import { ProductCard, ProductCardSkeleton } from '../components/ProductCard'
import { TopBar } from '../components/TopBar'
import { ActiveFilters } from '../components/ActiveFilters'
import { PRICE_MIN, PRICE_MAX } from '../data/mockProducts'
import type { FilterState, SortOption, ViewMode } from '../types/product.types'
import { useFilteredProducts } from '../hooks/useProducts'

const DEFAULT_FILTERS: FilterState = {
  categories: [],
  priceRange: [PRICE_MIN, PRICE_MAX],
  brands: [],
  rating: null,
  inStockOnly: false,
  colors: [],
  sizes: [],
  searchQuery: '',
}

const PAGE_SIZE = 12

export default function ProductsPage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [sort, setSort] = useState<SortOption>('newest')
  const [view, setView] = useState<ViewMode>('grid')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [page, setPage] = useState(0)

  const { data: pageData, isLoading, isError } = useFilteredProducts(filters, page, sort, PAGE_SIZE)
  const products = pageData?.content ?? []
  const totalPages = pageData?.totalPages ?? 0
  const totalElements = pageData?.totalElements ?? 0

  const handleClear = () => {
    setFilters(DEFAULT_FILTERS)
    setPage(0)
  }

  const handleFiltersChange = (f: FilterState) => {
    setFilters(f)
    setPage(0)
  }

  const handleSortChange = (s: SortOption) => {
    setSort(s)
    setPage(0)
  }

  const sidebarFilters = (
    <FiltersPanel filters={filters} onChange={handleFiltersChange} onClear={handleClear} />
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="border-b bg-card">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-4">
          <h1 className="text-xl font-bold">All Products</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Explore our latest collection</p>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-6">
        <div className="flex gap-6">

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-[260px] shrink-0">
            <div className="sticky top-6 border rounded-xl bg-card overflow-hidden">
              {sidebarFilters}
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">

            {/* Top bar */}
            <TopBar
              total={totalElements}
              sort={sort}
              view={view}
              onSortChange={handleSortChange}
              onViewChange={setView}
              onOpenMobileFilters={() => setMobileOpen(true)}
            />

            {/* Active filter chips */}
            <ActiveFilters filters={filters} onChange={handleFiltersChange} onClear={handleClear} />

            {/* Error state */}
            {isError && (
              <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
                <AlertCircle className="size-10 text-destructive/60" />
                <div>
                  <p className="font-semibold">Failed to load products</p>
                  <p className="text-sm text-muted-foreground mt-1">Please check your connection and try again</p>
                </div>
              </div>
            )}

            {/* Grid / List */}
            {!isError && (isLoading ? (
              <div className={view === 'grid'
                ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4'
                : 'flex flex-col gap-3'
              }>
                {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <ProductCardSkeleton key={i} view={view} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                <PackageX className="size-12 text-muted-foreground/50" />
                <div>
                  <p className="font-semibold text-foreground">No products found</p>
                  <p className="text-sm text-muted-foreground mt-1">Try adjusting or clearing your filters</p>
                </div>
                <Button variant="outline" onClick={handleClear}>Reset filters</Button>
              </div>
            ) : (
              <div className={view === 'grid'
                ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4'
                : 'flex flex-col gap-3'
              }>
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} view={view} />
                ))}
              </div>
            ))}

            {/* Pagination */}
            {!isLoading && !isError && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                >
                  <ChevronLeft className="size-4" />
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    const pageIndex = totalPages <= 7
                      ? i
                      : page < 4
                        ? i
                        : page > totalPages - 5
                          ? totalPages - 7 + i
                          : page - 3 + i
                    return (
                      <Button
                        key={pageIndex}
                        variant={page === pageIndex ? 'default' : 'ghost'}
                        size="sm"
                        className="w-8 h-8 p-0 text-xs"
                        onClick={() => setPage(pageIndex)}
                      >
                        {pageIndex + 1}
                      </Button>
                    )
                  })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page >= totalPages - 1}
                >
                  Next
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Mobile filters — Drawer (bottom sheet on mobile) */}
      <Drawer open={mobileOpen} onOpenChange={setMobileOpen}>
        <DrawerContent className="max-h-[85dvh]">
          <DrawerHeader>
            <DrawerTitle>Filters</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto pb-6">
            {sidebarFilters}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
