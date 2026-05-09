import { useMutation } from '@tanstack/react-query'
import { paymentService } from '../services/payment.service'
import type {
  CreatePaymentIntentRequest,
  PaymentIntentData,
} from '../types/payment.types'

export function useCreatePaymentIntent() {
  return useMutation<PaymentIntentData, Error, CreatePaymentIntentRequest>({
    mutationFn: (body) =>
      paymentService.createPaymentIntent(body).then((res) => res.data),
  })
}
