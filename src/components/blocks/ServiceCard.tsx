import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
}

export function ServiceCard({ title, description, href }: ServiceCardProps) {
  return (
    <div className="group border-b border-charcoal/10 py-8 first:pt-0">
      <Link href={href} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="md:w-1/3">
          <h3 className="font-serif text-2xl tracking-wide text-charcoal group-hover:text-charcoal/70 transition-colors">
            {title}
          </h3>
        </div>
        <div className="md:w-1/2">
          <p className="font-sans text-charcoal/70 leading-relaxed">
            {description}
          </p>
        </div>
        <div className="md:w-auto flex justify-start md:justify-end">
          <div className="w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center group-hover:bg-charcoal group-hover:border-charcoal text-charcoal group-hover:text-softwhite transition-all">
            <ArrowRight size={18} />
          </div>
        </div>
      </Link>
    </div>
  );
}
