import Link from "next/link";
import Image from "next/image";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getConditionImage } from "@/lib/condition-images";
import ScrollReveal from "./ScrollReveal";

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
          {dict.conditions.items.filter((item) => !item.parentSlug).map((item, i) => (
            <ScrollReveal key={item.name} delay={i + 1}>
              <Link
                href={`/${locale}/patologias/${item.slug}`}
                className="group block h-full"
              >
                <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:scale-[1.02] hover:border-primary/30 sm:p-6">
                  {/* Accent top bar */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-accent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="grid grid-cols-[6rem_minmax(0,1fr)] items-start gap-3 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-4">
                    <div className="relative h-32 w-24 overflow-hidden rounded-xl bg-white sm:h-36 sm:w-32">
                      <Image
                        src={getConditionImage(item.slug)}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 640px) 96px, 128px"
                        className="object-contain object-center"
                      />
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
