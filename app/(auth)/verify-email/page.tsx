"use client";

import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";

const verifyEmailSchema = z.object({
  code: z.string().min(6, {
    message: "Verification code must be at least 6 characters.",
  }),
});

type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;

export default function VerifyEmailPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );
  const router = useRouter();

  const form = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(data: VerifyEmailFormValues) {
    if (!isLoaded || !signUp) {
      setVerificationError(
        "Authentication service not loaded. Please try again."
      );
      return;
    }

    try {
      setIsVerifying(true);
      setVerificationError(null);

      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });

      await setActive({ session: completeSignUp.createdSessionId });

      router.push("/dashboard");
    } catch (error) {
      console.error("Error verifying email:", error);
      setVerificationError(
        error instanceof Error
          ? error.message
          : "Failed to verify email. Please try again."
      );
    } finally {
      setIsVerifying(false);
    }
  }

  async function handleResendCode() {
    if (!isLoaded || !signUp) return;

    try {
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      toast.success("Verification code has been resent to your email.");
    } catch (error) {
      console.error("Error resending verification code:", error);
      setVerificationError(
        error instanceof Error
          ? error.message
          : "Failed to resend verification code. Please try again."
      );
    }
  }

  return (
    <div className="container mx-auto max-w-md py-10">
      <div className="space-y-6 flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Verify your email</h1>
          <p className="text-sm text-muted-foreground mt-2">
            We&apos;ve sent a verification code to your email address. Please
            enter the code below to verify your account.
          </p>
        </div>

        {verificationError && (
          <div className="p-3 bg-destructive/15 text-destructive rounded-md text-sm">
            {verificationError}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
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
              )}
            />

            <Button type="submit" className="w-full" disabled={isVerifying}>
              {isVerifying ? "Verifying..." : "Verify Email"}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm">
          Didn&apos;t receive a code?{" "}
          <button
            onClick={handleResendCode}
            className="text-primary underline cursor-pointer"
            type="button"
          >
            Resend code
          </button>
        </div>

        <div className="text-center text-sm">
          <button
            onClick={() => router.push("/sign-up")}
            className="text-primary underline cursor-pointer"
            type="button"
          >
            Go back to sign up
          </button>
        </div>
      </div>
    </div>
  );
}
