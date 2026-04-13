"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: "Content",
    items: [
      { name: "Overview",     path: "/admin" },
      { name: "Homepage",     path: "/admin/homepage" },
      { name: "Hero",         path: "/admin/hero" },
      { name: "Services",     path: "/admin/services" },
      { name: "Spaces",       path: "/admin/spaces" },
      { name: "Portfolio",    path: "/admin/portfolio" },
      { name: "Testimonials", path: "/admin/testimonials" },
      { name: "Blog",         path: "/admin/blog" },
      { name: "FAQ",          path: "/admin/faq" },
    ],
  },
  {
    label: "Operations",
    items: [
      { name: "Bookings", path: "/admin/bookings" },
      { name: "Leads",    path: "/admin/leads" },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname   = usePathname();
  const router     = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname === "/admin/login") return <>{children}</>;

  const handleLogout = () => {
    document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#fffcf7] font-body flex">

      {/* ══════════════ LEFT SIDEBAR ══════════════ */}
      <aside
        className="hidden md:flex flex-col w-60 shrink-0 sticky top-0 h-screen"
        style={{
          background: "linear-gradient(180deg, #fffcf7 0%, #faf8f2 100%)",
          borderRight: "1px solid rgba(186,186,176,0.18)",
        }}
      >
        {/* Logo block */}
        <div className="px-9 pt-11 pb-9">
          <Link
            href="/"
            className="font-headline text-[22px] font-light tracking-[-0.025em] text-on-surface flex items-baseline gap-[3px]"
          >
            <span className="italic">Space</span>&nbsp;Organizers
          </Link>
          <span
            className="font-label text-[8px] uppercase tracking-[0.38em] mt-1.5 block"
            style={{ color: "rgba(74,67,58,0.38)" }}
          >
            Administration
          </span>
          {/* Thin rule */}
          <div className="mt-7 w-8 h-[1px] bg-primary/30" />
        </div>

        {/* Nav */}
        <nav className="flex-1 px-6 pb-6 overflow-y-auto flex flex-col gap-7">
          {navGroups.map((group) => (
            <div key={group.label}>
              <span
                className="font-label text-[7.5px] uppercase tracking-[0.38em] px-3 mb-3 block"
                style={{ color: "rgba(74,67,58,0.35)" }}
              >
                {group.label}
              </span>
              <div className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const active = pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={cn(
                        "relative font-label text-[9.5px] uppercase tracking-[0.24em] px-3 py-2.5 transition-all duration-300 flex items-center gap-3",
                        active
                          ? "text-on-surface"
                          : "text-on-surface-variant/60 hover:text-on-surface"
                      )}
                    >
                      {/* Active left accent */}
                      <span
                        className={cn(
                          "absolute left-0 top-1/2 -translate-y-1/2 w-[2px] rounded-full transition-all duration-500",
                          active ? "h-5 bg-primary" : "h-0 bg-transparent"
                        )}
                      />
                      {/* Active background pill */}
                      {active && (
                        <span className="absolute inset-0 bg-primary/[0.06]" />
                      )}
                      <span className="relative z-10">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer links */}
        <div className="px-9 py-8 border-t border-outline-variant/15">
          <div className="flex flex-col gap-3.5">
            <Link
              href="/"
              target="_blank"
              className="font-label text-[8.5px] uppercase tracking-[0.28em] transition-colors"
              style={{ color: "rgba(74,67,58,0.45)" }}
            >
              View Site →
            </Link>
            <button
              onClick={handleLogout}
              className="font-label text-[8.5px] uppercase tracking-[0.28em] text-left transition-colors"
              style={{ color: "rgba(74,67,58,0.45)" }}
            >
              Sign Out →
            </button>
          </div>
        </div>
      </aside>

      {/* ══════════════ MOBILE TOP BAR ══════════════ */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#fffcf7]/95 backdrop-blur-md border-b border-outline-variant/15 flex items-center justify-between px-7 h-14">
        <Link href="/" className="font-headline text-lg font-light tracking-[-0.02em] text-on-surface flex items-baseline gap-1">
          <span className="italic">Space</span>&nbsp;Organizers
        </Link>
        <button className="text-on-surface p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-[#fffcf7] pt-14 px-8 py-8 flex flex-col gap-4 overflow-y-auto">
          {navGroups.flatMap((g) => g.items).map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "font-headline text-2xl font-light transition-opacity",
                pathname === item.path ? "text-primary" : "text-on-surface hover:opacity-70"
              )}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-outline-variant/10 flex gap-6 mt-auto">
            <Link href="/" target="_blank" className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant/60 hover:text-primary transition-colors">View Site →</Link>
            <button onClick={handleLogout} className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant/60 hover:text-primary transition-colors">Sign Out →</button>
          </div>
        </div>
      )}

      {/* ══════════════ MAIN CONTENT ══════════════ */}
      <main className="flex-1 min-w-0 px-12 md:px-16 py-12 md:pt-14 pt-20 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
