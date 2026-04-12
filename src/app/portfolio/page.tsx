import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";
import { CTASection } from "@/components/blocks/CTASection";
import { Section } from "@/components/ui/Section";
import { Heading, Body } from "@/components/ui/Typography";

const PORTFOLIO_ITEMS = [
  {
    category: "Pantry",
    title: "Minimalist Kitchen Pantry",
    description: "A complete overhaul featuring bespoke woven baskets and aesthetic decanting.",
    image: "/images/consultation-lifestyle.png"
  },
  {
    category: "Closet",
    title: "Boutique Walk-In Wardrobe",
    description: "A luxurious master closet designed for seamless morning routines.",
    image: "/images/hero-home-organization.png"
  },
  {
    category: "Pantry",
    title: "Modern Chef's Kitchen",
    description: "Streamlined zones for an avid entertainer.",
    image: "/images/consultation-lifestyle.png"
  },
  {
    category: "Closet",
    title: "Guest Room Closet Conversion",
    description: "Optimizing tight spaces into an elegant overflow storage.",
    image: "/images/hero-home-organization.png"
  }
];

export default function Portfolio() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24">
        <Section className="bg-softwhite text-center pb-12">
          <div className="max-w-3xl mx-auto px-6">
             <span className="font-sans uppercase tracking-widest text-sm font-medium text-charcoal/60 mb-4 block">Our Work</span>
             <Heading as="h1" className="mb-6">Portfolio</Heading>
             <Body>
               Explore our recent projects and see how we bring order, beauty, and function into our clients' homes.
             </Body>
          </div>
        </Section>

        <Section className="bg-softwhite pt-0">
           <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
             {PORTFOLIO_ITEMS.map((item, index) => (
                <div key={index} className="group">
                   <div className="relative aspect-[4/3] bg-sand overflow-hidden mb-6">
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                   </div>
                   <div className="flex items-center justify-between mb-2">
                     <span className="font-sans uppercase tracking-widest text-xs font-semibold text-charcoal/60">
                       {item.category}
                     </span>
                   </div>
                   <h3 className="font-serif text-3xl text-charcoal mb-3 group-hover:text-charcoal/80 transition-colors">
                     {item.title}
                   </h3>
                   <p className="font-sans text-charcoal/70 leading-relaxed">
                     {item.description}
                   </p>
                </div>
             ))}
           </div>
        </Section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
