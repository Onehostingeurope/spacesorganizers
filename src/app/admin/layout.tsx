"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = () => {
    document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/admin/login");
  };

  const navItems = [
    { name: "Overview", path: "/admin" },
    { name: "Bookings", path: "/admin/bookings" },
    { name: "Leads", path: "/admin/leads" },
    { name: "Hero Carousel", path: "/admin/hero" },
    { name: "Homepage Content", path: "/admin/homepage" },
    { name: "Services", path: "/admin/services" },
    { name: "Spaces", path: "/admin/spaces" },
    { name: "Portfolio", path: "/admin/portfolio" },
    { name: "Testimonials", path: "/admin/testimonials" },
    { name: "Blog", path: "/admin/blog" },
    { name: "FAQ", path: "/admin/faq" }
  ];

  return (
    <div className="min-h-screen bg-sand flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-softwhite border-r border-charcoal/10 flex flex-col">
        <div className="p-8 border-b border-charcoal/10">
          <Link href="/" className="font-serif text-2xl text-charcoal block">Spaces</Link>
          <span className="text-[10px] uppercase tracking-widest text-charcoal/40 font-semibold">CMS Platform</span>
        </div>
        <nav className="flex-1 p-6 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.name} 
                href={item.path}
                className={`block px-4 py-3 text-sm tracking-wide transition-colors ${isActive ? 'bg-charcoal text-softwhite font-medium' : 'text-charcoal/70 hover:bg-charcoal/5 hover:text-charcoal'}`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="p-6 border-t border-charcoal/10">
           <button onClick={handleLogout} className="text-xs uppercase tracking-widest text-charcoal/60 hover:text-charcoal font-semibold w-full text-left">
             Sign Out &rarr;
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto max-h-screen">
        {children}
      </main>
    </div>
  );
}
