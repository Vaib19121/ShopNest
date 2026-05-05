import { Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

const testimonials = [
  {
    name: 'Sarah M.',
    initials: 'SM',
    role: 'Fashion Enthusiast',
    rating: 5,
    review:
      "Absolutely love ShopNest! The quality of the clothes exceeded my expectations and delivery was super fast. Will definitely be ordering again!",
    product: 'Linen Summer Dress',
    avatarColor: 'bg-rose-100 text-rose-700',
  },
  {
    name: 'James R.',
    initials: 'JR',
    role: 'Tech Reviewer',
    rating: 5,
    review:
      "Got the noise-cancelling headphones and they are phenomenal. Best price I found online and the customer support was incredibly helpful.",
    product: 'Wireless Headphones',
    avatarColor: 'bg-violet-100 text-violet-700',
  },
  {
    name: 'Priya K.',
    initials: 'PK',
    role: 'Lifestyle Blogger',
    rating: 5,
    review:
      "The skincare set is a game changer! My skin has never looked better. Packaging was beautiful and everything arrived perfectly intact.",
    product: 'Bamboo Skincare Set',
    avatarColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    name: 'Tom H.',
    initials: 'TH',
    role: 'Remote Worker',
    rating: 4,
    review:
      "The ergonomic chair is exactly what I needed for my home office. Comfortable for long sessions and assembly was straightforward.",
    product: 'Ergonomic Office Chair',
    avatarColor: 'bg-blue-100 text-blue-700',
  },
  {
    name: 'Aisha L.',
    initials: 'AL',
    role: 'Fitness Trainer',
    rating: 5,
    review:
      "The water bottle keeps my drinks cold for 24 hours — no exaggeration! Great build quality. I've already recommended it to my whole gym class.",
    product: 'Stainless Steel Bottle',
    avatarColor: 'bg-sky-100 text-sky-700',
  },
  {
    name: 'Carlos V.',
    initials: 'CV',
    role: 'Frequent Traveler',
    rating: 5,
    review:
      "This backpack is a traveler's dream. Fits my laptop, camera, and all my essentials perfectly. The build quality is outstanding.",
    product: 'Smart Backpack 30L',
    avatarColor: 'bg-teal-100 text-teal-700',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted'
          }`}
        />
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Reviews</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">What Our Customers Say</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Join over 200,000 happy customers who trust ShopNest for their everyday needs.
          </p>

          {/* Overall rating */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-lg font-bold text-foreground">4.9</span>
            <span className="text-muted-foreground text-sm">based on 12,400+ reviews</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <Card key={t.name} className="hover:shadow-md transition-shadow duration-300 border-border/60">
              <CardContent className="p-6 flex flex-col gap-4">
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className={`text-sm font-semibold ${t.avatarColor}`}>
                        {t.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                  <StarRating rating={t.rating} />
                </div>

                {/* Review */}
                <p className="text-sm text-muted-foreground leading-relaxed">"{t.review}"</p>

                {/* Product badge */}
                <Badge variant="outline" className="w-fit text-xs">
                  Purchased: {t.product}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
