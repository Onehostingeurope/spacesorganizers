"use client";
import React, { useEffect, useState } from "react";
import { UploadZone } from "@/components/ui/UploadZone";

const INPUT_CLS =
  "w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/40";
const LABEL_CLS =
  "font-label text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/60 mb-1 block";

type Tab = "philosophy" | "process" | "hooks" | "contact";

export default function HomepageAdmin() {
  const [lang, setLang] = useState("en");
  const [activeTab, setActiveTab] = useState<Tab>("philosophy");
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const fetchSettings = async (l: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/homepage-settings?lang=${l}`);
      const data = await res.json();
      setSettings(data || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings(lang);
  }, [lang]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/homepage-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...settings, lang }),
      });
      if (res.ok) {
        setMessage("Settings saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  const update = (key: string, val: any) => setSettings((s: any) => ({ ...s, [key]: val }));

  return (
    <div className="max-w-5xl pb-24 text-on-surface">
      {/* HEADER */}
      <div className="flex justify-between items-end mb-12 border-b border-outline-variant/10 pb-6">
        <div>
          <h1 className="font-headline text-4xl text-on-surface mb-2 font-light">Homepage Content</h1>
          <p className="font-body text-on-surface-variant text-sm">
            Manage all the special text sections and imagery on your homepage.
          </p>
        </div>

        {/* Lang switcher */}
        <div className="flex gap-1 bg-surface-variant/20 rounded-sm p-1">
          {["en", "fr", "ru", "de"].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-4 py-1.5 text-[10px] uppercase tracking-widest font-semibold rounded-sm transition-all ${
                lang === l ? "bg-primary text-on-primary" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-8 mb-8 border-b border-outline-variant/10">
        {(["philosophy", "process", "hooks", "contact"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActiveTab(t)}
            className={`pb-4 text-[10px] tracking-[0.2em] uppercase font-bold transition-all border-b-2 ${
              activeTab === t ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="space-y-12">
        {/* PHILOSOPHY TAB */}
        {activeTab === "philosophy" && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="font-headline text-xl font-light border-b border-outline-variant/10 pb-2 mb-6">Main Philosophy Text</h3>
                <div>
                  <label className={LABEL_CLS}>Section Label</label>
                  <input value={settings.phi_label || ""} onChange={(e) => update("phi_label", e.target.value)} placeholder="OUR PHILOSOPHY" className={INPUT_CLS} />
                </div>
                <div>
                  <label className={LABEL_CLS}>Main Heading</label>
                  <input value={settings.phi_heading || ""} onChange={(e) => update("phi_heading", e.target.value)} placeholder="Creating Space for Life" className={INPUT_CLS} />
                </div>
                <div>
                  <label className={LABEL_CLS}>Secondary Quote (Italicized)</label>
                  <textarea value={settings.phi_quote || ""} onChange={(e) => update("phi_quote", e.target.value)} placeholder="Organization is not just about clean shelves..." className={`${INPUT_CLS} h-24 resize-none`} />
                </div>
              </div>

              {/* Grid 1: Pantry */}
              <div className="space-y-6 bg-surface-container-low p-6 rounded-DEFAULT ghost-border">
                <h3 className="font-headline text-lg font-light">Atelier Item 1 (Pantry/Vertical)</h3>
                <div>
                  <label className={LABEL_CLS}>Title</label>
                  <input value={settings.phi_pantry_title || ""} onChange={(e) => update("phi_pantry_title", e.target.value)} placeholder="The Kitchen Pantry" className={INPUT_CLS} />
                </div>
                <div>
                  <label className={LABEL_CLS}>Description</label>
                  <input value={settings.phi_pantry_desc || ""} onChange={(e) => update("phi_pantry_desc", e.target.value)} placeholder="Bespoke culinary organization" className={INPUT_CLS} />
                </div>
                <div>
                  <label className={LABEL_CLS}>Image</label>
                  <UploadZone onUploaded={(url) => update("phi_pantry_image", url)} value={settings.phi_pantry_image} h="h-48" />
                </div>
              </div>

              {/* Grid 2: Living */}
              <div className="space-y-6 bg-surface-container-low p-6 rounded-DEFAULT ghost-border">
                <h3 className="font-headline text-lg font-light">Atelier Item 2 (Living/Square)</h3>
                <div>
                  <label className={LABEL_CLS}>Title</label>
                  <input value={settings.phi_living_title || ""} onChange={(e) => update("phi_living_title", e.target.value)} placeholder="Shared Spaces" className={INPUT_CLS} />
                </div>
                <div>
                  <label className={LABEL_CLS}>Description</label>
                  <input value={settings.phi_living_desc || ""} onChange={(e) => update("phi_living_desc", e.target.value)} placeholder="Harmonious lounge transformations" className={INPUT_CLS} />
                </div>
                <div>
                  <label className={LABEL_CLS}>Image</label>
                  <UploadZone onUploaded={(url) => update("phi_living_image", url)} value={settings.phi_living_image} h="h-48" />
                </div>
              </div>

              {/* Grid 3: Wardrobe */}
              <div className="space-y-6 bg-surface-container-low p-6 rounded-DEFAULT ghost-border">
                <h3 className="font-headline text-lg font-light">Atelier Item 3 (Wardrobe/Vertical)</h3>
                <div>
                  <label className={LABEL_CLS}>Title</label>
                  <input value={settings.phi_wardrobe_title || ""} onChange={(e) => update("phi_wardrobe_title", e.target.value)} placeholder="The Wardrobe" className={INPUT_CLS} />
                </div>
                <div>
                  <label className={LABEL_CLS}>Description</label>
                  <input value={settings.phi_wardrobe_desc || ""} onChange={(e) => update("phi_wardrobe_desc", e.target.value)} placeholder="Elegance in order" className={INPUT_CLS} />
                </div>
                <div>
                  <label className={LABEL_CLS}>Image</label>
                  <UploadZone onUploaded={(url) => update("phi_wardrobe_image", url)} value={settings.phi_wardrobe_image} h="h-48" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROCESS TAB */}
        {activeTab === "process" && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
               <div>
                  <label className={LABEL_CLS}>Section Label</label>
                  <input value={settings.proc_label || ""} onChange={(e) => update("proc_label", e.target.value)} placeholder="OUR PROCESS" className={INPUT_CLS} />
               </div>
               <div>
                  <label className={LABEL_CLS}>Section Heading</label>
                  <input value={settings.proc_heading || ""} onChange={(e) => update("proc_heading", e.target.value)} placeholder="Directing the transformation" className={INPUT_CLS} />
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="space-y-4">
                  <h4 className="font-label text-[10px] text-primary tracking-widest font-bold">STEP 0{num}</h4>
                  <div>
                    <label className={LABEL_CLS}>Step {num} Title</label>
                    <input 
                      value={settings[`proc_step${num}_title`] || ""} 
                      onChange={(e) => update(`proc_step${num}_title`, e.target.value)} 
                      placeholder={`Step ${num} name`}
                      className={INPUT_CLS} 
                    />
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Step {num} Description</label>
                    <textarea 
                      value={settings[`proc_step${num}_desc`] || ""} 
                      onChange={(e) => update(`proc_step${num}_desc`, e.target.value)} 
                      placeholder="What happens in this stage..."
                      className={`${INPUT_CLS} h-24 resize-none`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HOOKS TAB */}
        {activeTab === "hooks" && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Testimonials */}
              <div className="space-y-6">
                <h3 className="font-headline text-xl font-light border-b border-outline-variant/10 pb-2">Testimonials Hook</h3>
                <div>
                  <label className={LABEL_CLS}>Label</label>
                  <input value={settings.testi_label || ""} onChange={(e) => update("testi_label", e.target.value)} placeholder="TESTIMONIALS" className={INPUT_CLS} />
                </div>
                <div>
                  <label className={LABEL_CLS}>Heading</label>
                  <input value={settings.testi_heading || ""} onChange={(e) => update("testi_heading", e.target.value)} placeholder="What our clients say" className={INPUT_CLS} />
                </div>
              </div>
              
              {/* FAQ */}
              <div className="space-y-6">
                <h3 className="font-headline text-xl font-light border-b border-outline-variant/10 pb-2">FAQ Hook</h3>
                <div>
                  <label className={LABEL_CLS}>Label</label>
                  <input value={settings.faq_label || ""} onChange={(e) => update("faq_label", e.target.value)} placeholder="FAQ" className={INPUT_CLS} />
                </div>
                <div>
                  <label className={LABEL_CLS}>Heading</label>
                  <input value={settings.faq_heading || ""} onChange={(e) => update("faq_heading", e.target.value)} placeholder="Common Questions" className={INPUT_CLS} />
                </div>
              </div>

              {/* Services Header */}
              <div className="space-y-6">
                <h3 className="font-headline text-xl font-light border-b border-outline-variant/10 pb-2">Services Header</h3>
                <div>
                  <label className={LABEL_CLS}>Label</label>
                  <input value={settings.serv_label || ""} onChange={(e) => update("serv_label", e.target.value)} placeholder="OUR SERVICES" className={INPUT_CLS} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL_CLS}>Heading Start</label>
                    <input value={settings.serv_heading || ""} onChange={(e) => update("serv_heading", e.target.value)} placeholder="Luxury Solutions for" className={INPUT_CLS} />
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Heading Accent</label>
                    <input value={settings.serv_heading_accent || ""} onChange={(e) => update("serv_heading_accent", e.target.value)} placeholder="Every Requirement" className={INPUT_CLS} />
                  </div>
                </div>
              </div>

              {/* Spaces Header */}
              <div className="space-y-6">
                <h3 className="font-headline text-xl font-light border-b border-outline-variant/10 pb-2">Spaces Header</h3>
                <div>
                  <label className={LABEL_CLS}>Label</label>
                  <input value={settings.spaces_label || ""} onChange={(e) => update("spaces_label", e.target.value)} placeholder="THE ATELIER" className={INPUT_CLS} />
                </div>
                <div>
                  <label className={LABEL_CLS}>Heading</label>
                  <input value={settings.spaces_heading || ""} onChange={(e) => update("spaces_heading", e.target.value)} placeholder="Tailored to your lifestyle" className={INPUT_CLS} />
                </div>
              </div>

              {/* Portfolio Header */}
              <div className="space-y-6">
                <h3 className="font-headline text-xl font-light border-b border-outline-variant/10 pb-2">Portfolio Header</h3>
                <div>
                  <label className={LABEL_CLS}>Label</label>
                  <input value={settings.port_label || ""} onChange={(e) => update("port_label", e.target.value)} placeholder="LATEST WORK" className={INPUT_CLS} />
                </div>
                <div>
                  <label className={LABEL_CLS}>Heading</label>
                  <input value={settings.port_heading || ""} onChange={(e) => update("port_heading", e.target.value)} placeholder="Selected transformations" className={INPUT_CLS} />
                </div>
              </div>

              {/* CTA Section */}
              <div className="space-y-6 col-span-full mt-12 bg-surface-container-low p-8 rounded-DEFAULT ghost-border">
                 <h3 className="font-headline text-xl font-light border-b border-outline-variant/10 pb-2">Bottom CTA Section</h3>
                 <div className="grid grid-cols-2 gap-8 mt-6">
                   <div>
                      <label className={LABEL_CLS}>Small Label</label>
                      <input value={settings.cta_label || ""} onChange={(e) => update("cta_label", e.target.value)} placeholder="GET STARTED" className={INPUT_CLS} />
                   </div>
                   <div>
                      <label className={LABEL_CLS}>Main Heading</label>
                      <input value={settings.cta_heading || ""} onChange={(e) => update("cta_heading", e.target.value)} placeholder="Ready to transform your home?" className={INPUT_CLS} />
                   </div>
                   <div className="col-span-full">
                      <label className={LABEL_CLS}>Description Text</label>
                      <textarea value={settings.cta_desc || ""} onChange={(e) => update("cta_desc", e.target.value)} placeholder="Join our waitlist for a free consultation..." className={`${INPUT_CLS} h-24 resize-none`} />
                   </div>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT TAB */}
        {activeTab === "contact" && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="font-headline text-xl font-light border-b border-outline-variant/10 pb-2">Contact Section Text</h3>
                <div>
                  <label className={LABEL_CLS}>Main Heading (Normal)</label>
                  <input value={settings.contact_heading || ""} onChange={(e) => update("contact_heading", e.target.value)} placeholder="Let's start your" className={INPUT_CLS} />
                </div>
                <div>
                  <label className={LABEL_CLS}>Main Heading (Italic Accent)</label>
                  <input value={settings.contact_heading_accent || ""} onChange={(e) => update("contact_heading_accent", e.target.value)} placeholder="journey together" className={INPUT_CLS} />
                </div>
                <div>
                  <label className={LABEL_CLS}>Description</label>
                  <textarea value={settings.contact_description || ""} onChange={(e) => update("contact_description", e.target.value)} placeholder="We're here to help you..." className={`${INPUT_CLS} h-24 resize-none`} />
                </div>
                <div>
                  <label className={LABEL_CLS}>Serving Area Text</label>
                  <input value={settings.contact_serving || ""} onChange={(e) => update("contact_serving", e.target.value)} placeholder="Serving the entire French Riviera..." className={INPUT_CLS} />
                </div>
              </div>

              <div className="space-y-6 bg-primary/5 p-6 rounded-DEFAULT ghost-border">
                <h3 className="font-headline text-xl text-primary font-light border-b border-primary/20 pb-2">Global Company Data</h3>
                <p className="text-[10px] text-on-surface-variant italic mb-4">Values used in Header, Footer, and Contact sections.</p>
                <div>
                  <label className={LABEL_CLS}>Public Email</label>
                  <input value={settings.company_email || ""} onChange={(e) => update("company_email", e.target.value)} placeholder="hello@spaceorganizing.com" className={INPUT_CLS} />
                </div>
                <div>
                  <label className={LABEL_CLS}>Public Phone</label>
                  <input value={settings.company_phone || ""} onChange={(e) => update("company_phone", e.target.value)} placeholder="+380 66 938 78 09" className={INPUT_CLS} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SAVE BUTTON */}
        <div className="flex items-center gap-6 pt-12 border-t border-outline-variant/20 sticky bottom-0 bg-surface/80 backdrop-blur-sm py-4 z-50">
          <button
            type="submit"
            disabled={saving || loading}
            className="bg-primary text-on-primary px-12 py-4 text-xs tracking-[0.2em] font-bold uppercase hover:bg-primary/90 transition-all shadow-xl disabled:opacity-40"
          >
            {saving ? "Saving Changes..." : `Save all ${lang.toUpperCase()} Content`}
          </button>
          {message && <span className="text-sm text-primary italic font-medium animate-pulse">{message}</span>}
        </div>
      </form>
    </div>
  );
}
