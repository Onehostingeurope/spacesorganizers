import React from "react";
import { cn } from "@/lib/utils";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: React.ElementType;
}

export function Heading({
  children,
  className,
  as: Component = "h2",
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn(
        "font-headline text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-on-surface leading-[1.15]",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function Subheading({
  children,
  className,
  as: Component = "p",
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn(
        "font-label text-[10px] md:text-xs font-semibold text-on-surface-variant uppercase tracking-[0.3em] mb-4",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function Body({
  children,
  className,
  as: Component = "p",
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn(
        "font-body text-base md:text-lg text-on-surface-variant leading-relaxed font-light",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
