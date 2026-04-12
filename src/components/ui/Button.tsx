import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-sm font-sans font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-charcoal disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-charcoal text-white hover:bg-charcoal/90": variant === "primary",
          "border border-charcoal bg-transparent text-charcoal hover:bg-charcoal/5": variant === "secondary",
          "bg-transparent text-charcoal hover:bg-charcoal/5": variant === "ghost",
          "h-9 px-4 text-sm": size === "sm",
          "h-11 px-8 py-2": size === "md",
          "h-14 px-10 text-lg": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
