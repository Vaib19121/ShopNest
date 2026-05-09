import { CreditCard, Plus, BadgeCheck, Wallet } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { MOCK_CARDS } from '@/features/account/data/profile.data'
import { SectionHeading, CardBrandLogo } from './shared/ProfileShared'

export function PaymentMethods() {
  return (
    <section>
      <SectionHeading icon={CreditCard} title="Payment Methods" />

      <div className="space-y-3">
        {MOCK_CARDS.map((card) => (
          <Card key={card.id} className="py-4 px-4 gap-3 relative overflow-hidden">
            <div className="absolute right-0 top-0 size-28 rounded-full bg-gradient-to-br from-primary/5 to-transparent -translate-y-6 translate-x-6" />

            <div className="flex items-center justify-between relative">
              <CardBrandLogo type={card.type} />
              {card.isPrimary && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                  <BadgeCheck className="size-3.5" />
                  Primary
                </span>
              )}
            </div>

            <div className="flex items-end justify-between relative">
              <div>
                <p className="text-base font-mono font-medium tracking-[0.2em] text-foreground">
                  •••• •••• •••• {card.last4}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Expires {card.expiry}</p>
              </div>
              <Wallet className="size-5 text-muted-foreground/40" />
            </div>
          </Card>
        ))}

        <button className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl border-2 border-dashed border-border hover:border-primary/40 hover:bg-primary/[0.02] text-sm text-muted-foreground hover:text-foreground transition-all group/add">
          <Plus className="size-4 group-hover/add:text-primary transition-colors" />
          Add Payment Method
        </button>
      </div>
    </section>
  )
}
