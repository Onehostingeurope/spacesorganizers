import React from "react";
import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";

const SERVING = ["Monaco", "Cannes", "Nice", "Antibes", "Menton"];

interface FooterProps {
  dict: Dictionary;
  lang: string;
  contact?: {
    email: string;
    phone: string;
  };
}

const FOOTER_LINKS = (lang: string) => [
  { label: "Privacy", href: `/${lang}/privacy` },
  { label: "Terms", href: `/${lang}/terms` },
  { label: "Atelier", href: `/${lang}/spaces` },
  { label: "Press", href: `/${lang}/about` },
  { label: "Contact", href: `/${lang}/contact` },
];

export function Footer({ dict, lang, contact }: FooterProps) {
  const f = dict.footer;
  const email = contact?.email || "hello@spaceorganizing.com";
  const phone = contact?.phone || "+33 (0) 6 40 60 81 20";
  const safePhone = phone.replace(/[^0-9+]/g, "");

  return (
    <footer className="w-full bg-surface-container border-t border-outline-variant/10">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 py-20 md:py-28">
        {/* Top row */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-20">
          {/* Brand */}
          <div className="lg:max-w-xs">
            <Link href={`/${lang}`}>
              <p className="font-headline italic text-2xl text-on-surface tracking-tight mb-4 hover:text-primary transition-colors">
                Space Organizers
              </p>
            </Link>
            <p className="font-label text-[10px] tracking-[0.25em] uppercase text-on-surface-variant mb-6">
              {f.tagline}
            </p>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed font-light">
              {f.description}
            </p>
          </div>

          {/* Serving region */}
          <div>
            <p className="font-label text-[10px] tracking-[0.3em] uppercase text-primary mb-6">
              {f.serving_label}
            </p>
            <ul className="space-y-2">
              {SERVING.map((city) => (
                <li key={city} className="font-body text-sm text-on-surface-variant font-light">
                  {city}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-label text-[10px] tracking-[0.3em] uppercase text-primary mb-6">
              {f.contact_label}
            </p>
            <div className="space-y-3 font-body text-sm text-on-surface-variant font-light">
              <p>{email}</p>
              <p>{phone}</p>
              <a
                href={`https://wa.me/${safePhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <span
                  className="material-symbols-outlined text-[16px] text-green-700"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  chat
                </span>
                {f.whatsapp}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-outline-variant/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-label text-[10px] tracking-[0.15em] uppercase text-on-surface-variant opacity-60">
            © {new Date().getFullYear()} Space Organizers. {f.copyright} Design by{" "}
            <a href="https://onehostingeurope.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity underline-offset-2">
              OneHostingEurope
            </a>
          </p>
          <nav className="flex flex-wrap justify-center gap-8">
            {FOOTER_LINKS(lang).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-label text-[10px] tracking-[0.15em] uppercase text-on-surface-variant hover:text-on-surface transition-colors duration-300 opacity-70 hover:opacity-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
