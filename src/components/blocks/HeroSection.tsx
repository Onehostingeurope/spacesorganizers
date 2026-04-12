import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Heading, Body } from "@/components/ui/Typography";

export function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-charcoal/20 z-10" />
        <Image
          src="/images/hero-home-organization.png"
          alt="Luxury Home Organization"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 text-center max-w-4xl pt-10">
        <Heading as="h1" className="text-softwhite mb-6 text-5xl md:text-6xl lg:text-7xl drop-shadow-sm">
          Luxury Home Organization <br className="hidden md:block"/>
          <span className="italic font-light">Designed Around Your Life</span>
        </Heading>
        
        <Body className="text-softwhite/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 drop-shadow-sm">
          We transform cluttered spaces into calm, functional, elegant environments tailored to your daily routine.
        </Body>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link href="/contact">
            <Button variant="primary" size="lg" className="w-full sm:w-auto bg-softwhite text-charcoal hover:bg-softwhite/90">
              Book a Consultation
            </Button>
          </Link>
          <Link href="/portfolio">
            <Button variant="ghost" size="lg" className="w-full sm:w-auto text-softwhite border border-softwhite hover:bg-softwhite hover:text-charcoal transition-all">
              View Our Work
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
