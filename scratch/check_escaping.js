const { createClient } = require('@supabase/supabase-js');

async function checkEscaping() {
  const url = "https://nozsveruyybstvembxps.supabase.co";
  const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5venN2ZXJ1eXlic3R2ZW1ieHBzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk5NzkwMCwiZXhwIjoyMDkxNTczOTAwfQ.FKlzeRV7vmlnWbV-VRRQxeSdNxXGicqzPxg-x0Azef4";
  const supabase = createClient(url, key);
  
  const { data, error } = await supabase.from("services").select("title, description").ilike("description", "%<p>%");
  
  if (data) {
    data.forEach(s => {
      console.log(`Title: ${s.title}`);
      console.log(`Description RAW: ${JSON.stringify(s.description)}`);
    });
  }
}

checkEscaping();
