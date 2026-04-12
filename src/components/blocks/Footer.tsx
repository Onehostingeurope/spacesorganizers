import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-charcoal text-softwhite py-20">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        
        {/* BRAND */}
        <div className="md:col-span-1">
          <Link href="/" className="font-serif text-3xl tracking-wide block mb-6">
            Spaces
          </Link>
          <p className="font-sans text-sm text-softwhite/70 leading-relaxed max-w-sm">
            We create systems that are beautiful, intuitive, and sustainable — so your home feels lighter, calmer, and easier to live in every day.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="font-sans font-medium text-sm tracking-widest uppercase mb-6 text-softwhite/90">
            Explore
          </h4>
          <ul className="space-y-4">
            <li><Link href="/about" className="text-softwhite/70 hover:text-softwhite transition-colors">About</Link></li>
            <li><Link href="/services" className="text-softwhite/70 hover:text-softwhite transition-colors">Services</Link></li>
            <li><Link href="/portfolio" className="text-softwhite/70 hover:text-softwhite transition-colors">Portfolio</Link></li>
            <li><Link href="/faq" className="text-softwhite/70 hover:text-softwhite transition-colors">FAQ</Link></li>
            <li><Link href="/contact" className="text-softwhite/70 hover:text-softwhite transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h4 className="font-sans font-medium text-sm tracking-widest uppercase mb-6 text-softwhite/90">
            Expertise
          </h4>
          <ul className="space-y-4">
            <li className="text-softwhite/70">Kitchen & Pantry</li>
            <li className="text-softwhite/70">Closet Design</li>
            <li className="text-softwhite/70">Home Office</li>
            <li className="text-softwhite/70">Move-in Unpacking</li>
            <li className="text-softwhite/70">Full Home Setup</li>
          </ul>
        </div>

        {/* CONTACT & SOCIAL */}
        <div>
          <h4 className="font-sans font-medium text-sm tracking-widest uppercase mb-6 text-softwhite/90">
            Connect
          </h4>
          <p className="text-softwhite/70 mb-4">
            hello@spacesorganizers.com
          </p>
          <p className="text-softwhite/70 mb-8">
            Serving Los Angeles & Surrounding Areas
          </p>
          <div className="flex space-x-4 text-xs font-sans uppercase tracking-widest">
            <a href="#" className="p-2 border border-softwhite/20 rounded-sm hover:bg-softwhite hover:text-charcoal transition-colors">
              IG
            </a>
            <a href="#" className="p-2 border border-softwhite/20 rounded-sm hover:bg-softwhite hover:text-charcoal transition-colors">
              PT
            </a>
            <a href="#" className="p-2 border border-softwhite/20 rounded-sm hover:bg-softwhite hover:text-charcoal transition-colors">
              FB
            </a>
          </div>
        </div>

      </div>
      
      <div className="container mx-auto px-6 md:px-12 mt-20 pt-8 border-t border-softwhite/10 flex flex-col md:flex-row justify-between items-center text-xs text-softwhite/50">
        <p>&copy; {new Date().getFullYear()} Spaces Organizers. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="#" className="hover:text-softwhite">Privacy Policy</Link>
          <Link href="#" className="hover:text-softwhite">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
