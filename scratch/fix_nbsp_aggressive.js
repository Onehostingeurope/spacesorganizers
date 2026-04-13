const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanServices() {
  console.log("Fetching services for AGGRESSIVE cleanup...");
  
  const { data: services, error } = await supabase
    .from('services')
    .select('id, title, description');

  if (error) {
    console.error("Error fetching services:", error.message);
    return;
  }

  console.log(`Found ${services.length} services.`);
  
  for (const service of services) {
    let content = service.description || "";
    const hasLiteralNbsp = content.includes('&nbsp;');
    const hasUnicodeNbsp = content.includes('\u00A0');
    
    if (hasLiteralNbsp || hasUnicodeNbsp) {
      console.log(`Cleaning service: "${service.title}" (ID: ${service.id})...`);
      
      // Replace ALL types of NBSP
      const cleanedContent = content
        .replace(/&nbsp;/g, ' ')
        .replace(/\u00A0/g, ' ');
        
      const { error: updateError } = await supabase
        .from('services')
        .update({ description: cleanedContent })
        .eq('id', service.id);
        
      if (updateError) {
        console.error(`Failed to update service ${service.id}:`, updateError.message);
      } else {
        console.log(`Successfully cleaned service ${service.id}.`);
      }
    }
  }
  
  console.log("Finished aggressive cleaning.");
}

cleanServices();
