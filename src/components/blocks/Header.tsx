"use client";

import React, { useState, useTransition, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Dictionary, Locale, LOCALES } from "@/lib/types";


const FLAGS: Record<Locale, string> = {
  en: "https://flagcdn.com/gb.svg",
  fr: "https://flagcdn.com/fr.svg",
  ru: "https://flagcdn.com/ru.svg",
  de: "https://flagcdn.com/de.svg",
};

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
    { 
      label: dict.nav.academy, 
      href: `/${lang}/blog`,
      subLinks: [
        { label: dict.nav.academy_links.home, href: `/${lang}/blog/curating-digital-canvas` },
        { label: dict.nav.academy_links.videos, href: `/${lang}/blog/ritual-of-watching` },
        { label: dict.nav.academy_links.about, href: `/${lang}/blog/architectural-about-page` },
        { label: dict.nav.academy_links.inquire, href: `/${lang}/blog/residential-landing-systems` },
      ]
    },
    { label: dict.nav.about, href: `/${lang}/about` },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function switchLanguage(newLang: Locale) {
    if (newLang === lang) return;
    document.cookie = `NEXT_LOCALE=${newLang};path=/;max-age=31536000;SameSite=Lax`;
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
            <div key={link.href} className="group relative py-2">
              <Link
                href={link.href}
                className={cn(
                  "flex items-center gap-1.5 font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-primary transition-all duration-300 hover:-translate-y-0.5",
                  !isScrolled && "drop-shadow-sm"
                )}
              >
                <span className="animate-underline">{link.label}</span>
                {link.subLinks && <ChevronDown size={10} className="transition-transform group-hover:rotate-180" />}
              </Link>
              
              {link.subLinks && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="bg-surface glass-premium border border-outline-variant/10 py-5 min-w-[220px] rounded-DEFAULT shadow-premium overflow-hidden">
                    {link.subLinks.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block px-8 py-3.5 font-label text-[9px] uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-10">
          {/* LANGUAGE SWITCHER */}
          <div className="hidden lg:flex items-center gap-3 font-label text-[9px] tracking-[0.2em] uppercase">
            {LOCALES.map((l) => (
              <React.Fragment key={l}>
                <button
                  onClick={() => switchLanguage(l)}
                  disabled={isPending}
                  className={cn(
                    "px-1 py-0.5 transition-all duration-300 rounded-sm relative group hover:-translate-y-0.5",
                    l === lang
                      ? "text-primary font-bold"
                      : "text-on-surface-variant hover:text-primary"
                  )}
                >
                  <span className="flex items-center gap-1.5 relative z-10">
                    <img src={FLAGS[l]} alt={`${l} flag`} className="w-3.5 h-[10px] object-cover rounded-[1px] shadow-sm opacity-90" />
                    <span>{l.toUpperCase()}</span>
                  </span>
                  {l === lang && (
                    <motion.div 
                      layoutId="activeLang"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary" 
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
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-surface border-t border-outline-variant/10 shadow-lg md:hidden flex flex-col px-6 py-8 space-y-6 max-h-[80vh] overflow-y-auto"
          >
            {navLinks.map((link) => (
              <div key={link.href} className="flex flex-col space-y-4">
                <Link
                  href={link.href}
                  className="text-2xl font-headline text-on-surface hover:opacity-70 transition-opacity flex items-center justify-between"
                  onClick={() => !link.subLinks && setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
                
                {link.subLinks && (
                  <div className="flex flex-col space-y-4 pl-6 border-l border-outline-variant/10">
                    {link.subLinks.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="text-lg font-headline text-on-surface-variant hover:text-primary transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile language switcher */}
            <div className="flex gap-4 pt-4 border-t border-outline-variant/10">
              {LOCALES.map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    switchLanguage(l);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-2 font-label text-xs tracking-[0.2em] uppercase transition-colors",
                    l === lang ? "text-primary font-semibold" : "text-on-surface-variant hover:text-on-surface"
                  )}
                >
                  <img src={FLAGS[l]} alt={`${l} flag`} className="w-4 h-3 object-cover rounded-[2px] shadow-sm" />
                  <span>{l.toUpperCase()}</span>
                </button>
              ))}
            </div>

            <div className="pt-4">
              <Link href={`/${lang}/contact`} onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-primary text-on-primary text-xs tracking-widest uppercase py-4">
                  {dict.nav.cta}
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
