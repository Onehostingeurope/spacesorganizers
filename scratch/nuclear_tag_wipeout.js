const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const TABLES = ['services', 'spaces', 'portfolio'];

function stripTags(html) {
  if (!html) return '';
  // Convert <p>, </p>, <br> to newlines
  let text = html
    .replace(/<\/p>/gi, '\n')
    .replace(/<p[^>]*>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n');
  
  // Strip all other remaining tags
  text = text.replace(/<[^>]+>/g, '');
  
  // Decode common entities
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\u00A0/g, ' ');

  // Standardize multiple newlines to double newlines
  text = text.replace(/\n\s*\n\s*\n/g, '\n\n').trim();
  
  return text;
}

async function wipeoutTable(table) {
  console.log(`Nuclear Tag Wipeout: ${table}...`);
  const { data, error } = await supabase.from(table).select('*');
  if (error) {
    console.error(`Error fetching ${table}:`, error.message);
    return;
  }

  for (const row of data) {
    let hasChange = false;
    const updates = {};

    for (const key of ['description', 'intro', 'outcome', 'idealClient']) {
      if (row[key] && typeof row[key] === 'string') {
        const cleaned = stripTags(row[key]);
        if (cleaned !== row[key]) {
          updates[key] = cleaned;
          hasChange = true;
        }
      }
    }

    if (row.included && Array.isArray(row.included)) {
      const cleanedIncluded = row.included.map(item => stripTags(item));
      if (JSON.stringify(cleanedIncluded) !== JSON.stringify(row.included)) {
        updates.included = cleanedIncluded;
        hasChange = true;
      }
    }

    if (hasChange) {
      console.log(`Cleaning ${table} record: ${row.title || row.id}`);
      const { error: updateError } = await supabase
        .from(table)
        .update(updates)
        .eq('id', row.id);

      if (updateError) {
        console.error(`Failed to update ${table}:`, updateError.message);
      }
    }
  }
}

async function main() {
  for (const table of TABLES) {
    await wipeoutTable(table);
  }
  console.log("Nuclear Tag Wipeout complete. Database is now PURE TEXT.");
}

main();
