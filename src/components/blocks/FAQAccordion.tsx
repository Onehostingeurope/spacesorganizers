"use client";

import React, { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Heading, Body } from "@/components/ui/Typography";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "What happens during a consultation?",
    answer: "We visit your space to assess the current systems, discuss your daily routine, and identify your goals. This helps us create a customized plan tailored perfectly to your lifestyle."
  },
  {
    question: "Do you work room by room or on full homes?",
    answer: "We offer both options. Whether you need a simple closet refresh or a full-home organizational system setup, we scale our services to fit your needs."
  },
  {
    question: "Do you offer move-in unpacking?",
    answer: "Yes, our move-in service is designed to alleviate the stress of relocating. We unpack, organize, and style your belongings so you can settle in immediately."
  },
  {
    question: "Can you help with decluttering before organizing?",
    answer: "Absolutely. We guide you through the editing process with empathy and clear decision-making frameworks, ensuring we only organize what you truly love and use."
  },
  {
    question: "Do you shop for organizing products?",
    answer: "Yes, we handle all the sourcing. We measure your spaces and procure premium storage solutions that match your home's aesthetic, presenting options for your approval."
  },
  {
    question: "How do I get started?",
    answer: "Simply book a consultation through our contact form. We will reach out to schedule an initial call to learn more about your project."
  }
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section className="bg-softwhite border-t border-charcoal/10" id="faq">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <Heading>Frequently Asked Questions</Heading>
        </div>
        
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
             const isOpen = openIndex === index;
             return (
              <div 
                key={index} 
                className="border border-charcoal/10 rounded-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-6 bg-white hover:bg-sand/30 transition-colors text-left focus:outline-none"
                >
                  <span className="font-serif text-lg md:text-xl text-charcoal">{faq.question}</span>
                  <div className="text-charcoal/50 ml-6 flex-shrink-0">
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>
                <div 
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out bg-white px-6",
                    isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <Body className="text-charcoal/70 text-base">{faq.answer}</Body>
                </div>
              </div>
             );
          })}
        </div>
      </div>
    </Section>
  );
}
