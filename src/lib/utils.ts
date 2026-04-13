import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Utility to merge tailwind classes */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 
 * Robust HTML entity decoder that works on both Server and Client.
 * Handles up to 5 levels of nested escaping.
 */
export function decodeHTMLEntities(text: string): string {
  if (!text || typeof text !== "string") return text;
  
  let current = text;
  const entities: Record<string, string> = {
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&nbsp;": " ",
    "&quot;": "\"",
    "&#39;": "'",
    "&#x27;": "'",
    "\u00A0": " "
  };

  // Up to 5 passes to handle deep nesting (&amp;amp;lt;)
  for (let i = 0; i < 5; i++) {
    let changed = false;
    for (const [entity, char] of Object.entries(entities)) {
      if (current.includes(entity)) {
        current = current.split(entity).join(char);
        changed = true;
      }
    }
    if (!changed) break;
  }
  
  return current;
}
