"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./button";
import { VariantProps } from "class-variance-authority";

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  fullWidth?: boolean;
}

export function ActionButton({
  children,
  className,
  fullWidth = false,
  variant = "default",
  size = "default",
  ...props
}: ActionButtonProps) {
  return (
    <Button
      className={cn(
        "font-medium transition-all",
        fullWidth ? "w-full" : "",
        className
      )}
      variant={variant}
      size={size}
      {...props}
    >
      {children}
    </Button>
  );
}
