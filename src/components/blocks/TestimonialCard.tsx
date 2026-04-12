import React from "react";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Typography";
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
    <Section className="bg-sand lg:py-40">
      <div className="text-center mb-16">
        <Heading>Client Experiences</Heading>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {REVIEWS.map((review, index) => (
          <div key={index} className="bg-softwhite p-8 md:p-10 shadow-sm relative rounded-sm border border-charcoal/5">
            <Quote className="text-taupe mb-6 opacity-50" size={32} />
            <p className="font-serif italic text-lg leading-relaxed text-charcoal/80 mb-8">
              "{review.text}"
            </p>
            <div>
              <p className="font-sans font-medium text-sm tracking-widest uppercase text-charcoal">{review.author}</p>
              <p className="font-sans text-xs text-charcoal/60 mt-1">{review.area}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
