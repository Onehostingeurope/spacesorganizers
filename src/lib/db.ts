import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Model = "services" | "spaces" | "portfolio" | "testimonials" | "blog" | "faq" | "leads";

export async function getCollection<T>(model: Model): Promise<T[]> {
  const { data, error } = await supabase
    .from(model)
    .select("*")
    .order("createdAt", { ascending: true });

  if (error) {
    console.error(`[db] getCollection(${model}) error:`, error.message);
    return [];
  }
  return (data ?? []) as T[];
}

export async function insertRecord<T extends Record<string, unknown>>(model: Model, record: T): Promise<T> {
  const { data, error } = await supabase
    .from(model)
    .insert([record])
    .select()
    .single();

  if (error) throw new Error(`[db] insertRecord(${model}): ${error.message}`);
  return data as T;
}

export async function updateRecord<T extends Record<string, unknown>>(
  model: Model,
  id: string,
  payload: Partial<T>
): Promise<T | null> {
  const { data, error } = await supabase
    .from(model)
    .update({ ...payload, updatedAt: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`[db] updateRecord(${model}) error:`, error.message);
    return null;
  }
  return data as T;
}

export async function deleteRecord(model: Model, id: string): Promise<boolean> {
  const { error } = await supabase
    .from(model)
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`[db] deleteRecord(${model}) error:`, error.message);
    return false;
  }
  return true;
}
