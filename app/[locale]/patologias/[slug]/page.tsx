import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, type Locale, locales } from "@/lib/i18n";
import { generateConditionMetadata, generateConditionStructuredData, generateConditionFAQSchema, generateBreadcrumbSchema } from "@/lib/seo";
import BookingTrigger from "@/components/BookingTrigger";
import BudgetForm from "@/components/BudgetForm";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const dict = getDictionary(locale);
    for (const item of dict.conditions.items) {
      params.push({ locale, slug: item.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const condition = dict.conditions.items.find((c) => c.slug === slug);
  if (!condition) return {};
  return generateConditionMetadata(locale, condition);
}

export default async function ConditionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const condition = dict.conditions.items.find((c) => c.slug === slug);

  if (!condition) notFound();

  const jsonLd = generateConditionStructuredData(locale, condition);
  const faqJsonLd = condition.faq.length > 0 ? generateConditionFAQSchema(condition.faq) : null;
  const breadcrumbJsonLd = generateBreadcrumbSchema(locale, condition);

  // Resolve related conditions
  const relatedConditions = condition.relatedSlugs
    .map((s) => dict.conditions.items.find((c) => c.slug === s))
    .filter(Boolean) as typeof dict.conditions.items[number][];

  const homeLabel = locale === "en" ? "Home" : locale === "ca" ? "Inici" : "Inicio";
  const conditionsLabel = locale === "en" ? "Conditions" : locale === "ca" ? "Patologies" : "Patologías";

  return (
    <article className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Header */}
      <section className="bg-primary px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-accent/70">
              <li>
                <Link
                  href={`/${locale}`}
                  className="transition-colors hover:text-white"
                >
                  {homeLabel}
                </Link>
              </li>
              <li aria-hidden="true" className="text-accent/40">&rsaquo;</li>
              <li>
                <Link
                  href={`/${locale}/patologias`}
                  className="transition-colors hover:text-white"
                >
                  {conditionsLabel}
                </Link>
              </li>
              <li aria-hidden="true" className="text-accent/40">&rsaquo;</li>
              <li>
                <span className="text-white font-medium">{condition.name}</span>
              </li>
            </ol>
          </nav>
          <h1 className="font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            {condition.name}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-white/80">
            {condition.description}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div
            className="prose prose-sm max-w-none text-text-secondary sm:prose-base prose-headings:font-display prose-headings:text-text-primary prose-h2:text-lg prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-l-4 prose-h2:border-primary/30 prose-h2:pl-4 prose-p:leading-relaxed prose-ul:mt-2 prose-li:marker:text-primary prose-strong:text-text-primary"
            dangerouslySetInnerHTML={{ __html: condition.detail }}
          />

          {/* CTA between content and FAQ */}
          <div className="mt-10 rounded-2xl bg-surface px-6 py-6 sm:px-8 sm:py-8">
            <p className="font-display text-lg font-semibold text-text-primary sm:text-xl">
              {locale === "en"
                ? "Do you need an assessment?"
                : locale === "ca"
                  ? "Necessites una valoració?"
                  : "¿Necesitas una valoración?"}
            </p>
            <BookingTrigger className="mt-4 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all duration-300 hover:bg-primary-light hover:shadow-lg hover:scale-[1.02]">
              {locale === "en"
                ? "Book an appointment"
                : locale === "ca"
                  ? "Demanar cita"
                  : "Pedir cita"}
            </BookingTrigger>
          </div>

          <BudgetForm dict={dict} conditionName={condition.name} />

          {condition.faq.length > 0 && (
            <section className="mt-14">
              <div className="-mx-4 rounded-2xl bg-surface px-4 py-10 sm:-mx-8 sm:px-8 sm:py-12">
                <h2 className="font-display text-lg font-bold text-text-primary sm:text-xl">
                  {locale === "en"
                    ? "Frequently asked questions"
                    : locale === "ca"
                      ? "Preguntes freqüents"
                      : "Preguntas frecuentes"}
                </h2>
                <dl className="mt-6 space-y-0 divide-y divide-border">
                  {condition.faq.map((item, idx) => (
                    <div key={idx} className="py-5">
                      <dt className="text-base font-semibold text-text-primary">
                        {item.question}
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed text-text-secondary sm:text-base">
                        {item.answer}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </section>
          )}

          {/* Related conditions */}
          {relatedConditions.length > 0 && (
            <section className="mt-14">
              <h2 className="font-display text-lg font-bold text-text-primary sm:text-xl">
                {locale === "en"
                  ? "Related conditions"
                  : locale === "ca"
                    ? "Patologies relacionades"
                    : "Patologías relacionadas"}
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {relatedConditions.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/${locale}/patologias/${related.slug}`}
                    className="group rounded-xl border border-border bg-white p-5 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md hover:scale-[1.01]"
                  >
                    <h3 className="font-display text-sm font-semibold text-text-primary group-hover:text-primary sm:text-base">
                      {related.name}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-text-secondary line-clamp-2 sm:text-sm">
                      {related.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary sm:text-sm">
                      {dict.conditions.cta}
                      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <BookingTrigger className="rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-md shadow-primary/20 transition-all duration-300 hover:bg-primary-light hover:shadow-lg hover:scale-[1.02]">
              {dict.conditions.bookCta}
            </BookingTrigger>
            <Link
              href={`/${locale}/patologias`}
              className="text-sm font-medium text-primary transition-colors hover:text-primary-light"
            >
              {locale === "en"
                ? "View all conditions"
                : locale === "ca"
                  ? "Veure totes les patologies"
                  : "Ver todas las patologias"}
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
