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
        "group inline-flex items-center justify-center rounded-minimal font-sans font-semibold uppercase tracking-[0.25em] transition-all duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sanctuary-taupe disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-sanctuary-taupe text-sanctuary-ivory hover:bg-sanctuary-taupe-dark shadow-sm": variant === "primary",
          "border border-sanctuary-taupe/30 bg-transparent text-sanctuary-taupe hover:border-sanctuary-taupe hover:bg-sanctuary-stone": variant === "secondary",
          "bg-transparent text-deep-stone/60 hover:text-deep-stone": variant === "ghost",
          "h-10 px-6 text-[10px]": size === "sm",
          "h-14 px-10 py-4 text-[11px]": size === "md",
          "h-16 px-14 py-5 text-[12px]": size === "lg",
        },
        className
      )}
      {...props}
    >
      <span className="translate-x-0 group-hover:-translate-x-1 transition-transform duration-500 ease-out">
        {children}
      </span>
      <span className="ml-2 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">
        &rarr;
      </span>
    </button>
  );
}

