import React from "react";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";
import { CTASection } from "@/components/blocks/CTASection";
import { Testimonials as TestimonialGrid } from "@/components/blocks/TestimonialCard";
import { Section } from "@/components/ui/Section";
import { Heading, Body } from "@/components/ui/Typography";

export default function TestimonialsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24">
        <Section className="bg-softwhite text-center pb-12">
          <div className="max-w-3xl mx-auto px-6">
             <span className="font-sans uppercase tracking-widest text-sm font-medium text-charcoal/60 mb-4 block">Kind Words</span>
             <Heading as="h1" className="mb-6">Client Experiences</Heading>
             <Body>
               Don't just take our word for it. Read what our clients have to say about the transformative power of an organized home.
             </Body>
          </div>
        </Section>

        {/* Re-use the TestimonialGrid but perhaps without its own padding, or just render it directly */}
        <TestimonialGrid />

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
