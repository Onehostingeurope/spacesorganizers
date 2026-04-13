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
      .order("updated_at", { ascending: false })
      .limit(1);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json((data && data.length > 0) ? data[0] : {});
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

  const payload = {
    lang,
    region,
    title,
    subtitle,
    description,
    autoplay_speed: autoplay_speed ? Number(autoplay_speed) : undefined,
    overlay_opacity: overlay_opacity !== undefined ? Number(overlay_opacity) : undefined,
    overlay_style: overlay_style || "dark",
    updated_at: new Date().toISOString(),
  };

  // Delete all existing for this lang to clear duplicates and missing ID constraints
  await supabase.from("hero_settings").delete().eq("lang", lang);

  // Insert fresh row
  const { data: resultData, error: resultError } = await supabase
    .from("hero_settings")
    .insert([payload])
    .select()
    .single();

  if (resultError) {
    console.error("Hero Settings Error:", resultError);
    return NextResponse.json({ error: resultError.message }, { status: 500 });
  }

  return NextResponse.json(resultData);
}
