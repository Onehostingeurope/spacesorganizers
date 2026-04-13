import React from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";
import { Section } from "@/components/ui/Section";
import { Heading, Body } from "@/components/ui/Typography";
import { getDictionary, hasLocale, type Locale } from "@/lib/dictionaries";
import { getCollection } from "@/lib/db";

export default async function TermsAndConditions({
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
              Terms & Conditions
            </Heading>
            <div className="space-y-6">
              <Body>
                <strong>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</strong>
              </Body>
              <Body>
                Welcome to Space Organizers! These terms and conditions outline the rules and regulations for the use of our services and website. By accessing this website and booking our services, we assume you accept these terms and conditions in full. Do not continue to use Space Organizers if you do not accept all of the terms and conditions stated on this page.
              </Body>

              <Heading as="h2" className="text-2xl mt-10 mb-4 font-light">
                1. Service Estimates & Quotations
              </Heading>
              <Body>
                All project requests are subject to an initial consultation (virtual or in-person). The quotation provided is an estimate based on the scope of work discussed. Should the scope of the project change or require additional hours/materials outside of the original agreement, an adjusted quote or hourly rate will apply, subject to your approval prior to continuation.
              </Body>

              <Heading as="h2" className="text-2xl mt-10 mb-4 font-light">
                2. Cancellations & Rescheduling
              </Heading>
              <Body>
                We value your time and ours. If you must cancel or reschedule your session, we ask for at least 48 hours notice. Cancellations made less than 48 hours prior to the scheduled session may be subject to a cancellation fee or forfeiture of the deposit.
              </Body>

              <Heading as="h2" className="text-2xl mt-10 mb-4 font-light">
                3. Confidentiality & Privacy
              </Heading>
              <Body>
                We highly respect your privacy and confidentiality. Your personal information, the contents of your home, and the nature of the services provided will not be discussed with external parties. Before-and-after photographs will only be taken and utilized for portfolio or marketing purposes with your explicit, written consent.
              </Body>

              <Heading as="h2" className="text-2xl mt-10 mb-4 font-light">
                4. Liability & Insurance
              </Heading>
              <Body>
                Space Organizers handles your belongings with the utmost care. However, we are not liable for accidental damage to fragile or previously damaged items during the organization process. Clients are encouraged to secure valuable, highly fragile, or sentimental items prior to our arrival.
              </Body>
              
              <Heading as="h2" className="text-2xl mt-10 mb-4 font-light">
                5. Purchasing Supplies
              </Heading>
              <Body>
                If your project requires dedicated storage solutions (bins, baskets, shelving, etc.), these can be sourced and purchased by Space Organizers. Supply costs are billed separately and are subject to an agreed-upon budget. You may also purchase items independently based on our shared measurement recommendations.
              </Body>

              <Heading as="h2" className="text-2xl mt-10 mb-4 font-light">
                6. Contact Information
              </Heading>
              <Body>
                If you have any questions or queries regarding our Terms and Conditions, please contact us immediately: <strong>{email}</strong>
              </Body>
            </div>
          </div>
        </Section>
      </main>
      <Footer dict={dict} lang={locale} contact={{ email, phone }} />
    </>
  );
}
