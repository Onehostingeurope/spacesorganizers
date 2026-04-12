import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import "../globals.css";

import {
  getDictionary,
  hasLocale,
  LOCALES,
  type Locale,
} from "@/lib/dictionaries";
import { notFound } from "next/navigation";

const notoSerif = Noto_Serif({
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

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

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      className={`${notoSerif.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
      </head>
      <body className="bg-surface font-body text-on-surface antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
