export const dynamic = "force-dynamic";
import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";
import { CTASection } from "@/components/blocks/CTASection";
import { Section } from "@/components/ui/Section";
import { Heading, Subheading, Body } from "@/components/ui/Typography";
import { getDictionary, hasLocale, type Locale } from "@/lib/dictionaries";
import { getCollection } from "@/lib/db";

export default async function Portfolio({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const items = await getCollection<any>("portfolio", lang);

  return (
    <>
      <Header dict={dict} lang={locale} />
      <main className="flex-1 pt-24">
        <Section className="bg-surface text-center pb-12 border-b border-outline-variant/10">
          <div className="max-w-3xl mx-auto px-6">
            <Subheading className="mb-4 opacity-70">{dict.nav.portfolio}</Subheading>
            <Heading as="h1" className="mb-6 font-light">
              {dict.nav.portfolio}
            </Heading>
            <Body className="italic">
              Explore our recent projects and see how we bring order, beauty, and function into our clients' homes.
            </Body>
          </div>
        </Section>

        <Section className="bg-surface-container-low pt-8">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            {items.map((item: any, index: number) => (
              <div key={item.id ?? index} className="group">
                {item.image && (
                  <div className="relative aspect-[4/3] bg-surface-container overflow-hidden mb-6 rounded-DEFAULT">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label uppercase tracking-widest text-xs font-semibold text-primary">
                    {item.category}
                  </span>
                </div>
                <h3 className="font-headline text-3xl text-on-surface mb-3 group-hover:text-primary transition-colors font-light">
                  {item.title}
                </h3>
                <p className="font-body text-on-surface-variant leading-relaxed italic">{item.description}</p>
              </div>
            ))}
          </div>
        </Section>

        <CTASection dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
