import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import BookingTrigger from "./BookingTrigger";
import HeroImage from "./HeroImage";

export default function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section className="relative overflow-hidden bg-primary">
      {/* Subtle background pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(180,214,227,0.08),transparent_70%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pb-20 pt-14 sm:flex-row sm:items-center sm:gap-16 sm:pb-28 sm:pt-24 lg:gap-24">
        {/* Photo */}
        <div className="sm:order-2 sm:shrink-0">
          <HeroImage />
        </div>

        {/* Content */}
        <div className="mt-10 flex-1 text-center sm:order-1 sm:mt-0 sm:text-left">
          <h1 className="hero-animate-name font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Dr. Albert Pardo Pol
          </h1>
          <p className="hero-animate-title mt-4 text-lg font-medium text-accent sm:text-xl">
            {dict.hero.title}
          </p>
          <p className="hero-animate-title mt-1 text-base leading-relaxed text-white/80 sm:text-lg">
            {dict.hero.subtitle}
          </p>
          <p className="hero-animate-title mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
              <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.5 7.5h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3a.5.5 0 011 0v3h3a.5.5 0 010 1z" opacity="0.6"/>
            </svg>
            Nº col. 55208
          </p>
          <div className="hero-animate-cta mt-10 flex flex-col items-center gap-5 sm:flex-row sm:items-center">
            <BookingTrigger className="w-full rounded-2xl bg-white px-10 py-4 text-center text-base font-semibold text-primary shadow-lg shadow-black/15 transition-all duration-300 hover:bg-accent hover:shadow-xl hover:scale-[1.03] sm:w-auto">
              {dict.hero.cta}
            </BookingTrigger>
            <Link
              href={`/${locale}/sobre-mi`}
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-all duration-300 hover:text-white"
            >
              {dict.hero.moreInfo}
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
