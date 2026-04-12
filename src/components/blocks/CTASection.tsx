import React from "react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Heading, Subheading } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/lib/dictionaries";

interface CTASectionProps {
  dict: Dictionary;
  lang: string;
}

export function CTASection({ dict, lang }: CTASectionProps) {
  const c = dict.cta;
  return (
    <Section className="bg-surface-container-high pt-32 pb-48 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <Subheading className="mb-6 opacity-60">{c.label}</Subheading>
        <Heading className="mb-10 text-5xl md:text-6xl tracking-tight leading-[1.1]">
          {c.heading}
        </Heading>
        <Link href={`/${lang}/contact`} className="mt-4 block">
          <Button size="lg" className="px-16">
            {c.button}
          </Button>
        </Link>
      </div>
    </Section>
  );
}
