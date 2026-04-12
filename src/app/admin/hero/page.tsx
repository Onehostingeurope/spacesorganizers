"use client";
import React, { useEffect, useState } from "react";
import { UploadZone } from "@/components/ui/UploadZone";
import { motion, Reorder, useDragControls } from "framer-motion";
import { GripVertical } from "lucide-react";

type SlideType = "image" | "video" | "youtube";
type InputMode = "upload" | "url";

interface Slide {
  id: string;
  type: SlideType;
  url: string;
  alt?: string;
  order: number;
}

function getYouTubeThumb(url: string) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

const INPUT_CLS =
  "w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/40";
const LABEL_CLS =
  "font-label text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/60 mb-1 block";


// ─── Preview ───────────────────────────────────────────────────────────────
function Preview({ slide }: { slide: Partial<Slide> }) {
  if (!slide.url) return null;
  if (slide.type === "youtube") {
    const thumb = getYouTubeThumb(slide.url);
    return thumb ? (
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumb} alt="YouTube thumb" className="w-full h-36 object-cover rounded" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded">
          <span className="text-white text-5xl drop-shadow">▶</span>
        </div>
      </div>
    ) : null;
  }
  if (slide.type === "video") {
    return <video src={slide.url} muted controls className="w-full h-36 object-cover rounded bg-black" />;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={slide.url} alt={slide.alt ?? ""} className="w-full h-36 object-cover rounded" />;
}

