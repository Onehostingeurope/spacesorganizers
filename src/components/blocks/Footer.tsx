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
  { label: "Spaces", href: `/${lang}/spaces` },
  { label: "Press", href: `/${lang}/about` },
  { label: "Contact", href: `/${lang}/contact` },
];

export function Footer({ dict, lang, contact }: FooterProps) {
  const f = dict.footer;
  const email = contact?.email || "arranginggarderobs@gmail.com";
  const phone = contact?.phone || "+380 66 938 78 09";
  // Extract digits for WhatsApp link (take the first number if multiple provided)
  const safePhone = (contact?.phone || "380669387809").replace(/\D/g, "").split(/[ /]/)[0];

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
            <p className="font-body text-sm text-on-surface leading-relaxed font-light">
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
                className="flex items-center gap-2 hover:text-primary transition-colors group"
              >
                {/* Official WhatsApp logo */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  width="18"
                  height="18"
                  aria-label="WhatsApp"
                  className="flex-shrink-0"
                >
                  <path
                    d="M16 0C7.164 0 0 7.163 0 16c0 2.822.736 5.472 2.027 7.773L0 32l8.437-2.01A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0Z"
                    fill="#25D366"
                  />
                  <path
                    d="M23.5 19.893c-.322-.161-1.905-.938-2.2-1.047-.296-.107-.512-.161-.727.161-.215.322-.833 1.047-1.02 1.262-.188.215-.376.241-.698.08-.322-.16-1.36-.501-2.59-1.596-.957-.853-1.603-1.905-1.791-2.227-.188-.322-.02-.496.141-.656.145-.144.322-.376.483-.564.16-.188.215-.322.322-.537.107-.215.054-.403-.027-.564-.08-.161-.727-1.754-.996-2.4-.263-.63-.53-.545-.727-.555l-.618-.01c-.215 0-.564.08-.86.376-.295.295-1.127 1.100-1.127 2.682s1.154 3.112 1.315 3.327c.16.215 2.27 3.47 5.502 4.864.77.333 1.37.531 1.838.68.772.245 1.475.21 2.031.128.619-.092 1.905-.778 2.174-1.53.268-.752.268-1.396.188-1.53-.08-.134-.295-.215-.617-.376Z"
                    fill="#fff"
                  />
                </svg>
                {f.whatsapp}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-outline-variant/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-label text-[10px] tracking-[0.15em] uppercase text-on-surface-variant">
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
                className="font-label text-[10px] tracking-[0.15em] uppercase text-on-surface-variant hover:text-on-surface transition-colors duration-300"
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
