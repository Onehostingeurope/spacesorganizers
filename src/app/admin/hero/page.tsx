"use client";
import React, { useEffect, useState } from "react";

type SlideType = "image" | "video" | "youtube";

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

const INPUT_CLS = "w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/40";
const LABEL_CLS = "font-label text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/60 mb-1 block";

export default function HeroAdmin() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Slide>>({});
  const [newSlide, setNewSlide] = useState<Partial<Slide>>({ type: "image", order: 1 });
  const [saving, setSaving] = useState(false);

  const fetchSlides = () =>
    fetch("/api/hero")
      .then((r) => r.json())
      .then((data) => setSlides([...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))));

  useEffect(() => { fetchSlides(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/hero", {
      method: "POST",
      body: JSON.stringify({
        ...newSlide,
        order: Number(newSlide.order ?? slides.length + 1),
      }),
    });
    setIsAdding(false);
    setNewSlide({ type: "image", order: slides.length + 2 });
    await fetchSlides();
    setSaving(false);
  };

  const handleEdit = async (id: string) => {
    setSaving(true);
    await fetch(`/api/hero/${id}`, {
      method: "PUT",
      body: JSON.stringify({ ...editData, order: Number(editData.order ?? 1) }),
    });
    setEditingId(null);
    await fetchSlides();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this slide?")) return;
    await fetch(`/api/hero/${id}`, { method: "DELETE" });
    fetchSlides();
  };

  const startEdit = (slide: Slide) => {
    setEditingId(slide.id);
    setEditData({ ...slide });
  };

  const preview = (slide: Partial<Slide>) => {
    if (!slide.url) return null;
    if (slide.type === "youtube") {
      const thumb = getYouTubeThumb(slide.url);
      return thumb ? (
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={thumb} alt="YouTube thumb" className="w-full h-32 object-cover rounded" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded">
            <span className="text-white text-4xl">▶</span>
          </div>
        </div>
      ) : null;
    }
    if (slide.type === "video") {
      return (
        <video src={slide.url} muted className="w-full h-32 object-cover rounded" />
      );
    }
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={slide.url} alt={slide.alt ?? ""} className="w-full h-32 object-cover rounded" />;
  };

  return (
    <div className="max-w-5xl pb-24">
      {/* Header */}
      <div className="flex justify-between items-end mb-12 border-b border-outline-variant/10 pb-6">
        <div>
          <h1 className="font-headline text-4xl text-on-surface mb-2 font-light">Hero Carousel</h1>
          <p className="font-body text-on-surface-variant text-sm">
            Manage the homepage hero slides — images, MP4 videos, or YouTube links.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-on-primary px-6 py-3 text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-all"
        >
          {isAdding ? "Cancel" : "+ Add Slide"}
        </button>
      </div>

      {/* ADD FORM */}
      {isAdding && (
        <form onSubmit={handleAdd} className="bg-surface-container p-8 mb-12 space-y-6 rounded-DEFAULT ghost-border">
          <h3 className="font-headline text-2xl text-on-surface font-light mb-2">New Slide</h3>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className={LABEL_CLS}>Type</label>
              <select
                value={newSlide.type}
                onChange={(e) => setNewSlide({ ...newSlide, type: e.target.value as SlideType })}
                className={INPUT_CLS}
              >
                <option value="image">Image (URL)</option>
                <option value="video">Video (MP4 URL)</option>
                <option value="youtube">YouTube Link</option>
              </select>
            </div>
            <div>
              <label className={LABEL_CLS}>Order / Position</label>
              <input
                type="number"
                value={newSlide.order ?? ""}
                onChange={(e) => setNewSlide({ ...newSlide, order: Number(e.target.value) })}
                placeholder="1"
                className={INPUT_CLS}
              />
            </div>
          </div>

          <div>
            <label className={LABEL_CLS}>
              {newSlide.type === "youtube"
                ? "YouTube URL (e.g. https://youtube.com/watch?v=...)"
                : newSlide.type === "video"
                ? "Video URL (direct MP4 link)"
                : "Image URL (direct link or /images/filename.jpg)"}
            </label>
            <input
              required
              value={newSlide.url ?? ""}
              onChange={(e) => setNewSlide({ ...newSlide, url: e.target.value })}
              placeholder={
                newSlide.type === "youtube"
                  ? "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  : newSlide.type === "video"
                  ? "https://example.com/video.mp4"
                  : "https://example.com/image.jpg"
              }
              className={INPUT_CLS}
            />
          </div>

          <div>
            <label className={LABEL_CLS}>Alt Text (for images)</label>
            <input
              value={newSlide.alt ?? ""}
              onChange={(e) => setNewSlide({ ...newSlide, alt: e.target.value })}
              placeholder="Describe the image..."
              className={INPUT_CLS}
            />
          </div>

          {/* Preview */}
          {newSlide.url && (
            <div>
              <label className={LABEL_CLS}>Preview</label>
              {preview(newSlide)}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="bg-primary text-on-primary px-8 py-3 text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {saving ? "Saving..." : "Add Slide"}
          </button>
        </form>
      )}

      {/* SLIDES LIST */}
      <div className="space-y-4">
        {slides.length === 0 && (
          <p className="text-on-surface-variant/50 italic text-sm">No hero slides yet. Add your first slide above.</p>
        )}
        {slides.map((slide) => (
          <div key={slide.id} className="bg-surface ghost-border rounded-DEFAULT overflow-hidden">
            {editingId === slide.id ? (
              /* EDIT FORM */
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className={LABEL_CLS}>Type</label>
                    <select
                      value={editData.type ?? slide.type}
                      onChange={(e) => setEditData({ ...editData, type: e.target.value as SlideType })}
                      className={INPUT_CLS}
                    >
                      <option value="image">Image (URL)</option>
                      <option value="video">Video (MP4 URL)</option>
                      <option value="youtube">YouTube Link</option>
                    </select>
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Order</label>
                    <input
                      type="number"
                      value={editData.order ?? slide.order}
                      onChange={(e) => setEditData({ ...editData, order: Number(e.target.value) })}
                      className={INPUT_CLS}
                    />
                  </div>
                </div>
                <div>
                  <label className={LABEL_CLS}>URL</label>
                  <input
                    value={editData.url ?? slide.url}
                    onChange={(e) => setEditData({ ...editData, url: e.target.value })}
                    className={INPUT_CLS}
                  />
                </div>
                <div>
                  <label className={LABEL_CLS}>Alt Text</label>
                  <input
                    value={editData.alt ?? slide.alt ?? ""}
                    onChange={(e) => setEditData({ ...editData, alt: e.target.value })}
                    className={INPUT_CLS}
                  />
                </div>
                {editData.url && <div>{preview(editData)}</div>}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => handleEdit(slide.id)}
                    disabled={saving}
                    className="bg-primary text-on-primary px-6 py-2 text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-all disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-6 py-2 text-xs tracking-widest uppercase font-medium text-on-surface-variant border border-outline-variant/30 hover:border-on-surface-variant transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* DISPLAY ROW */
              <div className="flex gap-6 items-center p-4">
                <div className="w-32 h-20 flex-shrink-0 overflow-hidden rounded bg-surface-container">
                  {preview(slide) ?? (
                    <div className="w-full h-full flex items-center justify-center text-on-surface-variant/30 text-xs">
                      No preview
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-label text-[10px] tracking-[0.2em] uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-sm">
                      {slide.type}
                    </span>
                    <span className="font-label text-[10px] text-on-surface-variant/50">#{slide.order}</span>
                  </div>
                  <p className="font-body text-sm text-on-surface truncate">{slide.url}</p>
                  {slide.alt && (
                    <p className="font-label text-[10px] text-on-surface-variant/50 mt-1 truncate">{slide.alt}</p>
                  )}
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <button
                    onClick={() => startEdit(slide)}
                    className="text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-primary transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(slide.id)}
                    className="text-xs uppercase tracking-widest font-semibold text-red-400 hover:text-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
