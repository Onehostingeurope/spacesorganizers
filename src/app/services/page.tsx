import React from "react";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";
import { Section } from "@/components/ui/Section";
import { Heading, Body } from "@/components/ui/Typography";
import { CTASection } from "@/components/blocks/CTASection";
import Image from "next/image";
import { getCollection } from "@/lib/db";

export default async function ServicesPage() {
  const services = await getCollection<any>("services");

  return (
    <>
      <Header />
      <main className="flex-1 pt-24 md:pt-32">
        <Section className="bg-sand pb-20 border-b border-charcoal/10">
          <div className="max-w-4xl mx-auto text-center">
             <span className="font-sans uppercase text-xs tracking-[0.3em] font-medium text-charcoal/40 mb-6 block">Our Expertise</span>
             <Heading as="h1" className="mb-8">Tailored Organization Services</Heading>
             <Body>
                From single rooms to comprehensive home setups, our services are 
                designed to seamlessly integrate with your lifestyle and elevate your daily routines.
             </Body>
          </div>
        </Section>

        <Section className="bg-softwhite">
          <div className="max-w-6xl mx-auto space-y-32">
            {services.map((service, idx) => (
              <div key={service.id} className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-24`}>
                <div className="w-full md:w-1/2">
                   <div className="relative aspect-[4/5] overflow-hidden">
                     <Image src={service.image} alt={service.title} fill className="object-cover" />
                   </div>
                </div>
                <div className="w-full md:w-1/2">
                   <Heading as="h2" className="text-4xl mb-6">{service.title}</Heading>
                   <Body className="mb-8">{service.description}</Body>
                   
                   <div className="mb-8">
                     <h4 className="font-sans text-xs uppercase tracking-widest font-semibold mb-4 text-charcoal">What's Included</h4>
                     <ul className="space-y-2">
                       {service.included?.map((item: string, i: number) => (
                         <li key={i} className="font-sans text-charcoal/70 font-light flex items-start">
                           <span className="mr-3 text-charcoal/30">-</span> {item}
                         </li>
                       ))}
                     </ul>
                   </div>
                   
                   <div className="pt-8 border-t border-charcoal/10">
                     <h4 className="font-sans text-xs uppercase tracking-widest font-semibold mb-2 text-charcoal">Perfect For</h4>
                     <Body className="text-base">{service.idealClient}</Body>
                   </div>
                </div>
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
