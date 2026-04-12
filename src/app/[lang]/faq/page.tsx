import React from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";
import { FAQAccordion } from "@/components/blocks/FAQAccordion";
import { CTASection } from "@/components/blocks/CTASection";
import { getDictionary, hasLocale, type Locale } from "@/lib/dictionaries";

export default async function FAQPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Header dict={dict} lang={locale} />
      <main className="flex-1 pt-24">
        <FAQAccordion dict={dict} />
        <CTASection dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
