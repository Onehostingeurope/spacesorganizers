import type { Metadata } from "next";
import {
  getDictionary,
  hasLocale,
  LOCALES,
  type Locale,
} from "@/lib/dictionaries";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";

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
  const baseUrl = 'https://spacesorganizers.com';

  const titles: Record<Locale, string> = {
    en: "Space Organizers | Luxury Home Organization French Riviera",
    fr: "Spaces Organizers | Organisation de Luxe & Désencombrement Côte d'Azur",
    ru: "Организация Пространства | Роскошная Организация Дома Лазурный Берег",
    de: "Spaces Organizers | Luxus-Heimorganisation Côte d'Azur",
  };
  const descriptions: Record<Locale, string> = {
    en: "Premium home organization, decluttering, and wardrobe services in Cannes, Nice, and Monaco. Elevate your sanctuary with Spaces Organizers.",
    fr: "Services haut de gamme d'organisation de la maison, désencombrement et dressings à Cannes, Nice et Monaco. Créez votre sanctuaire.",
    ru: "Роскошная организация дома, расхламление и услуги гардероба в Каннах, Ницце и Монако. Создайте свой уют с Spaces Organizers.",
    de: "Premium-Heimorganisation, Entrümpelung und Garderoben-Service in Cannes, Nizza und Monaco. Schaffen Sie Ihr Refugium.",
  };

  const keywords: Record<Locale, string> = {
    en: "home organization, decluttering, professional organizer, french riviera, monaco, cannes, luxury home styling, wardrobe organization",
    fr: "organisation de maison, désencombrement, organisateur professionnel, côte d'azur, cannes, monaco, nice, dressing sur mesure",
    ru: "организация дома, расхламление, профессиональный организатор, лазурный берег, канны, монако, ницца, порядок в гардеробе",
    de: "heimorganisation, entrümpelung, professioneller organisator, côte d'azur, cannes, monaco, nizza, garderobenorganisation",
  };

  const alternates = {
    canonical: `${baseUrl}/${locale}`,
    languages: LOCALES.reduce((acc, l) => ({ 
      ...acc, 
      [l]: `${baseUrl}/${l}` 
    }), {}),
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    keywords: keywords[locale],
    alternates,
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: `${baseUrl}/${locale}`,
      siteName: "Spaces Organizers",
      locale: locale === 'en' ? 'en_US' : locale === 'fr' ? 'fr_FR' : locale === 'ru' ? 'ru_RU' : 'de_DE',
      type: 'website',
      images: [
        {
          url: '/og-image.jpg', // Ensure this exists or use a high-res shot
          width: 1200,
          height: 630,
          alt: titles[locale],
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale],
      description: descriptions[locale],
      images: ['/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
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
      <JsonLd lang={lang as Locale} />
      {children}
    </div>
  );
}
