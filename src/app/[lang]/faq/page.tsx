export const dynamic = "force-dynamic";
import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";
import { FAQAccordion } from "@/components/blocks/FAQAccordion";
import { CTASection } from "@/components/blocks/CTASection";
import { getDictionary, hasLocale, LOCALES, type Locale } from "@/lib/dictionaries";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCollection } from "@/lib/db";

const baseUrl = "https://spacesorganizers.com";

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = hasLocale(lang) ? (lang as Locale) : "en";

  const titles: Record<Locale, string> = {
    en: "FAQ — Home Organization Questions | Space Organizers Cannes",
    fr: "FAQ — Questions sur l'organisation de maison | Space Organizers Cannes",
    ru: "FAQ — Вопросы об организации дома | Space Organizers Канны",
    de: "FAQ — Fragen zur Heimorganisation | Space Organizers Cannes",
  };
  const descriptions: Record<Locale, string> = {
    en: "Have questions about luxury home organization on the French Riviera? Find answers about our services, process, pricing and service area covering Cannes, Monaco, Nice and Antibes.",
    fr: "Des questions sur l'organisation de maison de luxe sur la Côte d'Azur ? Trouvez les réponses sur nos services, processus, tarifs et zone d'intervention : Cannes, Monaco, Nice, Antibes.",
    ru: "Есть вопросы об организации дома на Лазурном берегу? Найдите ответы о наших услугах, процессе работы, ценах и зоне обслуживания: Канны, Монако, Ницца, Антиб.",
    de: "Fragen zur Luxus-Heimorganisation an der Côte d'Azur? Antworten zu unseren Leistungen, Prozessen, Preisen und dem Einzugsgebiet: Cannes, Monaco, Nizza, Antibes.",
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: `${baseUrl}/${locale}/faq`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${baseUrl}/${l}/faq`])),
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: `${baseUrl}/${locale}/faq`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const faqItems = await getCollection<any>("faq", lang);

  const faqForSchema = faqItems.map((item: any) => ({
    question: item.question || item.title || "",
    answer: item.answer || item.content || item.description || "",
  }));

  return (
    <>
      <JsonLd
        lang={locale}
        page="faq"
        faqItems={faqForSchema}
        breadcrumbs={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "FAQ", url: `${baseUrl}/${locale}/faq` },
        ]}
      />
      <Header dict={dict} lang={locale} />
      <main className="flex-1 pt-24">
        <FAQAccordion dict={dict} items={faqForSchema} />
        <CTASection dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
