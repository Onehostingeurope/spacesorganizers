import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";
import { CTASection } from "@/components/blocks/CTASection";
import { Section } from "@/components/ui/Section";
import { Heading, Body } from "@/components/ui/Typography";

const SPACES = [
  {
    id: "kitchen-pantry",
    title: "Kitchen & Pantry",
    pain: "Cluttered countertops, expired food hidden in the back, and disorganized appliances making cooking stressful.",
    solution: "We implement intuitive zones, bespoke decanting, and accessible storage, turning the heart of your home into an inspiring place to cook and gather.",
    image: "/images/consultation-lifestyle.png"
  },
  {
    id: "closet",
    title: "Closet & Dressing Room",
    pain: "Overstuffed racks, hidden items, and decision fatigue every morning.",
    solution: "We curate boutique-style layouts that honor your wardrobe, streamline your morning routine, and present your clothing beautifully.",
    image: "/images/hero-home-organization.png"
  },
];

export default function Spaces() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24">
        <Section className="bg-softwhite text-center pb-20">
          <div className="max-w-3xl mx-auto px-6">
             <span className="font-sans uppercase tracking-widest text-sm font-medium text-charcoal/60 mb-4 block">By Room</span>
             <Heading as="h1" className="mb-6">Spaces We Transform</Heading>
             <Body>
               Every room has its own unique rhythm and set of challenges. We design systems specific to the flow of each space, ensuring seamless functionality across your entire home.
             </Body>
          </div>
        </Section>

        {SPACES.map((space, index) => (
          <Section key={space.id} className={index % 2 === 0 ? "bg-sand/30" : "bg-softwhite"}>
             <div className={`max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 === 0 ? "" : "lg:flex-row-reverse"}`}>
               <div className={index % 2 === 0 ? "lg:order-1" : "lg:order-2"}>
                 <Heading as="h2" className="text-4xl mb-6">{space.title}</Heading>
                 
                 <div className="mb-8 p-6 bg-white border border-charcoal/10 rounded-sm">
                   <h4 className="font-sans uppercase tracking-widest text-xs font-semibold text-charcoal mb-2">The Challenge</h4>
                   <p className="text-charcoal/70 font-sans leading-relaxed">{space.pain}</p>
                 </div>
                 
                 <div className="mb-8">
                   <h4 className="font-sans uppercase tracking-widest text-xs font-semibold text-charcoal mb-2">The Spaces Solution</h4>
                   <p className="text-charcoal/80 font-sans leading-relaxed text-lg">{space.solution}</p>
                 </div>

                 <Link href="/portfolio" className="inline-block border-b border-charcoal pb-1 font-sans text-sm tracking-widest uppercase text-charcoal hover:text-charcoal/60 transition-colors">
                   View {space.title} Projects
                 </Link>
               </div>

               <div className={`relative aspect-square md:aspect-[4/5] bg-darktaupe overflow-hidden ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}>
                 <Image 
                   src={space.image} 
                   alt={space.title} 
                   fill 
                   className="object-cover" 
                 />
               </div>
             </div>
          </Section>
        ))}

        {/* Other Spaces Grid */}
        <Section className="bg-charcoal text-softwhite">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Heading as="h2" className="text-softwhite text-3xl">Other Spaces</Heading>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
              {[
                { title: "Home Office", desc: "For deep focus and streamlined productivity." },
                { title: "Kids Playroom", desc: "Systems that kids can easily maintain." },
                { title: "Bathrooms", desc: "Spa-like serenity for your daily routines." },
                { title: "Laundry & Utility", desc: "Functional flows for household management." },
                { title: "Garage & Storage", desc: "Optimizing vertical space for seasonal gear." },
                { title: "Nurseries", desc: "Calm, practical setups for new arrivals." }
              ].map((item, i) => (
                <div key={i} className="text-center md:text-left border-t border-softwhite/20 pt-6">
                  <h3 className="font-serif text-2xl mb-3">{item.title}</h3>
                  <p className="font-sans text-softwhite/70 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
