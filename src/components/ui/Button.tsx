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
        "group inline-flex items-center justify-center rounded-minimal font-sans font-bold uppercase tracking-[0.3em] transition-all duration-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-primary text-on-primary hover:bg-on-surface hover:text-surface shadow-premium": variant === "primary",
          "border border-primary/30 bg-transparent text-primary hover:border-primary hover:bg-primary/5": variant === "secondary",
          "bg-transparent text-on-surface-variant/60 hover:text-on-surface": variant === "ghost",
          "h-12 px-8 text-[9px]": size === "sm",
          "h-16 px-12 py-5 text-[10px]": size === "md",
          "h-20 px-16 py-6 text-[11px]": size === "lg",
        },
        className
      )}
      {...props}
    >
      <span className="translate-x-0 group-hover:-translate-x-2 transition-transform duration-700 ease-in-out">
        {children}
      </span>
      <span className="ml-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700 ease-in-out">
        &rarr;
      </span>
    </button>
  );
}

