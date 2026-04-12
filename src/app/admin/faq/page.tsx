"use client";
import React, { useEffect, useState } from "react";
import { Heading, Body } from "@/components/ui/Typography";

export default function FAQAdmin() {
  const [faqs, setFaqs] = useState<any[]>([]);

  const fetchFaqs = () => fetch("/api/faq").then(res => res.json()).then(setFaqs);

  useEffect(() => { fetchFaqs() }, []);

  const deleteFaq = async (id: string) => {
    if(confirm("Are you sure?")) {
      await fetch(`/api/faq/${id}`, { method: "DELETE" });
      fetchFaqs();
    }
  };

  return (
    <div className="max-w-5xl">
       <div className="flex justify-between items-end mb-12 border-b border-charcoal/10 pb-6">
         <div>
           <Heading as="h1" className="text-4xl mb-2">FAQ</Heading>
           <Body className="text-charcoal/60 text-base">Manage frequently asked questions.</Body>
         </div>
      </div>

      <div className="space-y-4">
        {faqs.map((faq: any) => (
          <div key={faq.id} className="bg-softwhite p-6 border border-charcoal/10 flex justify-between items-center group">
            <div className="max-w-2xl">
              <h3 className="font-serif text-xl text-charcoal mb-2">{faq.question}</h3>
              <p className="font-sans text-sm font-light text-charcoal/70 line-clamp-1">{faq.answer}</p>
            </div>
            <button 
               onClick={() => deleteFaq(faq.id)}
               className="text-red-500/50 hover:text-red-500 text-xs uppercase tracking-widest font-semibold transition-colors opacity-0 group-hover:opacity-100"
            >
              Remove
            </button>
          </div>
        ))}
        {faqs.length === 0 && <p className="text-charcoal/40 font-light italic">No FAQs configured yet.</p>}
      </div>
    </div>
  );
}
