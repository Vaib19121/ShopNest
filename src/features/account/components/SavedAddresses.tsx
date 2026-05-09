import { MapPin, Pencil, Trash2, Plus } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MOCK_ADDRESSES } from '@/features/account/data/profile.data'
import { SectionHeading } from './shared/ProfileShared'

export function SavedAddresses() {
  return (
    <section>
      <SectionHeading icon={MapPin} title="Saved Addresses" />

      <div className="space-y-3">
        {MOCK_ADDRESSES.map((addr) => (
          <Card key={addr.id} className="py-4 px-4 gap-2">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">{addr.label}</span>
                {addr.isPrimary && (
                  <Badge variant="secondary" className="text-[10px] h-4 px-1.5">
                    Primary
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                  <Pencil className="size-3.5" />
                </button>
                <button className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{addr.line1}</p>
            <p className="text-sm text-muted-foreground">{addr.line2}</p>
            <p className="text-xs text-muted-foreground/70">{addr.country}</p>
          </Card>
        ))}

        <button className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl border-2 border-dashed border-border hover:border-primary/40 hover:bg-primary/[0.02] text-sm text-muted-foreground hover:text-foreground transition-all group/add">
          <Plus className="size-4 group-hover/add:text-primary transition-colors" />
          Add New Address
        </button>
      </div>
    </section>
  )
}
