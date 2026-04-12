import React from "react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Heading, Subheading } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <Section className="bg-sanctuary-stone pt-32 pb-48 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <Subheading className="mb-6 opacity-60">Begin Your Transformation</Subheading>
        <Heading className="mb-10 text-5xl md:text-6xl tracking-tight leading-[1.1]">Ready to reclaim <br /> your space?</Heading>
        <Link href="/contact" className="mt-4 block">
          <Button size="lg" className="px-16">
            Schedule Now
          </Button>
        </Link>
      </div>
    </Section>

  );
}
