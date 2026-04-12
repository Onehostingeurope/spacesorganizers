import React from "react";
import Image from "next/image";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";
import { CTASection } from "@/components/blocks/CTASection";
import { Section } from "@/components/ui/Section";
import { Heading, Subheading, Body } from "@/components/ui/Typography";

export default function About() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24">
        <Section className="bg-softwhite">
          <div className="max-w-4xl mx-auto text-center px-6 mb-16">
            <span className="font-sans uppercase tracking-widest text-sm font-medium text-charcoal/60 mb-4 block">Our Story</span>
            <Heading as="h1" className="mb-8">
              Elevating the Everyday
            </Heading>
            <Subheading className="mb-0">
              At Spaces Organizers, we believe that your environment shapes your state of mind.
            </Subheading>
          </div>

          <div className="relative aspect-video max-w-5xl mx-auto bg-sand overflow-hidden mb-24">
            <Image 
              src="/images/consultation-lifestyle.png" 
              alt="Our Story Lifestyle"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            <div>
               <Heading as="h2" className="text-3xl mb-6">Our Philosophy</Heading>
               <Body className="mb-6">
                 We approach organization not just as a task of putting things away, but as an opportunity to curate your life. A well-organized space should feel intuitive, looking as beautiful as it functions.
               </Body>
               <Body>
                 By blending aesthetic principles with practical systems, we craft spaces that don't just hold your belongings—they support your lifestyle, reduce daily friction, and invite a sense of profound calm.
               </Body>
            </div>
            <div>
               <Heading as="h2" className="text-3xl mb-6">Why Tailored Systems Matter</Heading>
               <Body className="mb-6">
                 Generic bins and arbitrary labels often fall short because they aren't designed for how you actually live. 
               </Body>
               <Body>
                 We take the time to understand your habits. Do you prefer dropping keys in a tray or hanging them? Do you need visual access to your wardrobe, or prefer things tucked away? These micro-decisions form the foundation of systems that are easy to maintain long after we leave.
               </Body>
            </div>
          </div>
        </Section>
        
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
