"use client";

import { useState } from "react";
import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import BookingTrigger from "./BookingTrigger";

const navLinks = (locale: Locale, dict: Dictionary) => [
  { href: `/${locale}/sobre-mi`, label: dict.nav.aboutMe },
  { href: `/${locale}#condiciones`, label: dict.nav.conditions },
  { href: `/${locale}#centros`, label: dict.nav.centers },
  { href: `/${locale}#contacto`, label: dict.nav.contact },
];

export default function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [open, setOpen] = useState(false);
  const links = navLinks(locale, dict);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-primary/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link
          href={`/${locale}`}
          className="font-display text-lg font-semibold text-white transition-opacity hover:opacity-80"
        >
          Dr. Albert Pardo Pol
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} />
          <BookingTrigger className="hidden rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-primary transition-all duration-300 hover:bg-accent hover:scale-[1.03] sm:inline-flex">
            {dict.nav.bookAppointment}
          </BookingTrigger>

          {/* Hamburger button */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 md:hidden"
            aria-label={dict.nav.menu}
            aria-expanded={open}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {open ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          className="border-t border-white/10 bg-primary/98 px-4 pb-4 pt-2 md:hidden"
          aria-label="Mobile"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <BookingTrigger
            className="mt-2 w-full rounded-xl bg-white px-5 py-2.5 text-center text-sm font-semibold text-primary transition-all duration-300 hover:bg-accent"
            onClick={() => setOpen(false)}
          >
            {dict.nav.bookAppointment}
          </BookingTrigger>
        </nav>
      )}
    </header>
  );
}
