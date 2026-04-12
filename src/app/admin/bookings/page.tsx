"use client";
import React from "react";

export default function AdminBookings() {
  return (
    <div className="h-[calc(100vh-6rem)] w-full max-w-5xl flex flex-col">
      <div className="mb-6">
        <h1 className="font-headline text-4xl text-on-surface mb-2 font-light">Bookings & Schedule</h1>
        <p className="font-body text-on-surface-variant text-sm">
          Because you chose Option B (Direct Google Booking), all of your detailed client reservations (Name, Email, Address, Time, Tel) are synced automatically right here inside Google Calendar! Click on any event to see the details.
        </p>
      </div>

      <div className="flex-1 bg-softwhite border border-charcoal/10 overflow-hidden shadow-sm rounded-DEFAULT ghost-border">
        <iframe 
          src="https://calendar.google.com/calendar/embed?height=800&wkst=2&ctz=Europe%2FParis&showPrint=0&showCalendars=0&showTz=0&mode=WEEK&src=YmVkb2t1cm92YUBnbWFpbC5jb20" 
          style={{ border: 0 }} 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no"
          title="Admin Calendar"
        ></iframe>
      </div>
    </div>
  );
}
