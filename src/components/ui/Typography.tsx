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
        "font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-charcoal",
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
  as: Component = "h3",
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn(
        "font-sans text-xl md:text-2xl font-light text-charcoal/80",
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
        "font-sans text-base md:text-lg text-charcoal/70 leading-relaxed",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
