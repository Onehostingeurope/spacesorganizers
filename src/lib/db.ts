import { createClient, SupabaseClient } from "@supabase/supabase-js";

export type Model = "services" | "spaces" | "portfolio" | "testimonials" | "blog" | "faq" | "leads" | "hero" | "hero_settings" | "homepage_settings";

// Lazy singleton — only created when first used (not at module eval time)
let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient | null {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "[db] Warning: Missing Supabase env vars. Database features may be disabled."
      );
    }
    return null;
  }

  _client = createClient(url, key);
  return _client;
}

export async function getCollection<T>(model: Model, lang?: string): Promise<T[]> {
  try {
    const client = getClient();
    if (!client) return [];

    let query = client
      .from(model)
      .select("*")
      .order(
        model === "hero"
          ? "order"
          : (model === "hero_settings" || model === "homepage_settings")
            ? "updated_at"
            : "createdAt",
        { ascending: true }
      );

    // Filter by language for collection models that support it
    const langModels: Model[] = ["services", "spaces", "portfolio", "testimonials", "blog", "faq"];
    if (lang && langModels.includes(model)) {
      query = query.eq("lang", lang);
    }

    const { data, error } = await query;

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
  const client = getClient();
  if (!client) throw new Error("[db] Missing client for insertRecord");

  const { data, error } = await client
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
  const client = getClient();
  if (!client) return null;

  const { data, error } = await client
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
  const client = getClient();
  if (!client) return false;

  const { error } = await client
    .from(model)
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`[db] deleteRecord(${model}):`, error.message);
    return false;
  }
  return true;
}

export async function deleteRecords(model: Model, ids: string[]): Promise<boolean> {
  const client = getClient();
  if (!client || ids.length === 0) return false;

  const { error } = await client
    .from(model)
    .delete()
    .in("id", ids);

  if (error) {
    console.error(`[db] deleteRecords(${model}):`, error.message);
    return false;
  }
  return true;
}
