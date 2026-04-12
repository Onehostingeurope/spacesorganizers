import React from "react";
import { Section } from "@/components/ui/Section";
import { Heading, Subheading } from "@/components/ui/Typography";
import { Quote } from "lucide-react";

const REVIEWS = [
  {
    text: "Spaces Organizers completely transformed our kitchen. It feels lighter, calmer, and everything finally has a place. It’s an absolute joy to cook now.",
    author: "Sarah M.",
    area: "Kitchen & Pantry",
  },
  {
    text: "Moving into our new home was stressful, but their unpacking service made it seamless. We walked into a fully organized house.",
    author: "James & Emily T.",
    area: "Move-In Setup",
  },
  {
    text: "I used to dread going into my closet. Now it feels like a high-end boutique. Their attention to detail and aesthetic is unmatched.",
    author: "Chloe R.",
    area: "Master Closet",
  },
];

export function Testimonials() {
  return (
    <Section className="bg-surface-container lg:py-48">
      <div className="text-center mb-24">
        <Subheading className="mb-4 opacity-70">Sanctuary Stories</Subheading>
        <Heading className="text-5xl md:text-6xl font-light">Client Experiences</Heading>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
        {REVIEWS.map((review, index) => (
          <div key={index} className="bg-surface p-12 md:p-14 shadow-lg relative rounded-DEFAULT border border-outline-variant/10">
            <Quote className="text-primary mb-8 opacity-40" size={36} strokeWidth={1} />
            <p className="font-headline italic text-xl leading-relaxed text-on-surface/90 mb-10 font-light">
              "{review.text}"
            </p>
            <div className="pt-8 border-t border-outline-variant/20">
              <p className="font-label font-bold text-[10px] tracking-[0.3em] uppercase text-on-surface">{review.author}</p>
              <p className="font-label text-[11px] font-semibold text-primary mt-2 uppercase tracking-widest">{review.area}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}


