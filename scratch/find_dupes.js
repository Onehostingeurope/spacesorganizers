const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) process.exit(1);

const supabase = createClient(supabaseUrl, supabaseKey);

async function findDuplicates() {
  const { data: services } = await supabase
    .from('services')
    .select('id, title, lang, slug, description')
    .ilike('title', '%Wardrobe%');

  console.log("--- FOUND SERVICES ---");
  for (const s of services) {
    console.log(`ID: ${s.id} | Lang: ${s.lang} | Title: ${s.title}`);
    if (s.description.includes('&nbsp;')) {
      console.log("   *** HAS NBSP ***");
    }
  }
}

findDuplicates();
