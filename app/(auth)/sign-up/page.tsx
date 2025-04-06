"use client";
import { useSignUp } from "@clerk/nextjs";
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

const signUpSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must have at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must have at least 2 characters.",
  }),
  username: z.string().min(3, {
    message: "Username must have at least 3 characters.",
  }),
  email: z.string().email({
    message: "Invalid email.",
  }),
  password: z.string().min(8, {
    message: "Password must have at least 8 characters.",
  }),
  termsAgreement: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms to continue.",
  }),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const { isLoaded, signUp } = useSignUp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      termsAgreement: false,
    },
  });

  async function onSubmit(data: SignUpFormValues) {
    if (!isLoaded) return;

    try {
      setIsSubmitting(true);
      // Limpar erros anteriores
      form.clearErrors();

      await signUp.create({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        emailAddress: data.email,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      router.push("/verify-email");
    } catch (error) {
      console.error("Error signing up:", error);

      const errorMessage =
        error instanceof Error ? error.message : String(error);

      // Handle specific error types and set errors in the form
      if (
        errorMessage.includes(
          "Password has been found in an online data breach"
        )
      ) {
        // Set error on password field
        form.setError("password", {
          type: "manual",
          message:
            "Password has been found in an online data breach. Please use a different password.",
        });

        // Ainda mostrar toast para chamar atenção
        toast.error(
          "Security alert: This password has been compromised in a data breach"
        );
      } else if (errorMessage.includes("email_address")) {
        // Email already exists or other email-related errors
        if (errorMessage.includes("already exists")) {
          form.setError("email", {
            type: "manual",
            message:
              "An account with this email already exists. Please try signing in instead.",
          });
        } else {
          form.setError("email", {
            type: "manual",
            message: "There was an issue with the email address provided.",
          });
        }
      } else if (errorMessage.includes("username")) {
        // Username already taken or invalid
        if (
          errorMessage.includes("already exists") ||
          errorMessage.includes("already taken")
        ) {
          form.setError("username", {
            type: "manual",
            message:
              "This username is already taken. Please choose another one.",
          });
        } else {
          form.setError("username", {
            type: "manual",
            message: "There was an issue with the username provided.",
          });
        }
      } else {
        // Generic error - set at root level
        form.setError("root", {
          type: "manual",
          message: "An error occurred during sign up. Please try again.",
        });

        toast.error("Sign up failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto max-w-md py-10">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Fill in the fields below to create your account
          </p>
        </div>

        {/* Exibir erro de root/formulário */}
        {form.formState.errors.root && (
          <div className="p-3 bg-destructive/15 text-destructive rounded-md text-sm">
            {form.formState.errors.root.message}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="termsAgreement"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I agree to the{" "}
                      <a href="/terms" className="text-primary underline">
                        terms of use
                      </a>{" "}
                      of the site
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Clerk CAPTCHA Widget */}
            <div id="clerk-captcha" className="mt-4"></div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <a href="/sign-in" className="text-primary underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
