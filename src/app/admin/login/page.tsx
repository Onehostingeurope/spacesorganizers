"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (password === "spacesadmin") {
      document.cookie = "admin_session=authenticated; path=/; max-age=86400";
      router.push("/admin");
    } else {
      setError("Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-surface-container p-10 shadow-ambient ghost-border rounded-DEFAULT">
        <div className="text-center mb-10">
          <span className="font-label uppercase text-[10px] tracking-[0.3em] font-medium text-on-surface-variant/50 mb-4 block">
            Administration
          </span>
          <h1 className="font-headline text-4xl text-on-surface font-light tracking-tight">
            Space Organizers
          </h1>
          <p className="font-label text-[10px] tracking-[0.2em] uppercase text-primary mt-2">
            CMS Platform
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block font-label text-[10px] uppercase tracking-[0.2em] font-semibold text-on-surface-variant/70">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              autoFocus
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full bg-transparent border-b border-outline-variant/30 py-3 focus:outline-none focus:border-primary transition-colors text-on-surface font-body text-sm"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <p className="text-red-500 font-label text-[10px] tracking-widest uppercase">
              {error}
            </p>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-primary text-on-primary py-4 font-label text-[10px] tracking-[0.3em] uppercase font-medium hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
