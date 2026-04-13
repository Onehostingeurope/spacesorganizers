import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";
import { CTASection } from "@/components/blocks/CTASection";
import { Section } from "@/components/ui/Section";
import { Heading, Subheading, Body } from "@/components/ui/Typography";
import { Carousel } from "@/components/ui/Carousel";
import { getDictionary, hasLocale, type Locale } from "@/lib/dictionaries";
import { getCollection } from "@/lib/db";
import { RichText } from "@/components/ui/RichText";

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
            {/* Decorative line */}
            <div className="flex justify-center mb-16">
              <span className="block w-14 h-[2px] bg-primary rounded-full" />
            </div>
            {/* Scroll Indicator */}
            <div className="flex flex-col items-center gap-3 mt-4 animate-bounce-slow">
              <div className="w-8 h-8 rounded-full border border-on-surface/30 flex items-center justify-center">
                <span className="font-label text-[9px] tracking-[0.15em] text-on-surface/40">0</span>
              </div>
              <div className="w-[1px] h-10 bg-on-surface/20" />
              <span className="font-label text-[9px] tracking-[0.35em] uppercase text-on-surface/40">Scroll</span>
            </div>
          </div>
        </Section>

        <Section className="bg-surface-container-low">
          <div className="max-w-6xl mx-auto space-y-32">
            {services.map((service: any, idx: number) => (
              <div
                key={service.id}
                className={`flex flex-col ${idx % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12 lg:gap-24`}
              >
                {(service.gallery && service.gallery.length > 0) ? (
                  <div className="w-full pl-0 md:w-1/2">
                    <Carousel images={service.gallery} altPrefix={service.title} speed={service.carouselSpeed || service.carousel_speed || 4} />
                  </div>
                ) : service.image ? (
                  <div className="w-full md:w-1/2">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-DEFAULT">
                      <Image src={service.image} alt={service.title} fill className="object-cover" />
                    </div>
                  </div>
                ) : null}
                <div className="w-full md:w-1/2 text-center flex flex-col items-center">
                  <Heading as="h2" className="text-4xl mb-6 font-light">{service.title}</Heading>
                  <RichText content={service.description} className="mb-8 w-full" />
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
