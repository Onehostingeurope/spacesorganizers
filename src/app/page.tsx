"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";
import { HeroSection } from "@/components/blocks/HeroSection";
import { ProcessSteps } from "@/components/blocks/ProcessSteps";
import { Testimonials } from "@/components/blocks/TestimonialCard";
import { FAQAccordion } from "@/components/blocks/FAQAccordion";
import { CTASection } from "@/components/blocks/CTASection";
import { ContactForm } from "@/components/blocks/ContactForm";
import { ServiceCard } from "@/components/blocks/ServiceCard";
import { Section } from "@/components/ui/Section";
import { Heading, Body } from "@/components/ui/Typography";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />

        {/* INTRO / BRAND STATEMENT */}
        <Section className="bg-softwhite py-32 md:py-48">
          <div className="max-w-5xl mx-auto text-center px-6">
            <span className="font-sans uppercase text-xs tracking-[0.3em] font-medium text-charcoal/40 mb-8 block">The Spaces Philosophy</span>
            <Heading className="mb-12 max-w-4xl mx-auto leading-[1.1]">
              A meticulously organized home is the foundation of a calmer life.
            </Heading>
            <Body className="text-xl md:text-2xl max-w-3xl mx-auto font-light leading-loose text-charcoal/60">
              We believe that an organized space creates room for what truly matters. 
              By designing beautiful, tailored systems, we help you simplify your 
              daily routines and transform your environment into a sanctuary of ease.
            </Body>
          </div>
        </Section>

        {/* SERVICES PREVIEW */}
        <Section className="bg-sand border-y border-charcoal/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-5 lg:sticky lg:top-40 self-start">
              <span className="font-sans uppercase text-xs tracking-[0.3em] font-medium text-charcoal/40 mb-6 block">Our Expertise</span>
              <Heading className="mb-8">Tailored Solutions</Heading>
              <Body className="mb-12">
                From single-room resets to full-home transformations, we provide end-to-end solutions that blend aesthetic refinement with flawless functionality.
              </Body>
              <Link href="/services" className="font-sans uppercase tracking-[0.2em] text-xs font-semibold border-b border-charcoal/20 pb-2 hover:border-charcoal transition-colors">
                 View All Services
              </Link>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-center">
              <ServiceCard 
                title="Home Organization" 
                description="Comprehensive system design and implementation for any space in your home, curated to your aesthetic." 
                href="/services" 
              />
              <ServiceCard 
                title="Closet Design" 
                description="Boutique-style closet curation, sorting, and styling for an effortless and luxurious morning routine." 
                href="/services" 
              />
              <ServiceCard 
                title="Move-In Unpacking" 
                description="We handle the boxes and set up your new home down to the last detail so you can simply start living." 
                href="/services" 
              />
            </div>
          </div>
        </Section>

        {/* ROOMS / SPACES SECTION (Asymmetrical) */}
        <Section className="bg-softwhite py-32 md:py-48 overflow-hidden">
           <div className="text-center mb-24 px-6">
            <span className="font-sans uppercase text-xs tracking-[0.3em] font-medium text-charcoal/40 mb-6 block">Spaces We Transform</span>
            <Heading>Systems for Every Room</Heading>
          </div>
          
          <div className="container mx-auto px-6 lg:px-12 relative max-w-7xl">
            {/* First Image Block (Left Offset) */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24 mb-32 md:mb-48">
               <div className="w-full md:w-7/12 relative aspect-[3/4] overflow-hidden group">
                  <Image 
                     src="/images/consultation-lifestyle.png" 
                     alt="Kitchen & Pantry" 
                     fill 
                     className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" 
                  />
               </div>
               <div className="w-full md:w-5/12 flex flex-col justify-center">
                  <span className="font-sans uppercase tracking-[0.2em] text-xs text-charcoal/40 mb-4 block">01</span>
                  <Heading as="h3" className="text-4xl md:text-5xl mb-6">Kitchen & Pantry</Heading>
                  <Body className="mb-8 font-light leading-loose text-charcoal/70">
                    We implement intuitive zones, bespoke decanting, and accessible storage, turning the heart of your home into an inspiring place to cook and gather.
                  </Body>
                  <Link href="/spaces" className="font-sans uppercase tracking-[0.2em] text-xs font-semibold hover:text-charcoal/60 transition-colors flex items-center">
                    Explore Space <span className="ml-4">&rarr;</span>
                  </Link>
               </div>
            </div>

            {/* Second Image Block (Right Offset with Parallax effect illusion via margin) */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24 mb-12 relative md:-mt-24">
               <div className="w-full md:w-6/12 relative aspect-square overflow-hidden group">
                  <Image 
                     src="/images/hero-home-organization.png" 
                     alt="Master Closets" 
                     fill 
                     className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" 
                  />
               </div>
               <div className="w-full md:w-5/12 flex flex-col justify-center">
                  <span className="font-sans uppercase tracking-[0.2em] text-xs text-charcoal/40 mb-4 block">02</span>
                  <Heading as="h3" className="text-4xl md:text-5xl mb-6">Master Closets</Heading>
                  <Body className="mb-8 font-light leading-loose text-charcoal/70">
                    We curate boutique-style layouts that honor your wardrobe, streamline your morning routine, and present your clothing beautifully.
                  </Body>
                  <Link href="/spaces" className="font-sans uppercase tracking-[0.2em] text-xs font-semibold hover:text-charcoal/60 transition-colors flex items-center">
                    Explore Space <span className="ml-4">&rarr;</span>
                  </Link>
               </div>
            </div>
            
            {/* Background Accent */}
            <div className="hidden lg:block absolute top-1/4 right-0 w-1/3 aspect-square bg-sand -z-10 mix-blend-multiply opacity-50" />
            <div className="hidden lg:block absolute bottom-0 left-10 w-1/4 aspect-square bg-darktaupe/5 -z-10" />
          </div>
        </Section>

        {/* PROCESS SECTION */}
        <ProcessSteps />

        {/* TESTIMONIALS */}
        <Testimonials />

        {/* CTA BANNER */}
        <CTASection />

        {/* FAQ - wrapped for tighter focus */}
        <div className="py-24 bg-softwhite">
          <FAQAccordion />
        </div>

        {/* FINAL CONTACT SECTION */}
        <Section className="bg-sand py-32" id="contact">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
            <div className="pt-8">
              <span className="font-sans uppercase text-xs tracking-[0.3em] font-medium text-charcoal/40 mb-6 block">Get In Touch</span>
              <Heading className="mb-8 text-5xl md:text-6xl">Let's craft your tailored system.</Heading>
              <Body className="mb-12 font-light text-xl text-charcoal/70">
                Take the first step toward a more organized, peaceful home. Fill out the inquiry form, and we'll reach out within 24 hours to schedule your complimentary discovery call.
              </Body>
              <div className="space-y-6 text-charcoal/80 font-sans tracking-wide text-sm leading-relaxed border-t border-charcoal/10 pt-12">
                <p><strong className="font-semibold uppercase tracking-widest text-xs mr-4">Serving</strong> Los Angeles, Beverly Hills, Santa Monica</p>
                <p><strong className="font-semibold uppercase tracking-widest text-xs mr-4">Email</strong> bookings@spacesorganizers.com</p>
                <p><strong className="font-semibold uppercase tracking-widest text-xs mr-4">Phone</strong> (310) 555-0198</p>
              </div>
            </div>
            <div className="bg-softwhite p-10 md:p-16 shadow-2xl shadow-charcoal/5">
              <ContactForm />
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
