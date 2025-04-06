"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export interface NavLinkProps extends LinkProps {
  children: ReactNode;
}

export function NavLink({ children, ...props }: NavLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      data-current={pathname === props.href}
      {...props}
      className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-primary"
    >
      {children}
    </Link>
  );
}
