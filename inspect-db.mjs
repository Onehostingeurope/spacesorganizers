import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://nozsveruyybstvembxps.supabase.co";
const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5venN2ZXJ1eXlic3R2ZW1ieHBzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk5NzkwMCwiZXhwIjoyMDkxNTczOTAwfQ.FKlzeRV7vmlnWbV-VRRQxeSdNxXGicqzPxg-x0Azef4";

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function inspect() {
  const { data, error } = await supabase
    .from("homepage_settings")
    .select("*")
    .limit(1);

  if (error) {
    console.error("Error fetching homepage_settings:", error);
  } else {
    console.log("Columns in homepage_settings:", Object.keys(data[0] || {}));
  }

  const { data: heroData, error: heroError } = await supabase
    .from("hero_settings")
    .select("*")
    .limit(1);

  if (heroError) {
    console.error("Error fetching hero_settings:", heroError);
  } else {
    console.log("Columns in hero_settings:", Object.keys(heroData[0] || {}));
  }
}

inspect();
