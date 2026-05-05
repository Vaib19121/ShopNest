import { ArrowRight, Sparkles, ShieldCheck, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const perks = [
  { icon: Truck, label: 'Free Shipping over $50' },
  { icon: ShieldCheck, label: 'Secure Payments' },
  { icon: Sparkles, label: 'Exclusive Deals Daily' },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6 text-center md:text-left items-center md:items-start">
            <Badge variant="outline" className="w-fit gap-1.5 px-3 py-1 text-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              New Arrivals — Summer Collection 2026
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
              Discover Your{' '}
              <span className="text-primary">Perfect</span>{' '}
              Style
            </h1>

            <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
              Shop thousands of curated products from top brands. Unbeatable prices,
              fast shipping, and hassle-free returns — all in one place.
            </p>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Button size="lg" className="gap-2 px-6">
                Shop Now <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="px-6">
                Explore Collections
              </Button>
            </div>

            {/* Perks */}
            <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
              {perks.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="h-4 w-4 text-primary shrink-0" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Main card */}
              <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center justify-center">
                <div className="text-center px-8">
                  <div className="text-8xl mb-4">🛍️</div>
                  <p className="text-2xl font-bold text-foreground">Up to 50% Off</p>
                  <p className="text-muted-foreground mt-1">On selected items</p>
                </div>
              </div>

              {/* Floating badge 1 */}
              <div className="absolute -top-2 -left-4 bg-background border rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <div>
                  <p className="text-xs font-semibold">Top Rated</p>
                  <p className="text-xs text-muted-foreground">4.9 / 5.0</p>
                </div>
              </div>

              {/* Floating badge 2 */}
              <div className="absolute -bottom-2 -right-4 bg-background border rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                <div>
                  <p className="text-xs font-semibold">Fast Delivery</p>
                  <p className="text-xs text-muted-foreground">2-3 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="border-t bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '50K+', label: 'Products' },
              { value: '200K+', label: 'Happy Customers' },
              { value: '500+', label: 'Brands' },
              { value: '4.9★', label: 'Average Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
