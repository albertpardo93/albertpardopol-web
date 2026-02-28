/** Centralized booking & contact configuration */

export const SITE_URL = "https://albertpardopol.com";

export const REVIEWS_ARE_VERIFIED = false;

export const booking = {
  vithas: {
    url: "https://areaprivada.vithas.es/login?doctor=326590&lang=es",
    label: "vithas",
  },
  bayes: {
    url: "https://bayesclinica.cat/quadre-medic/dr-albert-pardo/",
    label: "bayes",
  },
} as const;

export const contact = {
  phone: "+34 689 524 020",
  email: "dralbertpardo@gmail.com",
  whatsapp: "https://wa.me/34689524020",
} as const;

export const social = {
  linkedin: "https://www.linkedin.com/in/albert-pardo-pol-b36104197/",
  doctoralia: "https://www.doctoralia.es/albert-pardo-pol/traumatologo/barcelona",
} as const;
