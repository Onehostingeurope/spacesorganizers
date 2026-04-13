import React from 'react';
import { Locale } from '@/lib/dictionaries';

interface JsonLdProps {
  lang: Locale;
}

export const JsonLd: React.FC<JsonLdProps> = ({ lang }) => {
  const baseUrl = 'https://spacesorganizers.com';
  
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Spaces Organizers",
    "image": `${baseUrl}/icon.svg`,
    "@id": `${baseUrl}/#business`,
    "url": `${baseUrl}/${lang}`,
    "telephone": "+380 66 938 78 09",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cannes",
      "addressRegion": "French Riviera",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.5528,
      "longitude": 7.0174
    },
    "founder": {
      "@type": "Person",
      "name": "Olena",
      "jobTitle": "Lead Professional Organizer"
    },
    "sameAs": [
      "https://www.instagram.com/spacesorganizers"
    ],
    "description": lang === 'fr' 
      ? "Services d'organisation de maison de luxe, désencombrement et dressings sur toute la Côte d'Azur."
      : "Luxury home organization, decluttering, and wardrobe services across the French Riviera.",
    "areaServed": [
      { "@type": "City", "name": "Cannes" },
      { "@type": "City", "name": "Monaco" },
      { "@type": "City", "name": "Nice" },
      { "@type": "City", "name": "Antibes" }
    ],
    "priceRange": "$$$"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
    />
  );
};
