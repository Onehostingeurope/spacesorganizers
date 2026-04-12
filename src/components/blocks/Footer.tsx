import React from "react";
import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Atelier", href: "/atelier" },
  { label: "Press", href: "/press" },
  { label: "Contact", href: "/contact" },
];

const SERVING = ["Monaco", "Cannes", "Nice", "Antibes", "Menton"];

export function Footer() {
  return (
    <footer className="w-full bg-surface-container border-t border-outline-variant/10">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 py-20 md:py-28">
        {/* Top row */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-20">
          {/* Brand */}
          <div className="lg:max-w-xs">
            <p className="font-headline italic text-2xl text-on-surface tracking-tight mb-4">
              Space Organizing
            </p>
            <p className="font-label text-[10px] tracking-[0.25em] uppercase text-on-surface-variant mb-6">
              Curated Sanctuaries on the French Riviera
            </p>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed font-light">
              Practical help with decluttering, home organization, wardrobes,
              and storage solutions — so your home feels lighter and easier to
              maintain.
            </p>
          </div>

          {/* Serving region */}
          <div>
            <p className="font-label text-[10px] tracking-[0.3em] uppercase text-primary mb-6">
              We Serve
            </p>
            <ul className="space-y-2">
              {SERVING.map((city) => (
                <li
                  key={city}
                  className="font-body text-sm text-on-surface-variant font-light"
                >
                  {city}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-label text-[10px] tracking-[0.3em] uppercase text-primary mb-6">
              Contact
            </p>
            <div className="space-y-3 font-body text-sm text-on-surface-variant font-light">
              <p>hello@spaceorganizing.com</p>
              <p>+33 (0) 6 40 60 81 20</p>
              <a
                href="https://wa.me/33640608120"
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
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-outline-variant/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-label text-[10px] tracking-[0.15em] uppercase text-on-surface-variant opacity-60">
            © {new Date().getFullYear()} Space Organizing. All rights reserved.
          </p>
          <nav className="flex flex-wrap justify-center gap-8">
            {FOOTER_LINKS.map((link) => (
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
