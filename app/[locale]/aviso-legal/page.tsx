import type { Metadata } from "next";
import { getDictionary, type Locale, locales } from "@/lib/i18n";
import { generatePageMetadata } from "@/lib/seo";

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
    ...generatePageMetadata(locale, dict, "/aviso-legal"),
    title: `${dict.legal.avisoLegal.title} — Dr. Albert Pardo Pol`,
  };
}

export default async function AvisoLegal({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
        {dict.legal.avisoLegal.title}
      </h1>
      <div
        className="prose prose-sm mt-8 max-w-none text-text-secondary"
        dangerouslySetInnerHTML={{ __html: dict.legal.avisoLegal.content }}
      />
    </article>
  );
}
