"use client";
import React, { useEffect, useState } from "react";
import { Heading, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { LangTabs } from "@/components/ui/LangTabs";

export default function BlogAdmin() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [lang, setLang] = useState("en");

  const fetchPosts = () => fetch(`/api/blog?lang=${lang}`).then(res => res.json()).then(setPosts);
  useEffect(() => { fetchPosts() }, [lang]);

  const deletePost = async (id: string) => {
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    setConfirmingId(null);
    fetchPosts();
  };

  const handleBulkDelete = async () => {
    setSaving(true);
    await fetch("/api/blog", {
      method: "DELETE",
      body: JSON.stringify({ ids: selectedIds }),
    });
    setSelectedIds([]);
    await fetchPosts();
    setSaving(false);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === posts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(posts.map(p => p.id));
    }
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPost = {
      title: formData.get("title"),
      slug: formData.get("title")?.toString().toLowerCase().replace(/\s+/g, '-'),
      category: formData.get("category"),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      excerpt: formData.get("excerpt"),
      content: formData.get("content")
    };

    await fetch("/api/blog", { method: "POST", body: JSON.stringify({ ...newPost, lang }) });
    setIsAdding(false);
    fetchPosts();
  };

  return (
    <div className="max-w-5xl pb-24">
       <div className="flex justify-between items-end mb-12 border-b border-charcoal/10 pb-6">
         <div>
           <Heading as="h1" className="text-4xl mb-2">Blog</Heading>
           <Body className="text-charcoal/60 text-base">Manage aesthetic tips and industry articles.</Body>
         </div>
         <div className="flex gap-4 items-center">
            <LangTabs value={lang} onChange={(l) => { setLang(l); setSelectedIds([]); setIsAdding(false); }} />
            <button 
              onClick={handleSelectAll} 
              className="text-[10px] uppercase tracking-[0.2em] font-semibold font-label py-3 px-4 rounded-sm border border-outline-variant/30 hover:border-on-surface-variant transition-all text-on-surface"
            >
              {selectedIds.length === posts.length && posts.length > 0 ? "Deselect All" : "Select All"}
            </button>
            <Button onClick={() => setIsAdding(!isAdding)} variant="primary" size="sm">
               {isAdding ? "Cancel" : "Add Post"}
            </Button>
          </div>
      </div>

      {selectedIds.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/20 p-4 mb-8 flex items-center justify-between rounded-DEFAULT">
          <span className="text-sm font-medium text-red-400">
            {selectedIds.length} posts selected
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
           <h3 className="font-serif text-2xl text-charcoal mb-4">Create Blog Post</h3>
           <div className="grid grid-cols-2 gap-6">
             <input required name="title" placeholder="Post Title" className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none" />
             <input required name="category" placeholder="Category" className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none" />
           </div>
           <textarea required name="excerpt" placeholder="Short Excerpt" rows={2} className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none resize-none"></textarea>
           <textarea required name="content" placeholder="Full Markdown/HTML Content" rows={6} className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none resize-none"></textarea>
           <Button type="submit">Publish Post</Button>
        </form>
      )}

      <div className="space-y-4">
        {posts.map((post: any) => (
          <div key={post.id} className="bg-surface p-6 border border-outline-variant/10 flex items-center gap-4 group rounded-DEFAULT shadow-sm">
            <input 
              type="checkbox" 
              checked={selectedIds.includes(post.id)}
              onChange={() => toggleSelect(post.id)}
              className="w-4 h-4 rounded border-outline-variant/30 text-primary focus:ring-primary bg-transparent cursor-pointer"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-headline text-2xl text-on-surface mb-1 font-light">{post.title}</h3>
              <p className="font-body text-sm text-on-surface-variant/50">{post.date}</p>
            </div>
            {confirmingId === post.id ? (
              <span className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => deletePost(post.id)} className="text-xs uppercase tracking-widest font-semibold text-white bg-red-500 px-3 py-1 hover:bg-red-600 transition-colors">Confirm?</button>
                <button onClick={() => setConfirmingId(null)} className="text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-on-surface transition-colors">Cancel</button>
              </span>
            ) : (
              <button onClick={() => setConfirmingId(post.id)} className="text-red-400 hover:text-red-600 text-xs uppercase tracking-widest font-semibold transition-colors flex-shrink-0">Delete</button>
            )}
          </div>
        ))}
        {posts.length === 0 && <p className="text-charcoal/40 font-light italic">No blog posts configured yet.</p>}
      </div>
    </div>
  );
}
