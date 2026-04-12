"use client";

import React, { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Heading, Subheading, Body } from "@/components/ui/Typography";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/lib/dictionaries";

interface FAQAccordionProps {
  dict: Dictionary;
  data?: {
    label: string;
    heading: string;
  };
}

export function FAQAccordion({ dict, data }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const label = data?.label || dict.faq.label;
  const heading = data?.heading || dict.faq.heading;
  const items = dict.faq.items;

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section className="bg-surface-container/30" id="faq">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-24">
          <Subheading className="mb-4">{label}</Subheading>
          <Heading className="text-5xl md:text-6xl tracking-tight font-light italic">
            {heading}
          </Heading>
        </div>

        <div className="space-y-4">
          {items.map((faq: { q: string; a: string }, index: number) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={cn(
                  "bg-surface rounded-DEFAULT overflow-hidden transition-all duration-500",
                  "shadow-[0_4px_32px_rgba(56,56,49,0.06)]",
                  "ghost-border"
                )}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-8 md:p-10 hover:bg-surface-container-low/40 transition-colors text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-headline text-xl md:text-2xl text-on-surface leading-tight font-light">
                    {faq.q}
                  </span>
                  <div
                    className={cn(
                      "text-primary ml-8 flex-shrink-0 transition-transform duration-500",
                      isOpen && "rotate-180"
                    )}
                  >
                    <ChevronDown size={22} strokeWidth={1} />
                  </div>
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-[600ms] ease-in-out px-8 md:px-10",
                    isOpen ? "max-h-[500px] pb-10 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="pt-4 border-t border-outline-variant/10">
                    <Body className="text-on-surface-variant text-base lg:text-lg leading-relaxed font-light italic">
                      {faq.a}
                    </Body>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
