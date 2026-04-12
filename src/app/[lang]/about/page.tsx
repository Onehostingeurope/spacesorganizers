import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";
import { CTASection } from "@/components/blocks/CTASection";
import { Section } from "@/components/ui/Section";
import { Heading, Subheading, Body } from "@/components/ui/Typography";
import { getDictionary, hasLocale, type Locale } from "@/lib/dictionaries";

export default async function About({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const a = dict.about;

  return (
    <>
      <Header dict={dict} lang={locale} />
      <main className="flex-1 pt-24">
        <Section className="bg-surface">
          <div className="max-w-4xl mx-auto text-center px-6 mb-16">
            <Subheading className="mb-4 opacity-70">{a.label}</Subheading>
            <Heading as="h1" className="mb-8 font-light italic">
              {a.heading}
            </Heading>
            <p className="font-body text-on-surface-variant leading-relaxed text-lg">
              {a.subheading}
            </p>
          </div>

          <div className="relative aspect-video max-w-5xl mx-auto bg-surface-container overflow-hidden mb-24 rounded-DEFAULT">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDygYhpmBudxxNndS055nDEXCZqC8utNwLG7kd7_3JkEZFyjpuxub7t2HpLoEfAV3qN8_S1cDL0PgusYWWHrCBMc3xhe4pnu3h-wAzV6wCGStgS6mV19TYVlFp9qvEnJaPeoWnNhouBghvlWTfxOc8cOrNlt_eXfflhz2wS_yylRAkOte7jSi4onDNlt2QLtgeN6vWSGeSww_z2ZVNq8-pWG3CMaQtTYvuug5JvthZCXlzoiqfz2cnnrq09du2WZFifocEZmob8Cy8"
              alt={a.heading}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            <div>
              <Heading as="h2" className="text-3xl mb-6 font-light">
                {a.philosophy_title}
              </Heading>
              <Body className="mb-6 italic">{a.philosophy_body1}</Body>
              <Body>{a.philosophy_body2}</Body>
            </div>
            <div>
              <Heading as="h2" className="text-3xl mb-6 font-light">
                {a.systems_title}
              </Heading>
              <Body className="mb-6 italic">{a.systems_body1}</Body>
              <Body>{a.systems_body2}</Body>
            </div>
          </div>
        </Section>

        <CTASection dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
