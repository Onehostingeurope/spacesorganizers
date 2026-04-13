const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const TABLES = ['services', 'spaces', 'portfolio', 'testimonials', 'blog', 'faq', 'hero_settings', 'homepage_settings'];

function decodeEntities(str) {
  let decoded = str;
  const entities = {
    '&lt;': '<',
    '&gt;': '>',
    '&nbsp;': ' ',
    '&amp;': '&',
    '&quot;': '"',
    '&#39;': "'",
    '\u00A0': ' ',
    '&#x20;': ' '
  };

  // Perform up to 5 passes to catch deeply encoded strings
  for (let i = 0; i < 5; i++) {
    let changed = false;
    for (const [entity, char] of Object.entries(entities)) {
      if (decoded.includes(entity)) {
        decoded = decoded.split(entity).join(char);
        changed = true;
      }
    }
    if (!changed) break;
  }
  return decoded;
}

async function scrubTable(table) {
  console.log(`Nuclear Scrub: ${table}...`);
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
      if (typeof val === 'string' && val.length > 0) {
        const cleaned = decodeEntities(val);
        if (cleaned !== val) {
          updates[key] = cleaned;
          hasChange = true;
        }
      } else if (Array.isArray(val)) {
         // Some fields like 'included' are arrays of strings
         const cleanedArray = val.map(item => (typeof item === 'string' ? decodeEntities(item) : item));
         if (JSON.stringify(cleanedArray) !== JSON.stringify(val)) {
            updates[key] = cleanedArray;
            hasChange = true;
         }
      }
    }

    if (hasChange) {
      console.log(`Restoring raw HTML in ${table} (${row.id || row.lang})`);
      const { error: updateError } = await supabase
        .from(table)
        .update(updates)
        .eq(row.id ? 'id' : 'lang', row.id || row.lang);

      if (updateError) {
        console.error(`Failed to update ${table}:`, updateError.message);
      }
    }
  }
}

async function runNuclearScrub() {
  for (const table of TABLES) {
    await scrubTable(table);
  }
  console.log("Nuclear scrub complete. All data restored to raw HTML form.");
}

runNuclearScrub();
