export const dynamic = "force-dynamic";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";
import { CTASection } from "@/components/blocks/CTASection";
import { getDictionary, hasLocale, LOCALES, type Locale } from "@/lib/dictionaries";
import { getCollection } from "@/lib/db";
import { RichText } from "@/components/ui/RichText";
import { Carousel } from "@/components/ui/Carousel";
import { JsonLd } from "@/components/seo/JsonLd";

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
    en: "Home Organization Services in Cannes, Monaco & Nice | Space Organizers",
    fr: "Services d'organisation de maison à Cannes, Monaco & Nice | Space Organizers",
    ru: "Услуги по организации дома в Каннах, Монако и Ницце | Space Organizers",
    de: "Heimorganisation in Cannes, Monaco & Nizza | Space Organizers",
  };
  const descriptions: Record<Locale, string> = {
    en: "Discover our luxury home organization services on the French Riviera: wardrobe styling, decluttering, kitchen organization, moving assistance & more. Serving Cannes, Monaco, Nice, Antibes.",
    fr: "Découvrez nos services de luxe : organisation de garde-robe, désencombrement, cuisine, déménagement et plus encore. Intervenant à Cannes, Monaco, Nice, Antibes et toute la Côte d'Azur.",
    ru: "Откройте для себя наши роскошные услуги: организация гардероба, расхламление, кухня, помощь при переезде и многое другое. Работаем в Каннах, Монако, Ницце и Антибе.",
    de: "Entdecken Sie unsere Luxusleistungen: Garderobenorganisation, Entrümpelung, Küche, Umzugshilfe und mehr. In Cannes, Monaco, Nizza und Antibes tätig.",
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    keywords: [
      "home organizer Cannes", "professional organizer Monaco", "luxury decluttering French Riviera",
      "wardrobe organization Nice", "rangement maison Cannes", "organisateur Monaco",
    ],
    alternates: {
      canonical: `${baseUrl}/${locale}/services`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${baseUrl}/${l}/services`])),
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: `${baseUrl}/${locale}/services`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const services = await getCollection<any>("services", lang);

  return (
    <>
      <JsonLd
        lang={locale}
        page="services"
        services={services.map((s: any) => ({ title: s.title, description: s.description || "" }))}
        breadcrumbs={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Services", url: `${baseUrl}/${locale}/services` },
        ]}
      />
      <Header dict={dict} lang={locale} />

      <main>

        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <section className="relative bg-[#fffcf7] flex flex-col items-center justify-center pb-20 pt-40 px-6 overflow-hidden">
          {/* Background texture lines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(74,67,58,0.03) 0px, rgba(74,67,58,0.03) 1px, transparent 1px, transparent 80px)",
            }}
          />

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <span className="font-label text-[9px] uppercase tracking-[0.45em] text-on-surface-variant/40 block mb-8">
              {dict.nav.services}
            </span>
            <h1 className="font-headline text-[clamp(4rem,10vw,9rem)] font-light leading-[0.9] tracking-[-0.03em] text-on-surface">
              {dict.nav.services}
            </h1>

          </div>

          {/* Scroll cue — animated mouse indicator */}
          <div className="mt-10 flex flex-col items-center gap-4 z-10">
            <div className="w-[18px] h-[30px] border-2 border-primary rounded-full flex justify-center p-1 shadow-sm">
              <div
                className="w-1 h-2 bg-primary rounded-full animate-bounce-slow"
                style={{ animationDuration: "1.6s" }}
              />
            </div>
            <span className="font-label text-[8px] tracking-[0.5em] uppercase text-primary whitespace-nowrap drop-shadow-sm">
              Scroll
            </span>
          </div>
        </section>

        {/* ══ SERVICE LIST ══════════════════════════════════════════════════ */}
        <section className="bg-[#fffcf7]">
          {services.map((service: any, idx: number) => {
            const isEven = idx % 2 === 0;
            const hasGallery = service.gallery && service.gallery.length > 0;
            const hasImage = !hasGallery && !!service.image;

            return (
              <article
                key={service.id}
                className="border-t border-outline-variant/15 last:border-b"
              >
                <div
                  className={`max-w-[1540px] mx-auto flex flex-col ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } min-h-[80vh]`}
                >
                  {/* ── Image / Carousel pane ── */}
                  <div className="relative w-full md:w-[55%] overflow-hidden bg-surface-container-low">
                    {hasGallery ? (
                      <div className="h-full min-h-[56vw] md:min-h-0">
                        <Carousel
                          images={service.gallery}
                          altPrefix={service.title}
                          speed={service.carouselSpeed || service.carousel_speed || 4}
                        />
                      </div>
                    ) : hasImage ? (
                      <div className="relative h-full min-h-[56vw] md:min-h-0">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                          sizes="(max-width:768px) 100vw, 55vw"
                        />
                      </div>
                    ) : (
                      <div className="h-full min-h-[56vw] md:min-h-0 bg-surface-container-high flex items-center justify-center">
                        <span
                          className="font-headline text-[120px] font-light leading-none select-none"
                          style={{ color: "rgba(74,67,58,0.06)" }}
                        >
                          0{idx + 1}
                        </span>
                      </div>
                    )}

                    {/* Service number — top-left badge */}
                    <span
                      className="absolute top-8 left-8 font-label text-[9px] tracking-[0.35em] uppercase z-10"
                      style={{
                        color: "rgba(255,252,247,0.75)",
                        textShadow: "0 1px 4px rgba(0,0,0,0.25)",
                      }}
                    >
                      0{idx + 1} / {String(services.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* ── Text pane ── */}
                  <div
                    className={`w-full md:w-[45%] flex flex-col justify-center px-10 md:px-16 lg:px-20 py-20 md:py-0 ${
                      isEven ? "" : ""
                    }`}
                  >
                    {/* Service number */}
                    <span className="font-label text-[8px] uppercase tracking-[0.45em] text-on-surface-variant/35 block mb-8">
                      Service 0{idx + 1}
                    </span>

                    <h2 className="font-headline text-[clamp(2.2rem,4vw,4.5rem)] font-light leading-[1.05] tracking-[-0.02em] text-on-surface mb-8">
                      {service.title}
                    </h2>

                    <div className="w-10 h-[1px] bg-primary/50 mb-8" />

                    <div className="font-body text-on-surface-variant/70 text-base leading-[1.85] font-light mb-12 max-w-md">
                      <RichText
                        content={service.description}
                        className="service-card-rich-text"
                      />
                    </div>

                    <Link
                      href={`/${lang}/contact`}
                      className="group inline-flex items-center gap-4 font-label text-[9px] uppercase tracking-[0.35em] text-on-surface hover:text-primary transition-colors duration-500 self-start"
                    >
                      <span className="relative">
                        {dict.nav.cta}
                        <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-[1px] bg-primary transition-all duration-500" />
                      </span>
                      <span className="transform translate-x-0 group-hover:translate-x-2 transition-transform duration-500">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <CTASection dict={dict} lang={lang} />
      </main>

      <Footer dict={dict} lang={lang} />
    </>
  );
}
