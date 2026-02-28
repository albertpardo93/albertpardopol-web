import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, type Locale, locales } from "@/lib/i18n";
import { generatePageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/config";
import About from "@/components/About";

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
    ...generatePageMetadata(locale, dict, "/sobre-mi"),
    title: `${dict.about.title} — Dr. Albert Pardo Pol`,
  };
}

export default async function SobreMiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);

  const homeLabel = locale === "en" ? "Home" : locale === "ca" ? "Inici" : "Inicio";
  const aboutLabel = locale === "en" ? "About me" : locale === "ca" ? "Sobre mi" : "Sobre mí";

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
        name: aboutLabel,
        item: `${SITE_URL}/${locale}/sobre-mi`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb visual */}
      <nav aria-label="Breadcrumb" className="bg-primary/95 px-4 pt-4">
        <div className="mx-auto max-w-5xl">
          <ol className="flex items-center gap-1.5 text-sm text-accent/70">
            <li>
              <Link href={`/${locale}`} className="transition-colors hover:text-white">
                {homeLabel}
              </Link>
            </li>
            <li className="text-white/40">/</li>
            <li className="text-white">{aboutLabel}</li>
          </ol>
        </div>
      </nav>

      <About dict={dict} />
    </>
  );
}
