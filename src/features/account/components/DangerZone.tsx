import { ShieldAlert, LogOut, Trash2, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { SectionHeading } from './shared/ProfileShared'

interface DangerZoneProps {
  onLogout: () => void
}

export function DangerZone({ onLogout }: DangerZoneProps) {
  return (
    <section>
      <SectionHeading icon={ShieldAlert} title="Account" />

      <Card className="py-0 divide-y divide-border overflow-hidden">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-5 py-4 text-sm hover:bg-muted transition-colors text-left"
        >
          <LogOut className="size-4 text-muted-foreground" />
          <span className="font-medium text-foreground">Sign out</span>
          <ChevronRight className="size-4 text-muted-foreground ml-auto" />
        </button>

        <div className="px-5 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Trash2 className="size-4 text-destructive/70" />
            <div>
              <p className="text-sm font-medium text-foreground">Delete account</p>
              <p className="text-xs text-muted-foreground">
                Permanently remove your account and all data
              </p>
            </div>
          </div>
          <button className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium text-destructive border border-destructive/30 hover:bg-destructive/10 transition-colors">
            Delete
          </button>
        </div>
      </Card>
    </section>
  )
}
