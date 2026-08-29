import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
  const parentCondition = condition.parentSlug
    ? dict.conditions.items.find((item) => item.slug === condition.parentSlug)
    : undefined;
  const breadcrumbJsonLd = generateBreadcrumbSchema(locale, condition, parentCondition);
  const fractureChildren = dict.conditions.items.filter(
    (item) => item.parentSlug === condition.slug
  );
  const references = condition.slug === "quistes-sinoviales"
    ? [{ label: "American Society for Surgery of the Hand — Ganglion cysts", href: "https://www.assh.org/handcare/servlet/servlet.FileDownload?file=00P0a00000ocYFOEA2" }]
    : condition.slug === "artrosis-pulgar"
      ? [{ label: "American Society for Surgery of the Hand — Thumb arthritis", href: "https://www.assh.org/handcare/servlet/servlet.FileDownload?file=00P0a00000ocYBfEAM" }]
      : condition.slug === "fractura-dedo-falange"
        ? [{ label: "NHS — Broken finger or thumb", href: "https://www.nhs.uk/conditions/broken-finger/" }]
        : (condition.slug === "fracturas-mano-muneca" || condition.parentSlug === "fracturas-mano-muneca")
          ? [{ label: "NHS — Hand and finger injury guidance", href: "https://www.nhs.uk/symptoms/hand-pain/finger-pain/" }]
          : [];

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
              {parentCondition && (
                <>
                  <li>
                    <Link href={`/${locale}/patologias/${parentCondition.slug}`} className="transition-colors hover:text-white">
                      {parentCondition.name}
                    </Link>
                  </li>
                  <li aria-hidden="true" className="text-accent/40">&rsaquo;</li>
                </>
              )}
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
          {(condition.slug === "fracturas-mano-muneca" || condition.parentSlug === "fracturas-mano-muneca") && (
            <figure className="mb-10 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
              <div className="relative aspect-[16/9]">
                <Image src="/conditions/fracturas-mano-muneca.jpg" alt={condition.imageAlt} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" priority />
              </div>
            </figure>
          )}

          <aside className="mb-8 flex flex-col gap-3 rounded-xl border border-primary/10 bg-surface px-5 py-4 text-sm text-text-secondary sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-text-primary">
                {locale === "en" ? "Medically reviewed by Dr Albert Pardo Pol" : locale === "ca" ? "Revisat mèdicament pel Dr. Albert Pardo Pol" : "Revisado médicamente por el Dr. Albert Pardo Pol"}
              </p>
              <p className="mt-1">
                {locale === "en" ? "Hand surgeon · Updated 29 August 2026" : locale === "ca" ? "Cirurgià de mà · Actualitzat el 29 d'agost de 2026" : "Cirujano de mano · Actualizado el 29 de agosto de 2026"}
              </p>
            </div>
            <Link href={`/${locale}/sobre-mi`} className="shrink-0 font-semibold text-primary hover:text-primary-light">
              {locale === "en" ? "Credentials and experience" : locale === "ca" ? "Formació i experiència" : "Formación y experiencia"} &rarr;
            </Link>
          </aside>

          <div
            className="prose prose-sm max-w-none text-text-secondary sm:prose-base prose-headings:font-display prose-headings:text-text-primary prose-h2:text-lg prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-l-4 prose-h2:border-primary/30 prose-h2:pl-4 prose-p:leading-relaxed prose-ul:mt-2 prose-li:marker:text-primary prose-strong:text-text-primary"
            dangerouslySetInnerHTML={{ __html: condition.detail }}
          />

          {fractureChildren.length > 0 && (
            <section className="mt-12 rounded-2xl border border-primary/10 bg-surface p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-text-primary">
                {locale === "en" ? "Guides by fracture location" : locale === "ca" ? "Guies segons la localització" : "Guías según la localización de la fractura"}
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {fractureChildren.map((child) => (
                  <Link key={child.slug} href={`/${locale}/patologias/${child.slug}`} className="group rounded-xl border border-border bg-white p-5 transition hover:border-primary/30 hover:shadow-sm">
                    <h3 className="font-display font-semibold text-text-primary group-hover:text-primary">{child.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{child.description}</p>
                    <span className="mt-3 inline-block text-sm font-semibold text-primary">{dict.conditions.cta} &rarr;</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {locale === "en" && (
            <section className="mt-10 rounded-2xl border border-border p-6 sm:p-8">
              <h2 className="font-display text-lg font-bold text-text-primary">Preparing for your appointment</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">English-speaking consultations are available in Barcelona and Vic. If possible, bring previous X-rays or scans, medical reports, a medication list and details of your insurer. New imaging can be arranged when clinically needed.</p>
            </section>
          )}

          {condition.slug === "artrosis-pulgar" && (
            <section className="mt-12">
              <h2 className="font-display text-xl font-bold text-text-primary">
                {locale === "en" ? "Thumb arthritis treatment comparison" : locale === "ca" ? "Comparativa de tractaments per a la rizartrosi" : "Comparativa de tratamientos para la rizartrosis"}
              </h2>
              <div className="mt-5 overflow-x-auto rounded-xl border border-border">
                <table className="w-full min-w-[620px] text-left text-sm">
                  <thead className="bg-surface text-text-primary"><tr><th className="p-4">{locale === "en" ? "Option" : locale === "ca" ? "Opció" : "Opción"}</th><th className="p-4">{locale === "en" ? "Main goal" : locale === "ca" ? "Objectiu" : "Objetivo"}</th><th className="p-4">{locale === "en" ? "When considered" : locale === "ca" ? "Quan es valora" : "Cuándo se valora"}</th></tr></thead>
                  <tbody className="divide-y divide-border text-text-secondary">
                    <tr><th className="p-4 font-semibold text-text-primary">{locale === "en" ? "Splint and exercises" : locale === "ca" ? "Fèrula i exercicis" : "Férula y ejercicios"}</th><td className="p-4">{locale === "en" ? "Reduce painful load and improve control" : locale === "ca" ? "Reduir la càrrega dolorosa i millorar el control" : "Reducir la carga dolorosa y mejorar el control"}</td><td className="p-4">{locale === "en" ? "Usually first-line for mild or moderate symptoms" : locale === "ca" ? "Habitualment al començament, en símptomes lleus o moderats" : "Suele ser la primera opción en síntomas leves o moderados"}</td></tr>
                    <tr><th className="p-4 font-semibold text-text-primary">{locale === "en" ? "Injection" : locale === "ca" ? "Infiltració" : "Infiltración"}</th><td className="p-4">{locale === "en" ? "Temporary symptom relief" : locale === "ca" ? "Alleujament temporal dels símptomes" : "Alivio temporal de los síntomas"}</td><td className="p-4">{locale === "en" ? "Persistent pain despite initial measures" : locale === "ca" ? "Dolor persistent malgrat les mesures inicials" : "Dolor persistente pese a las medidas iniciales"}</td></tr>
                    <tr><th className="p-4 font-semibold text-text-primary">{locale === "en" ? "Surgery" : locale === "ca" ? "Cirurgia" : "Cirugía"}</th><td className="p-4">{locale === "en" ? "Improve pain and hand function" : locale === "ca" ? "Millorar dolor i funció de la mà" : "Mejorar dolor y función de la mano"}</td><td className="p-4">{locale === "en" ? "Function-limiting pain after non-surgical care" : locale === "ca" ? "Dolor limitant després del tractament conservador" : "Dolor limitante tras tratamiento conservador"}</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-text-muted">{locale === "en" ? "The most appropriate option depends on symptoms, examination, X-rays and individual priorities." : locale === "ca" ? "L'opció més adequada depèn dels símptomes, l'exploració, les radiografies i les prioritats individuals." : "La opción más adecuada depende de los síntomas, la exploración, las radiografías y las prioridades de cada paciente."}</p>
            </section>
          )}

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

          {references.length > 0 && (
            <section className="mt-10 border-t border-border pt-8">
              <h2 className="font-display text-base font-bold text-text-primary">
                {locale === "en" ? "Medical references" : locale === "ca" ? "Referències mèdiques" : "Referencias médicas"}
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                {references.map((reference) => (
                  <li key={reference.href}>
                    <a href={reference.href} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline decoration-primary/30 underline-offset-4 hover:text-primary-light">
                      {reference.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs leading-relaxed text-text-muted">
                {locale === "en" ? "General information; it does not replace an individual medical assessment." : locale === "ca" ? "Informació general; no substitueix una valoració mèdica individual." : "Información general; no sustituye una valoración médica individual."}
              </p>
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
