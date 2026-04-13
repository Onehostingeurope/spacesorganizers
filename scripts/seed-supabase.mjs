// Seed Supabase tables with existing JSON data + sync dictionaries to settings
// Run: node scripts/seed-supabase.mjs
import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const SUPABASE_URL = "https://nozsveruyybstvembxps.supabase.co";
const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5venN2ZXJ1eXlic3R2ZW1ieHBzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk5NzkwMCwiZXhwIjoyMDkxNTczOTAwfQ.FKlzeRV7vmlnWbV-VRRQxeSdNxXGicqzPxg-x0Azef4";

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

const slugify = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

async function seedCollections() {
  const models = ["services", "spaces", "portfolio", "testimonials", "blog", "faq", "hero"];

  for (const model of models) {
    const raw = readFileSync(`./data/${model}.json`, "utf-8");
    const records = JSON.parse(raw);

    if (!records.length) {
      console.log(`[${model}] empty, skipping`);
      continue;
    }

    const cleaned = records.map(({ id, createdAt, updatedAt, ...rest }) => {
      if (!rest.slug && rest.title) {
        rest.slug = slugify(rest.title);
      }
      return rest;
    });

    const { error } = await supabase.from(model).upsert(cleaned, {
      onConflict: model === "hero" ? "id" : "slug",
      ignoreDuplicates: false,
    });

    if (error) {
      const { error: insertErr } = await supabase.from(model).insert(cleaned);
      if (insertErr) {
        console.error(`[${model}] ❌ error:`, insertErr.message);
      } else {
        console.log(`[${model}] ✓ inserted ${cleaned.length} record(s)`);
      }
    } else {
      console.log(`[${model}] ✓ upserted ${cleaned.length} record(s)`);
    }
  }
}

