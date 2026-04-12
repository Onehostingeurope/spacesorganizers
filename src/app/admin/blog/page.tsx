"use client";
import React, { useEffect, useState } from "react";
import { Heading, Body } from "@/components/ui/Typography";

export default function BlogAdmin() {
  const [posts, setPosts] = useState<any[]>([]);

  const fetchPosts = () => fetch("/api/blog").then(res => res.json()).then(setPosts);

  useEffect(() => { fetchPosts() }, []);

  const deletePost = async (id: string) => {
    if(confirm("Are you sure?")) {
      await fetch(`/api/blog/${id}`, { method: "DELETE" });
      fetchPosts();
    }
  };

  return (
    <div className="max-w-5xl">
       <div className="flex justify-between items-end mb-12 border-b border-charcoal/10 pb-6">
         <div>
           <Heading as="h1" className="text-4xl mb-2">Blog</Heading>
           <Body className="text-charcoal/60 text-base">Manage aesthetic tips and industry articles.</Body>
         </div>
      </div>

      <div className="space-y-4">
        {posts.map((post: any) => (
          <div key={post.id} className="bg-softwhite p-6 border border-charcoal/10 flex justify-between items-center group">
            <div>
              <h3 className="font-serif text-2xl text-charcoal mb-1">{post.title}</h3>
              <p className="font-sans text-sm text-charcoal/50">{post.date}</p>
            </div>
            <button 
               onClick={() => deletePost(post.id)}
               className="text-red-500/50 hover:text-red-500 text-xs uppercase tracking-widest font-semibold transition-colors opacity-0 group-hover:opacity-100"
            >
              Remove
            </button>
          </div>
        ))}
        {posts.length === 0 && <p className="text-charcoal/40 font-light italic">No blog posts configured yet.</p>}
      </div>
    </div>
  );
}
