import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://nozsveruyybstvembxps.supabase.co";
const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5venN2ZXJ1eXlic3R2ZW1ieHBzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk5NzkwMCwiZXhwIjoyMDkxNTczOTAwfQ.FKlzeRV7vmlnWbV-VRRQxeSdNxXGicqzPxg-x0Azef4";

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function testUpdate() {
  const model = "spaces";
  // Get first record
  const { data: first } = await supabase.from(model).select("*").limit(1).single();
  
  if (!first) {
    console.log("No records to test with.");
    return;
  }

  console.log("Original record:", first.id, first.title);

  // Simulate common payload from Admin (includes id and timestamps)
  const payload = {
    ...first,
    title: first.title + " (Tested)"
  };

  // Logic from db.ts:
  const { id: _id, createdAt: _ca, updatedAt: _ua, ...cleanPayload } = payload;

  console.log("Clean payload (extracted):", Object.keys(cleanPayload));

  const { data: updated, error } = await supabase
    .from(model)
    .update({ ...cleanPayload, updatedAt: new Date().toISOString() })
    .eq("id", first.id)
    .select()
    .single();

  if (error) {
    console.error("Update failed:", error.message);
  } else {
    console.log("Update succeeded!", updated.id, updated.title);
    
    // Revert change
    await supabase.from(model).update({ title: first.title }).eq("id", first.id);
    console.log("Reverted change.");
  }
}

testUpdate();
