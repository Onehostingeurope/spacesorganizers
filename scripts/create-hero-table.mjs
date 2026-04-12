// Create the missing 'hero' table in Supabase
// Run: node scripts/create-hero-table.mjs

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://nozsveruyybstvembxps.supabase.co";
const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5venN2ZXJ1eXlic3R2ZW1ieHBzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk5NzkwMCwiZXhwIjoyMDkxNTczOTAwfQ.FKlzeRV7vmlnWbV-VRRQxeSdNxXGicqzPxg-x0Azef4";

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

// Insert initial hero slides (table must be created manually or via Supabase SQL)
const slides = [
  {
    type: "image",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxbyLt8Hv-3Fd56k4BYlXt5-e3GvaqIoOP4rmukFbJ6r32O77jPlMkmLorTMpLudhhzoZB4qg2u1Wke5HEugEXvej7hwSCcIx4kzDRdnLG5xHNEqfREli8ecmMOh_sKpk6v0bUyYl2NgePiLlYZKXXZybAbdB-uBZBSmT6N6ORuiRj_y9gOjHj5vkCXyrbY9fUG69rShB-xN5AC8phqkYZachKYw7mihfe21awBLSi12Depk1OKBeyQub5NdtkQS_U6ceK1mC-ns4",
    alt: "Luxury wardrobe organization",
    order: 1,
  },
  {
    type: "image",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwIpP4aH2BvLhuNJiRyx4peAXNLZX_orDABAiUaRLoQb0YdXKMufmLiM1L4yfqrxEMAyi_hJIEqApiAgWx6ocSNce08fv88AMIyh-eLDzBuudDcG0sNGueOygNc0lL3SyO0HbJoxRKKt4Fbqab5HdmJPKeyE7cmJEnMR1atpZlbRSySyp5HD1kcyXw5kcs_X920wMrxSJkrcLdtO2-NvK9XQmwvMWDld6jelvJwjG0QNm9k2VWuIbfnr_M8XI4R0V2E_hsmXbhpF4",
    alt: "Pantry organization systems",
    order: 2,
  },
  {
    type: "image",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDygYhpmBudxxNndS055nDEXCZqC8utNwLG7kd7_3JkEZFyjpuxub7t2HpLoEfAV3qN8_S1cDL0PgusYWWHrCBMc3xhe4pnu3h-wAzV6wCGStgS6mV19TYVlFp9qvEnJaPeoWnNhouBghvlWTfxOc8cOrNlt_eXfflhz2wS_yylRAkOte7jSi4onDNlt2QLtgeN6vWSGeSww_z2ZVNq8-pWG3CMaQtTYvuug5JvthZCXlzoiqfz2cnnrq09du2WZFifocEZmob8Cy8",
    alt: "Living sanctuary design",
    order: 3,
  },
];

const { error } = await supabase.from("hero").insert(slides);

if (error) {
  console.error("❌ Could not insert hero slides:", error.message);
  console.log("\n📋 Please create the 'hero' table in Supabase SQL editor with:");
  console.log(`
CREATE TABLE public.hero (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  type text NOT NULL DEFAULT 'image',
  url text NOT NULL,
  alt text,
  "order" integer DEFAULT 1,
  "createdAt" timestamptz DEFAULT now(),
  "updatedAt" timestamptz DEFAULT now()
);
ALTER TABLE public.hero ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON public.hero FOR ALL USING (true) WITH CHECK (true);
  `);
} else {
  console.log("✅ Hero slides inserted successfully!");
}
