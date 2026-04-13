"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface CarouselProps {
  images: string[];
  altPrefix?: string;
  speed?: number; // In seconds
}

export function Carousel({ images, altPrefix = "Gallery Image", speed = 4 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || !images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [isHovered, images?.length, speed]);

  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-DEFAULT">
        <Image src={images[0]} alt={altPrefix} fill className="object-cover" />
      </div>
    );
  }

  const navigateTo = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div 
      className="relative w-full aspect-[4/5] rounded-DEFAULT overflow-hidden group bg-surface"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image src={images[currentIndex]} alt={`${altPrefix} ${currentIndex + 1}`} fill className="object-cover" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <button
        onClick={() => navigateTo(currentIndex === 0 ? images.length - 1 : currentIndex - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface/80 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border border-outline-variant/10 text-on-surface hover:bg-surface drop-shadow-md z-10"
      >
        <span className="sr-only">Previous</span>
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button
        onClick={() => navigateTo((currentIndex + 1) % images.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface/80 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border border-outline-variant/10 text-on-surface hover:bg-surface drop-shadow-md z-10"
      >
        <span className="sr-only">Next</span>
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => navigateTo(i)}
            className={`w-2 h-2 rounded-full transition-all duration-500 shadow-[0_0_4px_rgba(0,0,0,0.5)] ${
              currentIndex === i ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
