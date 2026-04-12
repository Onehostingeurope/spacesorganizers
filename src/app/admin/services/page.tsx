"use client";
import React, { useEffect, useState } from "react";
import { UploadZone } from "@/components/ui/UploadZone";

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  intro?: string;
  image?: string;
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
      <div>
        <label className={LABEL_CLS}>Full Description *</label>
        <textarea required value={data.description ?? ""} onChange={(e) => set("description", e.target.value)} rows={3} placeholder="Full description..." className={`${INPUT_CLS} resize-none`} />
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
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 bg-surface-container rounded-sm p-1 w-fit">
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
            onUploaded={(url) => set("image", url)}
            accept="image/jpeg,image/png,image/webp,image/gif"
          />
        ) : (
          <div>
            <label className={LABEL_CLS}>Image URL</label>
            <input
              value={data.image ?? ""}
              onChange={(e) => set("image", e.target.value)}
              placeholder="https://example.com/image.jpg"
              className={INPUT_CLS}
            />
          </div>
        )}

        {data.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={data.image} alt="Preview" className="mt-3 h-24 w-auto rounded object-cover" />
        )}
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

  const fetch_ = () => fetch("/api/services").then((r) => r.json()).then(setServices);
  useEffect(() => { fetch_(); }, []);

  const handleAdd = async (data: Partial<Service>) => {
    setSaving(true);
    await fetch("/api/services", { method: "POST", body: JSON.stringify(data) });
    setIsAdding(false);
    await fetch_();
    setSaving(false);
  };

  const handleEdit = async (id: string, data: Partial<Service>) => {
    setSaving(true);
    await fetch(`/api/services/${id}`, { method: "PUT", body: JSON.stringify(data) });
    setEditingId(null);
    await fetch_();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    fetch_();
  };

  return (
    <div className="max-w-5xl pb-24">
      <div className="flex justify-between items-end mb-12 border-b border-outline-variant/10 pb-6">
        <div>
          <h1 className="font-headline text-4xl text-on-surface mb-2 font-light">Services</h1>
          <p className="font-body text-on-surface-variant text-sm">Manage the services offered on the website.</p>
        </div>
        <button onClick={() => { setIsAdding(!isAdding); setEditingId(null); }} className="bg-primary text-on-primary px-6 py-3 text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-all">
          {isAdding ? "Cancel" : "+ Add Service"}
        </button>
      </div>

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
                  <button onClick={() => { setEditingId(service.id); setIsAdding(false); }} className="text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-primary transition-colors">Edit</button>
                  <button onClick={() => handleDelete(service.id)} className="text-xs uppercase tracking-widest font-semibold text-red-400 hover:text-red-600 transition-colors">Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
