"use client";

import { useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { reviews } from "@/lib/reviews";
import ScrollReveal from "./ScrollReveal";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1"
          className={i < rating ? "text-star" : "text-text-muted"}
          aria-hidden="true"
        >
          <path d="M8 1l2.2 4.5 5 .7-3.6 3.5.8 5L8 12.4 3.6 14.7l.8-5L.8 6.2l5-.7L8 1z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  moreLabel,
  lessLabel,
}: {
  review: { name: string; rating: number; text: string; timeAgo: string };
  moreLabel: string;
  lessLabel: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="flex w-72 shrink-0 flex-col rounded-2xl border border-border bg-white p-5 shadow-sm transition-all hover:shadow-md hover:shadow-primary/5 sm:w-auto">
      <Stars rating={review.rating} />
      <p
        className={`mt-3 text-sm leading-relaxed text-text-secondary ${expanded ? "" : "line-clamp-3"}`}
      >
        &ldquo;{review.text}&rdquo;
      </p>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="mt-2 self-start text-xs font-medium text-primary hover:text-primary-dark"
      >
        {expanded ? lessLabel : moreLabel}
      </button>
      <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
        <span className="text-sm font-medium text-text-primary">
          {review.name}
        </span>
        <span className="text-xs text-text-muted">{review.timeAgo}</span>
      </div>
    </article>
  );
}

export default function Reviews({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const localeReviews = reviews[locale] ?? reviews.es;

  const moreLabel =
    locale === "es" ? "Leer más" : locale === "ca" ? "Llegir més" : "Read more";
  const lessLabel =
    locale === "es"
      ? "Leer menos"
      : locale === "ca"
        ? "Llegir menys"
        : "Show less";

  const scrollHint =
    locale === "es"
      ? "Desliza para ver más"
      : locale === "ca"
        ? "Llisca per veure més"
        : "Swipe to see more";

  return (
    <section id="opiniones" className="bg-surface px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <h2 className="text-center font-display text-2xl font-semibold text-text-primary sm:text-3xl lg:text-4xl">
            {dict.reviews.title}
          </h2>
          {/* Google Reviews badge */}
          <div className="mt-3 flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="text-star" aria-hidden="true">
                  <path d="M8 1l2.2 4.5 5 .7-3.6 3.5.8 5L8 12.4 3.6 14.7l.8-5L.8 6.2l5-.7L8 1z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-text-muted">Google Reviews</span>
          </div>
        </ScrollReveal>
        <div className="scroll-snap-x scrollbar-hide -mx-4 mt-12 flex gap-4 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
          {localeReviews.map((review, i) => (
            <ScrollReveal key={i} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <ReviewCard
                review={review}
                moreLabel={moreLabel}
                lessLabel={lessLabel}
              />
            </ScrollReveal>
          ))}
        </div>
        {/* Mobile scroll hint */}
        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-text-muted sm:hidden">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M10.21 14.77a.75.75 0 01.02-1.06L14.168 10 10.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M4.21 14.77a.75.75 0 01.02-1.06L8.168 10 4.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
          </svg>
          {scrollHint}
        </p>

        {/* Google Reviews link */}
        <div className="mt-8 flex justify-center">
          <a
            href="https://maps.app.goo.gl/EjC3sZLeLb3PK2bo7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-xl border border-border bg-white px-6 py-3 text-sm font-medium text-text-primary shadow-sm transition-all hover:shadow-md hover:border-primary/30"
          >
            {/* Google "G" icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {locale === "en"
              ? "See all reviews on Google"
              : locale === "ca"
                ? "Veure totes les opinions a Google"
                : "Ver todas las opiniones en Google"}
          </a>
        </div>
      </div>
    </section>
  );
}
