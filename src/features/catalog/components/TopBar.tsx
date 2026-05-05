import { Grid2x2, LayoutList, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { SortOption, ViewMode } from '../types/product.types'

interface TopBarProps {
  total: number
  sort: SortOption
  view: ViewMode
  onSortChange: (sort: SortOption) => void
  onViewChange: (view: ViewMode) => void
  onOpenMobileFilters: () => void
}

export function TopBar({ total, sort, view, onSortChange, onViewChange, onOpenMobileFilters }: TopBarProps) {
  return (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      <div className="flex items-center gap-3">
        {/* Mobile filter trigger */}
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden gap-1.5"
          onClick={onOpenMobileFilters}
        >
          <SlidersHorizontal className="size-4" />
          Filters
        </Button>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{total}</span> products
        </p>
      </div>

      <div className="flex items-center gap-2">
        {/* Sort */}
        <Select value={sort} onValueChange={(v) => onSortChange(v as SortOption)}>
          <SelectTrigger className="h-8 w-48 text-sm">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="best_rated">Best Rated</SelectItem>
            <SelectItem value="price_asc">Price: Low to High</SelectItem>
            <SelectItem value="price_desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>

        {/* View toggle */}
        <div className="flex items-center border rounded-md overflow-hidden">
          <button
            onClick={() => onViewChange('grid')}
            className={`p-1.5 transition-colors ${view === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent text-muted-foreground'}`}
          >
            <Grid2x2 className="size-4" />
          </button>
          <button
            onClick={() => onViewChange('list')}
            className={`p-1.5 transition-colors ${view === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent text-muted-foreground'}`}
          >
            <LayoutList className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
