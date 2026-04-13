"use client";
import React, { useRef, useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export type UploadedType = "image" | "video";

const LABEL_CLS =
  "font-label text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/60 mb-1 block";

export function UploadZone({
  onUploaded,
  accept = "image/*,video/mp4,video/webm",
  label = "Upload File",
  value,
  h,
}: {
  onUploaded: (url: string, type: UploadedType) => void;
  accept?: string;
  label?: string;
  value?: string;
  h?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState<string | null>(value || null);

  const upload = useCallback(
    async (file: File) => {
      setError(null);
      setUploaded(null);
      setProgress(10);

      try {
        // 1. Get a Signed Upload URL from our secure API
        const urlResponse = await fetch("/api/upload-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: file.name, fileType: file.type }),
        });

        if (!urlResponse.ok) {
          const errData = await urlResponse.json();
          throw new Error(errData.error || "Failed to get upload authorization");
        }

        const { signedUrl, path } = await urlResponse.json();
        setProgress(30);

        // 2. Perform the actual upload DIRECTLY to Supabase (bypassing Vercel proxy)
        const uploadResponse = await fetch(signedUrl, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type },
        });

        if (!uploadResponse.ok) {
          throw new Error("Direct upload failed. The file might be too large or the network was interrupted.");
        }

        setProgress(90);

        // 3. Get the public URL for the newly uploaded file
        const supabase = getSupabase();
        if (!supabase) throw new Error("Client-side storage configuration is missing");

        const { data: { publicUrl } } = supabase.storage
          .from("hero-media")
          .getPublicUrl(path);

        setUploaded(publicUrl);
        onUploaded(publicUrl, file.type.startsWith("video/") ? "video" : "image");
        setProgress(100);
        setTimeout(() => setProgress(null), 500);
      } catch (err: any) {
        console.error("Upload error:", err);
        setError(err.message || "Upload failed. Please try again.");
        setProgress(null);
      }
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
      <label className={LABEL_CLS}>{label}</label>

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`
          relative cursor-pointer border-2 border-dashed rounded-DEFAULT transition-all
          flex flex-col items-center justify-center gap-3 py-10 px-6 text-center
          ${h || ""}
          ${
            dragging
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
          <div className="w-full max-w-xs px-10">
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
          <div className="flex flex-col items-center gap-4 w-full h-full relative group">
            <img 
              src={uploaded} 
              alt="Preview" 
              className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity" 
            />
            <div className="z-10 bg-surface/80 p-4 rounded-full shadow-lg flex flex-col items-center gap-1">
              <span className="text-primary text-xl">✓</span>
              <p className="font-label text-[9px] text-primary tracking-[0.2em] uppercase font-bold">
                Replace File
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setUploaded(null);
                setProgress(null);
              }}
              className="z-10 absolute bottom-4 font-label text-[10px] uppercase tracking-widest text-on-surface-variant/50 hover:text-red-400 underline transition-colors"
            >
              Remove
            </button>
          </div>
        ) : (
          <>
            <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center">
              <svg
                className="w-6 h-6 text-on-surface-variant/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="font-body text-sm text-on-surface">
                <span className="text-primary font-medium">Click to choose</span> or drag
                &amp; drop
              </p>
              <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/40 mt-1">
                Max 200 MB
              </p>
            </div>
          </>
        )}
      </div>

      {error && <p className="mt-2 text-xs text-red-500 font-label">{error}</p>}
    </div>
  );
}
