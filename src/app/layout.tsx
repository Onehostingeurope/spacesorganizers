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
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />

        {/* WhatsApp / social OG tags — must be in <head> directly */}
        <meta property="og:type"        content="website" />
        <meta property="og:site_name"   content="Space Organizers" />
        <meta property="og:title"       content="Space Organizers | Luxury Home Organization French Riviera" />
        <meta property="og:description" content="Premium home organization, decluttering & wardrobe styling in Cannes, Monaco, Nice & Antibes." />
        <meta property="og:image"       content="https://spacesorganizers.com/og-image.jpg" />
        <meta property="og:image:width"  content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt"   content="Space Organizers — Luxury Home Organization French Riviera" />
        <meta property="og:url"         content="https://spacesorganizers.com" />
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content="Space Organizers | Luxury Home Organization French Riviera" />
        <meta name="twitter:description" content="Premium home organization, decluttering & wardrobe styling in Cannes, Monaco, Nice & Antibes." />
        <meta name="twitter:image"       content="https://spacesorganizers.com/og-image.jpg" />
      </head>
      <body
        className={`${notoSerif.variable} ${manrope.variable} bg-surface font-body text-on-surface antialiased min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
