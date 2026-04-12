import React from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";
import { Section } from "@/components/ui/Section";
import { getDictionary, hasLocale, type Locale } from "@/lib/dictionaries";

export default async function BookPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Header dict={dict} lang={locale} />
      <main className="flex-1 bg-surface pt-32 pb-24 min-h-screen">
        <Section className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-label text-xs tracking-[0.2em] uppercase text-primary mb-4 block">
              Reservation
            </span>
            <h1 className="font-headline text-5xl md:text-6xl text-on-surface leading-tight font-light mb-6">
              Book a Consultation
            </h1>
            <p className="font-body text-lg text-on-surface-variant max-w-2xl mx-auto font-light leading-relaxed">
              Select a time that works best for you. We will connect via Google Meet to discuss your space and vision.
            </p>
          </div>

          <div className="bg-surface-container rounded-DEFAULT shadow-lg border border-outline-variant/10 overflow-hidden w-full h-[800px]">
            {/* 
              Option B: Google Appointment Schedule Embed 
              Since you use calendar.bedokurova@gmail.com, you will need to activate "Appointment Schedules" in Google Calendar Settings, 
              then paste the public sharing link here! 
            */}
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0placeholder_hash_change_me?gv=true"
              style={{ border: 0 }}
              width="100%"
              height="100%"
              frameBorder="0"
            ></iframe>
            
            {/* Fallback Message for when iframe isn't configured yet */}
            <div className="absolute inset-x-0 bottom-0 p-8 text-center bg-surface-container/90 backdrop-blur-sm">
              <p className="text-sm text-on-surface-variant font-medium">To finalize Option B: Open your Google Calendar Settings, turn on "Appointment Schedules", and paste the public link into the iframe source!</p>
            </div>
          </div>
        </Section>
      </main>
      <Footer dict={dict} lang={locale} />
    </>
  );
}
