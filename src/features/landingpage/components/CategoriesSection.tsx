import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const categories = [
  {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=300&fit=crop&auto=format',
    name: "Women's Fashion",
    count: '1,240 items',
    color: 'from-rose-500/10 to-pink-500/5',
  },
  {
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=300&h=300&fit=crop&auto=format',
    name: "Men's Wear",
    count: '980 items',
    color: 'from-blue-500/10 to-indigo-500/5',
  },
  {
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop&auto=format',
    name: 'Footwear',
    count: '650 items',
    color: 'from-amber-500/10 to-yellow-500/5',
  },
  {
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=300&fit=crop&auto=format',
    name: 'Electronics',
    count: '430 items',
    color: 'from-violet-500/10 to-purple-500/5',
  },
  {
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop&auto=format',
    name: 'Home & Living',
    count: '870 items',
    color: 'from-emerald-500/10 to-green-500/5',
  },
  {
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop&auto=format',
    name: 'Beauty',
    count: '560 items',
    color: 'from-fuchsia-500/10 to-pink-500/5',
  },
  {
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=300&h=300&fit=crop&auto=format',
    name: 'Sports',
    count: '340 items',
    color: 'from-orange-500/10 to-red-500/5',
  },
  {
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop&auto=format',
    name: 'Bags & Accessories',
    count: '720 items',
    color: 'from-teal-500/10 to-cyan-500/5',
  },
]

export function CategoriesSection() {
  return (
    <section id="categories" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Browse</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Shop by Category</h2>
            <p className="text-muted-foreground mt-2">Find what you're looking for in our curated collections</p>
          </div>
          <Button variant="ghost" className="hidden sm:flex gap-1 text-sm">
            All Categories <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Card
              key={cat.name}
              className={`group cursor-pointer hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 bg-gradient-to-br ${cat.color} border-border/60 overflow-hidden p-0`}
            >
              <div className="overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <CardContent className="p-4 text-center">
                <p className="font-semibold text-foreground text-sm leading-tight">{cat.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{cat.count}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Button variant="outline" className="gap-1">
            View All Categories <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
