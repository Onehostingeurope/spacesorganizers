"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/lib/dictionaries";

const LOCALES = ["en", "fr", "ru", "de"] as const;
type Locale = (typeof LOCALES)[number];

interface HeaderProps {
  dict: Dictionary;
  lang: Locale;
}

export function Header({ dict, lang }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { label: dict.nav.services, href: `/${lang}/services` },
    { label: dict.nav.portfolio, href: `/${lang}/portfolio` },
    { label: dict.nav.riviera, href: `/${lang}/spaces` },
    { label: dict.nav.about, href: `/${lang}/about` },
  ];

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function switchLanguage(newLang: Locale) {
    if (newLang === lang) return;
    // Set cookie so refresh/next navigation remembers the choice
    document.cookie = `NEXT_LOCALE=${newLang};path=/;max-age=31536000;SameSite=Lax`;
    // Replace the locale segment in the current path
    const newPath = pathname.replace(/^\/(en|fr|ru|de)/, `/${newLang}`);
    startTransition(() => {
      router.push(newPath || `/${newLang}`);
    });
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-surface/90 backdrop-blur-2xl shadow-[0_4px_32px_rgba(56,56,49,0.06)] py-4"
          : "bg-surface/10 backdrop-blur-sm py-6 md:py-8"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between max-w-[1920px]">
        {/* LOGO */}
        <Link
          href={`/${lang}`}
          className="font-headline italic text-2xl font-light tracking-tight text-on-surface"
        >
          Space Organizers
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs lg:text-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all duration-300 font-normal"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-8">
          {/* LANGUAGE SWITCHER */}
          <div className="hidden lg:flex items-center gap-1 font-label text-[10px] tracking-[0.2em] uppercase">
            {LOCALES.map((l, i) => (
              <React.Fragment key={l}>
                {i > 0 && (
                  <span className="text-outline-variant/40 select-none">|</span>
                )}
                <button
                  onClick={() => switchLanguage(l)}
                  disabled={isPending}
                  className={cn(
                    "px-1 py-0.5 transition-all duration-200 rounded-sm",
                    l === lang
                      ? "text-primary font-semibold"
                      : "text-on-surface-variant/50 hover:text-on-surface-variant"
                  )}
                >
                  {l.toUpperCase()}
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* BOOK BUTTON */}
          <div className="hidden md:block">
            <Link href={`/${lang}/book`}>
              <Button className="scale-[0.99] active:scale-100 transition-transform bg-primary text-on-primary px-6 py-3 text-xs tracking-widest uppercase font-medium hover:bg-primary-dim shadow-sm">
                {dict.nav.cta}
              </Button>
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden text-on-surface focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-surface border-t border-outline-variant/10 shadow-lg md:hidden flex flex-col px-6 py-8 space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-2xl font-headline text-on-surface hover:opacity-70 transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile language switcher */}
          <div className="flex gap-4 pt-2">
            {LOCALES.map((l) => (
              <button
                key={l}
                onClick={() => {
                  switchLanguage(l);
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "font-label text-xs tracking-[0.2em] uppercase transition-colors",
                  l === lang ? "text-primary font-semibold" : "text-on-surface-variant/60"
                )}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-outline-variant/10">
            <Link href={`/${lang}/book`} onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-primary text-on-primary text-xs tracking-widest uppercase py-4">
                {dict.nav.cta}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
