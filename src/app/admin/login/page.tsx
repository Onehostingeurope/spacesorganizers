"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "spacesadmin") {
      document.cookie = "admin_session=authenticated; path=/; max-age=86400";
      router.push("/admin");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-sand flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-softwhite p-10 shadow-xl shadow-charcoal/5">
        <div className="text-center mb-10">
           <span className="font-sans uppercase text-xs tracking-[0.3em] font-medium text-charcoal/40 mb-4 block">Administration</span>
           <h1 className="font-serif text-4xl text-charcoal tracking-tight">Spaces CMS</h1>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest font-semibold text-charcoal/80">Admin Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-charcoal/20 py-3 focus:outline-none focus:border-charcoal transition-colors px-0 rounded-none text-charcoal"
              placeholder="Enter password"
            />
          </div>
          {error && <p className="text-red-500 text-xs tracking-wider uppercase mt-2">{error}</p>}
          <div className="pt-4">
             <Button variant="primary" className="w-full">Sign In</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
