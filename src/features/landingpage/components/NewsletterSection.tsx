import { useState } from 'react'
import { ArrowRight, Mail, Tag, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

const deals = [
  { emoji: '🔥', label: 'Flash Sale', desc: 'Up to 70% off electronics', time: 'Ends in 2h 30m' },
  { emoji: '🎁', label: 'Bundle & Save', desc: 'Buy 2, get 1 free on fashion', time: 'Limited stock' },
  { emoji: '⚡', label: 'Daily Deal', desc: 'Shoes starting at $29.99', time: 'Today only' },
]

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <>
      {/* Deals Banner */}
      <section id="deals" className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Don't miss out</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Today's Hot Deals</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {deals.map((deal) => (
              <div
                key={deal.label}
                className="group relative overflow-hidden rounded-2xl border bg-background p-6 hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl shrink-0">{deal.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-foreground">{deal.label}</p>
                      <Badge variant="destructive" className="text-[10px] px-1.5 py-0">HOT</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{deal.desc}</p>
                    <div className="flex items-center gap-1 mt-3">
                      <Zap className="h-3.5 w-3.5 text-amber-500" />
                      <span className="text-xs font-medium text-amber-600 dark:text-amber-400">{deal.time}</span>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="mt-4 w-full gap-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  Shop Now <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Mail className="h-6 w-6 opacity-80" />
              <Tag className="h-5 w-5 opacity-80" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Get Exclusive Deals in Your Inbox
            </h2>
            <p className="text-primary-foreground/70 mb-8 text-lg">
              Subscribe and be the first to know about flash sales, new arrivals, and member-only discounts.
              Get 10% off your first order!
            </p>

            {subscribed ? (
              <div className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl px-6 py-4 text-primary-foreground">
                🎉 You're subscribed! Check your inbox for your 10% off coupon.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground/30 flex-1"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  className="shrink-0 gap-1 font-semibold"
                >
                  Subscribe <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            )}

            <p className="text-primary-foreground/50 text-xs mt-4">
              No spam, ever. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
