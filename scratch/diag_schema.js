const { createClient } = require('@supabase/supabase-js');

async function checkSchema() {
  const url = "https://nozsveruyybstvembxps.supabase.co";
  const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5venN2ZXJ1eXlic3R2ZW1ieHBzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk5NzkwMCwiZXhwIjoyMDkxNTczOTAwfQ.FKlzeRV7vmlnWbV-VRRQxeSdNxXGicqzPxg-x0Azef4";
  
  const supabase = createClient(url, key);
  
  const testPayload = {
    lang: 'test_diag',
    title: 'Diag',
    overlay_opacity: 40,
    overlay_style: 'dark',
    autoplay_speed: 15
  };
  
  console.log("Testing full payload insert...");
  const { error: e1 } = await supabase.from('hero_settings').insert([testPayload]);
  if (e1) {
    console.log("Full payload FAILED:", e1.message);
    
    console.log("Testing minimal payload insert...");
    const { error: e2, data: d2 } = await supabase.from('hero_settings').insert([{ lang: 'test_diag_min', title: 'Min' }]).select();
    if (e2) {
      console.log("Minimal payload also FAILED:", e2.message);
    } else {
      console.log("Minimal payload SUCCEEDED. The issue is definitely the additional columns.");
    }
  } else {
    console.log("Full payload SUCCEEDED. Schema is correct.");
  }
  
  // Cleanup
  await supabase.from('hero_settings').delete().eq('lang', 'test_diag');
  await supabase.from('hero_settings').delete().eq('lang', 'test_diag_min');
}

checkSchema();
