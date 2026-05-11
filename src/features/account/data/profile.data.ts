import { Check, Truck, CircleX } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Order {
  id: string
  product: string
  image: string
  status: OrderStatus
  date: string
  price: number
}

export interface Address {
  id: number
  label: string
  line1: string
  line2: string
  country: string
  isPrimary: boolean
}

export interface PaymentCard {
  id: number
  type: string
  last4: string
  expiry: string
  isPrimary: boolean
}

export type OrderStatus = 'PENDING' | 'DELIVERED' | 'IN_TRANSIT' | 'CANCELLED'

// ─── Status Config ────────────────────────────────────────────────────────────

export const STATUS_CONFIG = {
  PENDING: {
    label: 'Pending',
    icon: Truck,
    className:
      'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/40 dark:text-yellow-400 dark:border-yellow-800',
  },
  DELIVERED: {
    label: 'Delivered',
    icon: Check,
    className:
      'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800',
  },
  IN_TRANSIT: {
    label: 'In Transit',
    icon: Truck,
    className:
      'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800',
  },
  CANCELLED: {
    label: 'Cancelled',
    icon: CircleX,
    className:
      'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800',
  },
} as const



export const MOCK_ADDRESSES: Address[] = [
  {
    id: 1,
    label: 'Home',
    line1: '42 Maple Street, Apt 3B',
    line2: 'Brooklyn, New York 11201',
    country: 'United States',
    isPrimary: true,
  },
  {
    id: 2,
    label: 'Office',
    line1: '350 5th Avenue, Floor 22',
    line2: 'Manhattan, New York 10118',
    country: 'United States',
    isPrimary: false,
  },
]

export const MOCK_CARDS: PaymentCard[] = [
  { id: 1, type: 'Visa', last4: '4291', expiry: '09/27', isPrimary: true },
  { id: 2, type: 'Mastercard', last4: '8834', expiry: '03/26', isPrimary: false },
]
