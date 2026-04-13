import React from "react";
import { cn } from "@/lib/utils";

interface RichTextProps {
  content: string;
  className?: string;
}

export function RichText({ content, className }: RichTextProps) {
  if (!content) return null;

  // Final decoding guard: ensure literal &lt;, &gt;, and &nbsp; are handled properly
  // We use multiple passes (5) to catch deeply escaped versions
  let decodedContent = content || "";
  for (let i = 0; i < 5; i++) {
    if (!decodedContent.includes("&") && !decodedContent.includes("\u00A0")) break;
    decodedContent = decodedContent
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\u00A0/g, ' ');
  }

  return (
    <div
      className={cn(
        "rich-text font-body text-base md:text-lg text-on-surface-variant leading-relaxed font-light",
        "flex flex-col gap-4",
        className
      )}
      dangerouslySetInnerHTML={{ __html: decodedContent }}
    />
  );
}
