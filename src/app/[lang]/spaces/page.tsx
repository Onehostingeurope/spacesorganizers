import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";
import { CTASection } from "@/components/blocks/CTASection";
import { Section } from "@/components/ui/Section";
import { Heading, Subheading, Body } from "@/components/ui/Typography";
import { getDictionary, hasLocale, type Locale } from "@/lib/dictionaries";
import { getCollection } from "@/lib/db";

export default async function Spaces({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const spaces = await getCollection<any>("spaces");

  return (
    <>
      <Header dict={dict} lang={locale} />
      <main className="flex-1 pt-24">
        <Section className="bg-surface text-center pb-20 border-b border-outline-variant/10">
          <div className="max-w-3xl mx-auto px-6">
            <Subheading className="mb-4 opacity-70">{dict.nav.riviera}</Subheading>
            <Heading as="h1" className="mb-6 font-light">
              {dict.nav.riviera}
            </Heading>
            <Body className="italic">
              Every room has its own unique rhythm and set of challenges. We design systems specific to the flow of each space.
            </Body>
          </div>
        </Section>

        {spaces.map((space: any, index: number) => (
          <Section key={space.id ?? index} className={index % 2 === 0 ? "bg-surface-container-low" : "bg-surface"}>
            <div className={`max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center`}>
              <div className={index % 2 === 0 ? "lg:order-1" : "lg:order-2"}>
                <Heading as="h2" className="text-4xl mb-6 font-light">{space.title}</Heading>
                {space.description && (
                  <Body className="mb-8 italic">{space.description}</Body>
                )}
                <Link
                  href={`/${lang}/portfolio`}
                  className="inline-block font-label text-[10px] uppercase tracking-[0.3em] text-on-surface border-b border-outline-variant/30 pb-1 hover:border-primary hover:text-primary transition-all"
                >
                  View Projects →
                </Link>
              </div>
              {space.image && (
                <div className={`relative aspect-square md:aspect-[4/5] overflow-hidden rounded-DEFAULT ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}>
                  <Image src={space.image} alt={space.title} fill className="object-cover" />
                </div>
              )}
            </div>
          </Section>
        ))}

        <CTASection dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
