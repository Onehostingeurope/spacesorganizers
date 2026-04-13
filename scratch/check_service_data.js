const { createClient } = require('@supabase/supabase-js');

async function checkData() {
  const url = "https://nozsveruyybstvembxps.supabase.co";
  const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5venN2ZXJ1eXlic3R2ZW1ieHBzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk5NzkwMCwiZXhwIjoyMDkxNTczOTAwfQ.FKlzeRV7vmlnWbV-VRRQxeSdNxXGicqzPxg-x0Azef4";
  const supabase = createClient(url, key);
  
  const { data, error } = await supabase.from("services").select("title, description").ilike("title", "%Decluttering%");
  
  if (error) {
    console.error("Error fetching data:", error);
    return;
  }
  
  if (data && data.length > 0) {
    console.log("Title:", data[0].title);
    console.log("Description (RAW):", JSON.stringify(data[0].description));
  } else {
    console.log("No service found with that title.");
  }
}

checkData();
