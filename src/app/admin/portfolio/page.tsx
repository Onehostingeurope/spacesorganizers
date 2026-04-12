"use client";
import React, { useEffect, useState } from "react";

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description?: string;
  image?: string;
}

const INPUT_CLS = "w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/40";
const LABEL_CLS = "font-label text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/60 mb-1 block";

function ProjectForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: Partial<Project>;
  onSave: (data: Partial<Project>) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}) {
  const [data, setData] = useState<Partial<Project>>({ ...initial });
  const set = (key: keyof Project, val: string) => setData((d) => ({ ...d, [key]: val }));

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onSave({ ...data, slug: data.slug || data.title?.toLowerCase().replace(/\s+/g, "-") || "" });
      }}
      className="bg-surface-container p-8 mb-8 space-y-5 rounded-DEFAULT ghost-border"
    >
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className={LABEL_CLS}>Project Title *</label>
          <input required value={data.title ?? ""} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Monaco Wardrobe" className={INPUT_CLS} />
        </div>
        <div>
          <label className={LABEL_CLS}>Category</label>
          <input value={data.category ?? ""} onChange={(e) => set("category", e.target.value)} placeholder="e.g. Wardrobe / Pantry / Move-In" className={INPUT_CLS} />
        </div>
      </div>
      <div>
        <label className={LABEL_CLS}>Description</label>
        <textarea value={data.description ?? ""} onChange={(e) => set("description", e.target.value)} rows={3} placeholder="Project description..." className={`${INPUT_CLS} resize-none`} />
      </div>
      <div>
        <label className={LABEL_CLS}>Image URL (paste link or /images/filename.jpg)</label>
        <input value={data.image ?? ""} onChange={(e) => set("image", e.target.value)} placeholder="https://... or /images/example.jpg" className={INPUT_CLS} />
        {data.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={data.image} alt="" className="mt-3 h-28 w-auto rounded object-cover" />
        )}
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="bg-primary text-on-primary px-8 py-3 text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-all disabled:opacity-50">
          {saving ? "Saving..." : "Save Project"}
        </button>
        <button type="button" onClick={onCancel} className="px-8 py-3 text-xs tracking-widest uppercase font-medium text-on-surface-variant border border-outline-variant/30 hover:border-on-surface-variant transition-all">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function PortfolioAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetch_ = () => fetch("/api/portfolio").then((r) => r.json()).then(setProjects);
  useEffect(() => { fetch_(); }, []);

  const handleAdd = async (data: Partial<Project>) => {
    setSaving(true);
    await fetch("/api/portfolio", { method: "POST", body: JSON.stringify(data) });
    setIsAdding(false);
    await fetch_();
    setSaving(false);
  };

  const handleEdit = async (id: string, data: Partial<Project>) => {
    setSaving(true);
    await fetch(`/api/portfolio/${id}`, { method: "PUT", body: JSON.stringify(data) });
    setEditingId(null);
    await fetch_();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
    fetch_();
  };

  return (
    <div className="max-w-5xl pb-24">
      <div className="flex justify-between items-end mb-12 border-b border-outline-variant/10 pb-6">
        <div>
          <h1 className="font-headline text-4xl text-on-surface mb-2 font-light">Portfolio</h1>
          <p className="font-body text-on-surface-variant text-sm">Manage showcased transformation projects.</p>
        </div>
        <button onClick={() => { setIsAdding(!isAdding); setEditingId(null); }} className="bg-primary text-on-primary px-6 py-3 text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-all">
          {isAdding ? "Cancel" : "+ Add Project"}
        </button>
      </div>

      {isAdding && (
        <ProjectForm initial={{}} onSave={handleAdd} onCancel={() => setIsAdding(false)} saving={saving} />
      )}

      <div className="space-y-4">
        {projects.length === 0 && <p className="text-on-surface-variant/50 italic text-sm">No portfolio projects yet.</p>}
        {projects.map((proj) => (
          <div key={proj.id} className="bg-surface rounded-DEFAULT ghost-border overflow-hidden">
            {editingId === proj.id ? (
              <ProjectForm initial={proj} onSave={(d) => handleEdit(proj.id, d)} onCancel={() => setEditingId(null)} saving={saving} />
            ) : (
              <div className="flex gap-4 items-center p-5">
                {proj.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={proj.image} alt="" className="w-20 h-16 object-cover rounded flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-headline text-xl text-on-surface font-light">{proj.title}</h3>
                  <p className="font-label text-[10px] text-primary tracking-widest uppercase mt-1">{proj.category}</p>
                  <p className="font-body text-sm text-on-surface-variant truncate mt-1">{proj.description}</p>
                </div>
                <div className="flex gap-4 flex-shrink-0">
                  <button onClick={() => { setEditingId(proj.id); setIsAdding(false); }} className="text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-primary transition-colors">Edit</button>
                  <button onClick={() => handleDelete(proj.id)} className="text-xs uppercase tracking-widest font-semibold text-red-400 hover:text-red-600 transition-colors">Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
