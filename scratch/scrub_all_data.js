const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const TABLES = ['services', 'spaces', 'portfolio', 'testimonials', 'blog', 'faq', 'hero_settings', 'homepage_settings'];

async function scrubTable(table) {
  console.log(`Scrubbing table: ${table}...`);
  const { data, error } = await supabase.from(table).select('*');
  if (error) {
    console.error(`Error fetching ${table}:`, error.message);
    return;
  }

  for (const row of data) {
    let hasChange = false;
    const updates = {};

    for (const key in row) {
      const val = row[key];
      if (typeof val === 'string') {
        // Multi-pass clean to catch &amp;nbsp; etc.
        let cleaned = val;
        for (let i = 0; i < 3; i++) {
          const next = cleaned
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;nbsp;/g, ' ')
            .replace(/\u00A0/g, ' ');
          if (next === cleaned) break;
          cleaned = next;
          hasChange = true;
        }
        if (cleaned !== val) {
          updates[key] = cleaned;
        }
      }
    }

    if (hasChange) {
      console.log(`Updating ${table} row ID: ${row.id || row.lang || 'unknown'}`);
      const { error: updateError } = await supabase
        .from(table)
        .update(updates)
        .eq('id', row.id); // For settings it might use lang, but standard is id or lang

      if (updateError) {
        // Try fallback for settings tables that might not have ID
        if (table.includes('settings')) {
           const { error: settingsError } = await supabase.from(table).update(updates).eq('lang', row.lang);
           if (settingsError) console.error(`Failed to update ${table}:`, settingsError.message);
        } else {
           console.error(`Failed to update ${table} ${row.id}:`, updateError.message);
        }
      }
    }
  }
}

async function runMasterScrub() {
  for (const table of TABLES) {
    await scrubTable(table);
  }
  console.log("Master scrub complete.");
}

runMasterScrub();
