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

const conditionImages: Record<string, string> = {
  "tunel-carpiano": "tunel-carpiano.svg",
  "dedo-en-gatillo": "dedo-en-gatillo.png",
  "quistes-sinoviales": "quistes-sinoviales.jpg",
  "lesiones-tendinosas": "lesiones-tendinosas.png",
  "fracturas-mano-muneca": "fracturas-mano-muneca.jpg",
  "artrosis-pulgar": "artrosis-pulgar.jpg",
  "lesiones-deportivas-muneca": "lesiones-deportivas-muneca.jpg",
  "patologia-codo": "patologia-codo.jpg",
  "microcirugia-reconstructiva": "microcirugia-reconstructiva.jpg",
};

function conditionImage(slug: string) {
  const filename = slug.startsWith("fractura-")
    ? "fracturas-mano-muneca.jpg"
    : conditionImages[slug] ?? "fracturas-mano-muneca.jpg";
  return `${SITE_URL}/conditions/${filename}`;
}

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
          url: `${SITE_URL}/albert-pardo-pol.jpg`,
          width: 688,
          height: 688,
          alt: "Retrato del Dr. Albert Pardo Pol — Cirujano de mano",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: [`${SITE_URL}/albert-pardo-pol.jpg`],
    },
  };
}

export function generateConditionMetadata(
  locale: Locale,
  condition: { name: string; slug: string; description: string; detail: string }
): Metadata {
  const path = `/patologias/${condition.slug}`;
  const url = `${SITE_URL}/${locale}${path}`;
  const metadataOverrides: Partial<Record<Locale, Record<string, { title: string; description: string }>>> = {
    es: {
      "fractura-escafoides": { title: "Fractura de escafoides: tratamiento — Dr. Pardo", description: "Dolor en la muñeca tras una caída: diagnóstico con radiografía, resonancia o TAC y tratamiento de la fractura de escafoides en Barcelona." },
      "fractura-radio-distal": { title: "Fractura de radio distal o muñeca — Dr. Pardo", description: "Diagnóstico y tratamiento de la fractura de radio distal: reducción, yeso, cirugía y rehabilitación con un cirujano de mano en Barcelona." },
      "fractura-metacarpiano": { title: "Fractura de metacarpiano y del boxeador — Dr. Pardo", description: "Valoración de fracturas de metacarpiano y del boxeador: rotación, inmovilización, cirugía y recuperación de la función de la mano." },
      "fractura-dedo-falange": { title: "Fractura de dedo o falange: tratamiento — Dr. Pardo", description: "Diagnóstico y tratamiento de fracturas de dedo o falange para recuperar alineación, movilidad y estabilidad. Especialista de mano en Barcelona." },
      "quistes-sinoviales": {
        title: "Ganglión o quiste sinovial de muñeca — Dr. Pardo",
        description: "¿Tienes un bulto en la muñeca o la mano? Diagnóstico y tratamiento del ganglión o quiste sinovial con un cirujano de mano en Barcelona.",
      },
      "artrosis-pulgar": {
        title: "Rizartrosis o artrosis del pulgar — Dr. Pardo",
        description: "Dolor en la base del pulgar por rizartrosis o artrosis trapeciometacarpiana. Diagnóstico y opciones de tratamiento en Barcelona.",
      },
      "fracturas-mano-muneca": {
        title: "Fractura de mano o muñeca: tratamiento — Dr. Pardo",
        description: "Diagnóstico y tratamiento de fracturas de mano y muñeca: escafoides, radio distal, metacarpianos y falanges. Especialista en Barcelona.",
      },
    },
    ca: {
      "fractura-escafoides": { title: "Fractura d'escafoide: tractament — Dr. Pardo", description: "Diagnòstic precoç i tractament de la fractura d'escafoide amb radiografia, ressonància o TAC. Cirurgià de mà a Barcelona." },
      "fractura-radio-distal": { title: "Fractura de radi distal o canell — Dr. Pardo", description: "Diagnòstic i tractament de la fractura de radi distal: reducció, guix, cirurgia i rehabilitació amb un cirurgià de mà." },
      "fractura-metacarpiano": { title: "Fractura de metacarpià i del boxejador — Dr. Pardo", description: "Valoració de fractures de metacarpià: rotació, estabilitat, immobilització, cirurgia i recuperació de la funció de la mà." },
      "fractura-dedo-falange": { title: "Fractura de dit o falange: tractament — Dr. Pardo", description: "Diagnòstic i tractament de fractures de dit o falange per recuperar alineació, mobilitat i estabilitat articular." },
    },
    en: {
      "fractura-escafoides": { title: "Scaphoid fracture treatment in Barcelona — Dr Pardo", description: "Early diagnosis and treatment of a scaphoid fracture with an English-speaking hand surgeon in Barcelona. X-ray, MRI and CT assessment." },
      "fractura-radio-distal": { title: "Distal radius fracture treatment in Barcelona", description: "Assessment of a distal radius or wrist fracture in Barcelona: cast, surgery and rehabilitation with an English-speaking hand surgeon." },
      "fractura-metacarpiano": { title: "Metacarpal and boxer's fracture treatment", description: "Specialist assessment of metacarpal and boxer's fractures in Barcelona, including rotation, splinting, surgery and recovery." },
      "fractura-dedo-falange": { title: "Finger fracture treatment in Barcelona — Dr Pardo", description: "Diagnosis and treatment of finger and phalanx fractures to restore alignment, movement and joint stability with a hand surgeon." },
      "tunel-carpiano": {
        title: "Carpal tunnel treatment in Barcelona — Dr. Pardo",
        description: "Carpal tunnel diagnosis and treatment with an English-speaking hand surgeon in Barcelona. Splints, injections and outpatient surgery.",
      },
      "quistes-sinoviales": {
        title: "Wrist ganglion cyst treatment in Barcelona — Dr. Pardo",
        description: "Assessment and treatment of a ganglion cyst or lump on the wrist or hand with an English-speaking hand surgeon in Barcelona.",
      },
      "artrosis-pulgar": {
        title: "Thumb arthritis treatment in Barcelona — Dr. Pardo",
        description: "Diagnosis and treatment of thumb basal joint arthritis with an English-speaking hand surgeon in Barcelona. Non-surgical and surgical options.",
      },
      "fracturas-mano-muneca": {
        title: "Hand and wrist fracture treatment in Barcelona",
        description: "Specialist assessment of hand and wrist fractures in Barcelona, including scaphoid, distal radius, metacarpal and finger fractures.",
      },
    },
  };
  const override = metadataOverrides[locale]?.[condition.slug];
  const title = override?.title ?? `${condition.name} — Dr. Albert Pardo Pol`;
  const description = override?.description ?? condition.description;

  const languages: Record<string, string> = {
    "x-default": `${SITE_URL}/es${path}`,
  };
  for (const l of locales) {
    languages[hreflangMap[l]] = `${SITE_URL}/${l}${path}`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Dr. Albert Pardo Pol",
      locale: hreflangMap[locale],
      type: "article",
      images: [{
        url: conditionImage(condition.slug),
        alt: condition.name,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [conditionImage(condition.slug)],
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
    description: condition.description,
    url: `${SITE_URL}/${locale}/patologias/${condition.slug}`,
    image: conditionImage(condition.slug),
    dateModified: "2026-08-29",
    author: {
      "@type": "Physician",
      name: "Dr. Albert Pardo Pol",
      url: `${SITE_URL}/${locale}/sobre-mi`,
      medicalSpecialty: "Hand Surgery",
    },
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
  condition: { name: string; slug: string },
  parentCondition?: { name: string; slug: string }
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
        item: `${SITE_URL}/${locale}/patologias`,
      },
      ...(parentCondition ? [{
        "@type": "ListItem",
        position: 3,
        name: parentCondition.name,
        item: `${SITE_URL}/${locale}/patologias/${parentCondition.slug}`,
      }] : []),
      {
        "@type": "ListItem",
        position: parentCondition ? 4 : 3,
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
        `${SITE_URL}/albert-pardo-pol.jpg`,
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
