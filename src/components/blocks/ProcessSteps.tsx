import React from "react";
import { Section } from "@/components/ui/Section";
import { Heading, Subheading } from "@/components/ui/Typography";
import { Coffee, ClipboardList, PenTool, Sparkles } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";

const STEP_ICONS = [Coffee, ClipboardList, PenTool, Sparkles];

interface ProcessStepsProps {
  dict: Dictionary;
  data?: {
    label: string;
    heading: string;
    steps: Array<{ title: string; description: string }>;
  };
}

export function ProcessSteps({ dict, data }: ProcessStepsProps) {
  const p = data || dict.process;

  return (
    <Section className="bg-surface pt-32 pb-48">
      <div className="text-center mb-24">
        <Subheading className="mb-4 opacity-70 px-1">{p.label}</Subheading>
        <Heading className="text-5xl md:text-6xl tracking-tight font-light">
          {p.heading}
        </Heading>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
        {p.steps.map((step: { title: string; description: string }, index: number) => {
          const Icon = STEP_ICONS[index] || Sparkles;
          return (
            <div key={index} className="flex flex-col items-center text-center px-4">
              <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center mb-10 text-primary shadow-sm border border-outline-variant/10">
                <Icon size={32} strokeWidth={1} />
              </div>
              <h3 className="font-headline text-2xl lg:text-3xl tracking-tight text-on-surface mb-6 font-light">
                {index + 1}. {step.title}
              </h3>
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
