import { api } from '@/api/interceptor'
import ENDPOINTS from '@/api/endpoints'
import type {
  CreatePaymentIntentRequest,
  CreatePaymentIntentResponse,
} from '../types/payment.types'

export const paymentService = {
  createPaymentIntent: async (
    body: CreatePaymentIntentRequest,
  ): Promise<CreatePaymentIntentResponse> => {
    const response = await api.post<CreatePaymentIntentResponse>(
      ENDPOINTS.PAYMENTS.CREATE_PAYMENT_INTENT,
      body,
    )
    return response.data
  },
}
