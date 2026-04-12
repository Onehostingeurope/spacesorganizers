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

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const services = await getCollection<any>("services", lang);

  return (
    <>
      <Header dict={dict} lang={locale} />
      <main className="flex-1 pt-24 md:pt-32">
        <Section className="bg-surface pb-20 border-b border-outline-variant/10">
          <div className="max-w-4xl mx-auto text-center">
            <Subheading className="mb-4 opacity-70">{dict.nav.services}</Subheading>
            <Heading as="h1" className="mb-8 font-light">
              {dict.nav.services}
            </Heading>
          </div>
        </Section>

        <Section className="bg-surface-container-low">
          <div className="max-w-6xl mx-auto space-y-32">
            {services.map((service: any, idx: number) => (
              <div
                key={service.id}
                className={`flex flex-col ${idx % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12 lg:gap-24`}
              >
                {service.image && (
                  <div className="w-full md:w-1/2">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-DEFAULT">
                      <Image src={service.image} alt={service.title} fill className="object-cover" />
                    </div>
                  </div>
                )}
                <div className="w-full md:w-1/2">
                  <Heading as="h2" className="text-4xl mb-6 font-light">{service.title}</Heading>
                  <Body className="mb-8 italic">{service.description}</Body>
                </div>
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
