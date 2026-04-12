// Seed Supabase tables with existing JSON data
// Run: node scripts/seed-supabase.mjs
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const SUPABASE_URL = "https://nozsveruyybstvembxps.supabase.co";
const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5venN2ZXJ1eXlic3R2ZW1ieHBzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk5NzkwMCwiZXhwIjoyMDkxNTczOTAwfQ.FKlzeRV7vmlnWbV-VRRQxeSdNxXGicqzPxg-x0Azef4";

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

const models = ["services", "spaces", "portfolio", "testimonials", "blog", "faq"];

for (const model of models) {
  const raw = readFileSync(`./data/${model}.json`, "utf-8");
  const records = JSON.parse(raw);

  if (!records.length) {
    console.log(`[${model}] empty, skipping`);
    continue;
  }

  // Remove old numeric/string IDs so Supabase generates UUIDs
  const cleaned = records.map(({ id, createdAt, updatedAt, ...rest }) => rest);

  const { error } = await supabase.from(model).insert(cleaned);
  if (error) {
    console.error(`[${model}] ❌ seed error:`, error.message);
  } else {
    console.log(`[${model}] ✓ seeded ${cleaned.length} record(s)`);
  }
}

console.log("\n✅ Seed complete!");
