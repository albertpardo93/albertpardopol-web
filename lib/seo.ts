import type { Metadata } from "next";
import { SITE_URL, REVIEWS_ARE_VERIFIED } from "./config";

export type Locale = "es" | "ca" | "en";

export const locales: Locale[] = ["es", "ca", "en"];
export const defaultLocale: Locale = "es";

const hreflangMap: Record<Locale, string> = {
  es: "es-ES",
  ca: "ca-ES",
  en: "en",
};

export function generatePageMetadata(
  locale: Locale,
  dict: {
    meta: { title: string; description: string };
  },
  path = ""
): Metadata {
  const url = `${SITE_URL}/${locale}${path}`;

  const languages: Record<string, string> = {
    "x-default": `${SITE_URL}/es${path}`,
  };
  for (const l of locales) {
    languages[hreflangMap[l]] = `${SITE_URL}/${l}${path}`;
  }

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url,
      siteName: "Dr. Albert Pardo Pol",
      locale: hreflangMap[locale],
      type: "website",
      images: [
        {
          url: `${SITE_URL}/dr-pardo-quirofano.jpg`,
          width: 1200,
          height: 630,
          alt: "Dr. Albert Pardo Pol — Cirujano de mano en quirófano",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: [`${SITE_URL}/dr-pardo-quirofano.jpg`],
    },
  };
}

export function generateConditionMetadata(
  locale: Locale,
  condition: { name: string; slug: string; description: string; detail: string }
): Metadata {
  const path = `/patologias/${condition.slug}`;
  const url = `${SITE_URL}/${locale}${path}`;
  const title = `${condition.name} — Dr. Albert Pardo Pol`;

  const languages: Record<string, string> = {
    "x-default": `${SITE_URL}/es${path}`,
  };
  for (const l of locales) {
    languages[hreflangMap[l]] = `${SITE_URL}/${l}${path}`;
  }

  return {
    title,
    description: condition.description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description: condition.description,
      url,
      siteName: "Dr. Albert Pardo Pol",
      locale: hreflangMap[locale],
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description: condition.description,
    },
  };
}

export function generateConditionStructuredData(
  locale: Locale,
  condition: { name: string; slug: string; description: string; detail: string }
) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name: condition.name,
    description: condition.detail,
    url: `${SITE_URL}/${locale}/patologias/${condition.slug}`,
    medicalSpecialty: "Orthopedic",
    possibleTreatment: {
      "@type": "MedicalTherapy",
      name: condition.name,
    },
  };
}

export function generateConditionFAQSchema(
  faq: readonly { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(
  locale: Locale,
  condition: { name: string; slug: string }
) {
  const homeLabel = locale === "en" ? "Home" : locale === "ca" ? "Inici" : "Inicio";
  const conditionsLabel = locale === "en" ? "Conditions" : locale === "ca" ? "Patologies" : "Patologías";

  return {
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
        name: conditionsLabel,
        item: `${SITE_URL}/${locale}#condiciones`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: condition.name,
      },
    ],
  };
}

export function generateStructuredData(locale: Locale) {
  const navLabels: Record<Locale, { conditions: string; about: string; centers: string; contact: string }> = {
    es: { conditions: "Patologías", about: "Sobre mí", centers: "Centros", contact: "Contacto" },
    ca: { conditions: "Patologies", about: "Sobre mi", centers: "Centres", contact: "Contacte" },
    en: { conditions: "Conditions", about: "About me", centers: "Centres", contact: "Contact" },
  };
  const nav = navLabels[locale];

  const ld: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Dr. Albert Pardo Pol",
      url: `${SITE_URL}/${locale}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "SiteNavigationElement",
      name: [nav.about, nav.conditions, nav.centers, nav.contact],
      url: [
        `${SITE_URL}/${locale}/sobre-mi`,
        `${SITE_URL}/${locale}#condiciones`,
        `${SITE_URL}/${locale}#centros`,
        `${SITE_URL}/${locale}#contacto`,
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": ["Physician", "Person"],
      name: "Albert Pardo Pol",
      jobTitle:
        locale === "en"
          ? "Hand Surgeon"
          : locale === "ca"
            ? "Cirurgià de mà"
            : "Cirujano de mano",
      medicalSpecialty: "Hand Surgery",
      areaServed: {
        "@type": "City",
        name: "Barcelona",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Barcelona",
        addressCountry: "ES",
      },
      availableService: [
        {
          "@type": "MedicalProcedure",
          name:
            locale === "en"
              ? "Carpal tunnel surgery"
              : locale === "ca"
                ? "Cirurgia del túnel carpià"
                : "Cirugía del túnel carpiano",
        },
        {
          "@type": "MedicalProcedure",
          name:
            locale === "en"
              ? "Trigger finger surgery"
              : locale === "ca"
                ? "Cirurgia del dit en gallet"
                : "Cirugía del dedo en gatillo",
        },
        {
          "@type": "MedicalProcedure",
          name:
            locale === "en"
              ? "Hand and wrist fracture treatment"
              : locale === "ca"
                ? "Tractament de fractures de mà i canell"
                : "Tratamiento de fracturas de mano y muñeca",
        },
      ],
      image: [
        `${SITE_URL}/dr-pardo-quirofano.jpg`,
        `${SITE_URL}/dr-pardo-icatme.png`,
      ],
      url: `${SITE_URL}/${locale}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      name: "Dr. Albert Pardo Pol — Hand Surgery",
      medicalSpecialty: "Hand Surgery",
      areaServed: {
        "@type": "City",
        name: "Barcelona",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Barcelona",
        addressCountry: "ES",
      },
      url: `${SITE_URL}/${locale}`,
    },
  ];

  // Only add review data when reviews are verified
  if (REVIEWS_ARE_VERIFIED) {
    ld[0].aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "48",
      bestRating: "5",
    };
  }

  return ld;
}
