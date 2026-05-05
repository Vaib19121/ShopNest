const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout/',
    VERIFY_OTP: '/auth/verify-otp/',
    FORGOT_PASSWORD: '/auth/forgot-password/',
    FORGOT_PASSWORD_VERIFY_OTP: '/auth/forgot-password/verify-otp/',
    RESET_PASSWORD: '/auth/reset-password/',
    GET_CURRENT_USER: '/auth/me/',
  },
} as const

export default ENDPOINTS
