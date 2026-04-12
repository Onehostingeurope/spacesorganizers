import { createClient, SupabaseClient } from "@supabase/supabase-js";

export type Model = "services" | "spaces" | "portfolio" | "testimonials" | "blog" | "faq" | "leads" | "hero";

// Lazy singleton — only created when first used (not at module eval time)
let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase env vars. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  _client = createClient(url, key);
  return _client;
}

export async function getCollection<T>(model: Model): Promise<T[]> {
  try {
    const { data, error } = await getClient()
      .from(model)
      .select("*")
      .order(model === "hero" ? "order" : "createdAt", { ascending: true });

    if (error) {
      console.error(`[db] getCollection(${model}):`, error.message);
      return [];
    }
    return (data ?? []) as T[];
  } catch (e: any) {
    console.error(`[db] getCollection(${model}) fatal:`, e.message);
    return [];
  }
}

export async function insertRecord<T extends Record<string, unknown>>(
  model: Model,
  record: T
): Promise<T> {
  const { data, error } = await getClient()
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
  const { data, error } = await getClient()
    .from(model)
    .update({ ...payload, updatedAt: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`[db] updateRecord(${model}):`, error.message);
    return null;
  }
  return data as T;
}

export async function deleteRecord(model: Model, id: string): Promise<boolean> {
  const { error } = await getClient()
    .from(model)
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`[db] deleteRecord(${model}):`, error.message);
    return false;
  }
  return true;
}
