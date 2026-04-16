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
    
    // Attempt update
    const updated = await updateRecord(model, id, body);
    
    if (!updated) {
      // If updateRecord returns null, it's either not found or a DB error logged in updateRecord
      // We'll return 400 for a general failure or 404 if we want to be specific, 
      // but since updateRecord logs the error, let's returning a clear message.
      return NextResponse.json({ error: "Update failed. See server logs." }, { status: 400 });
    }
    
    // Force revalidation of all public pages to ensure data is live
    revalidatePath("/", "layout");
    
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update record" }, { status: 500 });
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
    
    // Force revalidation
    revalidatePath("/", "layout");

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete record" }, { status: 500 });
  }
}
