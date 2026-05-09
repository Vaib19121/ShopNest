import { useState } from 'react'
import { MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { ShippingDetails } from '../types/payment.types'

interface ShippingFormProps {
  onChange: (details: ShippingDetails | null) => void
}

const EMPTY: ShippingDetails = {
  name: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'IN',
}

function isComplete(f: ShippingDetails): boolean {
  return !!(f.name && f.addressLine1 && f.city && f.state && f.postalCode && f.country)
}

export function ShippingForm({ onChange }: ShippingFormProps) {
  const [form, setForm] = useState<ShippingDetails>(EMPTY)

  function update<K extends keyof ShippingDetails>(key: K, val: ShippingDetails[K]) {
    const next = { ...form, [key]: val }
    setForm(next)
    onChange(isComplete(next) ? next : null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center size-8 rounded-lg bg-primary/8 dark:bg-primary/15">
          <MapPin className="size-4 text-primary" />
        </div>
        <h2 className="text-sm font-semibold text-foreground">Shipping Details</h2>
      </div>

      <div className="grid gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="ship-name" className="text-xs font-medium">Full Name *</Label>
          <Input
            id="ship-name"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="ship-line1" className="text-xs font-medium">Address Line 1 *</Label>
          <Input
            id="ship-line1"
            placeholder="123 Main Street"
            value={form.addressLine1}
            onChange={(e) => update('addressLine1', e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="ship-line2" className="text-xs font-medium text-muted-foreground">Address Line 2</Label>
          <Input
            id="ship-line2"
            placeholder="Apt, suite, floor (optional)"
            value={form.addressLine2 ?? ''}
            onChange={(e) => update('addressLine2', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="ship-city" className="text-xs font-medium">City *</Label>
            <Input
              id="ship-city"
              placeholder="Mumbai"
              value={form.city}
              onChange={(e) => update('city', e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ship-state" className="text-xs font-medium">State *</Label>
            <Input
              id="ship-state"
              placeholder="Maharashtra"
              value={form.state}
              onChange={(e) => update('state', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="ship-postal" className="text-xs font-medium">Postal Code *</Label>
            <Input
              id="ship-postal"
              placeholder="400001"
              value={form.postalCode}
              onChange={(e) => update('postalCode', e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ship-country" className="text-xs font-medium">Country Code *</Label>
            <Input
              id="ship-country"
              placeholder="IN"
              maxLength={2}
              value={form.country}
              onChange={(e) => update('country', e.target.value.toUpperCase())}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
