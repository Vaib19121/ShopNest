import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Label } from '@/components/ui/label'
import { Star } from 'lucide-react'
import { BRANDS, COLORS, PRICE_MIN, PRICE_MAX } from '../data/mockProducts'
import { useCategories } from '../hooks/useProducts'
import type { FilterState } from '../types/product.types'

interface FiltersProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  onClear: () => void
}

export function FiltersPanel({ filters, onChange, onClear }: FiltersProps) {
  const [brandSearch, setBrandSearch] = useState('')
  const { data: categories, isLoading: loadingCategories } = useCategories()

  const activeCount =
    filters.categories.length +
    filters.brands.length +
    filters.colors.length +
    (filters.rating !== null ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.priceRange[0] !== PRICE_MIN || filters.priceRange[1] !== PRICE_MAX ? 1 : 0)

  const toggleArr = (arr: string[], value: string) =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]

  const filteredBrands = BRANDS.filter((b) =>
    b.toLowerCase().includes(brandSearch.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">Filters</span>
          {activeCount > 0 && (
            <Badge variant="secondary" className="text-xs px-1.5 py-0">
              {activeCount}
            </Badge>
          )}
        </div>
        {activeCount > 0 && (
          <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground px-2" onClick={onClear}>
            <X className="size-3 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={['categories', 'price', 'brands', 'rating', 'availability', 'colors']} className="w-full">

        {/* Categories */}
        <AccordionItem value="categories" className="border-b">
          <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline">
            <span className="flex items-center gap-2">
              Category
              {filters.categories.length > 0 && (
                <Badge variant="secondary" className="text-xs px-1.5 py-0">{filters.categories.length}</Badge>
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="flex flex-col gap-2.5">
              {loadingCategories ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="size-4 rounded bg-muted animate-pulse" />
                    <div className="h-3.5 w-24 rounded bg-muted animate-pulse" />
                  </div>
                ))
              ) : (
                categories?.map((cat) => (
                  <div key={cat.id} className="flex items-center gap-2.5">
                    <Checkbox
                      id={`cat-${cat.id}`}
                      checked={filters.categories.includes(cat.name)}
                      onCheckedChange={() =>
                        onChange({ ...filters, categories: toggleArr(filters.categories, cat.name) })
                      }
                    />
                    <Label htmlFor={`cat-${cat.id}`} className="text-sm cursor-pointer font-normal flex-1">
                      {cat.name}
                    </Label>
                    <span className="text-xs text-muted-foreground">{cat.productCount}</span>
                  </div>
                ))
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price" className="border-b">
          <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline">
            <span className="flex items-center gap-2">
              Price Range
              {(filters.priceRange[0] !== PRICE_MIN || filters.priceRange[1] !== PRICE_MAX) && (
                <Badge variant="secondary" className="text-xs px-1.5 py-0">1</Badge>
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <Slider
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={100}
              value={filters.priceRange}
              onValueChange={(val) => onChange({ ...filters, priceRange: val as [number, number] })}
              className="mt-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-3">
              <span>₹{filters.priceRange[0].toLocaleString()}</span>
              <span>₹{filters.priceRange[1].toLocaleString()}</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Brands */}
        <AccordionItem value="brands" className="border-b">
          <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline">
            <span className="flex items-center gap-2">
              Brand
              {filters.brands.length > 0 && (
                <Badge variant="secondary" className="text-xs px-1.5 py-0">{filters.brands.length}</Badge>
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="relative mb-3">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input
                placeholder="Search brands..."
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                className="pl-8 h-8 text-sm"
              />
            </div>
            <ScrollArea className="h-40">
              <div className="flex flex-col gap-2.5 pr-2">
                {filteredBrands.map((brand) => (
                  <div key={brand} className="flex items-center gap-2.5">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={filters.brands.includes(brand)}
                      onCheckedChange={() =>
                        onChange({ ...filters, brands: toggleArr(filters.brands, brand) })
                      }
                    />
                    <Label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer font-normal">
                      {brand}
                    </Label>
                  </div>
                ))}
                {filteredBrands.length === 0 && (
                  <p className="text-xs text-muted-foreground">No brands found</p>
                )}
              </div>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>

        {/* Rating */}
        <AccordionItem value="rating" className="border-b">
          <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline">
            <span className="flex items-center gap-2">
              Rating
              {filters.rating !== null && (
                <Badge variant="secondary" className="text-xs px-1.5 py-0">1</Badge>
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="flex flex-col gap-2">
              {[4, 3, 2, 1].map((stars) => (
                <button
                  key={stars}
                  onClick={() =>
                    onChange({ ...filters, rating: filters.rating === stars ? null : stars })
                  }
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent ${
                    filters.rating === stars ? 'bg-accent font-medium' : ''
                  }`}
                >
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-3.5 ${i < stars ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted-foreground'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">& above</span>
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Availability */}
        <AccordionItem value="availability" className="border-b">
          <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline">
            <span className="flex items-center gap-2">
              Availability
              {filters.inStockOnly && (
                <Badge variant="secondary" className="text-xs px-1.5 py-0">1</Badge>
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
                In Stock only
              </Label>
              <Switch
                id="in-stock"
                checked={filters.inStockOnly}
                onCheckedChange={(checked) => onChange({ ...filters, inStockOnly: checked })}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Colors */}
        <AccordionItem value="colors" className="border-0">
          <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline">
            <span className="flex items-center gap-2">
              Color
              {filters.colors.length > 0 && (
                <Badge variant="secondary" className="text-xs px-1.5 py-0">{filters.colors.length}</Badge>
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="flex flex-wrap gap-2">
              {COLORS.map((color) => {
                const selected = filters.colors.includes(color.value)
                return (
                  <button
                    key={color.value}
                    title={color.label}
                    onClick={() =>
                      onChange({ ...filters, colors: toggleArr(filters.colors, color.value) })
                    }
                    className={`size-7 rounded-full border-2 transition-all hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      selected ? 'border-primary scale-110 ring-2 ring-primary ring-offset-1' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                )
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  )
}
