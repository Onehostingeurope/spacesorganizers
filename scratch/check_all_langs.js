const { createClient } = require('@supabase/supabase-js');

async function checkAll() {
  const url = "https://nozsveruyybstvembxps.supabase.co";
  const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5venN2ZXJ1eXlic3R2ZW1ieHBzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk5NzkwMCwiZXhwIjoyMDkxNTczOTAwfQ.FKlzeRV7vmlnWbV-VRRQxeSdNxXGicqzPxg-x0Azef4";
  const supabase = createClient(url, key);
  
  const langs = ["en", "fr", "ru", "de"];
  
  for (const lang of langs) {
    console.log(`--- Language: ${lang} ---`);
    const { data, error } = await supabase.from("services").select("title, description, lang").eq("lang", lang).ilike("title", "%Decluttering%");
    if (data) {
      data.forEach(s => {
        console.log(`Title: ${s.title}`);
        console.log(`Description Snippet: ${s.description.substring(0, 100)}...`);
        if (s.description.includes("<ol>")) {
           console.log("FOUND OL TAG IN THIS DESCRIPTION!");
        }
      });
    }
  }
}

checkAll();
