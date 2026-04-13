const { createClient } = require('@supabase/supabase-js');

async function testPersistence() {
  const url = "https://nozsveruyybstvembxps.supabase.co";
  const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5venN2ZXJ1eXlic3R2ZW1ieHBzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk5NzkwMCwiZXhwIjoyMDkxNTczOTAwfQ.FKlzeRV7vmlnWbV-VRRQxeSdNxXGicqzPxg-x0Azef4";
  const supabase = createClient(url, key);
  
  const lang = "en";
  const newTitle = "Persistent Test " + Date.now();
  
  console.log(`Step 1: Deleting existing records for lang=${lang}...`);
  await supabase.from("hero_settings").delete().eq("lang", lang);
  
  console.log(`Step 2: Inserting new record with title: "${newTitle}"...`);
  const { error: insErr } = await supabase.from("hero_settings").insert([{ lang, title: newTitle }]);
  if (insErr) {
    console.error("Insert failed:", insErr.message);
    return;
  }
  
  console.log(`Step 3: Fetching records for lang=${lang}...`);
  const { data, error: fetErr } = await supabase
    .from("hero_settings")
    .select("*")
    .eq("lang", lang)
    .order("updated_at", { ascending: false });
    
  if (fetErr) {
    console.error("Fetch failed:", fetErr.message);
    return;
  }
  
  console.log(`Found ${data.length} records.`);
  if (data.length > 0) {
    console.log(`Newest record title: "${data[0].title}"`);
    if (data[0].title === newTitle) {
      console.log("SUCCESS: Database persistence is working perfectly.");
    } else {
      console.log("FAILURE: Database did not return the expected title.");
    }
  } else {
    console.log("FAILURE: No records found after insert.");
  }
}

testPersistence();
