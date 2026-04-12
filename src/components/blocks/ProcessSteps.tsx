import React from "react";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Typography";
import { Coffee, ClipboardList, PenTool, Sparkles } from "lucide-react";

const STEPS = [
  {
    icon: Coffee,
    title: "1. Consultation",
    description: "We meet to discuss your goals, routines, and challenges in the space.",
  },
  {
    icon: ClipboardList,
    title: "2. Planning",
    description: "We create a tailored organizational strategy and source premium products.",
  },
  {
    icon: PenTool,
    title: "3. Edit & Organize",
    description: "We sort, declutter, and implement intuitive systems for every item.",
  },
  {
    icon: Sparkles,
    title: "4. Styling & Setup",
    description: "We add the finishing touches, ensuring the space is both functional and beautiful.",
  },
];

export function ProcessSteps() {
  return (
    <Section className="bg-softwhite">
      <div className="text-center mb-16">
        <Heading>Our Process</Heading>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-sand flex items-center justify-center mb-6 text-charcoal/80">
                <Icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl tracking-wide text-charcoal mb-4">{step.title}</h3>
              <p className="font-sans text-charcoal/70 leading-relaxed text-sm md:text-base">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
