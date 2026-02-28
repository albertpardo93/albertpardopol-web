"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

const labels: Record<Locale, string> = {
  es: "ES",
  ca: "CA",
  en: "EN",
};

const allLocales: Locale[] = ["es", "ca", "en"];

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  function getLocalePath(targetLocale: Locale) {
    // Replace current locale segment with target
    const segments = pathname.split("/");
    segments[1] = targetLocale;
    return segments.join("/");
  }

  return (
    <nav aria-label="Language" className="flex gap-1">
      {allLocales.map((l) => (
        <Link
          key={l}
          href={getLocalePath(l)}
          hrefLang={l}
          className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
            l === locale
              ? "bg-white/20 text-white"
              : "text-white/60 hover:text-white hover:bg-white/10"
          }`}
          aria-current={l === locale ? "page" : undefined}
        >
          {labels[l]}
        </Link>
      ))}
    </nav>
  );
}
