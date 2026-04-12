import React from "react";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
}

export function ServiceCard({ title, description, href }: ServiceCardProps) {
  return (
    <div className="group border-t border-charcoal/10 first:border-t-0 py-10 md:py-14 transition-colors hover:bg-sand/10 -mx-6 px-6 md:mx-0 md:px-0">
      <Link href={href} className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="md:w-5/12">
          <h3 className="font-serif text-3xl tracking-tight text-charcoal group-hover:text-charcoal/70 transition-colors">
            {title}
          </h3>
        </div>
        <div className="md:w-5/12">
          <p className="font-sans text-charcoal/70 leading-loose font-light">
            {description}
          </p>
        </div>
        <div className="md:w-2/12 flex justify-start md:justify-end mt-4 md:mt-0">
           <span className="font-sans uppercase text-xs tracking-[0.2em] font-medium text-charcoal/40 group-hover:text-charcoal transition-colors flex items-center gap-4">
             Explore <span className="transform translate-x-0 group-hover:translate-x-2 transition-transform duration-500">&rarr;</span>
           </span>
        </div>
      </Link>
    </div>
  );
}
