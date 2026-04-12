import React from "react";
import Image from "next/image";
import Link from "next/link";

interface PortfolioHighlightsProps {
  items: any[];
  lang: string;
  dict: any;
  data?: {
    label: string;
    heading: string;
  };
}

export function PortfolioHighlights({ items, lang, dict, data }: PortfolioHighlightsProps) {
  // Show 4 latest projects
  const highlights = items.slice(0, 4);
  const label = data?.label || dict.nav.portfolio;
  const heading = data?.heading || "Selected transformations";

  return (
    <section className="bg-surface py-40 px-6 md:px-24 border-t border-outline-variant/10">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <span className="font-label text-xs tracking-[0.2em] uppercase text-primary mb-4 block">
              {label}
            </span>
            <h3 className="font-headline text-5xl md:text-7xl text-on-surface leading-tight font-light">
              {heading}
            </h3>
          </div>
          <Link
            href={`/${lang}/portfolio`}
            className="group font-label text-xs tracking-[0.3em] uppercase text-on-surface-variant hover:text-primary transition-colors flex items-center gap-4 border-b border-outline-variant/30 pb-2 hover:border-primary"
          >
            Explore Full Portfolio
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {highlights.map((item, idx) => (
            <Link 
              key={item.id || idx} 
              href={`/${lang}/portfolio`}
              className="group block"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-DEFAULT mb-8 bg-surface-container shadow-soft transition-all duration-700 group-hover:shadow-2xl">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[3s] group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-700" />
                
                {/* Overlay Badge */}
                <div className="absolute top-6 left-6">
                   <span className="bg-softwhite/90 backdrop-blur-md px-4 py-2 text-[8px] tracking-[0.3em] font-bold uppercase text-charcoal shadow-sm">
                      {item.category}
                   </span>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div className="max-w-md">
                   <h4 className="font-headline text-3xl font-light text-on-surface mb-3 group-hover:text-primary transition-colors">
                      {item.title}
                   </h4>
                   <p className="font-body text-sm text-on-surface-variant italic">
                      {item.description}
                   </p>
                </div>
                <span className="text-2xl font-light transform translate-x-0 group-hover:translate-x-2 transition-transform duration-500 text-primary">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
