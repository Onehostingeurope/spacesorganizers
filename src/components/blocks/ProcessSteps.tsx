import React from "react";
import { Section } from "@/components/ui/Section";
import { Heading, Subheading } from "@/components/ui/Typography";
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
    <Section className="bg-surface pt-32 pb-48">
      <div className="text-center mb-24">
        <Subheading className="mb-4 opacity-70 px-1">How We Work</Subheading>
        <Heading className="text-5xl md:text-6xl tracking-tight font-light">The Spaces Process</Heading>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="flex flex-col items-center text-center px-4">
              <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center mb-10 text-primary shadow-sm border border-outline-variant/10">
                <Icon size={32} strokeWidth={1} />
              </div>
              <h3 className="font-headline text-2xl lg:text-3xl tracking-tight text-on-surface mb-6 font-light">{step.title}</h3>
              <p className="font-body text-on-surface-variant leading-loose text-base lg:text-lg opacity-80 font-light italic">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}


