"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Heading, Body } from "@/components/ui/Typography";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center pt-20 overflow-hidden bg-charcoal">
      {/* Background Image Placeholder */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-charcoal/40 z-10" />
        <Image
          src="/images/hero-home-organization.png"
          alt="Luxury Home Organization"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 text-center max-w-5xl pt-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <Heading as="h1" className="text-softwhite mb-8 text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] drop-shadow-sm font-light tracking-tighter">
            Luxury Home Organization <br className="hidden md:block"/>
            <span className="italic font-normal font-serif text-softwhite/90">Designed Around You</span>
          </Heading>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <Body className="text-softwhite/80 text-lg md:text-xl md:leading-loose max-w-2xl mx-auto mb-12 drop-shadow-sm font-light">
            We transform cluttered spaces into calm, functional, elegant environments meticulously curated to support your daily routines.
          </Body>
        </motion.div>
        
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 1, ease: "easeOut" }}
           className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full bg-softwhite text-charcoal hover:bg-transparent hover:text-softwhite hover:border-softwhite border border-transparent transition-all">
              Book Consultation
            </Button>
          </Link>
          <Link href="/portfolio" className="w-full sm:w-auto mt-4 sm:mt-0">
             <Button variant="ghost" size="lg" className="w-full text-softwhite border border-softwhite hover:bg-softwhite hover:text-charcoal transition-all">
              View Projects
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
         className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-softwhite/60"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] mb-4 font-sans">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-softwhite/60 to-transparent" />
      </motion.div>
    </section>
  );
}
