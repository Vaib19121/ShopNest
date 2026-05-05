import { useMemo, useState } from 'react'
import { PackageX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { FiltersPanel } from '../components/FiltersPanel'
import { ProductCard, ProductCardSkeleton } from '../components/ProductCard'
import { TopBar } from '../components/TopBar'
import { ActiveFilters } from '../components/ActiveFilters'
import { MOCK_PRODUCTS, PRICE_MIN, PRICE_MAX } from '../data/mockProducts'
import type { FilterState, SortOption, ViewMode } from '../types/product.types'

const DEFAULT_FILTERS: FilterState = {
  categories: [],
  priceRange: [PRICE_MIN, PRICE_MAX],
  brands: [],
  rating: null,
  inStockOnly: false,
  colors: [],
}

export default function ProductsPage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [sort, setSort] = useState<SortOption>('newest')
  const [view, setView] = useState<ViewMode>('grid')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isLoading] = useState(false) // flip to true to preview skeleton

  const filtered = useMemo(() => {
    let list = [...MOCK_PRODUCTS]

    if (filters.categories.length) list = list.filter((p) => filters.categories.includes(p.category))
    if (filters.brands.length) list = list.filter((p) => filters.brands.includes(p.brand))
    if (filters.inStockOnly) list = list.filter((p) => p.inStock)
    if (filters.rating !== null) list = list.filter((p) => p.rating >= filters.rating!)
    if (filters.colors.length) list = list.filter((p) => p.colors.some((c) => filters.colors.includes(c)))
    list = list.filter((p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1])

    switch (sort) {
      case 'price_asc': list.sort((a, b) => a.price - b.price); break
      case 'price_desc': list.sort((a, b) => b.price - a.price); break
      case 'best_rated': list.sort((a, b) => b.rating - a.rating); break
      case 'newest': list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
    }

    return list
  }, [filters, sort])

  const handleClear = () => setFilters(DEFAULT_FILTERS)

  const sidebarFilters = (
    <FiltersPanel filters={filters} onChange={setFilters} onClear={handleClear} />
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
              total={filtered.length}
              sort={sort}
              view={view}
              onSortChange={setSort}
              onViewChange={setView}
              onOpenMobileFilters={() => setMobileOpen(true)}
            />

            {/* Active filter chips */}
            <ActiveFilters filters={filters} onChange={setFilters} onClear={handleClear} />

            {/* Grid / List */}
            {isLoading ? (
              <div className={view === 'grid'
                ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4'
                : 'flex flex-col gap-3'
              }>
                {Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={i} view={view} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
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
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} view={view} />
                ))}
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
