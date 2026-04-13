"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const quickLinks = [
  {
    label: "Visuals",
    title: "Hero Carousel",
    desc: "Drag and reorder your main entrance images.",
    href: "/admin/hero",
  },
  {
    label: "Content",
    title: "Homepage Copy",
    desc: "Change your core mission and main page text.",
    href: "/admin/homepage",
  },
  {
    label: "Services",
    title: "Manage Services",
    desc: "Add, edit or remove offered services.",
    href: "/admin/services",
  },
  {
    label: "Portfolio",
    title: "Portfolio Gallery",
    desc: "Curate your completed project showcase.",
    href: "/admin/portfolio",
  },
  {
    label: "Blog",
    title: "Articles & Insights",
    desc: "Publish and manage editorial content.",
    href: "/admin/blog",
  },
  {
    label: "FAQ",
    title: "FAQ Section",
    desc: "Edit frequently asked questions.",
    href: "/admin/faq",
  },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({ leads: 0, services: 0, portfolio: 0 });

  useEffect(() => {
    async function fetchStats() {
      const responses = await Promise.all([
        fetch("/api/leads"),
        fetch("/api/services"),
        fetch("/api/portfolio"),
      ]);
      const [leads, services, portfolio] = await Promise.all(
        responses.map((r) => r.json())
      );
      setStats({
        leads:     Array.isArray(leads)     ? leads.length     : 0,
        services:  Array.isArray(services)  ? services.length  : 0,
        portfolio: Array.isArray(portfolio) ? portfolio.length : 0,
      });
    }
    fetchStats();
  }, []);

  return (
    <div className="max-w-5xl">

      {/* ── HEADING ──────────────────────────────────────── */}
      <div className="mb-14">
        <span className="font-label text-[9px] uppercase tracking-[0.3em] text-on-surface-variant/50 block mb-3">
          Administration
        </span>
        <h1 className="font-headline text-5xl font-light tracking-[-0.02em] text-on-surface mb-3">
          Welcome Back
        </h1>
        <div className="w-10 h-[1px] bg-primary mb-4" />
        <p className="font-body text-sm text-on-surface-variant/70 max-w-sm leading-relaxed">
          Manage your luxury home organisation platform.
        </p>
      </div>

      {/* ── STAT CARDS ───────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
        {[
          { label: "Active Leads",       value: stats.leads },
          { label: "Services",           value: stats.services },
          { label: "Portfolio Projects", value: stats.portfolio },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-surface-container-low border border-outline-variant/15 p-8"
          >
            <span className="font-label text-[9px] uppercase tracking-[0.28em] text-on-surface-variant/50 block mb-5">
              {s.label}
            </span>
            <span className="font-headline text-6xl font-light text-on-surface">
              {s.value}
            </span>
          </div>
        ))}
      </div>

      {/* ── QUICK LINKS ──────────────────────────────────── */}
      <span className="font-label text-[9px] uppercase tracking-[0.3em] text-on-surface-variant/50 block mb-6">
        Quick Actions
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {quickLinks.map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="group bg-surface-container-low border border-outline-variant/15 p-6 hover:border-primary transition-all duration-300 flex flex-col gap-3"
          >
            <span className="font-label text-[9px] uppercase tracking-[0.28em] text-primary/70">
              {q.label}
            </span>
            <span className="font-headline text-lg font-light text-on-surface group-hover:text-primary transition-colors">
              {q.title}
            </span>
            <p className="font-body text-xs text-on-surface-variant/55 leading-relaxed">
              {q.desc}
            </p>
            <span className="font-label text-[9px] uppercase tracking-[0.2em] text-primary/0 group-hover:text-primary/70 transition-all duration-300 mt-auto">
              Open →
            </span>
          </Link>
        ))}
      </div>

      {/* ── CALENDAR ─────────────────────────────────────── */}
      <div className="border border-outline-variant/15">
        <div className="px-8 py-5 border-b border-outline-variant/10 flex items-center justify-between bg-surface-container-lowest">
          <span className="font-label text-[9px] uppercase tracking-[0.28em] text-on-surface-variant/60">
            Operational Calendar
          </span>
          <span className="font-label text-[9px] text-on-surface-variant/40 italic">
            bedokurova@gmail.com
          </span>
        </div>
        <iframe
          src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Europe%2FParis&showPrint=0&showCalendars=0&showTz=0&mode=WEEK&src=YmVkb2t1cm92YUBnbWFpbC5jb20"
          style={{ border: 0 }}
          width="100%"
          height="540"
          frameBorder="0"
          scrolling="no"
          title="Admin Calendar Overview"
        />
      </div>
    </div>
  );
}
