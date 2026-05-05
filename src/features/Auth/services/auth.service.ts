
import { api } from "../../../api/interceptor";
import type { LoginFormValues } from "../schema/loginSchema";
import type { RegisterFormValues } from "../schema/registerSchema";
import Cookies from "js-cookie";
import ENDPOINTS from "@/api/endpoints";

type registerDataSchema = Omit<RegisterFormValues, "confirmPassword">;

export interface AuthResponse {
  success: boolean;
  message: string;
  timestamp: string;
  data: Token;
}

export interface Token {
  email: string;
  token: string;
  refreshToken: string;
  type: string;
  role: string;
}

export interface User {
  email: string;
  first_name?: string;
  last_name?: string;
  role?: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  data: {
    verified: boolean;
  };
}

export interface ForgotPasswordResponse {
  message: string;
}

export const authService = {
  login: async (data: LoginFormValues): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, data);
    
    return response.data;
  },

  register: async (data: registerDataSchema): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(ENDPOINTS.AUTH.REGISTER, data);
    
    return response.data;
  },

  verifyOtp: async (otp: number): Promise<VerifyOtpResponse> => {
    const response = await api.post<VerifyOtpResponse>(ENDPOINTS.AUTH.VERIFY_OTP, { otp });
    return response.data;
  },

  forgotPasswordVerifyOtp: async (email: string, otp: number): Promise<VerifyOtpResponse> => {
    const response = await api.post<VerifyOtpResponse>(ENDPOINTS.AUTH.FORGOT_PASSWORD_VERIFY_OTP, { email, otp });
    return response.data;
  },

  forgotPassword: async (email: string): Promise<ForgotPasswordResponse> => {
    const response = await api.post<ForgotPasswordResponse>(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    return response.data;
  },

  resetPassword: async (email: string, new_password: string): Promise<ForgotPasswordResponse> => {
    const response = await api.post<ForgotPasswordResponse>(ENDPOINTS.AUTH.RESET_PASSWORD, { email, new_password });
    return response.data;
  },

  logout: () => {
    const refresh = Cookies.get("refresh-token");
    const response = api.post(ENDPOINTS.AUTH.LOGOUT, { refresh });
    return response;
  },

  // Get current user
  getCurrentUser: async (): Promise<{ data: User }> => {
    const response = await api.get<{ data: User }>(ENDPOINTS.AUTH.GET_CURRENT_USER);
    return response.data;
  },
};