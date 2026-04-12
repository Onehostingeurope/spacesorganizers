"use client";
import React, { useEffect, useState } from "react";
import { Heading, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";

export default function SpacesAdmin() {
  const [spaces, setSpaces] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const fetchSpaces = () => fetch("/api/spaces").then(res => res.json()).then(setSpaces);
  useEffect(() => { fetchSpaces() }, []);

  const deleteSpace = async (id: string) => {
    if(confirm("Are you sure?")) {
      await fetch(`/api/spaces/${id}`, { method: "DELETE" });
      fetchSpaces();
    }
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newSpace = {
      title: formData.get("title"),
      slug: formData.get("title")?.toString().toLowerCase().replace(/\s+/g, '-'),
      pain: formData.get("pain"),
      solution: formData.get("solution"),
      image: "/images/hero-home-organization.png"
    };

    await fetch("/api/spaces", { method: "POST", body: JSON.stringify(newSpace) });
    setIsAdding(false);
    fetchSpaces();
  };

  return (
    <div className="max-w-5xl pb-24">
       <div className="flex justify-between items-end mb-12 border-b border-charcoal/10 pb-6">
         <div>
           <Heading as="h1" className="text-4xl mb-2">Spaces</Heading>
           <Body className="text-charcoal/60 text-base">Manage the specific rooms and solutions offered.</Body>
         </div>
         <Button onClick={() => setIsAdding(!isAdding)} variant="primary" size="sm">
            {isAdding ? "Cancel" : "Add New Space"}
         </Button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-charcoal/5 p-8 mb-12 space-y-6">
           <h3 className="font-serif text-2xl text-charcoal mb-4">Create Space</h3>
           <input required name="title" placeholder="Room/Space Title (e.g. Master Bath)" className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none" />
           <textarea required name="pain" placeholder="Pain points description" rows={2} className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none resize-none"></textarea>
           <textarea required name="solution" placeholder="Transformation/solution description" rows={2} className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none resize-none"></textarea>
           <Button type="submit">Save Space</Button>
        </form>
      )}

      <div className="space-y-4">
        {spaces.map((space: any) => (
          <div key={space.id} className="bg-softwhite p-6 border border-charcoal/10 flex justify-between items-center group">
            <div>
              <h3 className="font-serif text-2xl text-charcoal mb-1">{space.title}</h3>
              <p className="font-sans text-sm text-charcoal/50">{space.slug}</p>
            </div>
            <button onClick={() => deleteSpace(space.id)} className="text-red-500/50 hover:text-red-500 text-xs uppercase tracking-widest font-semibold transition-colors opacity-0 group-hover:opacity-100">Remove</button>
          </div>
        ))}
        {spaces.length === 0 && <p className="text-charcoal/40 font-light italic">No spaces configured yet.</p>}
      </div>
    </div>
  );
}
