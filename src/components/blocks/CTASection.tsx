import React from "react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Heading, Subheading } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/lib/dictionaries";

interface CTASectionProps {
  dict: Dictionary;
  lang: string;
  data?: {
    label: string;
    heading: string;
    description?: string;
  };
}

export function CTASection({ dict, lang, data }: CTASectionProps) {
  const label = data?.label || dict.cta.label;
  const heading = data?.heading || dict.cta.heading;
  const description = data?.description || "";

  return (
    <Section className="bg-surface-container-high pt-32 pb-48 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <Subheading className="mb-6 opacity-60">{label}</Subheading>
        <Heading className="mb-8 text-5xl md:text-6xl tracking-tight leading-[1.1]">
          {heading}
        </Heading>
        {description && (
          <p className="font-body text-on-surface-variant text-lg lg:text-xl font-light italic mb-12 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        <div className="flex justify-center">
          <Link href={`/${lang}/contact`}>
            <Button size="lg" className="px-16">
              {dict.cta.button}
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}
