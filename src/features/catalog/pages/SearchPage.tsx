import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Search, ChevronLeft, ChevronRight, PackageSearch } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ProductCard } from '../components/ProductCard'
import { useSearchProducts } from '../hooks/useProducts'

function SearchResultSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="aspect-square rounded-lg bg-muted animate-pulse" />
          <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
          <div className="h-4 w-1/2 rounded bg-muted animate-pulse" />
          <div className="h-4 w-1/3 rounded bg-muted animate-pulse" />
        </div>
      ))}
    </div>
  )
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const urlQuery = searchParams.get('q') ?? ''
  const urlPage = Number(searchParams.get('page') ?? '0')

  const [inputValue, setInputValue] = useState(urlQuery)

  // Keep input in sync if URL changes externally (e.g. Navbar navigation)
  useEffect(() => {
    setInputValue(urlQuery)
  }, [urlQuery])

  const { data, isLoading, isError, isFetching } = useSearchProducts(urlQuery, urlPage)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = inputValue.trim()
    if (!q) return
    setSearchParams({ q, page: '0' })
  }

  const goToPage = (page: number) => {
    setSearchParams({ q: urlQuery, page: String(page) })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search bar */}
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-xl mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search products..."
              className="pl-9"
              autoFocus
            />
          </div>
          <Button type="submit" disabled={!inputValue.trim()}>
            Search
          </Button>
        </form>

        {/* Header / result count */}
        {urlQuery && !isLoading && data && (
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">
              Search results for &ldquo;{urlQuery}&rdquo;
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {data.totalElements} {data.totalElements === 1 ? 'result' : 'results'} found
            </p>
          </div>
        )}

        {/* Empty prompt */}
        {!urlQuery && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <PackageSearch className="h-16 w-16 text-muted-foreground/40 mb-4" />
            <h2 className="text-xl font-medium text-muted-foreground">Start searching</h2>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Type a product name, brand, or category above
            </p>
          </div>
        )}

        {/* Loading skeleton */}
        {isLoading && urlQuery && <SearchResultSkeleton />}

        {/* Error */}
        {isError && urlQuery && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-destructive font-medium">Something went wrong. Please try again.</p>
            <Button variant="outline" className="mt-4" onClick={() => navigate(0)}>
              Retry
            </Button>
          </div>
        )}

        {/* No results */}
        {!isLoading && !isError && urlQuery && data?.content.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <PackageSearch className="h-16 w-16 text-muted-foreground/40 mb-4" />
            <h2 className="text-xl font-medium">No results for &ldquo;{urlQuery}&rdquo;</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Try a different keyword or check your spelling
            </p>
          </div>
        )}

        {/* Results grid */}
        {!isLoading && data && data.content.length > 0 && (
          <div className={isFetching ? 'opacity-60 pointer-events-none' : ''}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.content.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {data.totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-10">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(urlPage - 1)}
                  disabled={data.isFirst}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>

                <span className="text-sm text-muted-foreground">
                  Page {urlPage + 1} of {data.totalPages}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(urlPage + 1)}
                  disabled={data.isLast}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
