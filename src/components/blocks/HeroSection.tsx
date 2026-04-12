"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Dictionary } from "@/lib/dictionaries";

interface HeroSlide {
  id: string;
  type: "image" | "video" | "youtube";
  url: string;
  alt?: string;
  order?: number;
}

interface HeroSectionProps {
  dict: Dictionary;
  lang: string;
  slides?: HeroSlide[];
}

function getYouTubeId(url: string): string {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : url;
}

export function HeroSection({ dict, lang, slides = [] }: HeroSectionProps) {
  const h = dict.hero;
  const [current, setCurrent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sort slides by order
  const sorted = [...slides].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const hasSlides = sorted.length > 0;

  const next = useCallback(() => {
    if (hasSlides) setCurrent((c) => (c + 1) % sorted.length);
  }, [hasSlides, sorted.length]);

  // Auto-advance every 6 seconds
  useEffect(() => {
    setIsLoaded(true);
    if (sorted.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [sorted.length, next]);

  const slide = hasSlides ? sorted[current] : null;

  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {slide?.type === "youtube" ? (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(slide.url)}?autoplay=1&mute=1&loop=1&controls=0&playlist=${getYouTubeId(slide.url)}&showinfo=0&rel=0`}
                className="absolute inset-0 w-full h-full object-cover scale-110"
                allow="autoplay; fullscreen"
                style={{ border: "none", pointerEvents: "none" }}
              />
            </motion.div>
          ) : slide?.type === "video" ? (
            <motion.video
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              src={slide.url}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <motion.div
              key={slide?.id ?? "default"}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              {slide?.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.url}
                  alt={slide.alt ?? "Space Organizers"}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                // Fallback: gradient background when no slides are configured
                <div className="absolute inset-0 bg-gradient-to-br from-surface-container via-surface to-surface-container" />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-surface/85 via-surface/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 md:px-24 flex flex-col items-start pt-20">
        <div className="max-w-2xl">
          {/* Region */}
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
              <button className="bg-primary text-on-primary px-10 py-5 font-medium text-sm tracking-widest uppercase hover:bg-primary/90 transition-all duration-300 shadow-lg flex items-center justify-center gap-2">
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

      {/* CAROUSEL DOTS */}
      {sorted.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {sorted.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-500 rounded-full ${
                i === current
                  ? "w-8 h-2 bg-primary"
                  : "w-2 h-2 bg-on-surface/20 hover:bg-on-surface/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 right-8 flex flex-col items-center gap-4"
      >
        <span className="font-label text-[10px] tracking-[0.4em] uppercase text-on-surface-variant/60">
          {h.scroll_hint}
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary/40 to-transparent" />
      </motion.div>
    </section>
  );
}
