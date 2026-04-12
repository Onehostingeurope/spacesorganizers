"use client";
import React, { useEffect, useState } from "react";
import { UploadZone } from "@/components/ui/UploadZone";

const INPUT_CLS = "w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/40";
const LABEL_CLS = "font-label text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/60 mb-1 block";

export default function HomepageAdmin() {
  const [lang, setLang] = useState("en");
  const [settings, setSettings] = useState<any>({
    phi_label: "",
    phi_heading: "",
    phi_quote: "",
    phi_pantry_title: "",
    phi_pantry_desc: "",
    phi_pantry_image: "",
    phi_living_title: "",
    phi_living_desc: "",
    phi_living_image: "",
    phi_wardrobe_title: "",
    phi_wardrobe_desc: "",
    phi_wardrobe_image: "",
    contact_heading: "",
    contact_heading_accent: "",
    contact_description: "",
    contact_serving: "",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const fetchSettings = async (l: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/homepage-settings?lang=${l}`);
      const data = await res.json();
      if (data && data.lang) {
        setSettings(data);
      } else {
        // Reset to empty if no data found
        setSettings({
          phi_label: "", phi_heading: "", phi_quote: "",
          phi_pantry_title: "", phi_pantry_desc: "", phi_pantry_image: "",
          phi_living_title: "", phi_living_desc: "", phi_living_image: "",
          phi_wardrobe_title: "", phi_wardrobe_desc: "", phi_wardrobe_image: "",
          contact_heading: "", contact_heading_accent: "", contact_description: "", contact_serving: "",
        });
      }
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
        setMessage("Homepage settings saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  const setField = (key: string, val: string) => {
    setSettings((s: any) => ({ ...s, [key]: val }));
  };

  return (
    <div className="max-w-6xl pb-24">
      <div className="flex justify-between items-end mb-12 border-b border-outline-variant/10 pb-6">
        <div>
          <h1 className="font-headline text-4xl text-on-surface mb-2 font-light">Homepage CMS</h1>
          <p className="font-body text-on-surface-variant text-sm">
            Manage the Philosophy section, Atelier grid, and Contact details per language.
          </p>
        </div>
        
        {/* Lang switcher */}
        <div className="flex gap-1 bg-surface-variant/10 rounded-sm p-1">
          {["en", "fr", "ru", "de"].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-6 py-2 text-xs uppercase tracking-widest font-semibold rounded-sm transition-all ${
                lang === l ? "bg-primary text-on-primary" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-12">
        {/* PHILOSOPHY TEXT */}
        <div className="bg-surface-container p-8 rounded-DEFAULT ghost-border">
          <h3 className="font-headline text-2xl mb-8 font-light">1. Philosophy & Atelier Section</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className={LABEL_CLS}>Section Label (Top small text)</label>
                <input value={settings.phi_label} onChange={(e) => setField("phi_label", e.target.value)} className={INPUT_CLS} placeholder="OUR PHILOSOPHY" />
              </div>
              <div>
                <label className={LABEL_CLS}>Main Heading</label>
                <textarea value={settings.phi_heading} onChange={(e) => setField("phi_heading", e.target.value)} className={`${INPUT_CLS} h-24`} placeholder="The Art of Organized Living" />
              </div>
            </div>
            <div>
              <label className={LABEL_CLS}>Philosophy Quote (Italicized)</label>
              <textarea value={settings.phi_quote} onChange={(e) => setField("phi_quote", e.target.value)} className={`${INPUT_CLS} h-40`} placeholder="“Your home should be the antidote to stress, not the cause of it...”" />
            </div>
          </div>
        </div>

        {/* ATELIER GRID (3 ITEMS) */}
        <div className="space-y-8">
          <h3 className="font-headline text-2xl font-light px-2">2. Atelier Grid Content</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { id: "pantry", label: "Left Item (e.g. Pantry)" },
              { id: "living", label: "Center Item (e.g. Living Space)" },
              { id: "wardrobe", label: "Right Item (e.g. Wardrobe)" }
            ].map((item) => (
              <div key={item.id} className="bg-surface-container p-6 rounded-DEFAULT ghost-border space-y-6">
                <span className={LABEL_CLS}>{item.label}</span>
                <div>
                   <label className={LABEL_CLS}>Title</label>
                   <input value={settings[`phi_${item.id}_title`]} onChange={(e) => setField(`phi_${item.id}_title`, e.target.value)} className={INPUT_CLS} />
                </div>
                <div>
                   <label className={LABEL_CLS}>Description</label>
                   <textarea value={settings[`phi_${item.id}_desc`]} onChange={(e) => setField(`phi_${item.id}_desc`, e.target.value)} className={`${INPUT_CLS} h-20 resize-none`} />
                </div>
                <div>
                   <label className={LABEL_CLS}>Image</label>
                   {settings[`phi_${item.id}_image`] && (
                     <div className="relative aspect-square mb-4 overflow-hidden rounded">
                        <img src={settings[`phi_${item.id}_image`]} className="w-full h-full object-cover" />
                        <button type="button" onClick={() => setField(`phi_${item.id}_image`, "")} className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70">✕</button>
                     </div>
                   )}
                   <UploadZone onUploaded={(url) => setField(`phi_${item.id}_image`, url)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONTACT SECTION */}
        <div className="bg-surface-container p-8 rounded-DEFAULT ghost-border">
          <h3 className="font-headline text-2xl mb-8 font-light">3. Contact Section Text</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={LABEL_CLS}>Heading (Main)</label>
                   <input value={settings.contact_heading} onChange={(e) => setField("contact_heading", e.target.value)} className={INPUT_CLS} placeholder="Start your" />
                </div>
                <div>
                  <label className={LABEL_CLS}>Heading (Accent/Italic)</label>
                   <input value={settings.contact_heading_accent} onChange={(e) => setField("contact_heading_accent", e.target.value)} className={INPUT_CLS} placeholder="journey" />
                </div>
              </div>
              <div>
                <label className={LABEL_CLS}>Description</label>
                <textarea value={settings.contact_description} onChange={(e) => setField("contact_description", e.target.value)} className={`${INPUT_CLS} h-32`} />
              </div>
            </div>
            <div>
              <label className={LABEL_CLS}>Serving Area Labels</label>
              <textarea value={settings.contact_serving} onChange={(e) => setField("contact_serving", e.target.value)} className={`${INPUT_CLS} h-32`} placeholder="French Riviera, Monaco, Cannes..." />
            </div>
          </div>
        </div>

        {/* SAVE BUTTON */}
        <div className="sticky bottom-8 bg-surface/80 backdrop-blur p-6 rounded-DEFAULT ghost-border border-primary/20 flex items-center justify-between shadow-2xl z-50">
           <p className="text-sm text-on-surface-variant italic">Changes won't be live until you click Save.</p>
           <div className="flex items-center gap-6">
             {message && <span className="text-primary font-medium">{message}</span>}
             <button
               type="submit"
               disabled={saving || loading}
               className="bg-primary text-on-primary px-12 py-4 text-sm tracking-widest uppercase font-bold hover:bg-primary/90 transition-all shadow-lg disabled:opacity-40"
             >
               {saving ? "Saving Changes..." : `Save ${lang.toUpperCase()} Homepage`}
             </button>
           </div>
        </div>
      </form>
    </div>
  );
}
