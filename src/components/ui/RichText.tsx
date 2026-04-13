import React from "react";
import { cn } from "@/lib/utils";

interface RichTextProps {
  content: string;
  className?: string;
}

export function RichText({ content, className }: RichTextProps) {
  if (!content) return null;

  // Split by newlines and filter out empty strings
  const paragraphs = content.split(/\n+/).filter(p => p.trim().length > 0);

  return (
    <div
      className={cn(
        "rich-text font-body text-base md:text-lg text-on-surface-variant leading-relaxed font-light",
        "flex flex-col gap-5", // Increased gap for better spacing
        className
      )}
    >
      {paragraphs.map((p, i) => (
        <p key={i} className="text-center w-full">
          {p.trim()}
        </p>
      ))}
    </div>
  );
}
