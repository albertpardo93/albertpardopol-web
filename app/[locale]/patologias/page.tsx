import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, type Locale, locales } from "@/lib/i18n";
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/seo";
import { SITE_URL } from "@/lib/config";
import BookingTrigger from "@/components/BookingTrigger";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const metaTitles: Record<Locale, string> = {
  es: "Patologías de mano, muñeca y codo — Dr. Albert Pardo Pol",
  ca: "Patologies de mà, canell i colze — Dr. Albert Pardo Pol",
  en: "Hand, wrist & elbow conditions — Dr. Albert Pardo Pol",
};

const metaDescriptions: Record<Locale, string> = {
  es: "Información completa sobre patologías de mano, muñeca y codo: túnel carpiano, dedo en gatillo, fracturas, artrosis y más. Diagnóstico y tratamiento en Barcelona.",
  ca: "Informació completa sobre patologies de mà, canell i colze: túnel carpià, dit en gallet, fractures, artrosi i més. Diagnòstic i tractament a Barcelona.",
  en: "Complete information about hand, wrist and elbow conditions: carpal tunnel, trigger finger, fractures, arthritis and more. Diagnosis and treatment in Barcelona.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const base = generatePageMetadata(locale, dict, "/patologias");
  return {
    ...base,
    title: metaTitles[locale],
    description: metaDescriptions[locale],
  };
}

const pageTitle: Record<Locale, string> = {
  es: "Patologías",
  ca: "Patologies",
  en: "Conditions",
};

const pageSubtitle: Record<Locale, string> = {
  es: "Información detallada sobre las principales patologías de mano, muñeca y codo que tratamos",
  ca: "Informació detallada sobre les principals patologies de mà, canell i colze que tractem",
  en: "Detailed information about the main hand, wrist and elbow conditions we treat",
};

const homeLabel: Record<Locale, string> = {
  es: "Inicio",
  ca: "Inici",
  en: "Home",
};

export default async function PatologiasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabel[locale],
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageTitle[locale],
        item: `${SITE_URL}/${locale}/patologias`,
      },
    ],
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: metaTitles[locale],
    description: metaDescriptions[locale],
    url: `${SITE_URL}/${locale}/patologias`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: dict.conditions.items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/${locale}/patologias/${item.slug}`,
        name: item.name,
      })),
    },
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
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
                  {homeLabel[locale]}
                </Link>
              </li>
              <li aria-hidden="true" className="text-accent/40">
                &rsaquo;
              </li>
              <li>
                <span className="font-medium text-white">
                  {pageTitle[locale]}
                </span>
              </li>
            </ol>
          </nav>
          <h1 className="font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            {pageTitle[locale]}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-white/80">
            {pageSubtitle[locale]}
          </p>
        </div>
      </section>

      {/* Conditions grid */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {dict.conditions.items.map((item) => (
              <Link
                key={item.slug}
                href={`/${locale}/patologias/${item.slug}`}
                className="group block h-full"
              >
                <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white p-7 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-accent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
                  <h2 className="font-display text-base font-bold text-text-primary">
                    {item.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                  <div className="mt-auto pt-5">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-2.5 group-hover:text-primary-dark">
                      {dict.conditions.cta}
                      <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-surface px-6 py-8 text-center sm:px-8">
            <p className="font-display text-lg font-semibold text-text-primary sm:text-xl">
              {locale === "en"
                ? "Do you need an assessment?"
                : locale === "ca"
                  ? "Necessites una valoració?"
                  : "¿Necesitas una valoración?"}
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              {locale === "en"
                ? "Contact us to schedule a consultation"
                : locale === "ca"
                  ? "Contacta amb nosaltres per programar una consulta"
                  : "Contacta con nosotros para programar una consulta"}
            </p>
            <BookingTrigger className="mt-5 inline-block rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all duration-300 hover:scale-[1.02] hover:bg-primary-light hover:shadow-lg">
              {dict.conditions.bookCta}
            </BookingTrigger>
          </div>
        </div>
      </section>
    </div>
  );
}
