export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    bookAppointment: string;
    conditions: string;
    aboutMe: string;
    centers: string;
    contact: string;
    menu: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    moreInfo: string;
  };
  about: {
    title: string;
    intro: string;
    highlights: readonly {
      label: string;
      value: string;
    }[];
    formationTitle: string;
    formation: readonly string[];
    experienceTitle: string;
    experience: string;
    membershipsTitle: string;
    memberships: readonly string[];
  };
  trust: {
    items: readonly string[];
  };
  conditions: {
    title: string;
    items: readonly {
      name: string;
      slug: string;
      description: string;
      detail: string;
      faq: readonly { question: string; answer: string }[];
      imageAlt: string;
      relatedSlugs: readonly string[];
    }[];
    cta: string;
    bookCta: string;
    close: string;
  };
  centers: {
    title: string;
    items: readonly {
      name: string;
      description: string;
      hours: string;
      cta: string;
      location: "vithas" | "bayes" | "hospital-del-mar";
    }[];
  };
  reviews: {
    title: string;
  };
  faq: {
    title: string;
    items: readonly {
      question: string;
      answer: string;
    }[];
  };
  contact: {
    title: string;
    phone: string;
    email: string;
    whatsapp: string;
    emergency: string;
  };
  footer: {
    rights: string;
    legal: string;
    privacy: string;
    cookies: string;
  };
  legal: {
    avisoLegal: { title: string; content: string };
    politicaDePrivacidad: { title: string; content: string };
    politicaDeCookies: { title: string; content: string };
  };
  bookingModal: {
    title: string;
    insuranceQuestion: string;
    yes: string;
    no: string;
    chooseCenter: string;
    vithas: string;
    vithasDetail: string;
    bayes: string;
    bayesDetail: string;
    contactTitle: string;
    contactSubtitle: string;
    phone: string;
    whatsapp: string;
    back: string;
    close: string;
  };
}
