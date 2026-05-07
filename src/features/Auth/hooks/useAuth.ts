import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { authService, type AuthResponse, type ForgotPasswordResponse, type VerifyOtpResponse } from "../services/auth.service";
import type { LoginFormValues } from "../schema/loginSchema";
import type { RegisterFormValues } from "../schema/registerSchema";
import { useAuthStore } from "../store/authStore";

// Query keys
export const authKeys = {
  all: ["auth"] as const,
  currentUser: () => [...authKeys.all, "current-user"] as const,
};

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation<AuthResponse, Error, LoginFormValues>({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setUser({
       ...data.data,
      }, {
        accessToken: data.data?.token || '',
        refreshToken: data.data?.refreshToken || '',
      });
      toast.success(data.message || "Login successful!");
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message || "Login failed");
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation<AuthResponse, Error, Omit<RegisterFormValues, "confirmPassword">>({
    mutationFn: authService.register,
    onSuccess: (data) => {
      setUser({
       ...data.data,
      }, {
        accessToken: data?.data?.token || '',
        refreshToken: data?.data?.refreshToken || '',
      });   
      toast.success(data.message || "Registration successful!");
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message || "Registration failed");
    },
  });
};

export const useVerifyOtp = () => {
  return useMutation<VerifyOtpResponse, Error, number>({
    mutationFn: authService.verifyOtp,
    onSuccess: (data) => {
      toast.success(data.message || "OTP verified successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "OTP verification failed");
    },
  });
};

export const useForgotPasswordVerifyOtp = () => {
  return useMutation<ForgotPasswordResponse, Error, { email: string; otp: number }>({
    mutationFn: ({ email, otp }) => authService.forgotPasswordVerifyOtp(email, otp),
    onSuccess: (data) => {
      toast.success(data.message || "OTP verified successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to verify OTP");
    },
  });
};


export const useForgotPassword = () => {
  return useMutation<ForgotPasswordResponse, Error, string>({
    mutationFn: authService.forgotPassword,
    onSuccess: (data) => {
      toast.success(data.message || "Password reset email sent!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send reset email");
    },
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();
  
  return useMutation<ForgotPasswordResponse, Error, { email: string; new_password: string }>({
    mutationFn: ({ email, new_password }) => authService.resetPassword(email, new_password),
    onSuccess: (data) => {
      toast.success(data.message || "Password reset successfully!");
      navigate("/auth/login");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to reset password");
    },
  });
};



// Custom hook to get current user
export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: authService.getCurrentUser,
    staleTime: 10 * 60 * 1000, 
    retry: false,
  });
};
