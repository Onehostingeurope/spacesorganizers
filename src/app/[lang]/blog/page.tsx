import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";
import { CTASection } from "@/components/blocks/CTASection";
import { Section } from "@/components/ui/Section";
import { Heading, Subheading, Body } from "@/components/ui/Typography";
import { getDictionary, hasLocale, type Locale } from "@/lib/dictionaries";
import { getCollection } from "@/lib/db";

export default async function Blog({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const articles = await getCollection<any>("blog", lang);

  return (
    <>
      <Header dict={dict} lang={locale} />
      <main className="flex-1 pt-24">
        <Section className="bg-surface text-center pb-20 border-b border-outline-variant/10">
          <div className="max-w-3xl mx-auto px-6">
            <Subheading className="mb-4">{dict.nav.academy}</Subheading>
            <Heading as="h1" className="mb-6 font-light italic">
              Knowledge &amp; Curation
            </Heading>
            <Body className="italic">
              Expert advice, behind-the-scenes looks at our projects, and practical guides to elevating your everyday environment.
            </Body>
          </div>
        </Section>

        <Section className="bg-surface-container-low pt-20">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: any, index: number) => (
              <article
                key={article.id ?? index}
                className="bg-surface p-8 ghost-border hover:shadow-ambient transition-shadow group rounded-DEFAULT"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="font-label uppercase tracking-widest text-xs font-semibold text-primary">
                    {article.category}
                  </span>
                  {article.date && (
                    <span className="font-label text-xs text-on-surface-variant">
                      {article.date}
                    </span>
                  )}
                </div>
                <Link href={`/${lang}/blog/${article.slug ?? "#"}`} className="block">
                  <h3 className="font-headline text-2xl text-on-surface mb-4 group-hover:text-primary transition-colors font-light">
                    {article.title}
                  </h3>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed italic">
                    {article.excerpt}
                  </p>
                </Link>
                <Link
                  href={`/${lang}/blog/${article.slug ?? "#"}`}
                  className="inline-block mt-8 font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant border-b border-outline-variant/30 pb-1 hover:border-primary hover:text-primary transition-all"
                >
                  Read Article →
                </Link>
              </article>
            ))}
          </div>
        </Section>

        <CTASection dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
