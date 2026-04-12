"use client";
import React, { useEffect, useState } from "react";
import { Heading, Body } from "@/components/ui/Typography";

export default function LeadsAdmin() {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/leads").then(res => res.json()).then(setLeads);
  }, []);

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Date,Name,Email,Type,Message\n"
      + leads.map(l => `${new Date(l.createdAt).toLocaleDateString()},"${l.name}","${l.email}","${l.service}","${l.message}"`).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "spaces_leads.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="max-w-5xl">
      <div className="flex justify-between items-end mb-12 border-b border-charcoal/10 pb-6">
         <div>
           <Heading as="h1" className="text-4xl mb-2">Leads</Heading>
           <Body className="text-charcoal/60 text-base">Inquiries from the main website.</Body>
         </div>
         <button onClick={handleExport} className="px-6 py-2 bg-charcoal text-softwhite text-xs uppercase tracking-widest hover:bg-charcoal/80 transition-colors">
           Export CSV
         </button>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-charcoal/80 border-collapse">
          <thead>
            <tr className="border-b border-charcoal/20">
              <th className="py-4 font-sans text-xs uppercase tracking-widest font-semibold">Date</th>
              <th className="py-4 font-sans text-xs uppercase tracking-widest font-semibold">Client</th>
              <th className="py-4 font-sans text-xs uppercase tracking-widest font-semibold">Contact</th>
              <th className="py-4 font-sans text-xs uppercase tracking-widest font-semibold">Interest</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-charcoal/40 font-light">No leads found.</td>
              </tr>
            ) : (
              leads.map((lead: any) => (
                <tr key={lead.id} className="border-b border-charcoal/5 hover:bg-white/40 transition-colors">
                  <td className="py-4 font-light text-sm">{new Date(lead.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 font-medium">{lead.name}</td>
                  <td className="py-4 font-light text-sm">{lead.email}</td>
                  <td className="py-4 font-light text-sm capitalize">{lead.service}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
