"use client";
import React, { useEffect, useState } from "react";
import { Heading, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";

export default function TestimonialsAdmin() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const fetchReviews = () => fetch("/api/testimonials").then(res => res.json()).then(setReviews);
  useEffect(() => { fetchReviews() }, []);

  const deleteReview = async (id: string) => {
    if(confirm("Are you sure?")) {
      await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      fetchReviews();
    }
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newReview = {
      author: formData.get("author"),
      area: formData.get("area"),
      text: formData.get("text")
    };

    await fetch("/api/testimonials", { method: "POST", body: JSON.stringify(newReview) });
    setIsAdding(false);
    fetchReviews();
  };

  return (
    <div className="max-w-5xl pb-24">
       <div className="flex justify-between items-end mb-12 border-b border-charcoal/10 pb-6">
         <div>
           <Heading as="h1" className="text-4xl mb-2">Testimonials</Heading>
           <Body className="text-charcoal/60 text-base">Manage client praise and success stories.</Body>
         </div>
         <Button onClick={() => setIsAdding(!isAdding)} variant="primary" size="sm">
            {isAdding ? "Cancel" : "Add Testimonial"}
         </Button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-charcoal/5 p-8 mb-12 space-y-6">
           <h3 className="font-serif text-2xl text-charcoal mb-4">Create Testimonial</h3>
           <div className="grid grid-cols-2 gap-6">
             <input required name="author" placeholder="Client Name (e.g. Sarah M.)" className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none" />
             <input required name="area" placeholder="Project Area (e.g. Master Closet)" className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none" />
           </div>
           <textarea required name="text" placeholder="Client Quote" rows={3} className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none resize-none"></textarea>
           <Button type="submit">Save Testimonial</Button>
        </form>
      )}

      <div className="space-y-4">
        {reviews.map((rev: any) => (
          <div key={rev.id} className="bg-softwhite p-6 border border-charcoal/10 flex justify-between items-center group">
            <div className="max-w-xl">
              <h3 className="font-serif text-xl text-charcoal mb-2">{rev.author} <span className="font-sans text-xs text-charcoal/40 ml-2 uppercase tracking-widest">{rev.area}</span></h3>
              <p className="font-sans text-sm font-light text-charcoal/70 line-clamp-1">"{rev.text}"</p>
            </div>
            <button onClick={() => deleteReview(rev.id)} className="text-red-500/50 hover:text-red-500 text-xs uppercase tracking-widest font-semibold transition-colors opacity-0 group-hover:opacity-100">Remove</button>
          </div>
        ))}
        {reviews.length === 0 && <p className="text-charcoal/40 font-light italic">No testimonials configured yet.</p>}
      </div>
    </div>
  );
}
