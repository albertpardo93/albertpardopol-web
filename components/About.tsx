import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import BookingTrigger from "./BookingTrigger";

export default function About({ dict }: { dict: Dictionary }) {
  return (
    <article id="sobre-mi" className="bg-white">
      {/* Hero intro */}
      <section className="bg-primary px-4 py-14 sm:py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-12">
          <Image
            src="/dr-pardo-quirofano.jpg"
            alt="Dr. Albert Pardo Pol en quirófano"
            width={320}
            height={400}
            className="h-48 w-44 shrink-0 rounded-2xl object-cover object-top shadow-lg ring-1 ring-white/20 sm:h-64 sm:w-52"
            priority
          />
          <div>
            <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              Dr. Albert Pardo Pol
            </h1>
            <p className="mt-1 text-base font-medium text-accent">
              {dict.hero.title}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
              {dict.about.intro}
            </p>
            <BookingTrigger className="mt-6 inline-block rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary shadow-md shadow-black/15 transition-all duration-300 hover:bg-accent hover:shadow-lg hover:scale-[1.03]">
              {dict.hero.cta}
            </BookingTrigger>
          </div>
        </div>
      </section>

      {/* Highlights strip */}
      <section className="border-y border-border px-4 py-8">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
          {dict.about.highlights.map((h) => (
            <div key={h.label}>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {h.label}
              </p>
              <p className="mt-1 text-sm leading-snug text-text-primary">
                {h.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Formation timeline */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-lg font-semibold text-text-primary sm:text-xl">
            {dict.about.formationTitle}
          </h2>
          <div className="mt-6 space-y-0 border-l-2 border-primary/20 pl-8">
            {dict.about.formation.map((item, idx) => (
              <div key={item}>
                <div className="relative py-4">
                  {/* Timeline dot with icon */}
                  <span className="absolute -left-[37px] top-5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-white shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {item}
                  </p>
                </div>
                {/* ICATME photo — right after Dexeus item */}
                {idx === 1 && (
                  <div className="my-4 ml-2 max-w-sm overflow-hidden rounded-xl border border-border shadow-sm">
                    <Image
                      src="/dr-pardo-icatme.png"
                      alt="Equipo ICATME"
                      width={974}
                      height={1298}
                      className="w-full"
                    />
                    <p className="bg-surface px-3 py-2 text-xs text-text-muted">
                      Unidad de Mano — ICATME, Hospital Universitari Dexeus
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Experience */}
          <h2 className="mt-10 font-display text-lg font-semibold text-text-primary sm:text-xl">
            {dict.about.experienceTitle}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
            {dict.about.experience}
          </p>

          {/* Memberships */}
          <h2 className="mt-10 font-display text-lg font-semibold text-text-primary sm:text-xl">
            {dict.about.membershipsTitle}
          </h2>
          <ul className="mt-4 space-y-2">
            {dict.about.memberships.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="mt-0.5 shrink-0 text-primary"
                  aria-hidden="true"
                >
                  <path
                    d="M13.3 4.3L6 11.6L2.7 8.3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
