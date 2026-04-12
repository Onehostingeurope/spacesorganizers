"use client";
import React from "react";

const LANGS = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "ru", label: "RU" },
  { code: "de", label: "DE" },
];

interface LangTabsProps {
  value: string;
  onChange: (lang: string) => void;
}

export function LangTabs({ value, onChange }: LangTabsProps) {
  return (
    <div className="flex gap-1 bg-surface-variant/20 rounded-sm p-1">
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => onChange(l.code)}
          className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold font-label rounded-sm transition-all ${
            value === l.code
              ? "bg-primary text-on-primary shadow-sm"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
