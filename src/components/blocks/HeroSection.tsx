"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/dictionaries";

interface HeroSectionProps {
  dict: Dictionary;
  lang: string;
}

export function HeroSection({ dict, lang }: HeroSectionProps) {
  const h = dict.hero;

  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxbyLt8Hv-3Fd56k4BYlXt5-e3GvaqIoOP4rmukFbJ6r32O77jPlMkmLorTMpLudhhzoZB4qg2u1Wke5HEugEXvej7hwSCcIx4kzDRdnLG5xHNEqfREli8ecmMOh_sKpk6v0bUyYl2NgePiLlYZKXXZybAbdB-uBZBSmT6N6ORuiRj_y9gOjHj5vkCXyrbY9fUG69rShB-xN5AC8phqkYZachKYw7mihfe21awBLSi12Depk1OKBeyQub5NdtkQS_U6ceK1mC-ns4"
          alt="Luxury closet organization"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 editorial-gradient md:block hidden" />
        <div className="absolute inset-0 bg-surface/40 md:hidden" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 md:px-24 flex flex-col items-start pt-20">
        <div className="max-w-2xl">
          {/* Region trust indicator */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-8 h-[1px] bg-primary" />
            <p className="font-label text-xs tracking-[0.3em] uppercase text-on-surface-variant font-semibold">
              {h.region}
            </p>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="font-headline text-5xl md:text-8xl text-on-surface leading-[1.1] mb-6 font-light tracking-tight"
          >
            {h.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="font-headline text-xl md:text-2xl text-primary mb-8 italic font-light leading-relaxed"
          >
            {h.subtitle}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed mb-12 max-w-lg"
          >
            {h.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <Link href={`/${lang}/contact`} className="contents">
              <button className="bg-primary text-on-primary px-10 py-5 rounded-DEFAULT font-medium text-sm tracking-widest uppercase hover:bg-primary-dim transition-all duration-300 shadow-lg shadow-primary/10 flex items-center justify-center gap-2">
                {h.cta_primary}
              </button>
            </Link>
            <a
              href="https://wa.me/33640608120"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-b-2 border-outline-variant/30 hover:border-primary px-6 py-5 font-medium text-sm tracking-widest uppercase text-on-surface flex items-center justify-center gap-3 transition-all"
            >
              <span
                className="material-symbols-outlined text-green-700"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                chat
              </span>
              {h.cta_whatsapp}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="font-label text-[10px] tracking-[0.4em] uppercase text-on-surface-variant/60">
          {h.scroll_hint}
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-primary/40 to-transparent" />
      </motion.div>
    </section>
  );
}