// ─── Slide Form ────────────────────────────────────────────────────────────
function SlideForm({
  title,
  initial,
  onSave,
  onCancel,
  saving,
  nextOrder,
}: {
  title: string;
  initial: Partial<Slide>;
  onSave: (data: Partial<Slide>) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
  nextOrder: number;
}) {
  const [data, setData] = useState<Partial<Slide>>({
    type: "image",
    order: nextOrder,
    ...initial,
  });
  const [inputMode, setInputMode] = useState<InputMode>("upload");

  const set = (key: keyof Slide, val: any) =>
    setData((d) => ({ ...d, [key]: val }));

  const handleUploaded = (url: string, type: SlideType) => {
    setData((d) => ({ ...d, url, type }));
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!data.url) return;
        await onSave({ ...data, order: Number(data.order ?? nextOrder) });
      }}
      className="bg-surface-container p-8 mb-8 space-y-6 rounded-DEFAULT ghost-border"
    >
      <h3 className="font-headline text-2xl text-on-surface font-light">{title}</h3>

      {/* Type + Order row */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className={LABEL_CLS}>Media Type</label>
          <select
            value={data.type ?? "image"}
            onChange={(e) => set("type", e.target.value as SlideType)}
            className={INPUT_CLS}
          >
            <option value="image">Image</option>
            <option value="video">Video (MP4)</option>
            <option value="youtube">YouTube</option>
          </select>
        </div>
        <div>
          <label className={LABEL_CLS}>Position / Order</label>
          <input
            type="number"
            min={1}
            value={data.order ?? nextOrder}
            onChange={(e) => set("order", Number(e.target.value))}
            className={INPUT_CLS}
          />
        </div>
      </div>

      {/* Input mode tabs — only for image/video */}
      {data.type !== "youtube" && (
        <div className="flex gap-1 bg-surface-container rounded-sm p-1 w-fit">
          {(["upload", "url"] as InputMode[]).map((m) => (
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
      )}

      {/* Upload zone or URL input */}
      {data.type === "youtube" ? (
        <div>
          <label className={LABEL_CLS}>YouTube URL</label>
          <input
            required
            value={data.url ?? ""}
            onChange={(e) => set("url", e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className={INPUT_CLS}
          />
        </div>
      ) : inputMode === "upload" ? (
        <UploadZone
          onUploaded={handleUploaded}
          accept={data.type === "video" ? "video/mp4,video/webm,video/mov" : "image/jpeg,image/png,image/webp,image/gif"}
        />
      ) : (
        <div>
          <label className={LABEL_CLS}>
            {data.type === "video" ? "Video URL (MP4 direct link)" : "Image URL"}
          </label>
          <input
            required
            value={data.url ?? ""}
            onChange={(e) => set("url", e.target.value)}
            placeholder={
              data.type === "video"
                ? "https://example.com/video.mp4"
                : "https://example.com/image.jpg"
            }
            className={INPUT_CLS}
          />
        </div>
      )}

      {/* Alt text */}
      {data.type !== "youtube" && (
        <div>
          <label className={LABEL_CLS}>Alt Text / Caption</label>
          <input
            value={data.alt ?? ""}
            onChange={(e) => set("alt", e.target.value)}
            placeholder="Describe the media (for accessibility and SEO)…"
            className={INPUT_CLS}
          />
        </div>
      )}

      {/* Preview */}
      {data.url && (
        <div>
          <label className={LABEL_CLS}>Preview</label>
          <Preview slide={data} />
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving || !data.url}
          className="bg-primary text-on-primary px-8 py-3 text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-all disabled:opacity-40"
        >
          {saving ? "Saving…" : "Save Slide"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-8 py-3 text-xs tracking-widest uppercase font-medium text-on-surface-variant border border-outline-variant/30 hover:border-on-surface-variant transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ─── Settings Editor ───────────────────────────────────────────────────────
function HeroSettingsEditor() {
  const [lang, setLang] = useState("en");
  const [settings, setSettings] = useState<any>({
    region: "",
    title: "",
    subtitle: "",
    description: "",
    autoplay_speed: 15,
    overlay_opacity: 40,
    overlay_style: "dark",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const fetchSettings = async (l: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/hero-settings?lang=${l}`);
      const data = await res.json();
      const rawSpeed = data.autoplay_speed || 15;
      setSettings({
        region: data.region || "",
        title: data.title || "",
        subtitle: data.subtitle || "",
        description: data.description || "",
        autoplay_speed: Math.min(30, Math.max(5, rawSpeed)),
        overlay_opacity: Math.min(100, Math.max(0, data.overlay_opacity ?? 40)),
        overlay_style: data.overlay_style || "dark",
      });
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
      const res = await fetch("/api/hero-settings", {
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

  return (
    <div className="bg-surface-container p-8 mb-12 rounded-DEFAULT ghost-border">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-headline text-2xl text-on-surface font-light">Hero Content & Appearance</h3>
        
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

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">

              <label className={LABEL_CLS}>Main Title (H1)</label>
              <input
                value={settings.title}
                onChange={(e) => setSettings({ ...settings, title: e.target.value })}
                placeholder="Space Organizers"
                className={INPUT_CLS}
              />
            </div>
            <div>
              <label className={LABEL_CLS}>Subtitle (Italicized)</label>
              <input
                value={settings.subtitle}
                onChange={(e) => setSettings({ ...settings, subtitle: e.target.value })}
                placeholder="Home organization, decluttering..."
                className={INPUT_CLS}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className={LABEL_CLS}>Description Paragraph</label>
              <textarea
                value={settings.description}
                onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                placeholder="Describe your services..."
                className={`${INPUT_CLS} h-32 resize-none`}
              />
            </div>

            {/* APPEARANCE CONTROLS */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-outline-variant/10">
               <div>
                  <label className={LABEL_CLS}>Overlay Mode</label>
                  <div className="flex gap-1 bg-surface-variant/20 rounded-sm p-1 mt-2">
                    {["dark", "light"].map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setSettings({ ...settings, overlay_style: mode })}
                        className={`flex-1 py-2 text-[10px] uppercase tracking-widest font-bold rounded-sm transition-all ${
                          settings.overlay_style === mode ? "bg-primary text-on-primary shadow-lg" : "text-on-surface-variant hover:text-on-surface"
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
               </div>
               <div>
                  <label className={LABEL_CLS}>Dimming Intensity ({settings.overlay_opacity}%)</label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    value={settings.overlay_opacity}
                    onChange={(e) => setSettings({ ...settings, overlay_opacity: Number(e.target.value) })}
                    className="w-full accent-primary mt-4"
                  />
                  <div className="flex justify-between text-[8px] tracking-widest uppercase text-on-surface-variant mt-2">
                    <span>Clear</span>
                    <span>Solid</span>
                  </div>
               </div>
            </div>

            <div className="pt-4 border-t border-outline-variant/10">
              <label className={LABEL_CLS}>Carousel Speed ({settings.autoplay_speed}s)</label>
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={settings.autoplay_speed}
                onChange={(e) => setSettings({ ...settings, autoplay_speed: Number(e.target.value) })}
                className="w-full accent-primary mt-4"
              />
              <div className="flex justify-between text-[8px] tracking-widest uppercase text-on-surface-variant mt-2">
                <span>Fast (5s)</span>
                <span>Slow (30s)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-outline-variant/10">
          <button
            type="submit"
            disabled={saving || loading}
            className="bg-primary text-on-primary px-10 py-3 text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-all disabled:opacity-40"
          >
            {saving ? "Saving..." : `Save ${lang.toUpperCase()} Content`}
          </button>
          {message && <span className="text-xs text-primary italic">{message}</span>}
        </div>
      </form>
    </div>
  );
}

// ─── Reorder Item ──────────────────────────────────────────────────────────
function ReorderSlideItem({ 
  slide, 
  onEdit, 
  onDelete,
  onConfirmDelete,
  onCancelDelete,
  isEditing,
  isSelected,
  onToggle,
  isConfirming,
}: { 
  slide: Slide; 
  onEdit: () => void; 
  onDelete: () => void;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
  isEditing: boolean;
  isSelected: boolean;
  onToggle: () => void;
  isConfirming: boolean;
}) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={slide}
      dragListener={false}
      dragControls={controls}
      className={`bg-surface ghost-border rounded-DEFAULT overflow-hidden transition-shadow ${isEditing ? "mb-8 ring-1 ring-primary/20" : ""} ${isSelected ? "ring-1 ring-primary" : ""}`}
    >
      <div className="flex gap-5 items-center p-4">
        {/* Checkbox */}
        <div className="flex-shrink-0 pl-1">
          <input 
            type="checkbox" 
            checked={isSelected}
            onChange={onToggle}
            className="w-4 h-4 rounded border-outline-variant/30 text-primary focus:ring-primary bg-transparent cursor-pointer"
          />
        </div>

        {/* Handle */}
        <div 
          className="cursor-grab active:cursor-grabbing p-2 text-on-surface-variant/30 hover:text-primary transition-colors"
          onPointerDown={(e) => controls.start(e)}
        >
          <GripVertical size={20} />
        </div>

        {/* Thumbnail */}
        <div className="w-36 h-24 flex-shrink-0 overflow-hidden rounded bg-surface-container">
          <Preview slide={slide} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-label text-[10px] tracking-[0.2em] uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-sm">
              {slide.type}
            </span>
            <span className="font-label text-[10px] text-on-surface-variant/40">
              Position #{slide.order}
            </span>
          </div>
          <p className="font-body text-sm text-on-surface truncate">{slide.url}</p>
          {slide.alt && (
            <p className="font-label text-[10px] text-on-surface-variant/50 mt-1 italic truncate">
              {slide.alt}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 flex-shrink-0 items-end">
          <button
            onClick={onEdit}
            className="text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-primary transition-colors"
          >
            Edit
          </button>
          {isConfirming ? (
            <span className="flex flex-col gap-1 items-end">
              <button onClick={onConfirmDelete} className="text-xs uppercase tracking-widest font-semibold text-white bg-red-500 px-3 py-1 hover:bg-red-600 transition-colors">Confirm?</button>
              <button onClick={onCancelDelete} className="text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-on-surface transition-colors">Cancel</button>
            </span>
          ) : (
            <button
              onClick={onDelete}
              className="text-xs uppercase tracking-widest font-semibold text-red-400 hover:text-red-600 transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </Reorder.Item>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function HeroAdmin() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const fetchSlides = () =>
    fetch("/api/hero")
      .then((r) => r.json())
      .then((data) =>
        setSlides([...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)))
      );

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleReorder = async (newOrder: Slide[]) => {
    // Update local state immediately for snappy feel
    const updated = newOrder.map((s, idx) => ({ ...s, order: idx + 1 }));
    setSlides(updated);

    // Save batches to DB
    try {
      await fetch("/api/hero", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          updates: updated.map(s => ({ id: s.id, order: s.order }))
        })
      });
    } catch (err) {
      console.error("Failed to persist reorder:", err);
    }
  };

  const handleAdd = async (data: Partial<Slide>) => {
    setSaving(true);
    await fetch("/api/hero", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setIsAdding(false);
    await fetchSlides();
    setSaving(false);
  };

  const handleEdit = async (id: string, data: Partial<Slide>) => {
    setSaving(true);
    await fetch(`/api/hero/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, order: Number(data.order ?? 1) }),
    });
    setEditingId(null);
    await fetchSlides();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/hero/${id}`, { method: "DELETE" });
    setConfirmingId(null);
    fetchSlides();
  };

  const handleBulkDelete = async () => {
    setSaving(true);
    await fetch("/api/hero", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: selectedIds }),
    });
    setSelectedIds([]);
    await fetchSlides();
    setSaving(false);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === slides.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(slides.map(s => s.id));
    }
  };

  const nextOrder = slides.length + 1;

  return (
    <div className="max-w-5xl pb-24 text-on-surface">
      {/* Page header */}
      <div className="flex justify-between items-end mb-12 border-b border-outline-variant/10 pb-6">
        <div>
          <h1 className="font-headline text-4xl text-on-surface mb-2 font-light">Hero Carousel</h1>
          <p className="font-body text-on-surface-variant text-sm">
            Drag slides to reorder, or upload new imagery and video for the homepage.
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleSelectAll} 
            className="text-[10px] uppercase tracking-[0.2em] font-semibold font-label py-3 px-4 rounded-sm border border-outline-variant/30 hover:border-on-surface-variant transition-all"
          >
            {selectedIds.length === slides.length && slides.length > 0 ? "Deselect All" : "Select All"}
          </button>
          <button
            onClick={() => {
              setIsAdding(!isAdding);
              setEditingId(null);
            }}
            className="bg-primary text-on-primary px-6 py-3 text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-all"
          >
            {isAdding ? "Cancel" : "+ Add Slide"}
          </button>
        </div>
      </div>

      {selectedIds.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/20 p-4 mb-8 flex items-center justify-between rounded-DEFAULT">
          <span className="text-sm font-medium text-red-400">
            {selectedIds.length} slides selected
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

      {/* Settings Editor */}
      <HeroSettingsEditor />

      {/* Add form */}
      {isAdding && (
        <SlideForm
          title="New Slide"
          initial={{}}
          onSave={handleAdd}
          onCancel={() => setIsAdding(false)}
          saving={saving}
          nextOrder={nextOrder}
        />
      )}

      {/* Reorderable Slides list */}
      <Reorder.Group axis="y" values={slides} onReorder={handleReorder} className="space-y-4">
        {slides.length === 0 && !isAdding && (
          <div className="py-20 text-center border-2 border-dashed border-outline-variant/20 rounded-DEFAULT">
            <p className="font-headline text-2xl font-light text-on-surface-variant/40 mb-2">No slides yet</p>
            <p className="font-body text-sm text-on-surface-variant/30 italic">
              Click + Add Slide to upload your first hero image or video.
            </p>
          </div>
        )}

        {slides.map((slide) => (
          <React.Fragment key={slide.id}>
            {editingId === slide.id ? (
              <div className="bg-surface-container p-6 rounded-DEFAULT border border-primary/20 mb-8">
                <SlideForm
                  title="Edit Slide"
                  initial={slide}
                  onSave={(d) => handleEdit(slide.id, d)}
                  onCancel={() => setEditingId(null)}
                  saving={saving}
                  nextOrder={slide.order}
                />
              </div>
            ) : (
              <ReorderSlideItem 
                slide={slide} 
                onEdit={() => { setEditingId(slide.id); setIsAdding(false); setConfirmingId(null); }}
                onDelete={() => setConfirmingId(slide.id)}
                onConfirmDelete={() => handleDelete(slide.id)}
                onCancelDelete={() => setConfirmingId(null)}
                isEditing={editingId === slide.id}
                isSelected={selectedIds.includes(slide.id)}
                onToggle={() => toggleSelect(slide.id)}
                isConfirming={confirmingId === slide.id}
              />
            )}
          </React.Fragment>
        ))}
      </Reorder.Group>
    </div>
  );
}
