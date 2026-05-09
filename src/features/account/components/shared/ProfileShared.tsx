import type { STATUS_CONFIG } from '@/features/account/data/profile.data'

export function SectionHeading({
  icon: Icon,
  title,
}: {
  icon: React.ElementType
  title: string
}) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <div className="flex items-center justify-center size-8 rounded-lg bg-primary/8 dark:bg-primary/15">
        <Icon className="size-4 text-primary" />
      </div>
      <h2 className="text-base font-semibold tracking-tight text-foreground">{title}</h2>
    </div>
  )
}

export function OrderStatusPill({
  status,
  config,
}: {
  status: string
  config: typeof STATUS_CONFIG
}) {
  const cfg = config[status as keyof typeof config]
  const Icon = cfg.icon
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${cfg.className}`}
    >
      <Icon className="size-3" />
      {cfg.label}
    </span>
  )
}

export function CardBrandLogo({ type }: { type: string }) {
  if (type === 'Visa') {
    return (
      <span className="text-[11px] font-black tracking-widest italic text-blue-700 dark:text-blue-400 leading-none">
        VISA
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-0.5">
      <span className="size-5 rounded-full bg-red-500 opacity-90" />
      <span className="size-5 rounded-full bg-amber-400 opacity-90 -ml-2.5" />
    </span>
  )
}
