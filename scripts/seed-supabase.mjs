// Seed Supabase tables with existing JSON data
// Run: node scripts/seed-supabase.mjs
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const SUPABASE_URL = "https://nozsveruyybstvembxps.supabase.co";
const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5venN2ZXJ1eXlic3R2ZW1ieHBzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk5NzkwMCwiZXhwIjoyMDkxNTczOTAwfQ.FKlzeRV7vmlnWbV-VRRQxeSdNxXGicqzPxg-x0Azef4";

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

const slugify = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const models = ["services", "spaces", "portfolio", "testimonials", "blog", "faq", "hero"];

for (const model of models) {
  const raw = readFileSync(`./data/${model}.json`, "utf-8");
  const records = JSON.parse(raw);

  if (!records.length) {
    console.log(`[${model}] empty, skipping`);
    continue;
  }

  // Remove old ids/timestamps then ensure slug exists
  const cleaned = records.map(({ id, createdAt, updatedAt, ...rest }) => {
    // Auto-generate slug if missing
    if (!rest.slug && rest.title) {
      rest.slug = slugify(rest.title);
    }
    return rest;
  });

  // Upsert by slug (or insert) — avoids duplicate key errors on re-runs
  const { error } = await supabase.from(model).upsert(cleaned, {
    onConflict: "slug",
    ignoreDuplicates: true,
  });

  if (error) {
    // Tables without slug (testimonials, faq, leads) — just insert, ignore dupes
    const { error: insertErr } = await supabase.from(model).insert(cleaned);
    if (insertErr) {
      console.error(`[${model}] ❌ error:`, insertErr.message);
    } else {
      console.log(`[${model}] ✓ inserted ${cleaned.length} record(s)`);
    }
  } else {
    console.log(`[${model}] ✓ upserted ${cleaned.length} record(s)`);
  }
}

console.log("\n✅ Seed complete!");
