"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Riviera", href: "/riviera" },
  { label: "About", href: "/about" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-surface/90 backdrop-blur-2xl shadow-[0_40px_60px_-15px_rgba(56,56,49,0.05)] py-4"
          : "bg-surface/10 backdrop-blur-sm py-6 md:py-8"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between max-w-[1920px]">
        {/* LOGO */}
        <Link
          href="/"
          className="font-serif text-2xl font-light tracking-tighter text-on-surface"
        >
          Space Organizing
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs lg:text-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all duration-300 font-normal"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-8">
           <div className="hidden lg:block text-on-surface-variant font-sans text-[10px] tracking-[0.2em] uppercase">
              EN | <span className="opacity-40">FR</span> | <span className="opacity-40">RU</span> | <span className="opacity-40">DE</span>
           </div>
           
           <div className="hidden md:block">
              <Link href="/contact">
                <Button className="scale-[0.99] active:scale-100 transition-transform bg-primary text-on-primary px-6 py-3 text-xs tracking-widest uppercase font-medium hover:bg-primary-dim shadow-sm">
                  Book a Consultation
                </Button>
              </Link>
           </div>

           {/* MOBILE TOGGLE */}
           <button
             className="md:hidden text-on-surface focus:outline-none"
             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
           >
             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
           </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-surface border-t border-outline-variant/10 shadow-lg md:hidden flex flex-col px-6 py-8 space-y-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-2xl font-serif text-on-surface hover:opacity-70 transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-outline-variant/10">
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-primary text-on-primary text-xs tracking-widest uppercase py-4">
                Book a Consultation
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}


