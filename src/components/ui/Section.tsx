import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  containerClass?: string;
}

export function Section({
  children,
  className,
  containerClass,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-24 md:py-40 lg:py-48", className)} {...props}>
      <div className={cn("container mx-auto px-6 md:px-12", containerClass)}>
        {children}
      </div>
    </section>
  );
}
