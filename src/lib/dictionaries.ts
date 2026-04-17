import "server-only";
import { Locale, Dictionary } from "./types";

export { LOCALES, DEFAULT_LOCALE } from "./types";
export type { Locale, Dictionary } from "./types";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("../dictionaries/en.json").then((m) => m.default as Dictionary),
  fr: () => import("../dictionaries/fr.json").then((m) => m.default as Dictionary),
  ru: () => import("../dictionaries/ru.json").then((m) => m.default as Dictionary),
  de: () => import("../dictionaries/de.json").then((m) => m.default as Dictionary),
};

export function hasLocale(locale: string): locale is Locale {
  const LOCALES = ["en", "fr", "ru", "de"];
  return LOCALES.includes(locale as any);
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
