import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { updateRecord, deleteRecord, type Model } from "@/lib/db";

const ALLOWED_MODELS: Model[] = ["services", "spaces", "portfolio", "testimonials", "blog", "faq", "leads", "hero"];

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

export async function PUT(request: Request, { params }: { params: Promise<{ model: string, id: string }> }) {
  const resolvedParams = await params;
  const model = resolvedParams.model as Model;
  const id = resolvedParams.id;
  
  if (!ALLOWED_MODELS.includes(model)) return NextResponse.json({ error: "Invalid model" }, { status: 400 });

  try {
    const rawBody = await request.json();
    const body = cleanInput(rawBody);
    const updated = await updateRecord(model, id, body);
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    
    // Force revalidation of all public pages to ensure data is live
    revalidatePath("/", "layout");
    
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
