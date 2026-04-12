import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang");
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
  const body = await request.json();
  const { lang, ...settings } = body;

  if (!lang) return NextResponse.json({ error: "Missing lang" }, { status: 400 });

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

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

  return NextResponse.json(data);
}
