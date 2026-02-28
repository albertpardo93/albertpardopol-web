import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import ScrollReveal from "./ScrollReveal";

/* Inline SVG icons per condition slug — medical/anatomical style */
const conditionIcons: Record<string, React.ReactNode> = {
  "tunel-carpiano": (
    <svg viewBox="0 0 40 40" fill="none" className="h-9 w-9">
      <rect x="4" y="12" width="32" height="16" rx="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 20h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.2" />
      <circle cx="20" cy="20" r="1.5" fill="currentColor" />
    </svg>
  ),
  "dedo-en-gatillo": (
    <svg viewBox="0 0 40 40" fill="none" className="h-9 w-9">
      <path d="M20 6v20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 26c0 4-3 8-3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="16" y="14" width="8" height="4" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 18h12" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
    </svg>
  ),
  "quistes-sinoviales": (
    <svg viewBox="0 0 40 40" fill="none" className="h-9 w-9">
      <path d="M12 28c-2-4 0-12 8-14s12 4 12 10-4 10-10 10-8-2-10-6z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="22" cy="18" r="5" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  "lesiones-tendinosas": (
    <svg viewBox="0 0 40 40" fill="none" className="h-9 w-9">
      <path d="M10 8c4 8 4 16 0 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 8c4 8 4 16 0 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 8c4 8 4 16 0 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 16l4 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  ),
  "fracturas-mano-muneca": (
    <svg viewBox="0 0 40 40" fill="none" className="h-9 w-9">
      <rect x="14" y="4" width="12" height="32" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 18l6 4 6-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="10" y1="20" x2="14" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="26" y1="20" x2="30" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
  ),
  "artrosis-pulgar": (
    <svg viewBox="0 0 40 40" fill="none" className="h-9 w-9">
      <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
      <path d="M12 28l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.3" />
    </svg>
  ),
  "lesiones-deportivas-muneca": (
    <svg viewBox="0 0 40 40" fill="none" className="h-9 w-9">
      <circle cx="20" cy="16" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 28h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 24v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 12l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "patologia-codo": (
    <svg viewBox="0 0 40 40" fill="none" className="h-9 w-9">
      <path d="M10 8v12c0 4 4 8 10 8s10-4 10-8V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 20h20" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" opacity="0.4" />
      <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 32h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  "microcirugia-reconstructiva": (
    <svg viewBox="0 0 40 40" fill="none" className="h-9 w-9">
      <circle cx="20" cy="14" r="8" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="14" r="4" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="20" cy="14" r="1.5" fill="currentColor" />
      <path d="M12 26h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 30h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 34h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

export default function Conditions({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <section id="condiciones" className="bg-surface px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <h2 className="text-center font-display text-2xl font-semibold text-text-primary sm:text-3xl lg:text-4xl">
            {dict.conditions.title}
          </h2>
        </ScrollReveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dict.conditions.items.map((item, i) => (
            <ScrollReveal key={item.name} delay={i + 1}>
              <Link
                href={`/${locale}/patologias/${item.slug}`}
                className="group block h-full"
              >
                <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:scale-[1.02] hover:border-primary/30">
                  {/* Accent top bar */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-accent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors duration-300 group-hover:bg-primary/10">
                      {conditionIcons[item.slug] ?? (
                        <svg viewBox="0 0 40 40" fill="none" className="h-9 w-9">
                          <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M20 14v12M14 20h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-text-primary">
                        {item.name}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto pt-5">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all duration-300 group-hover:text-primary-dark group-hover:gap-2.5">
                      {dict.conditions.cta}
                      <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </article>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
