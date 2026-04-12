import React from "react";
import { Section } from "@/components/ui/Section";
import { Heading, Subheading } from "@/components/ui/Typography";
import { Quote } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";

interface TestimonialsProps {
  dict: Dictionary;
  data?: {
    label: string;
    heading: string;
  };
}

export function Testimonials({ dict, data }: TestimonialsProps) {
  const label = data?.label || dict.testimonials.label;
  const heading = data?.heading || dict.testimonials.heading;
  const reviews = dict.testimonials.reviews; // Reviews still from dict/collection logic

  return (
    <Section className="bg-surface-container lg:py-48">
      <div className="text-center mb-24">
        <Subheading className="mb-4">{label}</Subheading>
        <Heading className="text-5xl md:text-6xl font-light">{heading}</Heading>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
        {reviews.map((review: { text: string; author: string; area: string }, index: number) => (
          <div
            key={index}
            className="bg-surface p-12 md:p-14 shadow-[0_4px_32px_rgba(56,56,49,0.06)] relative rounded-DEFAULT ghost-border"
          >
            <Quote className="text-primary mb-8 opacity-40" size={36} strokeWidth={1} />
            <p className="font-headline italic text-xl leading-relaxed text-on-surface mb-10 font-light">
              &ldquo;{review.text}&rdquo;
            </p>
            <div className="pt-8 border-t border-outline-variant/20">
              <p className="font-label font-bold text-[10px] tracking-[0.3em] uppercase text-on-surface">
                {review.author}
              </p>
              <p className="font-label text-[11px] font-semibold text-primary mt-2 uppercase tracking-widest">
                {review.area}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
