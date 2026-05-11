import { useState } from 'react'
import { MapPin, Pencil, Trash2, Plus } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { SectionHeading } from './shared/ProfileShared'
import { useAddresses, useCreateAddress, useUpdateAddress, useDeleteAddress, useSetPrimaryAddress } from '../hooks/useAddresses'
import type { Address, UpdateAddressPayload } from '../types/address.types'

const EMPTY_FORM: UpdateAddressPayload = {
  label: '',
  line1: '',
  line2: '',
  country: '',
  isPrimary: false,
}

export function SavedAddresses() {
  const { data: addresses, isLoading, isError } = useAddresses()
  const updateAddress = useUpdateAddress()
  const createAddress = useCreateAddress()
  const deleteAddress = useDeleteAddress()
  const setPrimary = useSetPrimaryAddress()

  const [mode, setMode] = useState<'add' | 'edit' | null>(null)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [form, setForm] = useState<UpdateAddressPayload>(EMPTY_FORM)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  function openAdd() {
    setEditingAddress(null)
    setForm(EMPTY_FORM)
    setMode('add')
  }

  function openEdit(addr: Address) {
    setEditingAddress(addr)
    setForm({
      label: addr.label,
      line1: addr.line1,
      line2: addr.line2,
      country: addr.country,
      isPrimary: addr.isPrimary,
    })
    setMode('edit')
  }

  function closeSheet() {
    setMode(null)
    setEditingAddress(null)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (mode === 'edit' && editingAddress) {
      updateAddress.mutate(
        { id: editingAddress.id, payload: form },
        { onSuccess: closeSheet },
      )
    } else if (mode === 'add') {
      createAddress.mutate(form, { onSuccess: closeSheet })
    }
  }

  const isPending = updateAddress.isPending || createAddress.isPending

  function handleDelete() {
    if (deletingId === null) return
    deleteAddress.mutate(deletingId, { onSuccess: () => setDeletingId(null) })
  }

  return (
    <section>
      <SectionHeading icon={MapPin} title="Saved Addresses" />

      <div className="space-y-3">
        {isLoading && (
          <p className="text-sm text-muted-foreground">Loading addresses...</p>
        )}
        {isError && (
          <p className="text-sm text-destructive">Failed to load addresses.</p>
        )}
        {addresses?.map((addr) => (
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
                <button
                  onClick={() => openEdit(addr)}
                  className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Pencil className="size-3.5" />
                </button>
                <button
                  onClick={() => setDeletingId(addr.id)}
                  className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{addr.line1}</p>
            <p className="text-sm text-muted-foreground">{addr.line2}</p>
            <p className="text-xs text-muted-foreground/70">{addr.country}</p>
            {!addr.isPrimary && (
              <button
                onClick={() => setPrimary.mutate(addr.id)}
                disabled={setPrimary.isPending}
                className="mt-1 text-xs text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed w-fit"
              >
                {setPrimary.isPending ? 'Setting...' : 'Set as Primary'}
              </button>
            )}
          </Card>
        ))}

        <button
          onClick={openAdd}
          className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl border-2 border-dashed border-border hover:border-primary/40 hover:bg-primary/[0.02] text-sm text-muted-foreground hover:text-foreground transition-all group/add"
        >
          <Plus className="size-4 group-hover/add:text-primary transition-colors" />
          Add New Address
        </button>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={deletingId !== null} onOpenChange={(open) => !open && setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Address</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this address? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteAddress.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteAddress.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add / Edit Address Sheet */}
      <Sheet open={mode !== null} onOpenChange={(open) => !open && closeSheet()}>
        <SheetContent className='p-4'>
          <SheetHeader>
            <SheetTitle>{mode === 'add' ? 'Add New Address' : 'Edit Address'}</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <div className="space-y-1.5">
              <Label htmlFor="label">Label</Label>
              <Input id="label" name="label" value={form.label} onChange={handleChange} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="line1">Line 1</Label>
              <Input id="line1" name="line1" value={form.line1} onChange={handleChange} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="line2">Line 2</Label>
              <Input id="line2" name="line2" value={form.line2} onChange={handleChange} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="country">Country</Label>
              <Input id="country" name="country" value={form.country} onChange={handleChange} required />
            </div>
            <div className="flex items-center gap-2">
              <input
                id="isPrimary"
                name="isPrimary"
                type="checkbox"
                checked={form.isPrimary}
                onChange={handleChange}
                className="size-4 rounded border-border accent-primary"
              />
              <Label htmlFor="isPrimary">Set as primary address</Label>
            </div>
            <SheetFooter className="mt-2">
              <Button type="button" variant="outline" onClick={closeSheet}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : mode === 'add' ? 'Add Address' : 'Save Changes'}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </section>
  )
}
