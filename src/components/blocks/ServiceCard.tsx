import React from "react";
import Link from "next/link";
import { RichText } from "../ui/RichText";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  index?: number;
}

export function ServiceCard({ title, description, href, index }: ServiceCardProps) {
  return (
    <div className="group py-16 md:py-20 transition-all duration-700 ease-out border-b border-outline-variant/15 last:border-0">
      <Link
        href={href}
        className="flex flex-col md:flex-row md:items-start justify-between gap-10 lg:gap-20 px-2 md:px-0 text-center"
      >
        {/* Index + Title */}
        <div className="md:w-4/12 flex items-start justify-center gap-6">
          {index !== undefined && (
            <span className="font-label text-[10px] tracking-[0.3em] text-on-surface-variant pt-2 flex-shrink-0">
              0{index + 1}
            </span>
          )}
          <h3 className="font-headline text-3xl lg:text-5xl leading-tight tracking-tight text-on-surface group-hover:text-primary transition-colors duration-500 font-light text-center">
            {title}
          </h3>
        </div>

        {/* Description */}
        <div className="md:w-6/12">
          <RichText 
            content={description} 
            className="service-card-rich-text text-on-surface-variant text-base lg:text-lg leading-relaxed font-light" 
          />
        </div>

        {/* CTA arrow */}
        <div className="md:w-2/12 flex justify-start md:justify-end items-center mt-2 md:mt-0">
          <span className="font-label uppercase text-[9px] tracking-[0.4em] font-bold text-on-surface-variant group-hover:text-primary transition-all duration-700 flex items-center gap-6">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-700">Explore</span>
            <span className="transform translate-x-0 group-hover:translate-x-4 transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) text-xl font-light">
              →
            </span>
          </span>
        </div>
      </Link>
    </div>
  );
}
