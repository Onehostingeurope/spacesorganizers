import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";
import { HeroSection } from "@/components/blocks/HeroSection";
import { ProcessSteps } from "@/components/blocks/ProcessSteps";
import { Testimonials } from "@/components/blocks/TestimonialCard";
import { FAQAccordion } from "@/components/blocks/FAQAccordion";
import { CTASection } from "@/components/blocks/CTASection";
import { ContactForm } from "@/components/blocks/ContactForm";
import { ServiceCard } from "@/components/blocks/ServiceCard";
import { Section } from "@/components/ui/Section";
import { getDictionary, hasLocale, type Locale } from "@/lib/dictionaries";
import { getCollection } from "@/lib/db";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const heroSlides = await getCollection<any>("hero");
  
  // Fetch dynamic homepage settings
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  let homepageSettings: any = null;
  try {
    const res = await fetch(`${baseUrl}/api/homepage-settings?lang=${lang}`, { cache: "no-store" });
    const data = await res.json();
    if (data && data.lang) homepageSettings = data;
  } catch (err) {
    console.error("Homepage settings fetch error:", err);
  }

  const p = dict.philosophy;
  const c = dict.contact;

  const content = {
    phi: {
      label: homepageSettings?.phi_label || p.label,
      heading: homepageSettings?.phi_heading || p.heading,
      quote: homepageSettings?.phi_quote || p.quote,
      pantry_title: homepageSettings?.phi_pantry_title || p.pantry_title,
      pantry_desc: homepageSettings?.phi_pantry_desc || p.pantry_desc,
      pantry_image: homepageSettings?.phi_pantry_image || "https://lh3.googleusercontent.com/aida-public/AB6AXuAwIpP4aH2BvLhuNJiRyx4peAXNLZX_orDABAiUaRLoQb0YdXKMufmLiM1L4yfqrxEMAyi_hJIEqApiAgWx6ocSNce08fv88AMIyh-eLDzBuudDcG0sNGueOygNc0lL3SyO0HbJoxRKKt4Fbqab5HdmJPKeyE7cmJEnMR1atpZlbRSySyp5HD1kcyXw5kcs_X920wMrxSJkrcLdtO2-NvK9XQmwvMWDld6jelvJwjG0QNm9k2VWuIbfnr_M8XI4R0V2E_hsmXbhpF4",
      living_title: homepageSettings?.phi_living_title || p.living_title,
      living_desc: homepageSettings?.phi_living_desc || p.living_desc,
      living_image: homepageSettings?.phi_living_image || "https://lh3.googleusercontent.com/aida-public/AB6AXuDygYhpmBudxxNndS055nDEXCZqC8utNwLG7kd7_3JkEZFyjpuxub7t2HpLoEfAV3qN8_S1cDL0PgusYWWHrCBMc3xhe4pnu3h-wAzV6wCGStgS6mV19TYVlFp9qvEnJaPeoWnNhouBghvlWTfxOc8cOrNlt_eXfflhz2wS_yylRAkOte7jSi4onDNlt2QLtgeN6vWSGeSww_z2ZVNq8-pWG3CMaQtTYvuug5JvthZCXlzoiqfz2cnnrq09du2WZFifocEZmob8Cy8",
      wardrobe_title: homepageSettings?.phi_wardrobe_title || p.wardrobe_title,
      wardrobe_desc: homepageSettings?.phi_wardrobe_desc || p.wardrobe_desc,
      wardrobe_image: homepageSettings?.phi_wardrobe_image || "https://lh3.googleusercontent.com/aida-public/AB6AXuB_8ZD6ZPHfMDjNVX2A1le_J7enIzDaXGHPiDgyug0nT9OIeLijtE13WJtxuUtZRAcX9x-1NgissjY_S6wo4d6xe2eCON4yXPc-0I03V_glpiw20wr4w0eKPsdNPlRaN8c1by7PK1OLBBPZRMYCC6a9p-jrUq4qEVtiAqYhxZP0YAzSyf1-aX4ATq8C-ZkNxj8hAPDLd83NCW8WpMJoDkGtYcxliSkXRUzjD62oXqoshRrYQkw9W6qcZBR2PZUt4SbXWLC6A5w38ag",
    },
    contact: {
      heading: homepageSettings?.contact_heading || c.heading,
      heading_accent: homepageSettings?.contact_heading_accent || c.heading_accent,
      description: homepageSettings?.contact_description || c.description,
      serving: homepageSettings?.contact_serving || c.serving,
    }
  };

  return (
    <>
      <Header dict={dict} lang={locale} />
      <main className="flex-1 bg-surface">
        <HeroSection dict={dict} lang={lang} slides={heroSlides} />

        {/* PHILOSOPHY / ATELIER GRID */}
        <section className="bg-surface-container py-32 px-6 md:px-24">
          <div className="max-w-[1920px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end mb-24">
              <div className="md:col-span-12 lg:col-span-5">
                <span className="font-label text-xs tracking-[0.2em] uppercase text-primary mb-4 block">
                  {content.phi.label}
                </span>
                <h3 className="font-headline text-4xl md:text-5xl text-on-surface leading-tight font-light">
                  {content.phi.heading}
                </h3>
              </div>
              <div className="md:col-span-12 lg:col-span-4 lg:col-start-8">
                <p className="font-body text-on-surface-variant leading-relaxed italic">
                  {content.phi.quote}
                </p>
              </div>
            </div>

            {/* Asymmetric Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-8">
                <div className="bg-surface p-1 shadow-sm overflow-hidden group">
                  <Image
                    src={content.phi.pantry_image}
                    alt={content.phi.pantry_title}
                    width={600}
                    height={750}
                    className="w-full aspect-[4/5] object-cover transition-transform duration-[2s] group-hover:scale-105"
                  />
                </div>
                <div className="pt-4 px-2">
                  <h4 className="font-headline text-xl mb-2">{content.phi.pantry_title}</h4>
                  <p className="text-sm text-on-surface-variant font-light tracking-wide">{content.phi.pantry_desc}</p>
                </div>
              </div>

              <div className="space-y-8 md:translate-y-16">
                <div className="bg-surface p-1 shadow-sm overflow-hidden group">
                  <Image
                    src={content.phi.living_image}
                    alt={content.phi.living_title}
                    width={600}
                    height={600}
                    className="w-full aspect-square object-cover transition-transform duration-[2s] group-hover:scale-105"
                  />
                </div>
                <div className="pt-4 px-2">
                  <h4 className="font-headline text-xl mb-2">{content.phi.living_title}</h4>
                  <p className="text-sm text-on-surface-variant font-light tracking-wide">{content.phi.living_desc}</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-surface p-1 shadow-sm overflow-hidden group">
                  <Image
                    src={content.phi.wardrobe_image}
                    alt={content.phi.wardrobe_title}
                    width={600}
                    height={750}
                    className="w-full aspect-[4/5] object-cover transition-transform duration-[2s] group-hover:scale-105"
                  />
                </div>
                <div className="pt-4 px-2">
                  <h4 className="font-headline text-xl mb-2">{content.phi.wardrobe_title}</h4>
                  <p className="text-sm text-on-surface-variant font-light tracking-wide">{content.phi.wardrobe_desc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="bg-surface py-48 md:py-64">
          <ProcessSteps dict={dict} />
        </section>

        <Testimonials dict={dict} />

        <section className="bg-surface-container py-40">
          <FAQAccordion dict={dict} />
        </section>

        {/* CONTACT */}
        <Section className="bg-surface pt-40 pb-56" id="contact">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-40 items-start px-6">
            <div className="pt-8">
              <span className="font-label text-xs tracking-[0.2em] uppercase text-primary mb-8 block">
                {dict.contact.label}
              </span>
              <h3 className="font-headline text-5xl md:text-7xl leading-[1.1] mb-10">
                {content.contact.heading}{" "}
                <br />
                <span className="italic text-primary">{content.contact.heading_accent}</span>
              </h3>
              <p className="font-body text-xl lg:text-2xl text-on-surface-variant leading-relaxed font-light mb-14">
                {content.contact.description}
              </p>
              <div className="space-y-8 text-on-surface-variant font-sans tracking-wide text-sm leading-relaxed border-t border-outline-variant/30 pt-14">
                <p className="flex items-center">
                  <strong className="font-bold uppercase tracking-[0.3em] text-[10px] text-on-surface w-24">
                    {dict.contact.serving_label}
                  </strong>
                  {content.contact.serving}
                </p>
                <p className="flex items-center">
                  <strong className="font-bold uppercase tracking-[0.3em] text-[10px] text-on-surface w-24">
                    {dict.contact.email_label}
                  </strong>
                  hello@spaceorganizing.com
                </p>
                <p className="flex items-center">
                  <strong className="font-bold uppercase tracking-[0.3em] text-[10px] text-on-surface w-24">
                    {dict.contact.phone_label}
                  </strong>
                  +33 (0) 6 40 60 81 20
                </p>
              </div>
            </div>
            <div className="bg-surface p-12 md:p-20 shadow-lg rounded-DEFAULT ghost-border">
              <ContactForm />
            </div>
          </div>
        </Section>
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
