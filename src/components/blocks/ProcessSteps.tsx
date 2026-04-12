import React from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Dictionary } from "@/lib/dictionaries";
import { cn } from "@/lib/utils";

const PROCESS_IMAGES = [
  "/images/process-consultation.png",
  "/images/process-planning.png",
  "/images/process-organizing.png",
  "/images/consultation-lifestyle.png", // Existing premium pantry image for Styling
];

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
    <section className="bg-surface overflow-hidden py-32 md:py-56">
      <div className="container mx-auto px-6 md:px-24 max-w-[1920px]">
        {/* Section Header */}
        <div className="max-w-4xl mb-32 md:mb-48">
          <ScrollReveal>
             <span className="font-label text-xs tracking-[0.4em] uppercase text-primary mb-6 block font-medium">
               {p.label}
             </span>
             <h2 className="font-headline text-5xl md:text-8xl text-on-surface leading-[0.9] font-light tracking-tighter">
               {p.heading}
             </h2>
          </ScrollReveal>
        </div>

        {/* Steps — Cinematic Staggered Path */}
        <div className="space-y-40 md:space-y-64">
          {p.steps.map((step: { title: string; description: string }, index: number) => {
            const isEven = index % 2 === 0;
            const stepNum = (index + 1).toString().padStart(2, "0");
            
            return (
              <div 
                key={index} 
                className={cn(
                  "flex flex-col md:flex-row items-center gap-16 md:gap-32 lg:gap-40",
                  !isEven && "md:flex-row-reverse"
                )}
              >
                {/* Image Side */}
                <div className="w-full md:w-1/2 relative">
                  <ScrollReveal 
                    variant={isEven ? "slide-right" : "slide-left"}
                    className="aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] relative overflow-hidden group shadow-ambient rounded-DEFAULT"
                  >
                    <Image
                      src={PROCESS_IMAGES[index] || PROCESS_IMAGES[0]}
                      alt={step.title}
                      fill
                      className="object-cover transition-transform duration-[4s] group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700" />
                  </ScrollReveal>
                  
                  {/* Backdrop Number — Large, subtle serif */}
                  <span 
                    className={cn(
                      "absolute -top-12 md:-top-20 z-0 font-headline text-[12rem] md:text-[20rem] text-primary/5 select-none pointer-events-none transition-all duration-1000",
                      isEven ? "-left-8 md:-left-16" : "-right-8 md:-right-16"
                    )}
                  >
                    {stepNum}
                  </span>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/3 space-y-8">
                  <ScrollReveal delay={0.3}>
                    <div className="flex items-center gap-6 mb-8">
                      <span className="font-headline text-3xl md:text-4xl text-primary italic">
                        {stepNum}
                      </span>
                      <div className="flex-1 h-[1px] bg-outline-variant/20" />
                    </div>
                    
                    <h3 className="font-headline text-3xl md:text-5xl text-on-surface font-light tracking-tight leading-tight">
                      {step.title}
                    </h3>
                    
                    <p className="font-body text-lg md:text-xl text-on-surface-variant leading-relaxed font-light italic">
                      {step.description}
                    </p>

                    <div className="pt-8">
                       <div className="w-12 h-[1px] bg-primary animate-pulse" />
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
