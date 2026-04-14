import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return NextResponse.json({ error: "Missing Supabase configuration" }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang");
  const supabase = createClient(url, key);

  if (lang) {
    const { data, error } = await supabase
      .from("homepage_settings")
      .select("*")
      .eq("lang", lang)
      .single();

    if (error && error.code !== "PGRST116") {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data || {});
  }

  const { data, error } = await supabase.from("homepage_settings").select("*");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return NextResponse.json({ error: "Missing Supabase configuration" }, { status: 500 });
  }

  const body = await request.json();
  const { lang, ...settings } = body;

  if (!lang) return NextResponse.json({ error: "Missing lang" }, { status: 400 });

  const supabase = createClient(url, key);

  const { data, error } = await supabase
    .from("homepage_settings")
    .upsert({
      lang,
      ...settings,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Homepage Settings Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Clear caches for the entire site to reflect homepage content changes
  revalidatePath("/", "layout");

  return NextResponse.json(data);
}
