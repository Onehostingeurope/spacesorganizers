"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out",
        isScrolled
          ? "glass-premium py-3 translate-y-2 mx-6 rounded-full w-[calc(100%-3rem)]"
          : "bg-transparent py-6 md:py-8"
      )}
    >
      <div className="container mx-auto px-10 md:px-16 flex items-center justify-between max-w-[1920px]">
        {/* LOGO */}
        <Link
          href={`/${lang}`}
          className={cn(
            "group flex flex-col font-headline text-2xl font-light tracking-[-0.03em] transition-colors duration-500 text-on-surface",
            !isScrolled && "drop-shadow-sm"
          )}
        >
          <span className="flex items-baseline gap-1">
             <span className="italic">Space</span> Organizers
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "group relative font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/80 hover:text-on-surface transition-all duration-300",
                !isScrolled && "drop-shadow-sm"
              )}
            >
              <span className="animate-underline">{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-10">
          {/* LANGUAGE SWITCHER */}
          <div className="hidden lg:flex items-center gap-3 font-label text-[9px] tracking-[0.2em] uppercase">
            {LOCALES.map((l, i) => (
              <React.Fragment key={l}>
                <button
                  onClick={() => switchLanguage(l)}
                  disabled={isPending}
                  className={cn(
                    "px-1 py-0.5 transition-all duration-500 rounded-sm relative group",
                    l === lang
                      ? "text-primary font-bold"
                      : "text-on-surface-variant/40 hover:text-on-surface"
                  )}
                >
                  {l.toUpperCase()}
                  {l === lang && (
                    <motion.div 
                      layoutId="activeLang"
                      className="absolute -bottom-1 left-0 right-0 h-[1px] bg-primary" 
                    />
                  )}
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* BOOK BUTTON */}
          <div className="hidden md:block">
            <Link href={`/${lang}/contact`}>
              <button className="bg-primary text-on-primary px-8 py-3.5 text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-on-surface hover:text-surface transition-all duration-500 shadow-premium">
                {dict.nav.cta}
              </button>
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden text-on-surface focus:outline-none p-2 hover:bg-primary/5 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
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
            <Link href={`/${lang}/contact`} onClick={() => setIsMobileMenuOpen(false)}>
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
