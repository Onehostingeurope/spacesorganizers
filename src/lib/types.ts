import type enDict from "../dictionaries/en.json";

export const LOCALES = ["en", "fr", "ru", "de"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

// Use the English JSON as the canonical type shape
export type Dictionary = typeof enDict;
