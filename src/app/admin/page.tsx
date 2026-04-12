"use client";
import React, { useEffect, useState } from "react";
import { Heading, Body } from "@/components/ui/Typography";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    leads: 0,
    services: 0,
    portfolio: 0
  });

  useEffect(() => {
    async function fetchStats() {
      const responses = await Promise.all([
        fetch("/api/leads"),
        fetch("/api/services"),
        fetch("/api/portfolio")
      ]);
      const [leads, services, portfolio] = await Promise.all(responses.map(res => res.json()));
      setStats({
        leads: Array.isArray(leads) ? leads.length : 0,
        services: Array.isArray(services) ? services.length : 0,
        portfolio: Array.isArray(portfolio) ? portfolio.length : 0
      });
    }
    fetchStats();
  }, []);

  return (
    <div className="max-w-5xl">
      <Heading as="h1" className="text-4xl mb-2">Welcome Back</Heading>
      <Body className="text-charcoal/60 mb-12">Manage your luxury home organization platform.</Body>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-softwhite p-8 border border-charcoal/10">
          <span className="text-xs uppercase tracking-widest font-semibold text-charcoal/50 block mb-4">Total Leads</span>
          <span className="font-serif text-5xl text-charcoal">{stats.leads}</span>
        </div>
        <div className="bg-softwhite p-8 border border-charcoal/10">
          <span className="text-xs uppercase tracking-widest font-semibold text-charcoal/50 block mb-4">Active Services</span>
          <span className="font-serif text-5xl text-charcoal">{stats.services}</span>
        </div>
        <div className="bg-softwhite p-8 border border-charcoal/10">
          <span className="text-xs uppercase tracking-widest font-semibold text-charcoal/50 block mb-4">Portfolio Projects</span>
          <span className="font-serif text-5xl text-charcoal">{stats.portfolio}</span>
        </div>
      </div>

      <div className="mt-12 bg-softwhite border border-charcoal/10 overflow-hidden shadow-sm rounded-DEFAULT">
        <div className="bg-charcoal/5 px-6 py-4 border-b border-charcoal/10 flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest font-semibold text-charcoal/60">Operational Calendar</span>
          <span className="text-[10px] text-charcoal/40 italic">Syncing with bedokurova@gmail.com</span>
        </div>
        <div className="p-0">
          <iframe 
            src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Europe%2FParis&showPrint=0&showCalendars=0&showTz=0&mode=WEEK&src=YmVkb2t1cm92YUBnbWFpbC5jb20" 
            style={{ border: 0 }} 
            width="100%" 
            height="600" 
            frameBorder="0" 
            scrolling="no"
            title="Admin Calendar Overview"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
