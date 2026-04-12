/**
 * translate-all.mjs
 * Automatically translates all EN content to FR, RU, DE in Supabase.
 * Uses Google Translate (free, no API key required).
 *
 * Run: node scripts/translate-all.mjs
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

// ─── Load .env.local ───────────────────────────────────────────────────────
function loadEnv() {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf-8");
    for (const line of raw.split("\n")) {
      const [key, ...rest] = line.split("=");
      if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
    }
  } catch {}
}
loadEnv();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ─── Google Translate (free endpoint) ─────────────────────────────────────
async function translate(text, targetLang) {
  if (!text || String(text).trim() === "") return text;
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    const data = await res.json();
    return data[0].map((c) => c[0]).join("");
  } catch (e) {
    console.warn(`  ⚠ translate failed (${targetLang}): ${e.message}`);
    return text; // fallback to original
  }
}

async function translateArray(arr, lang) {
  if (!Array.isArray(arr)) return arr;
  return Promise.all(arr.map((item) => translate(item, lang)));
}

// Small delay to avoid rate-limiting
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── Table configs ─────────────────────────────────────────────────────────
const TABLES = [
  {
    name: "services",
    matchBy: "slug",
    textFields: ["title", "intro", "description", "outcome", "idealClient"],
    arrayFields: ["included"],
  },
  {
    name: "spaces",
    matchBy: "slug",
    textFields: ["title", "pain", "solution"],
    arrayFields: [],
  },
  {
    name: "portfolio",
    matchBy: "slug",
    textFields: ["title", "category", "description"],
    arrayFields: [],
  },
  {
    name: "testimonials",
    matchBy: null, // matched by author+area
    textFields: ["text"],      // don't translate author/area (names)
    arrayFields: [],
  },
  {
    name: "blog",
    matchBy: "slug",
    textFields: ["title", "category", "excerpt", "content"],
    arrayFields: [],
  },
  {
    name: "faq",
    matchBy: null,
    textFields: ["question", "answer"],
    arrayFields: [],
  },
];

const LANGS = ["fr", "ru", "de"];
const LANG_NAMES = { fr: "French", ru: "Russian", de: "German" };

// ─── Main ──────────────────────────────────────────────────────────────────
async function main() {
  console.log("🌍 Space Organizers — Auto Translation\n");

  for (const table of TABLES) {
    console.log(`\n📋 Table: ${table.name}`);

    // Fetch all EN records
    const { data: enRows, error: enErr } = await supabase
      .from(table.name)
      .select("*")
      .eq("lang", "en");

    if (enErr || !enRows?.length) {
      console.log(`  ⚠ No EN records found or error: ${enErr?.message}`);
      continue;
    }
    console.log(`  ✓ Found ${enRows.length} EN records`);

    for (const lang of LANGS) {
      console.log(`\n  → Translating to ${LANG_NAMES[lang]} (${lang})...`);

      // Fetch existing target-lang records
      const { data: targetRows } = await supabase
        .from(table.name)
        .select("*")
        .eq("lang", lang);

      for (const enRow of enRows) {
        // Find matching target-lang record
        let targetRow;
        if (table.matchBy) {
          targetRow = targetRows?.find((r) => r[table.matchBy] === enRow[table.matchBy]);
        } else if (table.name === "testimonials") {
          targetRow = targetRows?.find(
            (r) => r.author === enRow.author && r.area === enRow.area
          );
        } else if (table.name === "faq") {
          // Match by original EN question (not yet translated)
          targetRow = targetRows?.find((r) => r.question === enRow.question);
        }

        if (!targetRow) {
          console.log(`    ⚠ No ${lang} record found for: ${enRow.title || enRow.question || enRow.author}`);
          continue;
        }

        // Build update payload
        const updates = {};

        for (const field of table.textFields) {
          if (enRow[field]) {
            process.stdout.write(`    🔤 ${field}... `);
            updates[field] = await translate(enRow[field], lang);
            console.log(`✓`);
            await delay(150); // rate limit protection
          }
        }

        for (const field of table.arrayFields) {
          if (Array.isArray(enRow[field]) && enRow[field].length) {
            process.stdout.write(`    📝 ${field} (array)... `);
            updates[field] = await translateArray(enRow[field], lang);
            console.log(`✓`);
            await delay(150);
          }
        }

        if (Object.keys(updates).length === 0) continue;

        const { error: updateErr } = await supabase
          .from(table.name)
          .update(updates)
          .eq("id", targetRow.id);

        if (updateErr) {
          console.log(`    ✗ Update failed: ${updateErr.message}`);
        } else {
          console.log(`    ✅ Updated: ${enRow.title || enRow.question || enRow.author}`);
        }
      }
    }
  }

  console.log("\n\n✅ Translation complete!\n");
}

main().catch(console.error);
