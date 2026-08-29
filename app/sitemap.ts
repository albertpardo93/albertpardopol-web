import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

const locales = ["es", "ca", "en"];
const hreflangMap: Record<string, string> = { es: "es-ES", ca: "ca-ES", en: "en" };
const pages = [
  { path: "", priority: 1.0, freq: "weekly" as const, lastMod: "2026-04-15" },
  { path: "/cirujano-mano/vic", priority: 0.9, freq: "monthly" as const, lastMod: "2026-08-21" },
  { path: "/sobre-mi", priority: 0.9, freq: "monthly" as const, lastMod: "2026-04-15" },
  { path: "/patologias", priority: 0.9, freq: "monthly" as const, lastMod: "2026-04-15" },
  { path: "/info-paciente", priority: 0.8, freq: "monthly" as const, lastMod: "2026-04-15" },
];

const conditionSlugs = [
  "tunel-carpiano",
  "dedo-en-gatillo",
  "quistes-sinoviales",
  "lesiones-tendinosas",
  "fracturas-mano-muneca",
  "fractura-escafoides",
  "fractura-radio-distal",
  "fractura-metacarpiano",
  "fractura-dedo-falange",
  "artrosis-pulgar",
  "lesiones-deportivas-muneca",
  "patologia-codo",
  "microcirugia-reconstructiva",
];

const updatedConditionPages = new Set([
  "es:quistes-sinoviales",
  "es:fracturas-mano-muneca",
  "es:artrosis-pulgar",
  "en:tunel-carpiano",
  "en:quistes-sinoviales",
  "en:fracturas-mano-muneca",
  "en:artrosis-pulgar",
]);

const newFracturePages = new Set([
  "fractura-escafoides",
  "fractura-radio-distal",
  "fractura-metacarpiano",
  "fractura-dedo-falange",
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      const languages: Record<string, string> = {};
      for (const l of locales) {
        languages[hreflangMap[l]] = `${SITE_URL}/${l}${page.path}`;
      }
      languages["x-default"] = `${SITE_URL}/es${page.path}`;

      entries.push({
        url: `${SITE_URL}/${locale}${page.path}`,
        lastModified: new Date(page.lastMod),
        alternates: { languages },
        changeFrequency: page.freq,
        priority: page.priority,
      });
    }
  }

  for (const slug of conditionSlugs) {
    for (const locale of locales) {
      const path = `/patologias/${slug}`;
      const languages: Record<string, string> = {};
      for (const l of locales) {
        languages[hreflangMap[l]] = `${SITE_URL}/${l}${path}`;
      }
      languages["x-default"] = `${SITE_URL}/es${path}`;

      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(
          newFracturePages.has(slug)
            ? "2026-08-29"
            : updatedConditionPages.has(`${locale}:${slug}`)
              ? "2026-08-21"
              : "2026-03-29"
        ),
        alternates: { languages },
        changeFrequency: "monthly",
        priority: newFracturePages.has(slug) ? 0.85 : 0.8,
      });
    }
  }

  return entries;
}
