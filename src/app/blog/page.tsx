import React from "react";
import Link from "next/link";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";
import { CTASection } from "@/components/blocks/CTASection";
import { Section } from "@/components/ui/Section";
import { Heading, Body } from "@/components/ui/Typography";

const ARTICLES = [
  {
    title: "10 Pantry Organization Ideas That Actually Work",
    category: "Tips & Tricks",
    date: "April 12, 2026",
    excerpt: "Stop buying aesthetic bins until you've read these foundational pantry rules.",
  },
  {
    title: "How to Keep a Luxury Closet Organized",
    category: "Wardrobe",
    date: "March 28, 2026",
    excerpt: "The secret isn't more space, it's smarter systems disguised as beautiful design.",
  },
  {
    title: "Best Storage Systems for Small Apartments",
    category: "Small Spaces",
    date: "March 15, 2026",
    excerpt: "Maximize your vertical space with these editor-approved storage solutions.",
  },
  {
    title: "How to Prepare Your Home Before an Organizer Arrives",
    category: "Process",
    date: "February 22, 2026",
    excerpt: "Hint: You don't need to clean up for us. Here's what you should actually do.",
  },
  {
    title: "Decluttering Without Losing Style",
    category: "Design",
    date: "February 04, 2026",
    excerpt: "How to curate a minimalist aesthetic without making your home feel sterile.",
  },
  {
    title: "How Professional Organizers Create Lasting Systems",
    category: "Methodology",
    date: "January 19, 2026",
    excerpt: "The psychology behind why your organization systems keep failing, and how we fix them.",
  }
];

export default function Blog() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24">
        <Section className="bg-softwhite text-center pb-20">
          <div className="max-w-3xl mx-auto px-6">
             <span className="font-sans uppercase tracking-widest text-sm font-medium text-charcoal/60 mb-4 block">The Journal</span>
             <Heading as="h1" className="mb-6">Insights & Inspiration</Heading>
             <Body>
               Expert advice, behind-the-scenes looks at our projects, and practical guides to elevating your everyday environment.
             </Body>
          </div>
        </Section>

        <Section className="bg-sand pt-20">
           <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {ARTICLES.map((article, index) => (
               <article key={index} className="bg-white p-8 border border-charcoal/5 hover:border-charcoal/20 transition-colors group">
                 <div className="flex justify-between items-center mb-6">
                   <span className="font-sans uppercase tracking-widest text-xs font-semibold text-charcoal/60">
                     {article.category}
                   </span>
                   <span className="font-sans text-xs text-charcoal/40">
                     {article.date}
                   </span>
                 </div>
                 <Link href="#" className="block">
                   <h3 className="font-serif text-2xl text-charcoal mb-4 group-hover:text-charcoal/70 transition-colors">
                     {article.title}
                   </h3>
                   <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                     {article.excerpt}
                   </p>
                 </Link>
                 <Link href="#" className="inline-block mt-8 font-sans text-xs uppercase tracking-widest text-charcoal border-b border-charcoal/20 pb-1 group-hover:border-charcoal transition-colors">
                   Read Article
                 </Link>
               </article>
             ))}
           </div>
        </Section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
