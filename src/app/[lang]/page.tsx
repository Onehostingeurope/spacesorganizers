export const dynamic = "force-dynamic";
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
import { ServicesSection } from "@/components/blocks/ServicesSection";
import { SpacesSection } from "@/components/blocks/SpacesSection";
import { PortfolioHighlights } from "@/components/blocks/PortfolioHighlights";
import { Section } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
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
  const services = await getCollection<any>("services", lang);
  const spaces = await getCollection<any>("spaces", lang);
  const portfolio = await getCollection<any>("portfolio", lang);
  
  // Fetch dynamic settings directly for reliability (avoiding internal API fetch in RSC)
  const [heroSettingsData, homepageSettingsData] = await Promise.all([
    getCollection<any>("hero_settings"),
    getCollection<any>("homepage_settings")
  ]);

  const heroSettings = heroSettingsData.find(s => s.lang === lang) || heroSettingsData[0];
  const homepageSettings = homepageSettingsData.find(s => s.lang === lang) || homepageSettingsData[0];

  const isDarkHero = false; // Overlays removed

  const p = dict.philosophy;
  const c = dict.contact;

  const content = {
    phi: {
      label: homepageSettings?.phi_label || dict.philosophy.label,
      heading: homepageSettings?.phi_heading || dict.philosophy.heading,
      quote: homepageSettings?.phi_quote || dict.philosophy.quote,
      pantry_title: homepageSettings?.phi_pantry_title || dict.philosophy.pantry_title,
      pantry_desc: homepageSettings?.phi_pantry_desc || dict.philosophy.pantry_desc,
      pantry_image: homepageSettings?.phi_pantry_image || "https://lh3.googleusercontent.com/aida-public/AB6AXuAwIpP4aH2BvLhuNJiRyx4peAXNLZX_orDABAiUaRLoQb0YdXKMufmLiM1L4yfqrxEMAyi_hJIEqApiAgWx6ocSNce08fv88AMIyh-eLDzBuudDcG0sNGueOygNc0lL3SyO0HbJoxRKKt4Fbqab5HdmJPKeyE7cmJEnMR1atpZlbRSySyp5HD1kcyXw5kcs_X920wMrxSJkrcLdtO2-NvK9XQmwvMWDld6jelvJwjG0QNm9k2VWuIbfnr_M8XI4R0V2E_hsmXbhpF4",
      living_title: homepageSettings?.phi_living_title || dict.philosophy.living_title,
      living_desc: homepageSettings?.phi_living_desc || dict.philosophy.living_desc,
      living_image: homepageSettings?.phi_living_image || "https://lh3.googleusercontent.com/aida-public/AB6AXuDygYhpmBudxxNndS055nDEXCZqC8utNwLG7kd7_3JkEZFyjpuxub7t2HpLoEfAV3qN8_S1cDL0PgusYWWHrCBMc3xhe4pnu3h-wAzV6wCGStgS6mV19TYVlFp9qvEnJaPeoWnNhouBghvlWTfxOc8cOrNlt_eXfflhz2wS_yylRAkOte7jSi4onDNlt2QLtgeN6vWSGeSww_z2ZVNq8-pWG3CMaQtTYvuug5JvthZCXlzoiqfz2cnnrq09du2WZFifocEZmob8Cy8",
      wardrobe_title: homepageSettings?.phi_wardrobe_title || dict.philosophy.wardrobe_title,
      wardrobe_desc: homepageSettings?.phi_wardrobe_desc || dict.philosophy.wardrobe_desc,
      wardrobe_image: homepageSettings?.phi_wardrobe_image || "https://lh3.googleusercontent.com/aida-public/AB6AXuB_8ZD6ZPHfMDjNVX2A1le_J7enIzDaXGHPiDgyug0nT9OIeLijtE13WJtxuUtZRAcX9x-1NgissjY_S6wo4d6xe2eCON4yXPc-0I03V_glpiw20wr4w0eKPsdNPlRaN8c1by7PK1OLBBPZRMYCC6a9p-jrUq4qEVtiAqYhxZP0YAzSyf1-aX4ATq8C-ZkNxj8hAPDLd83NCW8WpMJoDkGtYcxliSkXRUzjD62oXqoshRrYQkw9W6qcZBR2PZUt4SbXWLC6A5w38ag",
    },
    process: {
      label: homepageSettings?.proc_label || dict.process.label,
      heading: homepageSettings?.proc_heading || dict.process.heading,
      steps: [
        { title: homepageSettings?.proc_step1_title || dict.process.steps[0].title, description: homepageSettings?.proc_step1_desc || dict.process.steps[0].description },
        { title: homepageSettings?.proc_step2_title || dict.process.steps[1].title, description: homepageSettings?.proc_step2_desc || dict.process.steps[1].description },
        { title: homepageSettings?.proc_step3_title || dict.process.steps[2].title, description: homepageSettings?.proc_step3_desc || dict.process.steps[2].description },
        { title: homepageSettings?.proc_step4_title || (dict.process.steps[3]?.title || "Maintenance"), description: homepageSettings?.proc_step4_desc || (dict.process.steps[3]?.description || "Ongoing support.") },
      ]
    },
    testimonials: {
      label: homepageSettings?.testi_label || dict.testimonials.label,
      heading: homepageSettings?.testi_heading || dict.testimonials.heading,
    },
    services: {
      label: homepageSettings?.serv_label || dict.nav.services,
      heading: homepageSettings?.serv_heading || "Luxury Solutions for",
      heading_accent: homepageSettings?.serv_heading_accent || "Every Requirement",
    },
    spaces: {
      label: homepageSettings?.spaces_label || dict.nav.riviera,
      heading: homepageSettings?.spaces_heading || "Tailored to your lifestyle",
    },
    portfolio: {
      label: homepageSettings?.port_label || dict.nav.portfolio,
      heading: homepageSettings?.port_heading || "Selected transformations",
    },
    faq: {
      label: homepageSettings?.faq_label || dict.faq.label,
      heading: homepageSettings?.faq_heading || dict.faq.heading,
    },
    cta: {
      label: homepageSettings?.cta_label || dict.cta.label,
      heading: homepageSettings?.cta_heading || dict.cta.heading,
    },
    contact: {
      heading: homepageSettings?.contact_heading || dict.contact.heading,
      heading_accent: homepageSettings?.contact_heading_accent || dict.contact.heading_accent,
      description: homepageSettings?.contact_description || dict.contact.description,
      serving: homepageSettings?.contact_serving || dict.contact.serving,
      email: homepageSettings?.company_email || "hello@spaceorganizing.com",
      phone: homepageSettings?.company_phone || "+380 66 938 78 09",
    }
  };

  return (
    <>
      <Header dict={dict} lang={locale} />
      <main className="flex-1 bg-surface font-light overflow-x-hidden">
        <HeroSection dict={dict} lang={lang} slides={heroSlides} />

        {/* PHILOSOPHY / ATELIER GRID */}
        <section className="bg-surface-container py-20 md:py-32 px-6 md:px-24">
          <div className="max-w-[1920px] mx-auto">
            <ScrollReveal className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end mb-24">
              <div className="md:col-span-12 lg:col-span-5">
                <span className="font-label text-xs tracking-[0.2em] uppercase text-primary mb-4 block">
                  {content.phi.label}
                </span>
                <h3 className="font-headline text-5xl md:text-6xl text-on-surface leading-tight font-light tracking-tight">
                  {content.phi.heading}
                </h3>
              </div>
              <div className="md:col-span-12 lg:col-span-4 lg:col-start-8">
                <p className="font-body text-on-surface-variant leading-relaxed italic text-lg">
                  {content.phi.quote}
                </p>
              </div>
            </ScrollReveal>

            {/* Asymmetric Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollReveal variant="slide-up" delay={0.2} className="space-y-8">
                <div className="bg-surface p-1 shadow-premium overflow-hidden group">
                  <Image
                    src={content.phi.pantry_image}
                    alt={content.phi.pantry_title}
                    width={600}
                    height={750}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full aspect-[4/5] object-cover transition-transform duration-[3s] group-hover:scale-110"
                  />
                </div>
                <div className="pt-4 px-2">
                  <h4 className="font-headline text-3xl mb-2 font-light">{content.phi.pantry_title}</h4>
                  <p className="text-sm text-on-surface-variant font-light tracking-wide">{content.phi.pantry_desc}</p>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="slide-up" delay={0.4} className="space-y-8 md:translate-y-16">
                <div className="bg-surface p-1 shadow-premium overflow-hidden group">
                  <Image
                    src={content.phi.living_image}
                    alt={content.phi.living_title}
                    width={600}
                    height={600}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full aspect-square object-cover transition-transform duration-[3s] group-hover:scale-110"
                  />
                </div>
                <div className="pt-4 px-2">
                  <h4 className="font-headline text-3xl mb-2 font-light">{content.phi.living_title}</h4>
                  <p className="text-sm text-on-surface-variant font-light tracking-wide">{content.phi.living_desc}</p>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="slide-up" delay={0.6} className="space-y-8">
                <div className="bg-surface p-1 shadow-premium overflow-hidden group">
                  <Image
                    src={content.phi.wardrobe_image}
                    alt={content.phi.wardrobe_title}
                    width={600}
                    height={750}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full aspect-[4/5] object-cover transition-transform duration-[3s] group-hover:scale-110"
                  />
                </div>
                <div className="pt-4 px-2">
                  <h4 className="font-headline text-3xl mb-2 font-light">{content.phi.wardrobe_title}</h4>
                  <p className="text-sm text-on-surface-variant font-light tracking-wide">{content.phi.wardrobe_desc}</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <ScrollReveal variant="fade">
          <ServicesSection services={services} lang={lang} dict={dict} data={content.services} />
        </ScrollReveal>

        {/* SPACES */}
        <ScrollReveal variant="fade">
          <SpacesSection spaces={spaces} lang={lang} dict={dict} data={content.spaces} />
        </ScrollReveal>

        {/* PROCESS */}
        <ScrollReveal className="bg-surface py-24 md:py-40 border-y border-outline-variant/10">
          <ProcessSteps dict={dict} data={content.process} />
        </ScrollReveal>

        {/* PORTFOLIO HIGHLIGHTS */}
        <ScrollReveal variant="fade">
          <PortfolioHighlights items={portfolio} lang={lang} dict={dict} data={content.portfolio} />
        </ScrollReveal>

        <ScrollReveal variant="slide-up">
           <Testimonials dict={dict} data={content.testimonials} />
        </ScrollReveal>

        <ScrollReveal variant="slide-up" className="bg-surface-container py-24 md:py-32">
          <FAQAccordion dict={dict} data={content.faq} />
        </ScrollReveal>

        <ScrollReveal variant="scale">
           <CTASection dict={dict} lang={lang} data={content.cta} />
        </ScrollReveal>

        {/* CONTACT */}
        <Section className="bg-surface pt-24 pb-32" id="contact">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-40 items-start px-6">
            <ScrollReveal className="pt-8">
              <span className="font-label text-xs tracking-[0.2em] uppercase text-primary mb-8 block">
                {dict.contact.label}
              </span>
              <h3 className="font-headline text-5xl md:text-7xl leading-tight mb-8 tracking-tight">
                {content.contact.heading}{" "}
                <br />
                <span className="italic text-primary">{content.contact.heading_accent}</span>
              </h3>
              <p className="font-body text-xl lg:text-3xl text-on-surface-variant leading-relaxed font-light mb-14 italic">
                {content.contact.description}
              </p>
              <div className="space-y-8 text-on-surface-variant font-sans tracking-wide text-sm leading-relaxed border-t border-outline-variant/30 pt-14">
                <p className="flex items-center group cursor-default">
                  <strong className="font-bold uppercase tracking-[0.3em] text-[10px] text-on-surface w-28 flex items-center gap-3">
                    <span className="w-5 h-[2px] bg-primary rotate-[-60deg] transition-transform duration-500 group-hover:rotate-[-40deg]"></span>
                    {dict.contact.serving_label}
                  </strong>
                  {content.contact.serving}
                </p>
                <p className="flex items-center group cursor-default">
                  <strong className="font-bold uppercase tracking-[0.3em] text-[10px] text-on-surface w-28 flex items-center gap-3">
                    <span className="w-5 h-[2px] bg-primary rotate-[-60deg] transition-transform duration-500 group-hover:rotate-[-40deg]"></span>
                    {dict.contact.email_label}
                  </strong>
                  {content.contact.email}
                </p>
                <p className="flex items-center group cursor-default">
                  <strong className="font-bold uppercase tracking-[0.3em] text-[10px] text-on-surface w-28 flex items-center gap-3">
                    <span className="w-5 h-[2px] bg-primary rotate-[-60deg] transition-transform duration-500 group-hover:rotate-[-40deg]"></span>
                    {dict.contact.phone_label}
                  </strong>
                  {content.contact.phone}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="slide-left" delay={0.3} className="bg-surface p-12 md:p-20 shadow-premium rounded-DEFAULT ghost-border">
              <ContactForm />
            </ScrollReveal>
          </div>
        </Section>
      </main>
      <Footer dict={dict} lang={lang} contact={content.contact} />
    </>
  );
}
