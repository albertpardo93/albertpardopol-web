import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

const locales = ["es", "ca", "en"];
const hreflangMap: Record<string, string> = { es: "es-ES", ca: "ca-ES", en: "en" };
const pages = [
  { path: "", priority: 1.0, freq: "weekly" as const, lastMod: "2026-04-15" },
  { path: "/sobre-mi", priority: 0.9, freq: "monthly" as const, lastMod: "2026-04-15" },
  { path: "/patologias", priority: 0.9, freq: "monthly" as const, lastMod: "2026-04-15" },
  { path: "/info-paciente", priority: 0.8, freq: "monthly" as const, lastMod: "2026-04-15" },
  { path: "/aviso-legal", priority: 0.3, freq: "monthly" as const, lastMod: "2025-01-10" },
  { path: "/politica-de-privacidad", priority: 0.3, freq: "monthly" as const, lastMod: "2025-01-10" },
  { path: "/politica-de-cookies", priority: 0.3, freq: "monthly" as const, lastMod: "2025-01-10" },
];

const conditionSlugs = [
  "tunel-carpiano",
  "dedo-en-gatillo",
  "quistes-sinoviales",
  "lesiones-tendinosas",
  "fracturas-mano-muneca",
  "artrosis-pulgar",
  "lesiones-deportivas-muneca",
  "patologia-codo",
  "microcirugia-reconstructiva",
];

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
        lastModified: new Date("2026-03-29"),
        alternates: { languages },
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
