"use client";

import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";

const signInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  rememberMe: z.boolean().default(false).optional(),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(data: SignInFormValues) {
    if (!isLoaded) return;

    try {
      setIsSubmitting(true);
      form.clearErrors();

      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        // Set session active
        await setActive({ session: result.createdSessionId });

        toast.success("Successfully signed in!");
        router.push("/dashboard");
      } else {
        // Handle additional steps like 2FA if needed
        if (result.status === "needs_second_factor") {
          // Redirect to 2FA page if needed
          // router.push("/two-factor-auth");
          toast.info("Two-factor authentication required");
        } else {
          toast.error("Sign in incomplete. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error signing in:", error);

      // Handle specific error cases
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      if (
        errorMessage.includes("identifier") ||
        errorMessage.includes("email")
      ) {
        form.setError("email", {
          type: "manual",
          message: "This email is not registered or is invalid.",
        });
      } else if (errorMessage.includes("password")) {
        form.setError("password", {
          type: "manual",
          message: "Incorrect password. Please try again.",
        });
      } else {
        form.setError("root", {
          type: "manual",
          message:
            "Sign in failed. Please check your credentials and try again.",
        });

        toast.error("Sign in failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleForgotPassword = () => {
    router.push("/reset-password");
  };

  return (
    <div className="container mx-auto max-w-md py-10">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Enter your credentials to access your account
          </p>
        </div>

        {form.formState.errors.root && (
          <div className="p-3 bg-destructive/15 text-destructive rounded-md text-sm">
            {form.formState.errors.root.message}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        Remember me
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="button"
                variant="link"
                className="px-0 font-normal"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </Button>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="/sign-up" className="text-primary underline">
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
}
