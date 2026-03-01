import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { contact } from "@/lib/config";

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const year = new Date().getFullYear();

  const contactLabel = locale === "en" ? "Contact" : locale === "ca" ? "Contacte" : "Contacto";
  const conditionsLabel = locale === "en" ? "Conditions" : locale === "ca" ? "Patologies" : "Patologías";
  const scheduleLabel = locale === "en" ? "Mon–Fri, 9:00–20:00" : locale === "ca" ? "Dl–Dv, 9:00–20:00" : "Lun–Vie, 9:00–20:00";

  // Show top 5 conditions in footer for SEO
  const topConditions = dict.conditions.items.slice(0, 5);

  return (
    <footer className="border-t border-primary-light/20 bg-primary pb-24 sm:pb-8">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:py-12">
        {/* Main footer grid */}
        <div className="grid gap-8 sm:grid-cols-3 sm:gap-12">
          {/* Brand column */}
          <div>
            <p className="font-display text-lg font-semibold text-white">
              Dr. Albert Pardo Pol
            </p>
            <p className="mt-2 text-sm leading-relaxed text-accent/70">
              {dict.hero.title}
            </p>
            <p className="mt-1 text-xs text-accent/50">
              Nº col. 55208
            </p>
          </div>

          {/* Conditions column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-accent/50">
              {conditionsLabel}
            </h3>
            <ul className="mt-3 space-y-2">
              {topConditions.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/${locale}/patologias/${item.slug}`}
                    className="text-sm text-accent/70 transition-colors hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-accent/50">
              {contactLabel}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-accent/70">
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-accent/50">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href={`mailto:${contact.email}`} className="transition-colors hover:text-white">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-accent/50">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Barcelona</span>
              </li>
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-accent/50">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                </svg>
                <span>{scheduleLabel}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-primary-light/15 pt-6">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-xs text-accent/50">
              &copy; {year} Dr. Albert Pardo Pol. {dict.footer.rights}
            </p>
            <nav className="flex flex-wrap justify-center gap-4 text-xs" aria-label="Legal">
              <Link
                href={`/${locale}/aviso-legal`}
                className="text-accent/50 transition-colors hover:text-white"
              >
                {dict.footer.legal}
              </Link>
              <Link
                href={`/${locale}/politica-de-privacidad`}
                className="text-accent/50 transition-colors hover:text-white"
              >
                {dict.footer.privacy}
              </Link>
              <Link
                href={`/${locale}/politica-de-cookies`}
                className="text-accent/50 transition-colors hover:text-white"
              >
                {dict.footer.cookies}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
