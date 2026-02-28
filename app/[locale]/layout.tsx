import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { generateStructuredData } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import BookingModal from "@/components/BookingModal";
import ConditionModal from "@/components/ConditionModal";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const langMap: Record<Locale, string> = {
  es: "es-ES",
  ca: "ca-ES",
  en: "en",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const dict = getDictionary(locale);
  const structuredData = generateStructuredData(locale);

  return (
    <html lang={langMap[locale]}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {structuredData.map((data, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}
      </head>
      <body className="text-text-primary antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
        >
          {locale === "ca" ? "Salta al contingut" : locale === "en" ? "Skip to content" : "Saltar al contenido"}
        </a>
        <Header locale={locale} dict={dict} />
        <main id="main-content">{children}</main>
        <Footer locale={locale} dict={dict} />
        <StickyCTA dict={dict} />
        <BookingModal dict={dict} />
        <ConditionModal dict={dict} />
      </body>
    </html>
  );
}
