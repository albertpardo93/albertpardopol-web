import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { notFound } from "next/navigation";
import VicBookingLink from "@/components/VicBookingLink";
import { SITE_URL } from "@/lib/config";
import { locales, type Locale } from "@/lib/i18n";

type Copy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  cta: string;
  address: string;
  trust: string[];
  helpTitle: string;
  helpIntro: string;
  services: { title: string; text: string }[];
  approachTitle: string;
  approachText: string;
  steps: { number: string; title: string; text: string }[];
  doctorTitle: string;
  doctorText: string;
  locationTitle: string;
  locationText: string;
  locationNote: string;
  finalTitle: string;
  finalText: string;
};

const copy: Record<Locale, Copy> = {
  es: {
    metaTitle: "Traumatólogo y cirujano de mano en Vic | Dr. Albert Pardo",
    metaDescription:
      "Consulta de traumatología y cirugía de mano, muñeca y codo en Clínica Bayés, Vic. Valoración especializada y opciones de tratamiento.",
    eyebrow: "Traumatología especializada en Vic",
    title: "Cirujano de mano, muñeca y codo en Vic",
    intro:
      "Valoración especializada de lesiones y patologías de la extremidad superior, con un plan de tratamiento adaptado a cada paciente.",
    cta: "Pedir cita",
    address: "Clínica Bayés · Carrer de Sant Just, 1 · Vic",
    trust: ["Especialista en mano y codo", "Consulta en Vic", "Tratamiento personalizado"],
    helpTitle: "¿En qué puedo ayudarte?",
    helpIntro:
      "Diagnóstico y tratamiento de problemas de mano, muñeca y codo, desde las opciones conservadoras hasta la cirugía cuando está indicada.",
    services: [
      { title: "Mano y dedos", text: "Túnel carpiano, dedo en gatillo, quistes, artrosis y lesiones tendinosas." },
      { title: "Muñeca", text: "Dolor, inestabilidad, lesiones deportivas y fracturas de mano y muñeca." },
      { title: "Codo", text: "Valoración de dolor, rigidez, lesiones nerviosas y otras patologías del codo." },
    ],
    approachTitle: "Una consulta orientada a encontrar la mejor solución",
    approachText:
      "No todos los problemas requieren una operación. La visita permite valorar el origen de los síntomas, revisar las pruebas disponibles y explicar de forma clara las alternativas de tratamiento.",
    steps: [
      { number: "01", title: "Valoración", text: "Historia clínica, exploración y revisión de pruebas diagnósticas." },
      { number: "02", title: "Diagnóstico", text: "Explicación comprensible del problema y de su evolución esperable." },
      { number: "03", title: "Tratamiento", text: "Plan conservador o quirúrgico según las necesidades de cada caso." },
    ],
    doctorTitle: "Dr. Albert Pardo Pol",
    doctorText:
      "Especialista en Cirugía Ortopédica y Traumatología, con dedicación específica a la cirugía de la mano, el codo, la artroscopia de muñeca y la microcirugía.",
    locationTitle: "Consulta de traumatología en Vic",
    locationText:
      "Atención en Clínica Bayés para pacientes de Vic, Osona y comarcas cercanas.",
    locationNote: "Carrer de Sant Just, 1, Vic",
    finalTitle: "Da el primer paso para recuperar la función y reducir el dolor",
    finalText: "Solicita una valoración especializada en Clínica Bayés de Vic.",
  },
  ca: {
    metaTitle: "Traumatòleg i cirurgià de mà a Vic | Dr. Albert Pardo",
    metaDescription:
      "Consulta de traumatologia i cirurgia de mà, canell i colze a Clínica Bayés, Vic. Valoració especialitzada i opcions de tractament.",
    eyebrow: "Traumatologia especialitzada a Vic",
    title: "Cirurgià de mà, canell i colze a Vic",
    intro:
      "Valoració especialitzada de lesions i patologies de l'extremitat superior, amb un pla de tractament adaptat a cada pacient.",
    cta: "Demanar cita",
    address: "Clínica Bayés · Carrer de Sant Just, 1 · Vic",
    trust: ["Especialista en mà i colze", "Consulta a Vic", "Tractament personalitzat"],
    helpTitle: "En què et puc ajudar?",
    helpIntro:
      "Diagnòstic i tractament de problemes de mà, canell i colze, des de les opcions conservadores fins a la cirurgia quan està indicada.",
    services: [
      { title: "Mà i dits", text: "Túnel carpià, dit en gallet, quists, artrosi i lesions tendinoses." },
      { title: "Canell", text: "Dolor, inestabilitat, lesions esportives i fractures de mà i canell." },
      { title: "Colze", text: "Valoració del dolor, rigidesa, lesions nervioses i altres patologies del colze." },
    ],
    approachTitle: "Una consulta orientada a trobar la millor solució",
    approachText:
      "No tots els problemes requereixen una operació. La visita permet valorar l'origen dels símptomes, revisar les proves disponibles i explicar clarament les alternatives de tractament.",
    steps: [
      { number: "01", title: "Valoració", text: "Història clínica, exploració i revisió de proves diagnòstiques." },
      { number: "02", title: "Diagnòstic", text: "Explicació comprensible del problema i de la seva evolució esperable." },
      { number: "03", title: "Tractament", text: "Pla conservador o quirúrgic segons les necessitats de cada cas." },
    ],
    doctorTitle: "Dr. Albert Pardo Pol",
    doctorText:
      "Especialista en Cirurgia Ortopèdica i Traumatologia, amb dedicació específica a la cirurgia de la mà, el colze, l'artroscòpia de canell i la microcirurgia.",
    locationTitle: "Consulta de traumatologia a Vic",
    locationText:
      "Atenció a Clínica Bayés per a pacients de Vic, Osona i comarques properes.",
    locationNote: "Carrer de Sant Just, 1, Vic",
    finalTitle: "Fes el primer pas per recuperar la funció i reduir el dolor",
    finalText: "Demana una valoració especialitzada a Clínica Bayés de Vic.",
  },
  en: {
    metaTitle: "Hand and wrist surgeon in Vic | Dr Albert Pardo",
    metaDescription:
      "Specialist hand, wrist and elbow consultation at Clínica Bayés in Vic. Assessment and personalised treatment options.",
    eyebrow: "Specialist orthopaedics in Vic",
    title: "Hand, wrist and elbow surgeon in Vic",
    intro:
      "Specialist assessment of upper-limb injuries and conditions, with a treatment plan adapted to each patient.",
    cta: "Book an appointment",
    address: "Clínica Bayés · Carrer de Sant Just, 1 · Vic",
    trust: ["Hand and elbow specialist", "Consultations in Vic", "Personalised treatment"],
    helpTitle: "How can I help?",
    helpIntro:
      "Diagnosis and treatment of hand, wrist and elbow problems, from conservative options to surgery when indicated.",
    services: [
      { title: "Hand and fingers", text: "Carpal tunnel, trigger finger, cysts, arthritis and tendon injuries." },
      { title: "Wrist", text: "Pain, instability, sports injuries, and hand or wrist fractures." },
      { title: "Elbow", text: "Assessment of pain, stiffness, nerve injuries and other elbow conditions." },
    ],
    approachTitle: "A consultation focused on finding the right solution",
    approachText:
      "Not every problem requires surgery. The visit identifies the cause of the symptoms, reviews available tests and clearly explains the treatment options.",
    steps: [
      { number: "01", title: "Assessment", text: "Medical history, physical examination and review of diagnostic tests." },
      { number: "02", title: "Diagnosis", text: "A clear explanation of the problem and its expected progression." },
      { number: "03", title: "Treatment", text: "A conservative or surgical plan based on the needs of each case." },
    ],
    doctorTitle: "Dr Albert Pardo Pol",
    doctorText:
      "Consultant in Orthopaedic Surgery and Traumatology, specialising in hand and elbow surgery, wrist arthroscopy and microsurgery.",
    locationTitle: "Orthopaedic consultation in Vic",
    locationText: "Care at Clínica Bayés for patients from Vic, Osona and nearby areas.",
    locationNote: "Carrer de Sant Just, 1, Vic",
    finalTitle: "Take the first step towards restoring function and reducing pain",
    finalText: "Book a specialist assessment at Clínica Bayés in Vic.",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!locales.includes(localeParam as Locale)) return {};
  const locale = localeParam as Locale;
  const t = copy[locale];
  const path = "/cirujano-mano/vic";

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: `${SITE_URL}/${locale}${path}`,
      languages: {
        "es-ES": `${SITE_URL}/es${path}`,
        "ca-ES": `${SITE_URL}/ca${path}`,
        en: `${SITE_URL}/en${path}`,
        "x-default": `${SITE_URL}/es${path}`,
      },
    },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url: `${SITE_URL}/${locale}${path}`,
      siteName: "Dr. Albert Pardo Pol",
      locale: locale === "ca" ? "ca_ES" : locale === "en" ? "en" : "es_ES",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/albert-pardo-pol.jpg`,
          width: 688,
          height: 688,
          alt: "Retrato del Dr. Albert Pardo Pol — Cirujano de mano en Vic",
        },
      ],
    },
  };
}

export default async function VicLandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!locales.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;
  const t = copy[locale];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: "Dr. Albert Pardo Pol",
    medicalSpecialty: "Hand Surgery",
    image: `${SITE_URL}/albert-pardo-pol.jpg`,
    url: `${SITE_URL}/${locale}/cirujano-mano/vic`,
    areaServed: [{ "@type": "City", name: "Vic" }, { "@type": "AdministrativeArea", name: "Osona" }],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Carrer de Sant Just, 1",
      addressLocality: "Vic",
      addressRegion: "Barcelona",
      addressCountry: "ES",
    },
  };

  return (
    <>
      <Script
        id="vic-physician-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(180,214,227,0.18),transparent_42%)]" />
        <div className="relative mx-auto grid max-w-5xl items-center gap-10 px-4 py-14 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{t.eyebrow}</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
              {t.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{t.intro}</p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <VicBookingLink
                location="vic-hero"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-7 py-3.5 font-semibold text-primary shadow-lg shadow-black/15 hover:-translate-y-0.5 hover:bg-accent"
              >
                {t.cta}
              </VicBookingLink>
              <p className="text-sm font-medium text-accent">{t.address}</p>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-3 rounded-[2rem] border border-white/15" />
            <Image
              src="/albert-pardo-pol.jpg"
              alt="Dr. Albert Pardo Pol"
              width={640}
              height={760}
              priority
              className="relative aspect-[4/5] w-full rounded-[1.6rem] object-cover shadow-2xl shadow-black/30"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface/60">
        <div className="mx-auto flex max-w-5xl flex-col divide-y divide-border px-4 sm:flex-row sm:divide-x sm:divide-y-0">
          {t.trust.map((item) => (
            <p key={item} className="flex-1 py-4 text-center text-sm font-semibold text-primary sm:px-5">
              <span className="mr-2 text-primary-light" aria-hidden="true">✓</span>{item}
            </p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-light">Vic · Osona</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-text-primary sm:text-4xl">{t.helpTitle}</h2>
          <p className="mt-4 leading-relaxed text-text-secondary">{t.helpIntro}</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {t.services.map((service, index) => (
            <article key={service.title} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold tracking-[0.18em] text-primary-light">0{index + 1}</p>
              <h3 className="mt-4 font-display text-2xl font-semibold text-primary">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-12 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2 className="font-display text-3xl font-semibold text-text-primary sm:text-4xl">{t.approachTitle}</h2>
            <p className="mt-5 leading-relaxed text-text-secondary">{t.approachText}</p>
            <VicBookingLink
              location="vic-approach"
              className="mt-7 inline-flex rounded-xl bg-primary px-6 py-3.5 font-semibold text-white shadow-md shadow-primary/20 hover:bg-primary-light"
            >
              {t.cta}
            </VicBookingLink>
          </div>
          <ol className="space-y-4">
            {t.steps.map((step) => (
              <li key={step.number} className="grid grid-cols-[3.5rem_1fr] gap-4 rounded-2xl border border-border bg-white p-5">
                <span className="font-display text-2xl font-semibold text-primary-light">{step.number}</span>
                <div>
                  <h3 className="font-semibold text-text-primary">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-secondary">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-8 px-4 py-16 sm:py-20 lg:grid-cols-2">
        <article className="rounded-3xl bg-primary p-8 text-white sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Cirugía de mano</p>
          <h2 className="mt-3 font-display text-3xl font-semibold">{t.doctorTitle}</h2>
          <p className="mt-5 leading-relaxed text-white/75">{t.doctorText}</p>
        </article>
        <article className="rounded-3xl border border-border bg-white p-8 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-light">Clínica Bayés</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-text-primary">{t.locationTitle}</h2>
          <p className="mt-5 leading-relaxed text-text-secondary">{t.locationText}</p>
          <p className="mt-6 rounded-xl bg-surface px-4 py-3 text-sm font-semibold text-primary">{t.locationNote}</p>
        </article>
      </section>

      <section className="bg-primary-dark px-4 py-16 text-center text-white sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">{t.finalTitle}</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">{t.finalText}</p>
          <VicBookingLink
            location="vic-final"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-8 py-3.5 font-semibold text-primary shadow-lg hover:bg-accent"
          >
            {t.cta}
          </VicBookingLink>
        </div>
      </section>
    </>
  );
}
