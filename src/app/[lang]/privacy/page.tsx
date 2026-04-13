import React from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";
import { Section } from "@/components/ui/Section";
import { Heading, Body } from "@/components/ui/Typography";
import { getDictionary, hasLocale, type Locale } from "@/lib/dictionaries";
import { getCollection } from "@/lib/db";

export default async function PrivacyPolicy({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  // Grab the master email to use in the contact section dynamically
  const { entries: settings } = await getCollection("homepage_settings");
  const homepageSettings = settings.find((s) => s.lang === locale) || settings[0];
  const email = homepageSettings?.contactEmail || "arranginggarderobs@gmail.com";
  const phone = homepageSettings?.contactPhone || "";

  return (
    <>
      <Header dict={dict} lang={locale} />
      <main className="flex-1 pt-24">
        <Section className="bg-surface">
          <div className="max-w-3xl mx-auto px-6 mb-16">
            <Heading as="h1" className="mb-12 font-light text-center">
              Privacy Policy
            </Heading>
            <div className="space-y-6">
              <Body>
                <strong>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</strong>
              </Body>
              <Body>
                At Space Organizers, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
              </Body>

              <Heading as="h2" className="text-2xl mt-10 mb-4 font-light">
                1. Information We Collect
              </Heading>
              <Body>
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                <ul className="list-disc pl-6 mt-4 space-y-2 opacity-80">
                  <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                  <li><strong>Contact Data</strong> includes billing address, delivery address, email address, and telephone numbers.</li>
                  <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                  <li><strong>Usage Data</strong> includes information about how you use our website, products, and services.</li>
                </ul>
              </Body>

              <Heading as="h2" className="text-2xl mt-10 mb-4 font-light">
                2. How We Use Your Personal Data
              </Heading>
              <Body>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                <ul className="list-disc pl-6 mt-4 space-y-2 opacity-80">
                  <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                  <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                  <li>Where we need to comply with a legal obligation.</li>
                </ul>
              </Body>

              <Heading as="h2" className="text-2xl mt-10 mb-4 font-light">
                3. Data Security
              </Heading>
              <Body>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
              </Body>

              <Heading as="h2" className="text-2xl mt-10 mb-4 font-light">
                4. Your Legal Rights
              </Heading>
              <Body>
                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.
              </Body>

              <Heading as="h2" className="text-2xl mt-10 mb-4 font-light">
                5. Contact Us
              </Heading>
              <Body>
                If you have any questions about this privacy policy or our privacy practices, please contact us by writing to us at: <strong>{email}</strong>
              </Body>
            </div>
          </div>
        </Section>
      </main>
      <Footer dict={dict} lang={locale} contact={{ email, phone }} />
    </>
  );
}
