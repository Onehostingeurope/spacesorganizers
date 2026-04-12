"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Spaces", href: "/spaces" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "FAQ", href: "/faq" },
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-softwhite/95 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="font-serif text-2xl tracking-wide text-charcoal"
        >
          Spaces
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm uppercase tracking-widest text-charcoal/80 hover:text-charcoal transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Link href="/contact">
            <Button variant="primary">Book a Consultation</Button>
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-charcoal focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-softwhite border-t border-charcoal/10 shadow-lg md:hidden flex flex-col px-6 py-8 space-y-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xl font-serif text-charcoal hover:opacity-70 transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-charcoal/10">
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full">
                Book a Consultation
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
