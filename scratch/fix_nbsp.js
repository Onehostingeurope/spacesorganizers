const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanServices() {
  console.log("Fetching services to clean up &nbsp;...");
  
  const { data: services, error } = await supabase
    .from('services')
    .select('id, description');

  if (error) {
    console.error("Error fetching services:", error.message);
    return;
  }

  console.log(`Found ${services.length} services.`);
  
  for (const service of services) {
    if (service.description && service.description.includes('&nbsp;')) {
      console.log(`Cleaning service ID: ${service.id}...`);
      const cleanedDescription = service.description.replace(/&nbsp;/g, ' ');
      
      const { error: updateError } = await supabase
        .from('services')
        .update({ description: cleanedDescription })
        .eq('id', service.id);
        
      if (updateError) {
        console.error(`Failed to update service ${service.id}:`, updateError.message);
      } else {
        console.log(`Successfully cleaned service ${service.id}.`);
      }
    }
  }
  
  console.log("Finished cleaning services.");
}

cleanServices();