async function syncDictionaries() {
  const dictDir = "./src/dictionaries";
  const files = readdirSync(dictDir).filter(f => f.endsWith(".json"));

  // Helper to get columns for a table
  const getColumns = async (table) => {
    const { data, error } = await supabase.from(table).select("*").limit(1);
    if (error || !data.length) {
      // If error or empty, try to get at least one from anywhere or return empty keys
      const { data: all } = await supabase.from(table).select("*").limit(1);
      return Object.keys(all?.[0] || {});
    }
    return Object.keys(data[0]);
  };

  const heroCols = await getColumns("hero_settings");
  const homeCols = await getColumns("homepage_settings");

  for (const file of files) {
    const lang = file.replace(".json", "");
    const dict = JSON.parse(readFileSync(join(dictDir, file), "utf-8"));

    console.log(`[settings] Syncing ${lang}...`);

    // 1. Sync Hero Settings
    const heroSettingsRaw = {
      lang,
      region: dict.hero.region,
      title: dict.hero.title,
      subtitle: dict.hero.subtitle,
      description: dict.hero.description,
      autoplay_speed: 15,
      overlay_opacity: 40,
      overlay_style: "dark"
    };
    
    // Filter to existing columns
    const heroSettings = Object.fromEntries(
      Object.entries(heroSettingsRaw).filter(([k]) => heroCols.includes(k))
    );

    await supabase.from("hero_settings").upsert(heroSettings, { onConflict: "lang" });

    // 2. Sync Homepage Settings
    const homeSettingsRaw = {
      lang,
      // Philosophy
      phi_label: dict.philosophy.label,
      phi_heading: dict.philosophy.heading,
      phi_quote: dict.philosophy.quote,
      phi_pantry_title: dict.philosophy.pantry_title,
      phi_pantry_desc: dict.philosophy.pantry_desc,
      phi_pantry_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwIpP4aH2BvLhuNJiRyx4peAXNLZX_orDABAiUaRLoQb0YdXKMufmLiM1L4yfqrxEMAyi_hJIEqApiAgWx6ocSNce08fv88AMIyh-eLDzBuudDcG0sNGueOygNc0lL3SyO0HbJoxRKKt4Fbqab5HdmJPKeyE7cmJEnMR1atpZlbRSySyp5HD1kcyXw5kcs_X920wMrxSJkrcLdtO2-NvK9XQmwvMWDld6jelvJwjG0QNm9k2VWuIbfnr_M8XI4R0V2E_hsmXbhpF4",
      phi_living_title: dict.philosophy.living_title,
      phi_living_desc: dict.philosophy.living_desc,
      phi_living_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDygYhpmBudxxNndS055nDEXCZqC8utNwLG7kd7_3JkEZFyjpuxub7t2HpLoEfAV3qN8_S1cDL0PgusYWWHrCBMc3xhe4pnu3h-wAzV6wCGStgS6mV19TYVlFp9qvEnJaPeoWnNhouBghvlWTfxOc8cOrNlt_eXfflhz2wS_yylRAkOte7jSi4onDNlt2QLtgeN6vWSGeSww_z2ZVNq8-pWG3CMaQtTYvuug5JvthZCXlzoiqfz2cnnrq09du2WZFifocEZmob8Cy8",
      phi_wardrobe_title: dict.philosophy.wardrobe_title,
      phi_wardrobe_desc: dict.philosophy.wardrobe_desc,
      phi_wardrobe_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_8ZD6ZPHfMDjNVX2A1le_J7enIzDaXGHPiDgyug0nT9OIeLijtE13WJtxuUtZRAcX9x-1NgissjY_S6wo4d6xe2eCON4yXPc-0I03V_glpiw20wr4w0eKPsdNPlRaN8c1by7PK1OLBBPZRMYCC6a9p-jrUq4qEVtiAqYhxZP0YAzSyf1-aX4ATq8C-ZkNxj8hAPDLd83NCW8WpMJoDkGtYcxliSkXRUzjD62oXqoshRrYQkw9W6qcZBR2PZUt4SbXWLC6A5w38ag",
      // Process
      proc_label: dict.process.label,
      proc_heading: dict.process.heading,
      proc_step1_title: dict.process.steps[0].title,
      proc_step1_desc: dict.process.steps[0].description,
      proc_step2_title: dict.process.steps[1].title,
      proc_step2_desc: dict.process.steps[1].description,
      proc_step3_title: dict.process.steps[2].title,
      proc_step3_desc: dict.process.steps[2].description,
      proc_step4_title: dict.process.steps[3].title,
      proc_step4_desc: dict.process.steps[3].description,
      // Hooks
      testi_label: dict.testimonials.label,
      testi_heading: dict.testimonials.heading,
      serv_label: dict.nav.services,
      serv_heading: "Luxury Solutions for",
      serv_heading_accent: "Every Requirement",
      spaces_label: dict.nav.riviera,
      spaces_heading: "Tailored to your lifestyle",
      port_label: dict.nav.portfolio,
      port_heading: "Selected transformations",
      faq_label: dict.faq.label,
      faq_heading: dict.faq.heading,
      cta_label: dict.cta.label,
      cta_heading: dict.cta.heading,
      cta_desc: dict.cta.description || "",
      // Contact
      contact_heading: dict.contact.heading,
      contact_heading_accent: dict.contact.heading_accent,
      contact_description: dict.contact.description,
      contact_serving: dict.contact.serving,
      company_email: "hello@spaceorganizing.com",
      company_phone: "+380 66 938 78 09"
    };

    // Filter to existing columns
    const homeSettings = Object.fromEntries(
      Object.entries(homeSettingsRaw).filter(([k]) => homeCols.includes(k))
    );

    const { error } = await supabase.from("homepage_settings").upsert(homeSettings, { onConflict: "lang" });
    if (error) console.error(`[homepage_settings] error for ${lang}:`, error.message);
    else console.log(`[homepage_settings] ✓ synced ${lang}`);
  }
}

async function main() {
  await seedCollections();
  await syncDictionaries();
  console.log("\n✅ Seed & Sync complete!");
}

main();
