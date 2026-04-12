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
        "group inline-flex items-center justify-center rounded-none font-sans font-medium uppercase tracking-[0.2em] transition-all duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-charcoal disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-charcoal text-softwhite hover:bg-charcoal/80": variant === "primary",
          "border border-charcoal bg-transparent text-charcoal hover:bg-charcoal hover:text-softwhite": variant === "secondary",
          "bg-transparent text-charcoal hover:text-charcoal/70": variant === "ghost",
          "h-10 px-6 text-xs": size === "sm",
          "h-14 px-10 py-4 text-xs": size === "md",
          "h-16 px-14 py-5 text-sm": size === "lg",
        },
        className
      )}
      {...props}
    >
      <span className="translate-x-0 group-hover:-translate-x-1 transition-transform duration-300">
        {children}
      </span>
      <span className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        &rarr;
      </span>
    </button>
  );
}
