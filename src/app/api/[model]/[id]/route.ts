import { NextResponse } from "next/server";
import { updateRecord, deleteRecord, type Model } from "@/lib/db";

const ALLOWED_MODELS: Model[] = ["services", "spaces", "portfolio", "testimonials", "blog", "faq", "leads"];

export async function PUT(request: Request, { params }: { params: Promise<{ model: string, id: string }> }) {
  const resolvedParams = await params;
  const model = resolvedParams.model as Model;
  const id = resolvedParams.id;
  
  if (!ALLOWED_MODELS.includes(model)) return NextResponse.json({ error: "Invalid model" }, { status: 400 });

  try {
    const body = await request.json();
    const updated = await updateRecord(model, id, body);
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update record" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ model: string, id: string }> }) {
  const resolvedParams = await params;
  const model = resolvedParams.model as Model;
  const id = resolvedParams.id;
  
  if (!ALLOWED_MODELS.includes(model)) return NextResponse.json({ error: "Invalid model" }, { status: 400 });

  try {
    const success = await deleteRecord(model, id);
    if (!success) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete record" }, { status: 500 });
  }
}
