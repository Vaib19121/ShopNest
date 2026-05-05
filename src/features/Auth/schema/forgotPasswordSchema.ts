import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().optional(),
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
