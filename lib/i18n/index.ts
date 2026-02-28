import type { Dictionary } from "./types";
import es from "./es";
import ca from "./ca";
import en from "./en";

export type Locale = "es" | "ca" | "en";
export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { es, ca, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.es;
}

export const locales: Locale[] = ["es", "ca", "en"];
export const defaultLocale: Locale = "es";
