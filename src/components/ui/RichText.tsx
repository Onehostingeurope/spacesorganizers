"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface RichTextProps {
  content: string;
  className?: string;
}

export function RichText({ content, className }: RichTextProps) {
  const [decoded, setDecoded] = useState(content);

  useEffect(() => {
    if (typeof window === "undefined" || !content) return;
    
    try {
      const txt = document.createElement("textarea");
      let last = content;
      let current = content;
      
      // Multi-layer entity decoding: &amp;lt;p&amp;gt; -> &lt;p&gt; -> <p>
      for (let i = 0; i < 5; i++) {
        txt.innerHTML = current;
        current = txt.value;
        if (current === last) break;
        last = current;
      }
      
      setDecoded(current);
    } catch (e) {
      setDecoded(content);
    }
  }, [content]);

  if (!content) return null;

  return (
    <div
      className={cn(
        "rich-text font-body text-base md:text-lg text-on-surface-variant leading-relaxed font-light",
        "flex flex-col gap-4",
        className
      )}
      dangerouslySetInnerHTML={{ __html: decoded }}
    />
  );
}
