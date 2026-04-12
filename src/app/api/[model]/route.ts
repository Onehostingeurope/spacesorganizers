import { NextResponse } from "next/server";
import { getCollection, insertRecord, type Model } from "@/lib/db";

const ALLOWED_MODELS: Model[] = ["services", "spaces", "portfolio", "testimonials", "blog", "faq", "leads", "hero"];

export async function GET(request: Request, { params }: { params: Promise<{ model: string }> }) {
  const model = (await params).model as Model;
  if (!ALLOWED_MODELS.includes(model)) return NextResponse.json({ error: "Invalid model" }, { status: 400 });

  try {
    const data = await getCollection(model);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ model: string }> }) {
  const model = (await params).model as Model;
  if (!ALLOWED_MODELS.includes(model)) return NextResponse.json({ error: "Invalid model" }, { status: 400 });

  try {
    const body = await request.json();
    const newRecord = await insertRecord(model, body);
    return NextResponse.json(newRecord, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to insert record" }, { status: 500 });
  }
}
