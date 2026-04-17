import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";
import { CTASection } from "@/components/blocks/CTASection";
import { Section } from "@/components/ui/Section";
import { Heading, Subheading, Body } from "@/components/ui/Typography";
import { getDictionary, hasLocale } from "@/lib/dictionaries";
import { Locale } from "@/lib/types";
import { getCollection } from "@/lib/db";
import { RichText } from "@/components/ui/RichText";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;

  // Fetch data on the server
  const [dict, articles] = await Promise.all([
    getDictionary(locale),
    getCollection<any>("blog", locale)
  ]);
  
  const article = articles.find((a: any) => a.slug === slug);
  if (!article) return notFound();

  return (
    <>
      <Header dict={dict} lang={locale} />
      <main className="flex-1 bg-surface pt-24">
        {/* HERO */}
        <Section className="pb-20 border-b border-outline-variant/10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Subheading className="mb-6 opacity-60 uppercase tracking-[0.4em]">{article.category}</Subheading>
            <Heading as="h1" className="text-4xl md:text-6xl mb-8 font-light italic leading-tight text-on-surface">
              {article.title}
            </Heading>
            {article.date && (
                <div className="font-label text-xs tracking-widest text-on-surface-variant/50 uppercase mb-12 flex items-center justify-center gap-4">
                    <span className="w-8 h-[1px] bg-outline-variant/30" />
                    {article.date}
                    <span className="w-8 h-[1px] bg-outline-variant/30" />
                </div>
            )}
            
            {article.image && (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-DEFAULT shadow-premium mt-12 group">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-[2s] scale-105 group-hover:scale-100"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            )}
          </div>
        </Section>

        {/* CONTENT */}
        <Section className="py-24 bg-surface-container-lowest">
          <div className="max-w-2xl mx-auto px-6">
            {article.excerpt && (
              <Body className="text-xl md:text-2xl italic text-on-surface/70 leading-relaxed mb-16 border-l-2 border-primary/20 pl-8 py-2">
                {article.excerpt}
              </Body>
            )}
            
            <div className="prose prose-stone prose-lg max-w-none">
                <RichText content={article.content} />
            </div>
          </div>
        </Section>

        <CTASection dict={dict} lang={locale} />
      </main>
      <Footer dict={dict} lang={locale} />
    </>
  );
}
