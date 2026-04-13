import { NextResponse } from "next/server";
import { getCollection, insertRecord, deleteRecords, type Model } from "@/lib/db";

const ALLOWED_MODELS: Model[] = ["services", "spaces", "portfolio", "testimonials", "blog", "faq", "leads", "hero"];

export async function GET(request: Request, { params }: { params: Promise<{ model: string }> }) {
  const model = (await params).model as Model;
  if (!ALLOWED_MODELS.includes(model)) return NextResponse.json({ error: "Invalid model" }, { status: 400 });

  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang") ?? undefined;
    const data = await getCollection(model, lang);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

function cleanInput(obj: any): any {
  if (typeof obj === "string") {
    // Replace literal &nbsp; and actual Unicode non-breaking space \u00A0
    return obj.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
  }
  if (Array.isArray(obj)) return obj.map(cleanInput);
  if (typeof obj === "object" && obj !== null) {
    const newObj: any = {};
    for (const key in obj) {
      newObj[key] = cleanInput(obj[key]);
    }
    return newObj;
  }
  return obj;
}

export async function POST(request: Request, { params }: { params: Promise<{ model: string }> }) {
  const model = (await params).model as Model;
  if (!ALLOWED_MODELS.includes(model)) return NextResponse.json({ error: "Invalid model" }, { status: 400 });

  try {
    const rawBody = await request.json();
    const body = cleanInput(rawBody);
    const newRecord = await insertRecord(model, body);
    return NextResponse.json(newRecord, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to insert record" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ model: string }> }) {
  const model = (await params).model as Model;
  if (!ALLOWED_MODELS.includes(model)) return NextResponse.json({ error: "Invalid model" }, { status: 400 });

  try {
    const rawData = await request.json(); 
    const updates = cleanInput(rawData.updates);
    if (!Array.isArray(updates)) throw new Error("Updates must be an array");

    const { updateRecord } = await import("@/lib/db");
    
    await Promise.all(updates.map((u: any) => updateRecord(model, u.id, u)));

    return NextResponse.json({ success: true, count: updates.length });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update records" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ model: string }> }) {
  const model = (await params).model as Model;
  if (!ALLOWED_MODELS.includes(model)) return NextResponse.json({ error: "Invalid model" }, { status: 400 });

  try {
    const { ids } = await request.json();
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "Invalid or empty IDs array" }, { status: 400 });
    }

    const success = await deleteRecords(model, ids);
    if (!success) throw new Error("Batch deletion failed at DB layer");

    return NextResponse.json({ success: true, count: ids.length });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete records" }, { status: 500 });
  }
}
