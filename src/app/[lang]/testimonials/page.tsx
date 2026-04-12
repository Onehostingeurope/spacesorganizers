import React from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";
import { CTASection } from "@/components/blocks/CTASection";
import { Testimonials } from "@/components/blocks/TestimonialCard";
import { Section } from "@/components/ui/Section";
import { Heading, Subheading, Body } from "@/components/ui/Typography";
import { getDictionary, hasLocale, type Locale } from "@/lib/dictionaries";

export default async function TestimonialsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const t = dict.testimonials;

  return (
    <>
      <Header dict={dict} lang={locale} />
      <main className="flex-1 pt-24">
        <Section className="bg-surface text-center pb-12 border-b border-outline-variant/10">
          <div className="max-w-3xl mx-auto px-6">
            <Subheading className="mb-4 opacity-70">{t.label}</Subheading>
            <Heading as="h1" className="mb-6 font-light">
              {t.heading}
            </Heading>
            <Body className="italic">
              Read what our clients have to say about the transformative power of an organized home.
            </Body>
          </div>
        </Section>

        <Testimonials dict={dict} />
        <CTASection dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
