"use client";
import React, { useRef, useState, useCallback } from "react";

export type UploadedType = "image" | "video";

const LABEL_CLS =
  "font-label text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/60 mb-1 block";

export function UploadZone({
  onUploaded,
  accept = "image/*,video/mp4,video/webm",
  label = "Upload File",
}: {
  onUploaded: (url: string, type: UploadedType) => void;
  accept?: string;
  label?: string;
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
            onUploaded(result.url, (result.type as UploadedType) ?? "image");
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
            <p className="font-label text-xs text-primary tracking-[0.15em] uppercase">
              Uploaded successfully
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setUploaded(null);
                setProgress(null);
              }}
              className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/50 hover:text-on-surface-variant underline"
            >
              Upload another
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
