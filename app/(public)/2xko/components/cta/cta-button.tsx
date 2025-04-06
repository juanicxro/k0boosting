import Link from "next/link";

interface CTAButtonProps {
  href: string;
  variant: "primary" | "secondary";
  children: React.ReactNode;
}

export function CTAButton({ href, variant, children }: CTAButtonProps) {
  return (
    <Link
      href={href}
      className={`${
        variant === "primary"
          ? "bg-primary hover:bg-primary/90 text-primary-foreground"
          : "bg-card hover:bg-muted text-foreground border border-border"
      } px-8 py-3 rounded-md font-semibold transition-colors`}
    >
      {children}
    </Link>
  );
}
