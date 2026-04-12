"use client";
import React, { useEffect, useState } from "react";
import { Heading, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";

export default function BlogAdmin() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const fetchPosts = () => fetch("/api/blog").then(res => res.json()).then(setPosts);
  useEffect(() => { fetchPosts() }, []);

  const deletePost = async (id: string) => {
    if(confirm("Are you sure?")) {
      await fetch(`/api/blog/${id}`, { method: "DELETE" });
      fetchPosts();
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

    await fetch("/api/blog", { method: "POST", body: JSON.stringify(newPost) });
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
         <Button onClick={() => setIsAdding(!isAdding)} variant="primary" size="sm">
            {isAdding ? "Cancel" : "Add Post"}
         </Button>
      </div>

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
          <div key={post.id} className="bg-softwhite p-6 border border-charcoal/10 flex justify-between items-center group">
            <div>
              <h3 className="font-serif text-2xl text-charcoal mb-1">{post.title}</h3>
              <p className="font-sans text-sm text-charcoal/50">{post.date}</p>
            </div>
            <button onClick={() => deletePost(post.id)} className="text-red-500/50 hover:text-red-500 text-xs uppercase tracking-widest font-semibold transition-colors opacity-0 group-hover:opacity-100">Remove</button>
          </div>
        ))}
        {posts.length === 0 && <p className="text-charcoal/40 font-light italic">No blog posts configured yet.</p>}
      </div>
    </div>
  );
}
