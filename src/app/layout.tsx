import type { Metadata } from "next";
import "./globals.css";

// Root layout — minimal wrapper for non-locale paths (admin, api, etc.)
// Locale-routed pages use src/app/[lang]/layout.tsx instead.
export const metadata: Metadata = {
  title: "Space Organizing | Luxury Home Organization French Riviera",
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
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,300;0,400;1,300;1,400&family=Manrope:wght@300;400;500;600&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="bg-surface font-body text-on-surface antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
