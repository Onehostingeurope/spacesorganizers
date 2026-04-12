"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";

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

// ─── File Upload Zone ──────────────────────────────────────────────────────
function UploadZone({
  onUploaded,
  accept = "image/*,video/mp4,video/webm",
}: {
  onUploaded: (url: string, type: SlideType) => void;
  accept?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState<string | null>(null);

  const upload = useCallback(
    async (file: File) => {
      setError(null);
      setUploaded(null);
      setProgress(0);

      // Simulate initial progress while XHR runs
      const fd = new FormData();
      fd.append("file", file);

      return new Promise<void>((resolve) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            setProgress(Math.round((e.loaded / e.total) * 90));
          }
        };

        xhr.onload = () => {
          setProgress(100);
          if (xhr.status >= 200 && xhr.status < 300) {
            const result = JSON.parse(xhr.responseText);
            setUploaded(result.url);
            onUploaded(result.url, (result.type as SlideType) ?? "image");
          } else {
            try {
              const err = JSON.parse(xhr.responseText);
              setError(err.error ?? "Upload failed");
            } catch {
              setError("Upload failed");
            }
            setProgress(null);
          }
          resolve();
        };

        xhr.onerror = () => {
          setError("Network error during upload");
          setProgress(null);
          resolve();
        };

        xhr.open("POST", "/api/upload");
        xhr.send(fd);
      });
    },
    [onUploaded]
  );

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    upload(files[0]);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div>
      <label className={LABEL_CLS}>Upload File (image or video)</label>

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`
          relative cursor-pointer border-2 border-dashed rounded-DEFAULT transition-all
          flex flex-col items-center justify-center gap-3 py-10 px-6 text-center
          ${dragging
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-outline-variant/30 hover:border-primary/40 hover:bg-surface-container/50"
          }
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {progress !== null ? (
          <div className="w-full max-w-xs">
            <p className="font-label text-xs text-on-surface-variant mb-3">
              {progress < 100 ? `Uploading… ${progress}%` : "Processing…"}
            </p>
            <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : uploaded ? (
          <div className="flex flex-col items-center gap-2">
            <span className="text-primary text-2xl">✓</span>
            <p className="font-label text-xs text-primary tracking-[0.15em] uppercase">Uploaded successfully</p>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setUploaded(null); setProgress(null); }}
              className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/50 hover:text-on-surface-variant underline"
            >
              Upload another
            </button>
          </div>
        ) : (
          <>
            <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center">
              <svg className="w-6 h-6 text-on-surface-variant/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="font-body text-sm text-on-surface">
                <span className="text-primary font-medium">Click to choose</span> or drag &amp; drop
              </p>
              <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/40 mt-1">
                JPEG · PNG · WebP · GIF · MP4 · WebM — max 200 MB
              </p>
            </div>
          </>
        )}
      </div>

      {error && (
        <p className="mt-2 text-xs text-red-500 font-label">{error}</p>
      )}
    </div>
  );
}

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

// ─── Page ──────────────────────────────────────────────────────────────────
export default function HeroAdmin() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchSlides = () =>
    fetch("/api/hero")
      .then((r) => r.json())
      .then((data) =>
        setSlides([...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)))
      );

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleAdd = async (data: Partial<Slide>) => {
    setSaving(true);
    await fetch("/api/hero", { method: "POST", body: JSON.stringify(data) });
    setIsAdding(false);
    await fetchSlides();
    setSaving(false);
  };

  const handleEdit = async (id: string, data: Partial<Slide>) => {
    setSaving(true);
    await fetch(`/api/hero/${id}`, {
      method: "PUT",
      body: JSON.stringify({ ...data, order: Number(data.order ?? 1) }),
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

  const nextOrder = slides.length + 1;

  return (
    <div className="max-w-5xl pb-24">
      {/* Page header */}
      <div className="flex justify-between items-end mb-12 border-b border-outline-variant/10 pb-6">
        <div>
          <h1 className="font-headline text-4xl text-on-surface mb-2 font-light">Hero Carousel</h1>
          <p className="font-body text-on-surface-variant text-sm">
            Upload images &amp; videos or paste YouTube links — they appear on the homepage hero carousel.
          </p>
        </div>
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

      {/* Slides list */}
      <div className="space-y-4">
        {slides.length === 0 && !isAdding && (
          <div className="py-20 text-center border-2 border-dashed border-outline-variant/20 rounded-DEFAULT">
            <p className="font-headline text-2xl font-light text-on-surface-variant/40 mb-2">No slides yet</p>
            <p className="font-body text-sm text-on-surface-variant/30 italic">
              Click + Add Slide to upload your first hero image or video.
            </p>
          </div>
        )}

        {slides.map((slide) => (
          <div key={slide.id} className="bg-surface ghost-border rounded-DEFAULT overflow-hidden">
            {editingId === slide.id ? (
              <div className="p-6">
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
              <div className="flex gap-5 items-center p-4">
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
                    onClick={() => { setEditingId(slide.id); setIsAdding(false); }}
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
