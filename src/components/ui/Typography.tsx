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
        "font-serif text-5xl md:text-7xl font-normal tracking-tight text-charcoal",
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
        "font-sans text-xl md:text-3xl font-light text-charcoal/70 tracking-wide",
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
        "font-sans text-lg md:text-xl text-charcoal/80 leading-relaxed font-light",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
