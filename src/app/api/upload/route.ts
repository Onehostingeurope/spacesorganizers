import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const BUCKET = "hero-media";
const MAX_SIZE_MB = 200;

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const supabase = createClient(url, key);

  // Parse multipart form
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Validate type
  const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "video/mp4", "video/webm", "video/mov"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: `File type '${file.type}' not allowed. Use JPEG, PNG, WebP, GIF, MP4, WebM, or MOV.` }, { status: 400 });
  }

  // Validate size
  const sizeMB = file.size / (1024 * 1024);
  if (sizeMB > MAX_SIZE_MB) {
    return NextResponse.json({ error: `File too large (${sizeMB.toFixed(1)} MB). Max is ${MAX_SIZE_MB} MB.` }, { status: 400 });
  }

  // Determine sub-folder
  const isVideo = file.type.startsWith("video/");
  const folder = isVideo ? "videos" : "images";
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  // Read as ArrayBuffer
  const buffer = await file.arrayBuffer();

  // Ensure bucket exists (create if missing)
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some((b) => b.name === BUCKET);
  if (!exists) {
    await supabase.storage.createBucket(BUCKET, { public: true, fileSizeLimit: MAX_SIZE_MB * 1024 * 1024 });
  }

  // Upload
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(filename, buffer, {
      contentType: file.type,
      upsert: false,
      cacheControl: "31536000",
    });

  if (uploadError) {
    console.error("[upload] Supabase storage error:", uploadError.message);
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  // Get public URL
  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(filename);
  const isVideoFile = file.type.startsWith("video/");

  return NextResponse.json({
    url: urlData.publicUrl,
    type: isVideoFile ? "video" : "image",
    filename,
    size: file.size,
  });
}
