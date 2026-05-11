const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY_OTP: '/auth/verify-otp/',
    FORGOT_PASSWORD: '/auth/forgot-password/',
    FORGOT_PASSWORD_VERIFY_OTP: '/auth/forgot-password/verify-otp/',
    RESET_PASSWORD: '/auth/reset-password/',
    GET_CURRENT_USER: '/auth/me/',
  },
  PRODUCTS:{
    GET_PRODUCTS: '/products',
    GET_PRODUCT_DETAIL: (id: number) => `/products/${id}/`,
    FILTER_PRODUCTS: '/products/filter',
    SEARCH_PRODUCTS: '/products/search',
  },
  CART:{
    GET_CART: '/cart',
    ADD_TO_CART: '/cart/items',
    REMOVE_FROM_CART_BY_ID: (id: number) => `/cart/items/${id}`,
    UPDATE_CART_ITEM_BY_ID: (id: number) => `/cart/items/${id}`,
    CLEAR_CART: '/cart',
  },
  WISHLIST:{
      GET_WISHLIST: '/wishlist',
      ADD_TO_WISHLIST: '/wishlist/items',
      REMOVE_FROM_WISHLIST_BY_ID: (id: number) => `/wishlist/items/${id}`,
      CLEAR_WISHLIST: '/wishlist',
  },
  CATEGORIES:{
    GET_CATEGORIES: '/categories',
  },
  ORDERS: {
    GET_ORDERS: '/orders',
    GET_ORDER_DETAIL: (id: number) => `/orders/${id}`,
  },
  PAYMENTS:{
    CREATE_PAYMENT_INTENT: '/payments/create-intent',
  },
  ADDRESSES: {
    GET_ADDRESSES: '/addresses',
    ADD_ADDRESS: '/addresses',
    GET_ADDRESS_BY_ID: (id: number) => `/addresses/${id}`,
    UPDATE_ADDRESS_BY_ID: (id: number) => `/addresses/${id}`,
    DELETE_ADDRESS_BY_ID: (id: number) => `/addresses/${id}`,
    SET_PRIMARY_ADDRESS_BY_ID: (id: number) => `/addresses/${id}/primary`,
  },
} as const

export default ENDPOINTS
