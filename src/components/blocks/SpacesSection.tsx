import React from "react";
import Image from "next/image";
import Link from "next/link";

interface SpacesSectionProps {
  spaces: any[];
  lang: string;
  dict: any;
  data?: {
    label: string;
    heading: string;
  };
}

export function SpacesSection({ spaces, lang, dict, data }: SpacesSectionProps) {
  // Only show first 3 for homepage impact
  const displaySpaces = spaces.slice(0, 3);
  const label = data?.label || dict.nav.riviera;
  const heading = data?.heading || "Tailored to your lifestyle";

  return (
    <section className="bg-surface-container py-32 px-6 md:px-24">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="font-label text-xs tracking-[0.2em] uppercase text-primary mb-4 block">
              {label}
            </span>
            <h3 className="font-headline text-5xl md:text-7xl text-on-surface leading-tight font-light">
              {heading}
            </h3>
          </div>
          <p className="font-body text-on-surface-variant max-w-sm italic text-lg opacity-70">
            From professional kitchens to personalized walk-in closets, we craft order in every corner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {displaySpaces.map((space, idx) => (
            <div key={space.id || idx} className="group flex flex-col gap-8">
              <div className="relative aspect-[4/5] bg-surface overflow-hidden rounded-DEFAULT shadow-soft">
                {space.image && (
                  <Image
                    src={space.image}
                    alt={space.title}
                    fill
                    className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-charcoal/5 group-hover:bg-transparent transition-colors duration-700" />
              </div>

              <div className="px-2">
                <h4 className="font-headline text-3xl mb-4 font-light text-on-surface group-hover:text-primary transition-colors">
                  {space.title}
                </h4>
                <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                   {space.description}
                </p>
                <Link
                  href={`/${lang}/portfolio`}
                  className="inline-block font-label text-[10px] uppercase tracking-[0.3em] text-on-surface border-b border-outline-variant/30 pb-1 hover:border-primary hover:text-primary transition-all"
                >
                  View Space Design →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
