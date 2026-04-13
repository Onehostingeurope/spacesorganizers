"use client";
import React, { useEffect, useState } from "react";
import { UploadZone } from "@/components/ui/UploadZone";
import { LangTabs } from "@/components/ui/LangTabs";
import { Reorder } from "framer-motion";

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  intro?: string;
  image?: string;
  gallery?: string[];
  carouselSpeed?: number;
  idealClient?: string;
  included?: string[];
}

const INPUT_CLS = "w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/40";
const LABEL_CLS = "font-label text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/60 mb-1 block";

function ServiceForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: Partial<Service>;
  onSave: (data: Partial<Service>) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}) {
  const [data, setData] = useState<Partial<Service>>({ ...initial });
  const [inputMode, setInputMode] = useState<"upload" | "url">("upload");
  const set = (key: keyof Service, val: any) => setData((d) => ({ ...d, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({
      ...data,
      slug: data.slug || data.title?.toLowerCase().replace(/\s+/g, "-") || "",
      included: typeof data.included === "string"
        ? (data.included as unknown as string).split(",").map((s) => s.trim())
        : data.included ?? [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface-container p-8 mb-8 space-y-5 rounded-DEFAULT ghost-border">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className={LABEL_CLS}>Title *</label>
          <input required value={data.title ?? ""} onChange={(e) => set("title", e.target.value)} placeholder="Service Title" className={INPUT_CLS} />
        </div>
        <div>
          <label className={LABEL_CLS}>Slug (auto-generated)</label>
          <input value={data.slug ?? ""} onChange={(e) => set("slug", e.target.value)} placeholder="auto-generated" className={INPUT_CLS} />
        </div>
      </div>
      <div>
        <label className={LABEL_CLS}>Short Intro</label>
        <input value={data.intro ?? ""} onChange={(e) => set("intro", e.target.value)} placeholder="One-line intro statement" className={INPUT_CLS} />
      </div>
      <div className="space-y-2">
        <label className={LABEL_CLS}>Full Description *</label>
        {/* RICH TOOLBAR */}
        <div className="flex gap-2 mb-2 p-2 bg-surface border border-outline-variant/20 rounded-sm">
          {[
            { tag: "b", label: "Bold" },
            { tag: "i", label: "Italic" },
            { tag: "center", label: "Center" },
            { tag: "br", label: "Line Break", single: true },
          ].map((btn) => (
            <button
              key={btn.tag}
              type="button"
              onClick={() => {
                const textarea = document.getElementById("description-field") as HTMLTextAreaElement;
                if (!textarea) return;
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const text = textarea.value;
                const selected = text.substring(start, end);
                const before = text.substring(0, start);
                const after = text.substring(end);
                
                let newVal;
                if (btn.single) {
                  newVal = `${before}<${btn.tag}/>${after}`;
                } else {
                  newVal = `${before}<${btn.tag}>${selected}</${btn.tag}>${after}`;
                }
                
                set("description", newVal);
              }}
              className="px-3 py-1 text-[9px] uppercase tracking-widest font-bold border border-outline-variant/30 hover:bg-primary hover:text-on-primary hover:border-primary transition-all rounded-sm"
            >
              {btn.label}
            </button>
          ))}
        </div>
        <textarea 
          id="description-field"
          required 
          value={data.description ?? ""} 
          onChange={(e) => set("description", e.target.value)} 
          rows={6} 
          placeholder="Full description..." 
          className={`${INPUT_CLS} resize-none font-mono text-[13px]`} 
        />
        
        {/* PREVIEW */}
        {data.description && (
          <div className="mt-4 p-6 bg-surface border border-dashed border-outline-variant/40 rounded-DEFAULT">
            <p className={LABEL_CLS}>Live Preview</p>
            <div 
              className="font-body text-sm text-on-surface-variant leading-relaxed rich-text"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className={LABEL_CLS}>What's Included (comma-separated)</label>
          <input
            value={Array.isArray(data.included) ? data.included.join(", ") : data.included ?? ""}
            onChange={(e) => set("included", e.target.value as any)}
            placeholder="Initial consult, Decluttering, Setup"
            className={INPUT_CLS}
          />
        </div>
        <div>
          <label className={LABEL_CLS}>Ideal Client</label>
          <input value={data.idealClient ?? ""} onChange={(e) => set("idealClient", e.target.value)} placeholder="Who is this for?" className={INPUT_CLS} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <label className={LABEL_CLS}>Gallery Images (Drag to Reorder)</label>
          <Reorder.Group 
            axis="x"
            values={data.gallery || []} 
            onReorder={(newOrder) => set("gallery", newOrder)} 
            className="flex flex-wrap gap-4 mb-3"
            style={{ listStyleType: "none", padding: 0, margin: 0 }}
          >
            {data.gallery?.map((img) => (
              <Reorder.Item 
                key={img} 
                value={img} 
                className="relative group rounded overflow-hidden aspect-[4/5] bg-surface border border-outline-variant/20 cursor-grab active:cursor-grabbing w-[calc(50%-8px)] sm:w-[calc(25%-12px)] flex-shrink-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="" className="w-full h-full object-cover pointer-events-none select-none" draggable={false} />
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    set("gallery", data.gallery!.filter((i) => i !== img));
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs shadow-md z-10 hover:bg-red-600"
                >
                  ✕
                </button>
              </Reorder.Item>
            ))}
          </Reorder.Group>
          
          <div className="flex gap-1 bg-surface-container rounded-sm p-1 w-fit mb-3">
            {(["upload", "url"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setInputMode(m)}
                className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-semibold font-label rounded-sm transition-all ${
                  inputMode === m
                    ? "bg-primary text-on-primary"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {m === "upload" ? "↑ Upload File" : "🔗 Paste URL"}
              </button>
            ))}
          </div>

          {inputMode === "upload" ? (
            <UploadZone
              multiple={true}
              onUploaded={(url) => setData((prev) => ({ ...prev, gallery: [...(prev.gallery || []), url] }))}
              accept="image/jpeg,image/png,image/webp,image/gif"
            />
          ) : (
            <div>
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (e.currentTarget.value) {
                      set("gallery", [...(data.gallery || []), e.currentTarget.value]);
                      e.currentTarget.value = "";
                    }
                  }
                }}
                placeholder="Paste URL and press Enter..."
                className={INPUT_CLS}
              />
            </div>
          )}
        </div>

        <div>
           <label className={LABEL_CLS}>Carousel Auto-slide Speed ({data.carouselSpeed ?? 4}s)</label>
           <input
             type="range"
             min={2}
             max={10}
             step={1}
             value={data.carouselSpeed ?? 4}
             onChange={(e) => set("carouselSpeed", Number(e.target.value))}
             className="w-full accent-primary mt-4"
           />
           <div className="flex justify-between text-[8px] tracking-widest uppercase text-on-surface-variant mt-2 mb-4">
             <span>Fast (2s)</span>
             <span>Relaxed (10s)</span>
           </div>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="bg-primary text-on-primary px-8 py-3 text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-all disabled:opacity-50">
          {saving ? "Saving..." : "Save Service"}
        </button>
        <button type="button" onClick={onCancel} className="px-8 py-3 text-xs tracking-widest uppercase font-medium text-on-surface-variant border border-outline-variant/30 hover:border-on-surface-variant transition-all">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function ServicesAdmin() {
  const [services, setServices] = useState<Service[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [lang, setLang] = useState("en");

  const fetch_ = () => fetch(`/api/services?lang=${lang}`).then((r) => r.json()).then(setServices);
  useEffect(() => { fetch_(); }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAdd = async (data: Partial<Service>) => {
    setSaving(true);
    await fetch("/api/services", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, lang }) });
    setIsAdding(false);
    await fetch_();
    setSaving(false);
  };

  const handleEdit = async (id: string, data: Partial<Service>) => {
    setSaving(true);
    await fetch(`/api/services/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, lang }) });
    setEditingId(null);
    await fetch_();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    setConfirmingId(null);
    fetch_();
  };

  const handleBulkDelete = async () => {
    setSaving(true);
    await fetch("/api/services", {
      method: "DELETE",
      body: JSON.stringify({ ids: selectedIds }),
    });
    setSelectedIds([]);
    await fetch_();
    setSaving(false);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === services.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(services.map(s => s.id));
    }
  };

  return (
    <div className="max-w-5xl pb-24">
      <div className="flex justify-between items-end mb-12 border-b border-outline-variant/10 pb-6">
        <div>
          <h1 className="font-headline text-4xl text-on-surface mb-2 font-light">Services</h1>
          <p className="font-body text-on-surface-variant text-sm">Manage the services offered on the website.</p>
        </div>
        <div className="flex gap-4 items-center">
          <LangTabs value={lang} onChange={(l) => { setLang(l); setSelectedIds([]); setEditingId(null); setIsAdding(false); }} />
          <button 
            onClick={handleSelectAll} 
            className="text-[10px] uppercase tracking-[0.2em] font-semibold font-label py-3 px-4 rounded-sm border border-outline-variant/30 hover:border-on-surface-variant transition-all"
          >
            {selectedIds.length === services.length && services.length > 0 ? "Deselect All" : "Select All"}
          </button>
          <button onClick={() => { setIsAdding(!isAdding); setEditingId(null); }} className="bg-primary text-on-primary px-6 py-3 text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-all">
            {isAdding ? "Cancel" : "+ Add Service"}
          </button>
        </div>
      </div>

      {selectedIds.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/20 p-4 mb-8 flex items-center justify-between rounded-DEFAULT">
          <span className="text-sm font-medium text-red-400">
            {selectedIds.length} services selected
          </span>
          <button 
            onClick={handleBulkDelete}
            disabled={saving}
            className="bg-red-500 text-white px-4 py-2 text-[10px] uppercase tracking-widest font-bold hover:bg-red-600 transition-all disabled:opacity-50"
          >
            Delete Selected
          </button>
        </div>
      )}

      {isAdding && (
        <ServiceForm
          initial={{}}
          onSave={handleAdd}
          onCancel={() => setIsAdding(false)}
          saving={saving}
        />
      )}

      <div className="space-y-4">
        {services.length === 0 && <p className="text-on-surface-variant/50 italic text-sm">No services yet.</p>}
        {services.map((service) => (
          <div key={service.id} className="bg-surface rounded-DEFAULT ghost-border overflow-hidden">
            {editingId === service.id ? (
              <ServiceForm
                initial={service}
                onSave={(data) => handleEdit(service.id, data)}
                onCancel={() => setEditingId(null)}
                saving={saving}
              />
            ) : (
              <div className="flex gap-4 items-center p-5">
                <input 
                  type="checkbox" 
                  checked={selectedIds.includes(service.id)}
                  onChange={() => toggleSelect(service.id)}
                  className="w-4 h-4 rounded border-outline-variant/30 text-primary focus:ring-primary bg-transparent cursor-pointer"
                />
                {service.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={service.image} alt="" className="w-20 h-16 object-cover rounded flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-headline text-xl text-on-surface font-light">{service.title}</h3>
                  <p className="font-label text-[10px] text-on-surface-variant/50 tracking-widest uppercase mt-1">{service.slug}</p>
                  <p className="font-body text-sm text-on-surface-variant truncate mt-1">{service.description}</p>
                </div>
                <div className="flex gap-4 flex-shrink-0">
                  <button onClick={() => { setEditingId(service.id); setIsAdding(false); setConfirmingId(null); }} className="text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-primary transition-colors">Edit</button>
                  {confirmingId === service.id ? (
                    <span className="flex items-center gap-2">
                      <button onClick={() => handleDelete(service.id)} className="text-xs uppercase tracking-widest font-semibold text-white bg-red-500 px-3 py-1 hover:bg-red-600 transition-colors">Confirm?</button>
                      <button onClick={() => setConfirmingId(null)} className="text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-on-surface transition-colors">Cancel</button>
                    </span>
                  ) : (
                    <button onClick={() => setConfirmingId(service.id)} className="text-xs uppercase tracking-widest font-semibold text-red-400 hover:text-red-600 transition-colors">Delete</button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
