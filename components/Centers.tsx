import type { Dictionary } from "@/lib/i18n";
import BookingTrigger from "./BookingTrigger";
import ScrollReveal from "./ScrollReveal";

export default function Centers({ dict }: { dict: Dictionary }) {
  return (
    <section id="centros" className="bg-white px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <h2 className="text-center font-display text-2xl font-semibold text-text-primary sm:text-3xl lg:text-4xl">
            {dict.centers.title}
          </h2>
        </ScrollReveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {dict.centers.items.map((center, i) => (
            <ScrollReveal key={center.name} delay={i + 1}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:scale-[1.02]">
                <div className="flex items-start gap-3">
                  {/* Hospital icon */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01M9 13h.01M15 13h.01" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">
                      {center.name}
                    </h3>
                  </div>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
                  {center.description}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-text-muted">
                  <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 shrink-0">
                    <path fillRule="evenodd" d="M8 14.5a.5.5 0 00.5-.5V3.707l3.146 3.147a.5.5 0 10.708-.708l-4-4a.5.5 0 00-.708 0l-4 4a.5.5 0 10.708.708L7.5 3.707V14a.5.5 0 00.5.5z" clipRule="evenodd" />
                  </svg>
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                  </svg>
                  {center.hours}
                </div>
                <BookingTrigger className="mt-5 block rounded-xl bg-primary py-3 text-center text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all duration-300 hover:bg-primary-light hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02]">
                  {center.cta}
                </BookingTrigger>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
