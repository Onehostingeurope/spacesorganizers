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
import { Heading, Subheading, Body } from "@/components/ui/Typography";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />

        {/* INTRO / BRAND STATEMENT */}
        <Section className="bg-softwhite py-24 md:py-40">
          <div className="max-w-4xl mx-auto text-center px-6">
            <Heading className="mb-8">
              A meticulously organized home is the foundation of a calmer life.
            </Heading>
            <Body className="text-xl max-w-2xl mx-auto font-light leading-relaxed">
              We believe that an organized space creates room for what truly matters. 
              By designing beautiful, tailored systems, we help you simplify your 
              daily routines and transform your environment into a sanctuary of ease.
            </Body>
          </div>
        </Section>

        {/* SERVICES PREVIEW */}
        <Section className="bg-sand border-y border-charcoal/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <span className="font-sans uppercase tracking-widest text-sm font-medium text-charcoal/60 mb-4 block">Our Expertise</span>
              <Heading className="mb-6">Tailored Organization Services</Heading>
              <Body className="mb-8">
                From single-room resets to full-home transformations, we provide end-to-end solutions that blend aesthetic refinement with flawless functionality.
              </Body>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-center">
              <ServiceCard 
                title="Home Organization" 
                description="Comprehensive system design and implementation for any space in your home." 
                href="/services" 
              />
              <ServiceCard 
                title="Closet Design" 
                description="Boutique-style closet curation, sorting, and styling for an effortless morning routine." 
                href="/services" 
              />
              <ServiceCard 
                title="Move-In Unpacking" 
                description="We handle the boxes and set up your new home so you can simply start living." 
                href="/services" 
              />
              <ServiceCard 
                 title="Decluttering" 
                 description="Compassionate editing sessions to help you part with items that no longer serve you." 
                 href="/services" 
              />
            </div>
          </div>
        </Section>

        {/* ROOMS / SPACES SECTION */}
        <Section className="bg-softwhite">
           <div className="text-center mb-16 px-6">
            <span className="font-sans uppercase tracking-widest text-sm font-medium text-charcoal/60 mb-4 block">Spaces We Transform</span>
            <Heading>Systems for Every Room</Heading>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Kitchen & Pantry */}
            <div className="group relative aspect-[4/5] bg-sand overflow-hidden">
              <Image 
                 src="/images/consultation-lifestyle.png" 
                 alt="Kitchen & Pantry" 
                 fill 
                 className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-charcoal/20 transition-opacity duration-300 group-hover:bg-charcoal/40" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="font-serif text-3xl text-softwhite mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Kitchen & Pantry</h3>
                <Link href="/spaces" className="text-softwhite/90 text-sm tracking-widest uppercase font-medium mt-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  Explore Space &rarr;
                </Link>
              </div>
            </div>

            {/* Closet */}
            <div className="group relative aspect-[4/5] bg-sand overflow-hidden">
              <Image 
                 src="/images/hero-home-organization.png" 
                 alt="Closets & Wardrobes" 
                 fill 
                 className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-charcoal/20 transition-opacity duration-300 group-hover:bg-charcoal/40" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="font-serif text-3xl text-softwhite mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Master Closets</h3>
                <Link href="/spaces" className="text-softwhite/90 text-sm tracking-widest uppercase font-medium mt-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  Explore Space &rarr;
                </Link>
              </div>
            </div>

            {/* Office */}
            <div className="group relative aspect-[4/5] bg-darktaupe overflow-hidden">
               <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center">
                  <h3 className="font-serif text-3xl text-softwhite mb-4">Home Office<br/>& Playrooms</h3>
                  <Link href="/spaces" className="text-softwhite/90 text-sm tracking-widest uppercase font-medium border-b border-softwhite/30 pb-1 hover:border-softwhite transition-colors">
                    View All Spaces
                  </Link>
              </div>
            </div>
          </div>
        </Section>

        {/* PROCESS SECTION */}
        <ProcessSteps />

        {/* TESTIMONIALS */}
        <Testimonials />

        {/* CTA BANNER */}
        <CTASection />

        {/* FAQ */}
        <FAQAccordion />

        {/* FINAL CONTACT SECTION */}
        <Section className="bg-sand" id="contact">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start border-t border-charcoal/10 pt-20">
            <div>
              <Heading className="mb-6">Let's craft your tailored system.</Heading>
              <Body className="mb-8">
                Take the first step toward a more organized, peaceful home. Fill out the inquiry form, and we'll reach out within 24 hours to schedule your complimentary discovery call.
              </Body>
              <div className="space-y-4 text-charcoal/70">
                <p><strong>Serving:</strong> Los Angeles, Beverly Hills, Santa Monica</p>
                <p><strong>Email:</strong> bookings@spacesorganizers.com</p>
                <p><strong>Phone:</strong> (310) 555-0198</p>
              </div>
            </div>
            <div className="bg-softwhite p-8 md:p-12 shadow-sm border border-charcoal/5">
              <ContactForm />
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
