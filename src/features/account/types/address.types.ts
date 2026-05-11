export interface Address {
  id: number
  label: string
  line1: string
  line2: string
  country: string
  isPrimary: boolean
}

export interface UpdateAddressPayload {
  label: string
  line1: string
  line2: string
  country: string
  isPrimary: boolean
}

export interface AddressApiResponse {
  data: Address
  message: string
  success: boolean
  timestamp: string
}

export interface AddressesApiResponse {
  data: Address[]
  message: string
  success: boolean
  timestamp: string
}
