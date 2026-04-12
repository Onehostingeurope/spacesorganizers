"use client";

import React, { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Heading, Subheading, Body } from "@/components/ui/Typography";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import faqData from "../../../data/faq.json";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// Merge JSON data with the full set of FAQs for the homepage
const STATIC_FAQS: FaqItem[] = [
  {
    id: "s1",
    question: "What happens during a consultation?",
    answer:
      "We visit your space to assess the current systems, discuss your daily routine, and identify your goals. This helps us create a customized plan tailored perfectly to your lifestyle.",
  },
  {
    id: "s2",
    question: "Do you work room by room or on full homes?",
    answer:
      "We offer both options. Whether you need a simple closet refresh or a full-home organizational system setup, we scale our services to fit your needs.",
  },
  {
    id: "s3",
    question: "Do you offer move-in unpacking?",
    answer:
      "Yes, our move-in service is designed to alleviate the stress of relocating. We unpack, organize, and style your belongings so you can settle in immediately.",
  },
  {
    id: "s4",
    question: "Can you help with decluttering before organizing?",
    answer:
      "Absolutely. We guide you through the editing process with empathy and clear decision-making frameworks, ensuring we only organize what you truly love and use.",
  },
  {
    id: "s5",
    question: "Do you shop for organizing products?",
    answer:
      "Yes, we handle all the sourcing. We measure your spaces and procure premium storage solutions that match your home's aesthetic, presenting options for your approval.",
  },
  {
    id: "s6",
    question: "How do I get started?",
    answer:
      "Simply book a consultation through our contact form. We will reach out to schedule an initial call to learn more about your project.",
  },
];

// Merge CMS data overtaking matching static entries by question
const allFaqs: FaqItem[] = (() => {
  const cms = faqData as FaqItem[];
  const merged = [...STATIC_FAQS];
  cms.forEach((item) => {
    const idx = merged.findIndex((f) => f.question === item.question);
    if (idx >= 0) merged[idx] = item;
    else merged.push(item);
  });
  return merged;
})();

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section className="bg-surface-container/30" id="faq">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-24">
          <Subheading className="mb-4 opacity-70">Common Inquiries</Subheading>
          <Heading className="text-5xl md:text-6xl tracking-tight font-light italic">
            Frequently Asked <br /> Questions
          </Heading>
        </div>

        <div className="space-y-4">
          {allFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className={cn(
                  "bg-surface rounded-DEFAULT overflow-hidden transition-all duration-500",
                  "shadow-[0_4px_32px_rgba(56,56,49,0.06)]",
                  "ghost-border"
                )}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-8 md:p-10 hover:bg-surface-container-low/40 transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed-dim"
                  aria-expanded={isOpen}
                >
                  <span className="font-headline text-xl md:text-2xl text-on-surface leading-tight font-light">
                    {faq.question}
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
                      {faq.answer}
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
