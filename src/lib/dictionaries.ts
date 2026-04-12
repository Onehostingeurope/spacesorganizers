import "server-only";
import type enDict from "../dictionaries/en.json";

export const LOCALES = ["en", "fr", "ru", "de"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

// Use the English JSON as the canonical type shape
export type Dictionary = typeof enDict;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("../dictionaries/en.json").then((m) => m.default as Dictionary),
  fr: () => import("../dictionaries/fr.json").then((m) => m.default as Dictionary),
  ru: () => import("../dictionaries/ru.json").then((m) => m.default as Dictionary),
  de: () => import("../dictionaries/de.json").then((m) => m.default as Dictionary),
};

export function hasLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
