import React from "react";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";
import { CTASection } from "@/components/blocks/CTASection";
import { FAQAccordion } from "@/components/blocks/FAQAccordion";

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24">
        {/* We can re-use the FAQAccordion component which already has its own Section wrapper */}
        <FAQAccordion />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
