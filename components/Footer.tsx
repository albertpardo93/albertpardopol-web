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
                  <path d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" />
                </svg>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-white">
                  {contact.phone}
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
