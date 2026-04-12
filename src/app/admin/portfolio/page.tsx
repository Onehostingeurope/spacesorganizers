"use client";
import React, { useEffect, useState } from "react";
import { Heading, Body } from "@/components/ui/Typography";

export default function PortfolioAdmin() {
  const [projects, setProjects] = useState<any[]>([]);

  const fetchProjects = () => fetch("/api/portfolio").then(res => res.json()).then(setProjects);

  useEffect(() => { fetchProjects() }, []);

  const deleteProject = async (id: string) => {
    if(confirm("Are you sure?")) {
      await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
      fetchProjects();
    }
  };

  return (
    <div className="max-w-5xl">
       <div className="flex justify-between items-end mb-12 border-b border-charcoal/10 pb-6">
         <div>
           <Heading as="h1" className="text-4xl mb-2">Portfolio</Heading>
           <Body className="text-charcoal/60 text-base">Manage showcased organization projects.</Body>
         </div>
      </div>

      <div className="space-y-4">
        {projects.map((proj: any) => (
          <div key={proj.id} className="bg-softwhite p-6 border border-charcoal/10 flex justify-between items-center group">
            <div>
              <h3 className="font-serif text-2xl text-charcoal mb-1">{proj.title}</h3>
              <p className="font-sans text-sm text-charcoal/50">{proj.category}</p>
            </div>
            <button 
               onClick={() => deleteProject(proj.id)}
               className="text-red-500/50 hover:text-red-500 text-xs uppercase tracking-widest font-semibold transition-colors opacity-0 group-hover:opacity-100"
            >
              Remove
            </button>
          </div>
        ))}
        {projects.length === 0 && <p className="text-charcoal/40 font-light italic">No portfolio projects configured yet.</p>}
      </div>
    </div>
  );
}
