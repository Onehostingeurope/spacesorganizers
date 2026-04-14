"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm({ subtitle }: { subtitle?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message")
    };

    try {
      const res = await fetch("https://formsubmit.co/ajax/arranginggarderobs@gmail.com", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <h3 className="font-serif text-3xl text-charcoal mb-4">Thank You</h3>
        <p className="font-sans font-light text-charcoal/70 mb-8">We have received your inquiry and will be in touch within 24 hours.</p>
        <Button variant="ghost" onClick={() => setStatus("idle")}>Send another message</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {subtitle && (
        <div className="text-center mb-12 pb-10 border-b border-outline-variant/15 relative">
          <span className="font-label text-[9px] uppercase tracking-[0.4em] text-primary/60 block mb-4">
            Reservation
          </span>
          <p className="font-body text-charcoal text-xs md:text-sm tracking-wide font-bold px-4 whitespace-nowrap">
            {subtitle}
          </p>
          {/* Subtle decorative dot */}
          <div className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-surface border border-outline-variant rotate-45" />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-charcoal tracking-wide">Name</label>
          <input required id="name" name="name" type="text" className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none focus:border-charcoal transition-colors px-0 rounded-none text-charcoal" />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-charcoal tracking-wide">Email</label>
          <input required id="email" name="email" type="email" className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none focus:border-charcoal transition-colors px-0 rounded-none text-charcoal" />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="block text-sm font-medium text-charcoal tracking-wide">Phone (Optional)</label>
        <input id="phone" name="phone" type="tel" className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none focus:border-charcoal transition-colors px-0 rounded-none text-charcoal" />
      </div>

      <div className="space-y-2">
        <label htmlFor="service" className="block text-sm font-medium text-charcoal tracking-wide">Project Type</label>
        <select required id="service" name="service" defaultValue="" className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none focus:border-charcoal transition-colors px-0 rounded-none text-charcoal/80 appearance-none">
          <option value="" disabled>Select an option</option>
          <option value="room">Single Room Organization</option>
          <option value="full-home">Full Home Organization</option>
          <option value="move-in">Move-in Unpacking</option>
          <option value="closet">Master Closet Curation</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-charcoal tracking-wide">Project Details</label>
        <textarea required id="message" name="message" rows={4} className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none focus:border-charcoal transition-colors px-0 rounded-none text-charcoal resize-none"></textarea>
      </div>

      {status === "error" && <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>}

      <Button variant="primary" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Request Consultation"}
      </Button>
    </form>
  );
}
