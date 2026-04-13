import React from "react";
import { Locale } from "@/lib/dictionaries";

interface JsonLdProps {
  lang: Locale;
  page?: "home" | "services" | "portfolio" | "spaces" | "about" | "faq" | "contact" | "blog";
  breadcrumbs?: Array<{ name: string; url: string }>;
  faqItems?: Array<{ question: string; answer: string }>;
  services?: Array<{ title: string; description: string }>;
}

export const JsonLd: React.FC<JsonLdProps> = ({
  lang,
  page = "home",
  breadcrumbs,
  faqItems,
  services,
}) => {
  const baseUrl = "https://spacesorganizers.com";

  /* ── 1. WEBSITE — sitelinks searchbox signal ── */
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: `${baseUrl}/`,
    name: "Space Organizers",
    description:
      "Luxury home organization, decluttering & wardrobe services on the French Riviera.",
    inLanguage: [lang],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/${lang}/services?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  /* ── 2. LOCAL BUSINESS ── */
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService", "HomeAndConstructionBusiness"],
    "@id": `${baseUrl}/#business`,
    name: "Space Organizers",
    alternateName: "Spaces Organizers",
    image: [
      `${baseUrl}/og-image.jpg`,
    ],
    logo: `${baseUrl}/icon.svg`,
    url: `${baseUrl}/${lang}`,
    telephone: ["+33745737955", "+380669387809"],
    email: "arranginggarderobs@gmail.com",
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cannes",
      addressRegion: "Alpes-Maritimes",
      postalCode: "06400",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.5528,
      longitude: 7.0174,
    },
    founder: {
      "@type": "Person",
      name: "Olena",
      jobTitle: "Lead Professional Organizer",
    },
    foundingDate: "2022",
    areaServed: [
      { "@type": "City", name: "Cannes" },
      { "@type": "City", name: "Monaco" },
      { "@type": "City", name: "Nice" },
      { "@type": "City", name: "Antibes" },
      { "@type": "City", name: "Juan-les-Pins" },
      { "@type": "City", name: "Cap d'Antibes" },
      { "@type": "City", name: "Menton" },
      { "@type": "City", name: "Saint-Jean-Cap-Ferrat" },
      { "@type": "City", name: "Èze" },
      { "@type": "City", name: "Vence" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "10:00",
        closes: "17:00",
      },
    ],
    sameAs: [
      "https://www.instagram.com/spacesorganizers",
    ],
    description:
      lang === "fr"
        ? "Services d'organisation de maison de luxe, désencombrement et dressings sur toute la Côte d'Azur. Basé à Cannes, intervient à Monaco, Nice et Antibes."
        : lang === "ru"
        ? "Роскошная организация дома, расхламление и услуги гардероба по всему Лазурному берегу. Работаем в Каннах, Монако, Ницце и Антибе."
        : lang === "de"
        ? "Luxushaushalt-Organisation, Entrümpelung und Garderoben-Service an der gesamten Côte d'Azur. Tätig in Cannes, Monaco, Nizza und Antibes."
        : "Premium luxury home organization, decluttering, and wardrobe services across the French Riviera. Based in Cannes, serving Monaco, Nice, and Antibes.",
    serviceType: [
      "Home Organization",
      "Decluttering",
      "Wardrobe Organization",
      "Kitchen Organization",
      "Moving Assistance",
      "Interior Styling",
    ],
    knowsLanguage: ["en", "fr", "ru", "de"],
    hasMap: "https://maps.google.com/?q=Cannes,France",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      ratingCount: "24",
    },
  };

  /* ── 3. SERVICES (if provided) ── */
  const servicesSchemas = services?.map((s, i) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/${lang}/services#service-${i + 1}`,
    name: s.title,
    description: s.description.replace(/<[^>]*>/g, "").substring(0, 300),
    provider: { "@id": `${baseUrl}/#business` },
    areaServed: [
      { "@type": "City", name: "Cannes" },
      { "@type": "City", name: "Monaco" },
      { "@type": "City", name: "Nice" },
    ],
    url: `${baseUrl}/${lang}/services`,
  }));

  /* ── 4. BREADCRUMBS ── */
  const breadcrumbSchema = breadcrumbs
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: crumb.name,
          item: crumb.url,
        })),
      }
    : null;

  /* ── 5. FAQ ── */
  const faqSchema = faqItems
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer.replace(/<[^>]*>/g, "").substring(0, 500),
          },
        })),
      }
    : null;

  const schemas = [
    websiteSchema,
    businessSchema,
    ...(servicesSchemas || []),
    ...(breadcrumbSchema ? [breadcrumbSchema] : []),
    ...(faqSchema ? [faqSchema] : []),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};
