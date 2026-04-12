"use client";
import React, { useEffect, useState } from "react";
import { Heading, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";

export default function ServicesAdmin() {
  const [services, setServices] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const fetchServices = () => fetch("/api/services").then(res => res.json()).then(setServices);

  useEffect(() => { fetchServices() }, []);

  const deleteService = async (id: string) => {
    if(confirm("Are you sure?")) {
      await fetch(`/api/services/${id}`, { method: "DELETE" });
      fetchServices();
    }
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newService = {
      title: formData.get("title"),
      slug: formData.get("title")?.toString().toLowerCase().replace(/\s+/g, '-'),
      description: formData.get("description"),
      intro: formData.get("intro"),
      idealClient: formData.get("idealClient"),
      image: "/images/consultation-lifestyle.png", // Hardcoded placeholder for MVP
      included: formData.get("included")?.toString().split(',').map(s => s.trim()) || []
    };

    await fetch("/api/services", {
      method: "POST",
      body: JSON.stringify(newService)
    });
    setIsAdding(false);
    fetchServices();
  };

  return (
    <div className="max-w-5xl pb-24">
       <div className="flex justify-between items-end mb-12 border-b border-charcoal/10 pb-6">
         <div>
           <Heading as="h1" className="text-4xl mb-2">Services</Heading>
           <Body className="text-charcoal/60 text-base">Manage the services offered on the spaces platform.</Body>
         </div>
         <Button onClick={() => setIsAdding(!isAdding)} variant="primary" size="sm">
            {isAdding ? "Cancel" : "Add New Service"}
         </Button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-charcoal/5 p-8 mb-12 space-y-6">
           <h3 className="font-serif text-2xl text-charcoal mb-4">Create Service</h3>
           <div className="grid grid-cols-2 gap-6">
             <input required name="title" placeholder="Service Title" className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none" />
             <input required name="intro" placeholder="Short Intro Statement" className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none" />
           </div>
           <textarea required name="description" placeholder="Full Description" rows={3} className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none resize-none"></textarea>
           <div className="grid grid-cols-2 gap-6">
             <input required name="included" placeholder="Included items (comma separated)" className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none" />
             <input required name="idealClient" placeholder="Ideal Client Description" className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none" />
           </div>
           <Button type="submit">Save Service</Button>
        </form>
      )}

      <div className="space-y-4">
        {services.map((service: any) => (
          <div key={service.id} className="bg-softwhite p-6 border border-charcoal/10 flex justify-between items-center group">
            <div>
              <h3 className="font-serif text-2xl text-charcoal mb-1">{service.title}</h3>
              <p className="font-sans text-sm text-charcoal/50">{service.slug}</p>
            </div>
            <button onClick={() => deleteService(service.id)} className="text-red-500/50 hover:text-red-500 text-xs uppercase tracking-widest font-semibold transition-colors opacity-0 group-hover:opacity-100">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
