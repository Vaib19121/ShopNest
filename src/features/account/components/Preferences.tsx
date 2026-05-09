import { Bell, Globe } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SectionHeading } from './shared/ProfileShared'

export interface Prefs {
  orderUpdates: boolean
  promotions: boolean
  newArrivals: boolean
  smsAlerts: boolean
  currency: string
  language: string
}

interface PreferencesProps {
  prefs: Prefs
  onToggle: (key: keyof Prefs) => void
  onPrefChange: (key: keyof Prefs, value: string) => void
}

const TOGGLES: { key: keyof Prefs; label: string; desc: string }[] = [
  { key: 'orderUpdates', label: 'Order updates', desc: 'Shipping, delivery & return notifications' },
  { key: 'promotions', label: 'Promotions & offers', desc: 'Exclusive deals and flash sales' },
  { key: 'newArrivals', label: 'New arrivals', desc: 'Be first to know about new products' },
  { key: 'smsAlerts', label: 'SMS alerts', desc: 'Text messages for urgent updates' },
]

export function Preferences({ prefs, onToggle, onPrefChange }: PreferencesProps) {
  return (
    <section>
      <SectionHeading icon={Bell} title="Preferences & Notifications" />

      <Card className="py-0 divide-y divide-border">
        {TOGGLES.map(({ key, label, desc }) => (
          <div key={key} className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
            <Switch
              checked={!!prefs[key]}
              onCheckedChange={() => onToggle(key)}
            />
          </div>
        ))}

        <Separator />

        <div className="flex flex-col sm:flex-row gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border">
          <div className="flex items-center justify-between gap-4 px-5 py-4 flex-1">
            <div className="flex items-center gap-2.5">
              <Globe className="size-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Currency</p>
                <p className="text-xs text-muted-foreground">Prices displayed in</p>
              </div>
            </div>
            <Select value={prefs.currency} onValueChange={(v) => onPrefChange('currency', v)}>
              <SelectTrigger className="w-24 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD $</SelectItem>
                <SelectItem value="EUR">EUR €</SelectItem>
                <SelectItem value="GBP">GBP £</SelectItem>
                <SelectItem value="INR">INR ₹</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between gap-4 px-5 py-4 flex-1">
            <div className="flex items-center gap-2.5">
              <Globe className="size-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Language</p>
                <p className="text-xs text-muted-foreground">Interface language</p>
              </div>
            </div>
            <Select value={prefs.language} onValueChange={(v) => onPrefChange('language', v)}>
              <SelectTrigger className="w-28 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
    </section>
  )
}
