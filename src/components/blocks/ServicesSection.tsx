import React from "react";
import { ServiceCard } from "./ServiceCard";
import Link from "next/link";

interface ServicesSectionProps {
  services: any[];
  lang: string;
  dict: any;
  data?: {
    label: string;
    heading: string;
    heading_accent: string;
  };
}

export function ServicesSection({ services, lang, dict, data }: ServicesSectionProps) {
  const label = data?.label || dict.nav.services;
  const heading = data?.heading || "Luxury Solutions for";
  const accent = data?.heading_accent || "Every Requirement";

  return (
    <section className="bg-surface py-32 px-6 md:px-24">
      <div className="max-w-[1920px] mx-auto">
        <div className="mb-20">
          <span className="font-label text-xs tracking-[0.2em] uppercase text-primary mb-4 block">
            {label}
          </span>
          <h3 className="font-headline text-5xl md:text-7xl text-on-surface leading-tight font-light">
            {heading} <br />
            <span className="italic">{accent}</span>
          </h3>
        </div>

        <div className="border-t border-outline-variant/15">
          {services.map((service, idx) => (
            <ServiceCard
              key={service.id || idx}
              index={idx}
              title={service.title}
              description={service.description}
              href={`/${lang}/services`}
            />
          ))}
        </div>

        <div className="mt-20 flex justify-end">
          <Link
            href={`/${lang}/services`}
            className="group font-label text-xs tracking-[0.3em] uppercase text-on-surface-variant hover:text-primary transition-colors flex items-center gap-4 border-b border-outline-variant/30 pb-2 hover:border-primary"
          >
            View All Services
            <span className="transform translate-x-0 group-hover:translate-x-2 transition-transform duration-500">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
