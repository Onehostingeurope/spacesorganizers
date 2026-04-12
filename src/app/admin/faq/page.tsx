"use client";
import React, { useEffect, useState } from "react";
import { Heading, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { LangTabs } from "@/components/ui/LangTabs";

export default function FAQAdmin() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [lang, setLang] = useState("en");

  const fetchFaqs = () => fetch(`/api/faq?lang=${lang}`).then(res => res.json()).then(setFaqs);
  useEffect(() => { fetchFaqs() }, [lang]);

  const deleteFaq = async (id: string) => {
    await fetch(`/api/faq/${id}`, { method: "DELETE" });
    setConfirmingId(null);
    fetchFaqs();
  };

  const handleBulkDelete = async () => {
    setSaving(true);
    await fetch("/api/faq", {
      method: "DELETE",
      body: JSON.stringify({ ids: selectedIds }),
    });
    setSelectedIds([]);
    await fetchFaqs();
    setSaving(false);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === faqs.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(faqs.map(f => f.id));
    }
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newFaq = {
      question: formData.get("question"),
      answer: formData.get("answer")
    };

    await fetch("/api/faq", { method: "POST", body: JSON.stringify({ ...newFaq, lang }) });
    setIsAdding(false);
    fetchFaqs();
  };

  return (
    <div className="max-w-5xl pb-24">
       <div className="flex justify-between items-end mb-12 border-b border-charcoal/10 pb-6">
         <div>
           <Heading as="h1" className="text-4xl mb-2">FAQ</Heading>
           <Body className="text-charcoal/60 text-base">Manage frequently asked questions.</Body>
         </div>
         <div className="flex gap-4 items-center">
            <LangTabs value={lang} onChange={(l) => { setLang(l); setSelectedIds([]); setIsAdding(false); }} />
            <button 
              onClick={handleSelectAll} 
              className="text-[10px] uppercase tracking-[0.2em] font-semibold font-label py-3 px-4 rounded-sm border border-outline-variant/30 hover:border-on-surface-variant transition-all text-on-surface"
            >
              {selectedIds.length === faqs.length && faqs.length > 0 ? "Deselect All" : "Select All"}
            </button>
            <Button onClick={() => setIsAdding(!isAdding)} variant="primary" size="sm">
               {isAdding ? "Cancel" : "Add FAQ"}
            </Button>
          </div>
      </div>

      {selectedIds.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/20 p-4 mb-8 flex items-center justify-between rounded-DEFAULT">
          <span className="text-sm font-medium text-red-400">
            {selectedIds.length} items selected
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
        <form onSubmit={handleAdd} className="bg-charcoal/5 p-8 mb-12 space-y-6">
           <h3 className="font-serif text-2xl text-charcoal mb-4">Create FAQ</h3>
           <input required name="question" placeholder="Question" className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none" />
           <textarea required name="answer" placeholder="Answer" rows={3} className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none resize-none"></textarea>
           <Button type="submit">Save FAQ</Button>
        </form>
      )}

      <div className="space-y-4">
        {faqs.map((faq: any) => (
          <div key={faq.id} className="bg-surface p-6 border border-outline-variant/10 flex items-center gap-4 group rounded-DEFAULT shadow-sm">
            <input 
              type="checkbox" 
              checked={selectedIds.includes(faq.id)}
              onChange={() => toggleSelect(faq.id)}
              className="w-4 h-4 rounded border-outline-variant/30 text-primary focus:ring-primary bg-transparent cursor-pointer"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-headline text-xl text-on-surface mb-2">{faq.question}</h3>
              <p className="font-body text-sm font-light text-on-surface-variant line-clamp-1">{faq.answer}</p>
            </div>
            {confirmingId === faq.id ? (
              <span className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => deleteFaq(faq.id)} className="text-xs uppercase tracking-widest font-semibold text-white bg-red-500 px-3 py-1 hover:bg-red-600 transition-colors">Confirm?</button>
                <button onClick={() => setConfirmingId(null)} className="text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-on-surface transition-colors">Cancel</button>
              </span>
            ) : (
              <button onClick={() => setConfirmingId(faq.id)} className="text-red-400 hover:text-red-600 text-xs uppercase tracking-widest font-semibold transition-colors flex-shrink-0">Delete</button>
            )}
          </div>
        ))}
        {faqs.length === 0 && <p className="text-charcoal/40 font-light italic">No FAQs configured yet.</p>}
      </div>
    </div>
  );
}
