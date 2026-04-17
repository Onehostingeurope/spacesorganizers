import React from "react";
import { cn } from "@/lib/utils";

interface RichTextProps {
  content: string;
  className?: string;
}

export function RichText({ content, className }: RichTextProps) {
  if (!content) return null;

  // Check if content is HTML
  const isHtml = /<[a-z][\s\S]*>/i.test(content);

  if (isHtml) {
    return (
      <div
        className={cn(
          "rich-text-html font-body text-base md:text-lg text-on-surface-variant leading-relaxed font-light",
          "prose prose-stone prose-lg max-w-none",
          "prose-headings:font-headline prose-headings:italic prose-headings:font-light prose-headings:text-on-surface",
          "prose-img:rounded-DEFAULT prose-img:shadow-premium prose-img:mx-auto",
          "prose-blockquote:italic prose-blockquote:border-primary/20 prose-blockquote:bg-primary/5 prose-blockquote:px-8 prose-blockquote:py-4 prose-blockquote:rounded-r-DEFAULT",
          className
        )}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // Fallback for plain text
  const paragraphs = content.split(/\n+/).filter(p => p.trim().length > 0);

  return (
    <div
      className={cn(
        "rich-text font-body text-base md:text-lg text-on-surface-variant leading-relaxed font-light",
        "flex flex-col gap-5",
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
