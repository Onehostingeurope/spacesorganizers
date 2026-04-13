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
  title: "Space Organizers | Luxury Home Organization French Riviera",
  description:
    "Home organization, decluttering & wardrobe services on the French Riviera.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body className={`${notoSerif.variable} ${manrope.variable} bg-surface font-body text-on-surface antialiased min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
