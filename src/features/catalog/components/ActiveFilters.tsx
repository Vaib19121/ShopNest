import { X, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { COLORS, PRICE_MIN, PRICE_MAX } from '../data/mockProducts'
import type { FilterState } from '../types/product.types'

interface ActiveFiltersProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  onClear: () => void
}

export function ActiveFilters({ filters, onChange, onClear }: ActiveFiltersProps) {
  const chips: { label: string; onRemove: () => void }[] = []

  filters.categories.forEach((cat) =>
    chips.push({ label: cat, onRemove: () => onChange({ ...filters, categories: filters.categories.filter((c) => c !== cat) }) })
  )

  filters.brands.forEach((brand) =>
    chips.push({ label: brand, onRemove: () => onChange({ ...filters, brands: filters.brands.filter((b) => b !== brand) }) })
  )

  if (filters.priceRange[0] !== PRICE_MIN || filters.priceRange[1] !== PRICE_MAX) {
    chips.push({
      label: `₹${filters.priceRange[0].toLocaleString()} – ₹${filters.priceRange[1].toLocaleString()}`,
      onRemove: () => onChange({ ...filters, priceRange: [PRICE_MIN, PRICE_MAX] }),
    })
  }

  if (filters.rating !== null) {
    chips.push({
      label: `${filters.rating}★ & above`,
      onRemove: () => onChange({ ...filters, rating: null }),
    })
  }

  if (filters.inStockOnly) {
    chips.push({
      label: 'In Stock',
      onRemove: () => onChange({ ...filters, inStockOnly: false }),
    })
  }

  filters.colors.forEach((colorVal) => {
    const color = COLORS.find((c) => c.value === colorVal)
    if (color)
      chips.push({
        label: color.label,
        onRemove: () => onChange({ ...filters, colors: filters.colors.filter((c) => c !== colorVal) }),
      })
  })

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <Badge
          key={chip.label}
          variant="secondary"
          className="flex items-center gap-1 pl-2.5 pr-1 py-1 text-xs font-normal"
        >
          {chip.label}
          <button onClick={chip.onRemove} className="ml-0.5 rounded-full hover:text-destructive transition-colors">
            <X className="size-3" />
          </button>
        </Badge>
      ))}
      <Button
        variant="ghost"
        size="sm"
        className="h-6 text-xs text-muted-foreground hover:text-destructive px-2"
        onClick={onClear}
      >
        Clear all
      </Button>
    </div>
  )
}
