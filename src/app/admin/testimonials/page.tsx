"use client";
import React, { useEffect, useState } from "react";
import { Heading, Body } from "@/components/ui/Typography";

export default function TestimonialsAdmin() {
  const [reviews, setReviews] = useState<any[]>([]);

  const fetchReviews = () => fetch("/api/testimonials").then(res => res.json()).then(setReviews);

  useEffect(() => { fetchReviews() }, []);

  const deleteReview = async (id: string) => {
    if(confirm("Are you sure?")) {
      await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      fetchReviews();
    }
  };

  return (
    <div className="max-w-5xl">
       <div className="flex justify-between items-end mb-12 border-b border-charcoal/10 pb-6">
         <div>
           <Heading as="h1" className="text-4xl mb-2">Testimonials</Heading>
           <Body className="text-charcoal/60 text-base">Manage client praise and success stories.</Body>
         </div>
      </div>

      <div className="space-y-4">
        {reviews.map((rev: any) => (
          <div key={rev.id} className="bg-softwhite p-6 border border-charcoal/10 flex justify-between items-center group">
            <div className="max-w-xl">
              <h3 className="font-serif text-xl text-charcoal mb-2">{rev.author} <span className="font-sans text-xs text-charcoal/40 ml-2 uppercase tracking-widest">{rev.area}</span></h3>
              <p className="font-sans text-sm font-light text-charcoal/70 line-clamp-1">"{rev.text}"</p>
            </div>
            <button 
               onClick={() => deleteReview(rev.id)}
               className="text-red-500/50 hover:text-red-500 text-xs uppercase tracking-widest font-semibold transition-colors opacity-0 group-hover:opacity-100"
            >
              Remove
            </button>
          </div>
        ))}
        {reviews.length === 0 && <p className="text-charcoal/40 font-light italic">No testimonials configured yet.</p>}
      </div>
    </div>
  );
}
