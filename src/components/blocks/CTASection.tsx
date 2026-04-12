import React from "react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Heading, Subheading } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <Section className="bg-sand text-center py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <Heading className="mb-6">Ready to reclaim your space?</Heading>
        <Subheading className="mb-10 text-charcoal/80 max-w-2xl mx-auto leading-relaxed">
          Book your consultation and let us create a home that feels lighter, calmer, and beautifully organized.
        </Subheading>
        <Link href="/contact">
          <Button variant="primary" size="lg">
            Schedule Now
          </Button>
        </Link>
      </div>
    </Section>
  );
}
