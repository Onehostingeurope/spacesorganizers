import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://spacesorganizers.com"),
  title: {
    default: "Space Organizers | Luxury Home Organization French Riviera",
    template: "%s | Space Organizers — French Riviera",
  },
  description:
    "Premium home organization, decluttering & wardrobe styling in Cannes, Monaco, Nice & Antibes. Transform your home into a luxury sanctuary with Space Organizers.",
  keywords: [
    "home organizer French Riviera",
    "luxury home organization Cannes",
    "professional organizer Monaco",
    "decluttering Nice",
    "wardrobe organization Cannes",
    "home styling Côte d'Azur",
    "rangement maison Cannes",
    "organisateur professionnel Monaco",
  ],
  authors: [{ name: "Space Organizers", url: "https://spacesorganizers.com" }],
  creator: "Space Organizers",
  publisher: "Space Organizers",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR", "ru_RU", "de_DE"],
    url: "https://spacesorganizers.com",
    siteName: "Space Organizers",
    title: "Space Organizers | Luxury Home Organization French Riviera",
    description:
      "Premium home organization, decluttering & wardrobe styling in Cannes, Monaco, Nice & Antibes.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Space Organizers — Luxury Home Organization French Riviera",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Space Organizers | Luxury Home Organization French Riviera",
    description:
      "Premium home organization, decluttering & wardrobe styling in Cannes, Monaco, Nice & Antibes.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-placeholder",
  },
  alternates: {
    canonical: "https://spacesorganizers.com",
    languages: {
      "en": "https://spacesorganizers.com/en",
      "fr": "https://spacesorganizers.com/fr",
      "ru": "https://spacesorganizers.com/ru",
      "de": "https://spacesorganizers.com/de",
      "x-default": "https://spacesorganizers.com/en",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${notoSerif.variable} ${manrope.variable} bg-surface font-body text-on-surface antialiased min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
