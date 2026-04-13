"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface CarouselProps {
  images: string[];
  altPrefix?: string;
}

export function Carousel({ images, altPrefix = "Gallery Image" }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const child = container.children[index] as HTMLElement;
      if (child) {
        container.scrollTo({
          left: child.offsetLeft,
          behavior: "smooth",
        });
        setCurrentIndex(index);
      }
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / width);
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
  };

  useEffect(() => {
    if (isHovered || images.length <= 1) return;

    const interval = setInterval(() => {
      scrollTo((currentIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, isHovered, images.length]);

  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-DEFAULT">
        <Image src={images[0]} alt={altPrefix} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div 
      className="relative w-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide aspect-[4/5] rounded-DEFAULT"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {images.map((src, i) => (
          <div key={i} className="min-w-full relative snap-center">
            <Image src={src} alt={`${altPrefix} ${i + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <button
        onClick={() => scrollTo(Math.max(currentIndex - 1, 0))}
        disabled={currentIndex === 0}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface/80 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 shadow-sm border border-outline-variant/10 text-on-surface hover:bg-surface"
      >
        <span className="sr-only">Previous</span>
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button
        onClick={() => scrollTo(Math.min(currentIndex + 1, images.length - 1))}
        disabled={currentIndex === images.length - 1}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface/80 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 shadow-sm border border-outline-variant/10 text-on-surface hover:bg-surface"
      >
        <span className="sr-only">Next</span>
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === i ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
