import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// We use the service role key to ensure we can create/update settings
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
      .from("hero_settings")
      .select("*")
      .eq("lang", lang)
      .single();

    if (error && error.code !== "PGRST116") { // PGRST116 is "no rows found"
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data || {});
  }

  const { data, error } = await supabase.from("hero_settings").select("*");
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
  const { lang, region, title, subtitle, description, autoplay_speed, overlay_opacity, overlay_style } = body;

  if (!lang) return NextResponse.json({ error: "Missing lang" }, { status: 400 });

  const supabase = createClient(url, key);

  const { data, error } = await supabase
    .from("hero_settings")
    .upsert({
      lang,
      region,
      title,
      subtitle,
      description,
      autoplay_speed: autoplay_speed ? Number(autoplay_speed) : undefined,
      overlay_opacity: overlay_opacity !== undefined ? Number(overlay_opacity) : undefined,
      overlay_style: overlay_style || "dark",
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    // If table doesn't exist, we might need to tell the user
    console.error("Hero Settings Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
