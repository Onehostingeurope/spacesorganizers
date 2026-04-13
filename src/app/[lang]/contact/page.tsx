import React from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";
import { ContactForm } from "@/components/blocks/ContactForm";
import { Section } from "@/components/ui/Section";
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
      <main className="flex-1 pt-32 pb-32 bg-surface">
        <Section className="bg-surface lg:pt-12" id="contact">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-40 items-start px-6">
            <div className="pt-8">
              <span className="font-label text-xs tracking-[0.2em] uppercase text-primary mb-8 block">
                {c.label}
              </span>
              <h3 className="font-headline text-5xl md:text-7xl leading-tight mb-8 tracking-tight">
                {c.heading}{" "}
                <br />
                <span className="italic text-primary">{c.heading_accent}</span>
              </h3>
              <p className="font-body text-xl lg:text-3xl text-on-surface-variant leading-relaxed font-light mb-14 italic">
                {c.description}
              </p>
              <div className="space-y-8 text-on-surface-variant font-sans tracking-wide text-sm leading-relaxed border-t border-outline-variant/30 pt-14">
                <p className="flex items-center group cursor-default">
                  <strong className="font-bold uppercase tracking-[0.3em] text-[10px] text-on-surface w-28 flex items-center gap-3">
                    <span className="w-5 h-[2px] bg-primary rotate-[-60deg] transition-transform duration-500 group-hover:rotate-[-40deg]"></span>
                    {c.serving_label}
                  </strong>
                  {c.serving}
                </p>
                <p className="flex items-center group cursor-default">
                  <strong className="font-bold uppercase tracking-[0.3em] text-[10px] text-on-surface w-28 flex items-center gap-3">
                    <span className="w-5 h-[2px] bg-primary rotate-[-60deg] transition-transform duration-500 group-hover:rotate-[-40deg]"></span>
                    {c.email_label}
                  </strong>
                  hello@spaceorganizing.com
                </p>
                <p className="flex items-center group cursor-default">
                  <strong className="font-bold uppercase tracking-[0.3em] text-[10px] text-on-surface w-28 flex items-center gap-3">
                    <span className="w-5 h-[2px] bg-primary rotate-[-60deg] transition-transform duration-500 group-hover:rotate-[-40deg]"></span>
                    {c.phone_label}
                  </strong>
                  +380 66 938 78 09
                </p>
              </div>
            </div>
            <div className="bg-surface p-12 md:p-20 shadow-premium rounded-DEFAULT ghost-border">
              <ContactForm />
            </div>
          </div>
        </Section>
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
