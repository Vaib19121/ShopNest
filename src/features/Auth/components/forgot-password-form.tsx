import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "../schema/forgotPasswordSchema";
import { useState } from "react";
import { useForgotPassword, useForgotPasswordVerifyOtp } from "../hooks/useAuth";
import { useNavigate } from "react-router";

export function ForgotPasswordForm({ ...props }: React.ComponentProps<"form">) {
  const navigate = useNavigate();
  const {mutate: verifyOtp, isPending: isVerifyingOtp} = useForgotPasswordVerifyOtp();
  const { mutate: forgotPassword, isPending: isSendingOtp } = useForgotPassword();
  const [isOtpSent, setIsOtpSent] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    if (!isOtpSent) {
      forgotPassword(data.email, {
        onSuccess: () => {
          setIsOtpSent(true);
        },
      });
    } else {
      if (data.otp && data.otp.length === 6) {
        verifyOtp({ email: data.email, otp: Number(data.otp) }, {
          onSuccess: () => {
            navigate(`/reset-password?email=${encodeURIComponent(data.email)}`);
          },
        });
      }
    }
  };

  return (
    <Form {...form} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Forgot Password</h1>
            <p className="text-muted-foreground text-sm text-balance">
              {isOtpSent
                ? "OTP has been sent to your email address"
                : "Enter your email address and we'll send you an OTP"}
            </p>
          </div>

          {!isOtpSent ? (
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Field>
          ) : (
            <>
              <div className="rounded-lg border border-green-500/50 bg-green-50 dark:bg-green-950/20 p-4 text-center">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  OTP Successfully Sent!
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  Please check your email for the verification code
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="otp" className="sr-only">
                  Verification code
                </FieldLabel>
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex justify-center">
                          <InputOTP 
                            maxLength={6} 
                            id="otp" 
                            value={field.value}
                            onChange={field.onChange}
                          >
                            <InputOTPGroup className="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FieldDescription className="text-center">
                  Enter the 6-digit code sent to your email.
                </FieldDescription>
              </Field>
            </>
          )}

          <Field>
            <Button type="submit" disabled={isSendingOtp || isVerifyingOtp}>
              {isSendingOtp
                ? "Sending OTP..."
                : isVerifyingOtp
                  ? "Verifying..."
                  : isOtpSent
                    ? "Verify OTP"
                    : "Send OTP"}
            </Button>
            {isOtpSent && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsOtpSent(false);
                  form.setValue("otp", "");
                }}
                className="mt-2"
                disabled={isSendingOtp}
              >
                Send Again
              </Button>
            )}
          </Field>

          <Field>
            <FieldDescription className="text-center">
              Remember your password?{" "}
              <a href="/login" className="underline underline-offset-4">
                Back to Login
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </Form>
  );
}
