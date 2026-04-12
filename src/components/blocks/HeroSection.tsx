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
  const [settings, setSettings] = useState<any>(null);

  // Sort slides by order
  const sorted = [...slides].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const hasSlides = sorted.length > 0;

  const next = useCallback(() => {
    if (hasSlides) setCurrent((c) => (c + 1) % sorted.length);
  }, [hasSlides, sorted.length]);

  // Fetch dynamic settings (text + speed)
  useEffect(() => {
    fetch(`/api/hero-settings?lang=${lang}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.lang) setSettings(data);
      })
      .catch((err) => console.error("Hero settings fetch error:", err));
  }, [lang]);

  // Auto-advance
  useEffect(() => {
    setIsLoaded(true);
    if (sorted.length <= 1) return;
    const delay = (settings?.autoplay_speed || 15) * 1000;
    const timer = setInterval(next, delay);
    return () => clearInterval(timer);
  }, [sorted.length, next, settings?.autoplay_speed]);

  // Content Fallbacks
  const content = {
    region: settings?.region || h.region,
    title: settings?.title || h.title,
    subtitle: settings?.subtitle || h.subtitle,
    description: settings?.description || h.description,
    overlayOpacity: settings?.overlay_opacity ?? 40,
    overlayStyle: settings?.overlay_style || "dark",
  };

  const slide = hasSlides ? sorted[current] : null;

  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden bg-surface">
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {slide?.type === "youtube" ? (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(slide.url)}?autoplay=1&mute=1&loop=1&controls=0&playlist=${getYouTubeId(slide.url)}&showinfo=0&rel=0`}
                className="absolute inset-0 w-full h-full object-cover scale-[1.12]"
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
              transition={{ duration: 1.5 }}
              src={slide.url}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover scale-[1.05]"
            />
          ) : (
            <motion.div
              key={slide?.id ?? "default"}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1.15 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{
                opacity: { duration: 1.5, ease: "easeOut" },
                scale: { duration: (settings?.autoplay_speed || 15) + 2, ease: "linear" },
              }}
              className="absolute inset-0"
            >
              {slide?.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.url}
                  alt={slide.alt ?? "Space Organizers"}
                  sizes="100vw"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-surface-container via-surface to-surface-container" />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic overlay — controlled by admin hero settings */}
        <div
          className="absolute inset-0 z-[1] transition-all duration-700"
          style={{
            background:
              content.overlayStyle === "light"
                ? `rgba(255,252,247,${content.overlayOpacity / 100})`
                : `rgba(20,18,14,${content.overlayOpacity / 100})`,
          }}
        />

        {/* Left-side text backing — ensures dark text is readable over any photo */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-surface/85 via-surface/50 to-transparent pointer-events-none" />
      </div>
      
      {/* Hero Content — Editorial Layout */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 md:px-24 flex flex-col items-start pt-32 md:pt-40 lg:pt-0">
        


        <div className="max-w-4xl">
          {/* H1 — Cinematic Reveal with Fluid Typography */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-headline text-5xl md:text-[clamp(5rem,10vw,9.5rem)] text-on-surface leading-[0.85] font-light tracking-tighter drop-shadow-sm"
            >
              {content.title}
            </motion.h1>
          </div>

          {/* Subtitle / Description Combo */}
          <div className="flex flex-col md:flex-row items-start gap-12 mt-8 md:mt-12 mb-16 md:mb-20 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="flex-1"
            >
              <h2 className="font-headline text-xl md:text-3xl text-primary italic font-light leading-relaxed mb-4 drop-shadow-sm">
                {content.subtitle}
              </h2>
              <div className="w-16 h-[2px] bg-outline-variant" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.9 }}
              className="font-body text-sm md:text-lg text-on-surface leading-loose max-w-sm font-light drop-shadow-sm"
            >
              {content.description}
            </motion.p>
          </div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-wrap items-center gap-10"
          >
            <Link href={`/${lang}/contact`} className="group relative overflow-hidden">
               <button className="bg-primary text-on-primary px-12 py-6 text-xs tracking-[0.3em] font-bold uppercase transition-all duration-500 hover:tracking-[0.4em] shadow-premium">
                 {h.cta_primary}
               </button>
               <div className="absolute inset-0 bg-on-primary/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 pointer-events-none" />
            </Link>

            <a
              href="https://wa.me/33640608120"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 py-4 text-xs tracking-[0.2em] font-bold uppercase text-on-surface hover:text-primary transition-all duration-300"
            >
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-on-primary transition-all duration-500">
                <span className="material-symbols-outlined text-[14px]">chat</span>
              </span>
              {h.cta_whatsapp}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Progress Indicator */}
      {sorted.length > 1 && (
        <div className="absolute bottom-16 right-24 flex items-end gap-6 z-20">
           <div className="flex flex-col gap-4">
              {sorted.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setCurrent(i)}
                  className={`w-1 transition-all duration-700 ${
                    i === current ? "h-12 bg-primary" : "h-4 bg-outline-variant hover:bg-primary"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
           </div>
           <p className="font-label text-[10px] tracking-[0.3em] text-on-surface-variant vertical-text pb-2 uppercase drop-shadow-sm">
              0{current + 1} / 0{sorted.length}
           </p>
        </div>
      )}

      {/* Better Scroll Hint — Minimalist Mouse Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 2.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
      >
        <div className="w-[18px] h-[30px] border-2 border-primary rounded-full flex justify-center p-1 shadow-sm">
          <motion.div 
            animate={{ 
              y: [0, 8, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1 h-2 bg-primary rounded-full"
          />
        </div>
        <span className="font-label text-[8px] tracking-[0.5em] uppercase text-primary vertical-text whitespace-nowrap drop-shadow-sm">
           Scroll
        </span>
      </motion.div>
    </section>
  );
}
