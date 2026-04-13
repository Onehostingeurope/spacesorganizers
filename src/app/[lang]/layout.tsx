import type { Metadata } from "next";
import {
  getDictionary,
  hasLocale,
  LOCALES,
  type Locale,
} from "@/lib/dictionaries";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = hasLocale(lang) ? (lang as Locale) : "en";
  const dict = await getDictionary(locale);

  const titles: Record<Locale, string> = {
    en: "Space Organizing | Luxury Home Organization French Riviera",
    fr: "Organisation d'Espaces | Organisation de Luxe Côte d'Azur",
    ru: "Организация Пространства | Роскошная Организация Дома Лазурный Берег",
    de: "Raumorganisation | Luxus Heimorganisation Côte d'Azur",
  };
  const descriptions: Record<Locale, string> = {
    en: "Home organization, decluttering & wardrobe services on the French Riviera.",
    fr: "Organisation de la maison, désencombrement & dressing sur la Côte d'Azur.",
    ru: "Организация дома, расхламление и услуги гардероба на Лазурном Берегу.",
    de: "Heimorganisation, Entrümpelung & Garderobe-Services an der Côte d'Azur.",
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  return (
    <div className="contents">
      {children}
    </div>
  );
}
