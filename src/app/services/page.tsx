import React from "react";
import Link from "next/link";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";
import { CTASection } from "@/components/blocks/CTASection";
import { Section } from "@/components/ui/Section";
import { Heading, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";

const SERVICES = [
  {
    id: "full-home",
    title: "Full Home Organization",
    intro: "A comprehensive transformation of your entire living space.",
    included: ["Complete home assessment", "Custom system design", "Product sourcing", "Implementation & styling"],
    who: "Homeowners looking for a complete reset or moving into a new property.",
    outcome: "A cohesive, intuitively organized sanctuary."
  },
  {
    id: "kitchen-pantry",
    title: "Kitchen & Pantry",
    intro: "Streamlining the heart of your home for effortless cooking and gathering.",
    included: ["Pantry zone mapping", "Decanting dry goods", "Drawer optimization", "Appliance storage planning"],
    who: "Busy families, avid home cooks, and entertainers.",
    outcome: "A functional, beautiful kitchen where everything is accessible."
  },
  {
    id: "closet",
    title: "Master Closet",
    intro: "Curating a boutique-style wardrobe experience to elevate your morning routine.",
    included: ["Seasonal rotation setup", "Matching hanger swap", "Accessory display", "Shoe and handbag organization"],
    who: "Professionals and fashion enthusiasts.",
    outcome: "A serene space that makes getting dressed a luxury experience."
  },
  {
    id: "move-in",
    title: "Move-In Unpacking",
    intro: "Turning your new house into a functioning home from day one.",
    included: ["Box unpacking", "Immediate system set-up", "Trash removal coordination", "Space planning"],
    who: "Families and professionals relocating to a new space.",
    outcome: "Skipping the chaos and walking into a fully settled, organized home."
  }
];

export default function Services() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24">
        <Section className="bg-sand text-center pb-20">
          <div className="max-w-3xl mx-auto px-6">
            <span className="font-sans uppercase tracking-widest text-sm font-medium text-charcoal/60 mb-4 block">Our Services</span>
            <Heading as="h1" className="mb-6">Tailored to You</Heading>
            <Body>
              We offer discreet, premium organizing services customized to your specific needs, lifestyle, and aesthetic preferences.
            </Body>
          </div>
        </Section>

        {SERVICES.map((service, index) => (
          <Section key={service.id} className={index % 2 === 0 ? "bg-softwhite" : "bg-white"} id={service.id}>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
               <div className="md:col-span-5">
                 <Heading as="h2" className="text-4xl mb-4">{service.title}</Heading>
                 <Body className="font-medium text-charcoal/90 mb-6">{service.intro}</Body>
                 <Link href="/contact">
                   <Button variant="secondary">Inquire About Service</Button>
                 </Link>
               </div>
               <div className="md:col-span-7 bg-sand/30 p-8 md:p-12 border border-charcoal/5">
                 <div className="mb-8">
                   <h4 className="font-sans uppercase tracking-widest text-xs font-semibold text-charcoal mb-4">Included</h4>
                   <ul className="list-disc list-inside space-y-2 text-charcoal/70 font-sans">
                     {service.included.map((item, i) => (
                       <li key={i}>{item}</li>
                     ))}
                   </ul>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-charcoal/10 pt-8">
                    <div>
                      <h4 className="font-sans uppercase tracking-widest text-xs font-semibold text-charcoal mb-2">Ideal For</h4>
                      <p className="text-sm font-sans text-charcoal/70 leading-relaxed">{service.who}</p>
                    </div>
                    <div>
                      <h4 className="font-sans uppercase tracking-widest text-xs font-semibold text-charcoal mb-2">Outcome</h4>
                      <p className="text-sm font-sans text-charcoal/70 leading-relaxed">{service.outcome}</p>
                    </div>
                 </div>
               </div>
            </div>
          </Section>
        ))}

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
