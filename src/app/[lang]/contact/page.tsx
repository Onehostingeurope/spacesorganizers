import React from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";
import { ContactForm } from "@/components/blocks/ContactForm";
import { Section } from "@/components/ui/Section";
import { Heading, Subheading } from "@/components/ui/Typography";
import { getDictionary, hasLocale, type Locale } from "@/lib/dictionaries";

export default async function Contact({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const c = dict.contact;

  return (
    <>
      <Header dict={dict} lang={locale} />
      <main className="flex-1 pt-24 bg-surface">
        <Section className="pb-12 text-center border-b border-outline-variant/10">
          <div className="max-w-3xl mx-auto px-6">
            <Subheading className="mb-4 opacity-70">{c.label}</Subheading>
            <Heading as="h1" className="mb-6 font-light">
              {c.heading} <span className="italic text-primary">{c.heading_accent}</span>
            </Heading>
            <p className="font-body text-on-surface-variant leading-relaxed text-lg">
              {c.description}
            </p>
          </div>
        </Section>

        <Section className="bg-surface-container-low pt-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-surface p-8 md:p-16 ghost-border shadow-ambient rounded-DEFAULT mb-20">
              <ContactForm />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center pt-8">
              <div className="flex flex-col items-center group cursor-default">
                <p className="font-label font-bold text-[10px] tracking-[0.3em] uppercase text-on-surface mb-3 flex items-center justify-center gap-3">
                  <span className="w-5 h-[2px] bg-primary rotate-[-60deg] transition-transform duration-500 group-hover:rotate-[-40deg]"></span>
                  {c.email_label}
                </p>
                <p className="font-body text-on-surface-variant text-sm">hello@spaceorganizing.com</p>
              </div>
              <div className="flex flex-col items-center group cursor-default">
                <p className="font-label font-bold text-[10px] tracking-[0.3em] uppercase text-on-surface mb-3 flex items-center justify-center gap-3">
                  <span className="w-5 h-[2px] bg-primary rotate-[-60deg] transition-transform duration-500 group-hover:rotate-[-40deg]"></span>
                  {c.phone_label}
                </p>
                <p className="font-body text-on-surface-variant text-sm">+380 66 938 78 09</p>
              </div>
              <div className="flex flex-col items-center group cursor-default">
                <p className="font-label font-bold text-[10px] tracking-[0.3em] uppercase text-on-surface mb-3 flex items-center justify-center gap-3">
                  <span className="w-5 h-[2px] bg-primary rotate-[-60deg] transition-transform duration-500 group-hover:rotate-[-40deg]"></span>
                  {c.serving_label}
                </p>
                <p className="font-body text-on-surface-variant text-sm">{c.serving}</p>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
