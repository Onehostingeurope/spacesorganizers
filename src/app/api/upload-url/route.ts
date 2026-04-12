import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const BUCKET = "hero-media";

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const supabase = createClient(url, key);

  const { filename, fileType } = await request.json();

  if (!filename || !fileType) {
    return NextResponse.json({ error: "Missing filename or fileType" }, { status: 400 });
  }

  // Determine path
  const isVideo = fileType.startsWith("video/");
  const folder = isVideo ? "videos" : "images";
  const ext = filename.split(".").pop()?.toLowerCase() ?? "bin";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  // Ensure bucket exists
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some((b) => b.name === BUCKET);
  if (!exists) {
    await supabase.storage.createBucket(BUCKET, { public: true });
  }

  // Generate signed upload URL
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUploadUrl(path);

  if (error) {
    console.error("[upload-url] Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    signedUrl: data.signedUrl,
    token: data.token,
    path: data.path, // This is the final path in the storage
    fullPath: `${BUCKET}/${path}`
  });
}
