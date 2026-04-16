import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://nozsveruyybstvembxps.supabase.co";
const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5venN2ZXJ1eXlic3R2ZW1ieHBzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk5NzkwMCwiZXhwIjoyMDkxNTczOTAwfQ.FKlzeRV7vmlnWbV-VRRQxeSdNxXGicqzPxg-x0Azef4";

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function inspect() {
  const { data, error } = await supabase
    .from("spaces")
    .select("*")
    .limit(1);

  if (error) {
    console.error("Error fetching spaces:", error);
  } else {
    console.log("Columns in spaces:", Object.keys(data[0] || {}));
    console.log("First record:", data[0]);
  }
}

inspect();
