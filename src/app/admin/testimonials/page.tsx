"use client";
import React, { useEffect, useState } from "react";
import { Heading, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { LangTabs } from "@/components/ui/LangTabs";

export default function TestimonialsAdmin() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [lang, setLang] = useState("en");

  const fetchReviews = () => fetch(`/api/testimonials?lang=${lang}`).then(res => res.json()).then(setReviews);
  useEffect(() => { fetchReviews() }, [lang]);

  const deleteReview = async (id: string) => {
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    setConfirmingId(null);
    fetchReviews();
  };

  const handleBulkDelete = async () => {
    setSaving(true);
    await fetch("/api/testimonials", {
      method: "DELETE",
      body: JSON.stringify({ ids: selectedIds }),
    });
    setSelectedIds([]);
    await fetchReviews();
    setSaving(false);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === reviews.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(reviews.map(r => r.id));
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

    await fetch("/api/testimonials", { method: "POST", body: JSON.stringify({ ...newReview, lang }) });
    setIsAdding(false);
    fetchReviews();
  };

  const startEdit = (review: any) => {
    setEditingId(review.id);
    setEditData({ ...review });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    
    await fetch(`/api/testimonials/${editingId}`, {
      method: "PUT",
      body: JSON.stringify({ ...editData, lang }),
    });
    
    setEditingId(null);
    setEditData(null);
    fetchReviews();
  };

  return (
    <div className="max-w-5xl pb-24 text-on-surface">
       <div className="flex justify-between items-end mb-12 border-b border-outline-variant/10 pb-6">
         <div>
           <h1 className="font-headline text-4xl mb-2 font-light">Testimonials</h1>
           <p className="font-body text-on-surface-variant text-base">Manage client praise and success stories.</p>
         </div>
         <div className="flex gap-4 items-center">
            <button 
              onClick={handleSelectAll} 
              className="text-[10px] uppercase tracking-[0.2em] font-semibold font-label py-3 px-4 rounded-sm border border-outline-variant/30 hover:border-on-surface-variant transition-all text-on-surface"
            >
              {selectedIds.length === reviews.length && reviews.length > 0 ? "Deselect All" : "Select All"}
            </button>
            <LangTabs value={lang} onChange={(l) => { setLang(l); setSelectedIds([]); setEditingId(null); setIsAdding(false); }} />
            <Button onClick={() => { setIsAdding(!isAdding); setEditingId(null); }} variant="primary">
               {isAdding ? "Cancel" : "Add Testimonial"}
            </Button>
          </div>
      </div>

      {selectedIds.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/20 p-4 mb-8 flex items-center justify-between rounded-DEFAULT">
          <span className="text-sm font-medium text-red-400">
            {selectedIds.length} testimonials selected
          </span>
          <button 
            onClick={handleBulkDelete}
            disabled={saving}
            className="bg-red-500 text-white px-4 py-2 text-[10px] uppercase tracking-widest font-bold hover:bg-red-600 transition-all disabled:opacity-50"
          >
            Delete Selected
          </button>
        </div>
      )}

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-surface-container p-8 mb-12 space-y-6 rounded-DEFAULT ghost-border">
           <h3 className="font-headline text-2xl text-on-surface mb-4 font-light">Create Testimonial</h3>
           <div className="grid grid-cols-2 gap-6">
             <input required name="author" placeholder="Client Name (e.g. Sarah M.)" className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/40" />
             <input required name="area" placeholder="Project Area (e.g. Master Closet)" className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/40" />
           </div>
           <textarea required name="text" placeholder="Client Quote" rows={3} className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/40 resize-none"></textarea>
           <Button type="submit">Save Testimonial</Button>
        </form>
      )}

      <div className="space-y-4">
        {reviews.map((rev: any) => (
          <div key={rev.id} className="bg-surface ghost-border rounded-DEFAULT overflow-hidden">
            {editingId === rev.id ? (
              <form onSubmit={handleUpdate} className="p-8 space-y-6">
                <h3 className="font-headline text-2xl text-on-surface mb-4 font-light">Edit Testimonial</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="font-label text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/60 mb-1 block">Author</label>
                    <input 
                      required 
                      value={editData.author} 
                      onChange={e => setEditData({...editData, author: e.target.value})} 
                      className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="font-label text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/60 mb-1 block">Area</label>
                    <input 
                      required 
                      value={editData.area} 
                      onChange={e => setEditData({...editData, area: e.target.value})} 
                      className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm focus:outline-none" 
                    />
                  </div>
                </div>
                <div>
                  <label className="font-label text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/60 mb-1 block">Quote Text</label>
                  <textarea 
                    required 
                    value={editData.text} 
                    onChange={e => setEditData({...editData, text: e.target.value})} 
                    rows={3} 
                    className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm focus:outline-none resize-none"
                  ></textarea>
                </div>
                <div className="flex gap-3">
                  <Button type="submit">Update Testimonial</Button>
                  <Button type="button" variant="secondary" onClick={() => setEditingId(null)}>Cancel</Button>
                </div>
              </form>
            ) : (
              <div className="flex gap-5 items-center p-6 group">
                <input 
                  type="checkbox" 
                  checked={selectedIds.includes(rev.id)}
                  onChange={() => toggleSelect(rev.id)}
                  className="w-4 h-4 rounded border-outline-variant/30 text-primary focus:ring-primary bg-transparent cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-headline text-xl text-on-surface mb-2 font-light">
                    {rev.author} 
                    <span className="font-label text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-sm ml-3 uppercase tracking-widest">
                      {rev.area}
                    </span>
                  </h3>
                  <p className="font-body text-sm text-on-surface-variant italic leading-relaxed">&ldquo;{rev.text}&rdquo;</p>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0 items-end">
                  <button 
                    onClick={() => startEdit(rev)} 
                    className="text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-primary transition-colors"
                  >
                    Edit
                  </button>
                  {confirmingId === rev.id ? (
                    <span className="flex flex-col gap-2 items-end">
                      <button onClick={() => deleteReview(rev.id)} className="text-xs uppercase tracking-widest font-semibold text-white bg-red-500 px-3 py-1 hover:bg-red-600 transition-colors">Confirm?</button>
                      <button onClick={() => setConfirmingId(null)} className="text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-on-surface transition-colors">Cancel</button>
                    </span>
                  ) : (
                    <button onClick={() => setConfirmingId(rev.id)} className="text-xs uppercase tracking-widest font-semibold text-red-400 hover:text-red-600 transition-colors">Delete</button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        {reviews.length === 0 && !isAdding && (
          <div className="py-20 text-center border-2 border-dashed border-outline-variant/20 rounded-DEFAULT">
            <p className="font-headline text-2xl font-light text-on-surface-variant/40">No testimonials yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
