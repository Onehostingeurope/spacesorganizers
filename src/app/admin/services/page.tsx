"use client";
import React, { useEffect, useState } from "react";
import { Heading, Body } from "@/components/ui/Typography";

export default function ServicesAdmin() {
  const [services, setServices] = useState<any[]>([]);

  const fetchServices = () => fetch("/api/services").then(res => res.json()).then(setServices);

  useEffect(() => { fetchServices() }, []);

  const deleteService = async (id: string) => {
    if(confirm("Are you sure?")) {
      await fetch(`/api/services/${id}`, { method: "DELETE" });
      fetchServices();
    }
  };

  return (
    <div className="max-w-5xl">
       <div className="flex justify-between items-end mb-12 border-b border-charcoal/10 pb-6">
         <div>
           <Heading as="h1" className="text-4xl mb-2">Services</Heading>
           <Body className="text-charcoal/60 text-base">Manage the services offered on the spaces platform.</Body>
         </div>
      </div>

      <div className="space-y-4">
        {services.map((service: any) => (
          <div key={service.id} className="bg-softwhite p-6 border border-charcoal/10 flex justify-between items-center group">
            <div>
              <h3 className="font-serif text-2xl text-charcoal mb-1">{service.title}</h3>
              <p className="font-sans text-sm text-charcoal/50">{service.slug}</p>
            </div>
            <button 
               onClick={() => deleteService(service.id)}
               className="text-red-500/50 hover:text-red-500 text-xs uppercase tracking-widest font-semibold transition-colors opacity-0 group-hover:opacity-100"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
