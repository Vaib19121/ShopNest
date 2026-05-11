import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { addressService } from '../services/address.service'
import type { Address, UpdateAddressPayload } from '../types/address.types'

export const addressKeys = {
  all: ['addresses'] as const,
}

export function useAddresses() {
  return useQuery<Address[], Error>({
    queryKey: addressKeys.all,
    queryFn: () => addressService.getAddresses().then((res) => res.data),
  })
}

export function useCreateAddress() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateAddressPayload) => addressService.createAddress(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.all })
    },
  })
}

export function useUpdateAddress() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateAddressPayload }) =>
      addressService.updateAddress(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.all })
    },
  })
}

export const useDeleteAddress = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => addressService.deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.all })
    },
  })
}

export const useSetPrimaryAddress = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => addressService.setPrimaryAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.all })
    },
  })
}
