"use client";
import React, { useEffect, useState } from "react";
import { Heading, Body } from "@/components/ui/Typography";

export default function SpacesAdmin() {
  const [spaces, setSpaces] = useState<any[]>([]);

  const fetchSpaces = () => fetch("/api/spaces").then(res => res.json()).then(setSpaces);

  useEffect(() => { fetchSpaces() }, []);

  const deleteSpace = async (id: string) => {
    if(confirm("Are you sure?")) {
      await fetch(`/api/spaces/${id}`, { method: "DELETE" });
      fetchSpaces();
    }
  };

  return (
    <div className="max-w-5xl">
       <div className="flex justify-between items-end mb-12 border-b border-charcoal/10 pb-6">
         <div>
           <Heading as="h1" className="text-4xl mb-2">Spaces</Heading>
           <Body className="text-charcoal/60 text-base">Manage the specific rooms and solutions offered.</Body>
         </div>
      </div>

      <div className="space-y-4">
        {spaces.map((space: any) => (
          <div key={space.id} className="bg-softwhite p-6 border border-charcoal/10 flex justify-between items-center group">
            <div>
              <h3 className="font-serif text-2xl text-charcoal mb-1">{space.title}</h3>
              <p className="font-sans text-sm text-charcoal/50">{space.slug}</p>
            </div>
            <button 
               onClick={() => deleteSpace(space.id)}
               className="text-red-500/50 hover:text-red-500 text-xs uppercase tracking-widest font-semibold transition-colors opacity-0 group-hover:opacity-100"
            >
              Remove
            </button>
          </div>
        ))}
        {spaces.length === 0 && <p className="text-charcoal/40 font-light italic">No spaces configured yet.</p>}
      </div>
    </div>
  );
}
