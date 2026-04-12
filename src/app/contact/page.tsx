import React from "react";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";
import { ContactForm } from "@/components/blocks/ContactForm";
import { Section } from "@/components/ui/Section";
import { Heading, Body } from "@/components/ui/Typography";

export default function Contact() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24 bg-softwhite">
        <Section className="pb-12 text-center border-b border-charcoal/10">
          <div className="max-w-3xl mx-auto px-6">
             <span className="font-sans uppercase tracking-widest text-sm font-medium text-charcoal/60 mb-4 block">Get in Touch</span>
             <Heading as="h1" className="mb-6">Book a Consultation</Heading>
             <Body>
               We are currently accepting new clients in Los Angeles and surrounding areas. 
               Please share a few details about your space, and we will be in touch within 24 hours.
             </Body>
          </div>
        </Section>

        <Section className="bg-sand pt-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-softwhite p-8 md:p-16 border border-charcoal/5 shadow-sm relative -top-32">
              <ContactForm />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-[-3rem]">
              <div>
                <h4 className="font-sans font-medium text-sm tracking-widest uppercase mb-2 text-charcoal">Email</h4>
                <p className="text-charcoal/70 font-sans">hello@spacesorganizers.com</p>
              </div>
              <div>
                <h4 className="font-sans font-medium text-sm tracking-widest uppercase mb-2 text-charcoal">Phone</h4>
                <p className="text-charcoal/70 font-sans">(310) 555-0198</p>
              </div>
              <div>
                <h4 className="font-sans font-medium text-sm tracking-widest uppercase mb-2 text-charcoal">Hours</h4>
                <p className="text-charcoal/70 font-sans">Mon - Fri, 9am - 5pm</p>
              </div>
            </div>
          </div>
        </Section>

      </main>
      <Footer />
    </>
  );
}
