const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspect() {
  const { data: services } = await supabase
    .from('services')
    .select('id, title, description')
    .eq('title', 'Private Wardrobe Management'); // Focus on the culprit

  if (services && services.length > 0) {
    for (const s of services) {
       console.log(`--- Service ID: ${s.id} ---`);
       console.log("Title:", s.title);
       console.log("Description String:", s.description);
       
       // Character code check
       const codes = [];
       for (let i = 0; i < Math.min(s.description.length, 100); i++) {
         const char = s.description[i];
         const code = s.description.charCodeAt(i);
         codes.push(`${char}(${code})`);
       }
       console.log("First 100 chars:", codes.join(' '));
    }
  }
}

inspect();
