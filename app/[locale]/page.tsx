import type { Metadata } from "next";
import { getDictionary, type Locale, locales } from "@/lib/i18n";
import { generatePageMetadata } from "@/lib/seo";
import Hero from "@/components/Hero";

import Conditions from "@/components/Conditions";
import Centers from "@/components/Centers";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
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
  return generatePageMetadata(locale, dict);
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <Hero dict={dict} locale={locale} />
      <Conditions dict={dict} locale={locale} />
      <Centers dict={dict} />
      <FAQ dict={dict} />
      <Contact dict={dict} />
    </>
  );
}
