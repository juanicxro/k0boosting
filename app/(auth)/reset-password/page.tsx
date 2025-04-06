"use client";

import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const requestCodeSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const resetPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Password must have at least 8 characters.",
  }),
  code: z.string().min(6, {
    message: "Please enter the complete 6-digit code.",
  }),
});

type RequestCodeFormValues = z.infer<typeof requestCodeSchema>;
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [needsSecondFactor, setNeedsSecondFactor] = useState(false);
  const router = useRouter();
  const [otpValue, setOtpValue] = useState("");

  const requestCodeForm = useForm<RequestCodeFormValues>({
    resolver: zodResolver(requestCodeSchema),
    defaultValues: {
      email: "",
    },
  });

  const resetPasswordForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      code: "",
    },
  });

  useEffect(() => {
    if (codeSent) {
      resetPasswordForm.reset({
        password: "",
        code: "",
      });
      setOtpValue("");
    }
  }, [codeSent, resetPasswordForm]);

  async function onRequestCode(data: RequestCodeFormValues) {
    if (!isLoaded || !signIn) return;

    try {
      setIsSubmitting(true);
      requestCodeForm.clearErrors();

      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: data.email,
      });

      setEmailAddress(data.email);
      setOtpValue("");

      // Reset the password form before changing the view
      resetPasswordForm.reset({
        password: "",
        code: "",
      });

      setCodeSent(true);
      toast.success("Password reset code sent. Please check your inbox.");
    } catch (error) {
      console.error("[REQUEST ERROR]", error);

      // Handle specific error cases
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      if (
        errorMessage.includes("identifier") ||
        errorMessage.includes("email")
      ) {
        requestCodeForm.setError("email", {
          type: "manual",
          message: "This email is not registered or is invalid.",
        });
      } else {
        requestCodeForm.setError("root", {
          type: "manual",
          message: "Password reset request failed. Please try again.",
        });
        toast.error("Password reset request failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function onResetPassword(data: ResetPasswordFormValues) {
    if (!isLoaded || !signIn) return;

    try {
      setIsSubmitting(true);
      resetPasswordForm.clearErrors();

      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: data.code,
        password: data.password,
      });

      if (result.status === "needs_second_factor") {
        setNeedsSecondFactor(true);
        toast.info("Additional verification required.");
      } else if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("Password has been reset successfully!");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("[RESET ERROR]", error);

      const errorMessage =
        error instanceof Error ? error.message : String(error);

      if (errorMessage.includes("code")) {
        resetPasswordForm.setError("code", {
          type: "manual",
          message: "Invalid or expired code. Please try again.",
        });
      } else if (errorMessage.includes("password")) {
        resetPasswordForm.setError("password", {
          type: "manual",
          message: "Password doesn't meet requirements.",
        });
      } else {
        resetPasswordForm.setError("root", {
          type: "manual",
          message: "Failed to reset password. Please try again.",
        });
        toast.error("Password reset failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleBackToEmail = () => {
    setCodeSent(false);
    setNeedsSecondFactor(false);
    setOtpValue("");

    // Also reset the form values explicitly
    resetPasswordForm.reset({
      password: "",
      code: "",
    });
  };

  useEffect(() => {
    resetPasswordForm.setValue("code", otpValue);
  }, [otpValue, resetPasswordForm]);

  return (
    <div className="container mx-auto max-w-md py-10">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Reset Password</h1>
          {!codeSent ? (
            <p className="text-sm text-muted-foreground mt-2">
              Enter your email to receive a password reset code
            </p>
          ) : (
            <p className="text-sm text-muted-foreground mt-2">
              Enter the code sent to {emailAddress} and your new password
            </p>
          )}
        </div>

        {needsSecondFactor && (
          <div className="p-4 bg-warning/15 text-warning rounded-md text-sm">
            <p>
              Two-factor authentication is required for your account. Please
              contact support for additional assistance.
            </p>
          </div>
        )}

        {!codeSent ? (
          <>
            {requestCodeForm.formState.errors.root && (
              <div className="p-3 bg-destructive/15 text-destructive rounded-md text-sm">
                {requestCodeForm.formState.errors.root.message}
              </div>
            )}

            <Form {...requestCodeForm}>
              <form
                onSubmit={requestCodeForm.handleSubmit(onRequestCode)}
                className="space-y-4"
              >
                <FormField
                  control={requestCodeForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Reset Code"}
                </Button>
              </form>
            </Form>
          </>
        ) : (
          <>
            {resetPasswordForm.formState.errors.root && (
              <div className="p-3 bg-destructive/15 text-destructive rounded-md text-sm">
                {resetPasswordForm.formState.errors.root.message}
              </div>
            )}

            <Form {...resetPasswordForm}>
              <form
                onSubmit={resetPasswordForm.handleSubmit(onResetPassword)}
                className="space-y-4"
              >
                <FormField
                  control={resetPasswordForm.control}
                  name="code"
                  render={({ field }) => {
                    console.log("Current field:", field);
                    return (
                      <FormItem>
                        <FormLabel>Verification Code</FormLabel>
                        <FormControl>
                          <InputOTP
                            maxLength={6}
                            value={otpValue}
                            onChange={(value) => {
                              console.log("New OTP value:", value);
                              setOtpValue(value);
                            }}
                          >
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={resetPasswordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col space-y-2">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Resetting..." : "Reset Password"}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleBackToEmail}
                    className="w-full"
                  >
                    Back to Email Form
                  </Button>
                </div>
              </form>
            </Form>
          </>
        )}

        <div className="text-center text-sm">
          Remember your password?{" "}
          <a href="/sign-in" className="text-primary underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
