import { Package, Heart, MessageSquare, Award } from 'lucide-react'
import { Card } from '@/components/ui/card'

const STATS = [
  {
    label: 'Total Orders',
    value: '24',
    icon: Package,
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-950/40',
  },
  {
    label: 'Wishlist Items',
    value: '12',
    icon: Heart,
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-950/40',
  },
  {
    label: 'Reviews Written',
    value: '8',
    icon: MessageSquare,
    color: 'text-sky-600 dark:text-sky-400',
    bg: 'bg-sky-50 dark:bg-sky-950/40',
  },
  {
    label: 'Reward Points',
    value: '2,450',
    icon: Award,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
  },
]

export function StatsBar() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {STATS.map(({ label, value, icon: Icon, color, bg }) => (
        <Card
          key={label}
          className="gap-3 py-5 px-4 hover:shadow-md transition-shadow cursor-default"
        >
          <div className={`size-9 rounded-lg flex items-center justify-center ${bg}`}>
            <Icon className={`size-4.5 ${color}`} />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground leading-none">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{label}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
