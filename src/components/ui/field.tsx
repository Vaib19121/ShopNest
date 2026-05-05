import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Field — wraps a label + control + message as a visual unit.
 */
function Field({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex flex-col gap-1.5', className)} {...props} />
}

/**
 * FieldGroup — vertical stack of Field items with consistent spacing.
 */
function FieldGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-5', className)} {...props} />
  )
}

/**
 * FieldLabel — a semantic label element styled to match shadcn's design.
 */
function FieldLabel({
  className,
  ...props
}: React.ComponentProps<'label'>) {
  return (
    <label
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      {...props}
    />
  )
}

/**
 * FieldDescription — secondary helper text below a field.
 */
function FieldDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

export { Field, FieldGroup, FieldLabel, FieldDescription }
