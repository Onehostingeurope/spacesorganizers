"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="bg-sand p-12 text-center rounded-sm border border-charcoal/5">
        <h3 className="font-serif text-3xl text-charcoal mb-4">Thank You</h3>
        <p className="text-charcoal/80 font-sans">
          Your inquiry has been received. We will be in touch shortly to schedule your consultation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-charcoal tracking-wide">Name</label>
          <input required type="text" id="name" className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none focus:border-charcoal transition-colors px-0 placeholder-charcoal/30" placeholder="Jane Doe" />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-charcoal tracking-wide">Email</label>
          <input required type="email" id="email" className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none focus:border-charcoal transition-colors px-0 placeholder-charcoal/30" placeholder="jane@example.com" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-charcoal tracking-wide">Phone</label>
          <input type="tel" id="phone" className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none focus:border-charcoal transition-colors px-0 placeholder-charcoal/30" placeholder="(555) 123-4567" />
        </div>
        <div className="space-y-2">
          <label htmlFor="city" className="block text-sm font-medium text-charcoal tracking-wide">City / Area</label>
          <input required type="text" id="city" className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none focus:border-charcoal transition-colors px-0 placeholder-charcoal/30" placeholder="Los Angeles" />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="service" className="block text-sm font-medium text-charcoal tracking-wide">Project Type</label>
        <select id="service" className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none focus:border-charcoal transition-colors px-0 appearance-none rounded-none text-charcoal/80">
          <option value="" disabled selected>Select an option</option>
          <option value="room">Single Room Organization</option>
          <option value="full-home">Full Home Organization</option>
          <option value="move-in">Move-in Unpacking</option>
          <option value="declutter">Decluttering Session</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-charcoal tracking-wide">Tell us about your space and goals</label>
        <textarea required id="message" rows={4} className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none focus:border-charcoal transition-colors px-0 resize-none placeholder-charcoal/30" placeholder="I'm looking to completely organize my kitchen and pantry..."></textarea>
      </div>

      <div className="pt-6">
        <Button variant="primary" size="lg" className="w-full md:w-auto px-12" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Submit Inquiry"}
        </Button>
      </div>
    </form>
  );
}
