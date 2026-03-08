import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, type Locale, locales } from "@/lib/i18n";
import { generatePageMetadata } from "@/lib/seo";
import { SITE_URL, contact } from "@/lib/config";
import BookingTrigger from "@/components/BookingTrigger";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  return {
    ...generatePageMetadata(locale, dict, "/info-paciente"),
    title: `${dict.patientInfo.title} — Dr. Albert Pardo Pol`,
  };
}

export default async function PatientInfoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const t = dict.patientInfo;

  const homeLabel =
    locale === "en" ? "Home" : locale === "ca" ? "Inici" : "Inicio";
  const pageLabel = t.title;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabel,
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageLabel,
        item: `${SITE_URL}/${locale}/info-paciente`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Header */}
      <section className="bg-primary px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-accent/70">
              <li>
                <Link
                  href={`/${locale}`}
                  className="transition-colors hover:text-white"
                >
                  {homeLabel}
                </Link>
              </li>
              <li aria-hidden="true" className="text-accent/40">
                &rsaquo;
              </li>
              <li>
                <span className="font-medium text-white">{pageLabel}</span>
              </li>
            </ol>
          </nav>
          <h1 className="font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            {t.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-white/80">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          {/* Table of contents */}
          <nav className="mb-10 rounded-2xl border border-border bg-surface px-6 py-6">
            <h2 className="font-display text-base font-semibold text-text-primary sm:text-lg">
              {locale === "en"
                ? "Contents"
                : locale === "ca"
                  ? "Contingut"
                  : "Contenido"}
            </h2>
            <ol className="mt-3 space-y-1.5">
              {t.sections.map((section, idx) => (
                <li key={idx}>
                  <a
                    href={`#section-${idx}`}
                    className="text-sm text-primary transition-colors hover:text-primary-light"
                  >
                    {idx + 1}. {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Sections */}
          {t.sections.map((section, idx) => (
            <div key={idx} id={`section-${idx}`} className="scroll-mt-20">
              {idx > 0 && <hr className="my-10 border-border" />}
              <div
                className="prose prose-sm max-w-none text-text-secondary sm:prose-base prose-headings:font-display prose-headings:text-text-primary prose-h2:text-lg prose-h2:mt-0 prose-h2:mb-4 prose-h2:border-l-4 prose-h2:border-primary/30 prose-h2:pl-4 prose-p:leading-relaxed prose-ul:mt-2 prose-li:marker:text-primary prose-strong:text-text-primary"
              >
                <h2>{section.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </div>
            </div>
          ))}

          {/* Emergency WhatsApp */}
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 flex items-center gap-3 rounded-xl border border-border bg-surface px-5 py-3.5 text-sm transition-all hover:border-green-300 hover:shadow-sm"
          >
            <svg className="h-5 w-5 shrink-0 text-green-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="text-text-secondary">
              {locale === "en"
                ? "For surgical emergencies, contact me via "
                : locale === "ca"
                  ? "Per a urgències quirúrgiques, contacta'm per "
                  : "Para urgencias quirúrgicas, contáctame por "}
              <span className="font-semibold text-green-600">WhatsApp</span>
            </span>
          </a>

          {/* Book appointment CTA */}
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <BookingTrigger className="rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-md shadow-primary/20 transition-all duration-300 hover:bg-primary-light hover:shadow-lg hover:scale-[1.02]">
              {dict.conditions.bookCta}
            </BookingTrigger>
            <Link
              href={`/${locale}#condiciones`}
              className="text-sm font-medium text-primary transition-colors hover:text-primary-light"
            >
              {locale === "en"
                ? "View all conditions"
                : locale === "ca"
                  ? "Veure totes les patologies"
                  : "Ver todas las patologías"}
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
