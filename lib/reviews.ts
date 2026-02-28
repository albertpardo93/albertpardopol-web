export interface Review {
  name: string;
  rating: number;
  text: string;
  timeAgo: string;
}

/**
 * Placeholder reviews. Replace with real patient reviews when available.
 * Toggle REVIEWS_ARE_VERIFIED in lib/config.ts to enable structured data.
 */
export const reviews: Record<string, Review[]> = {
  es: [
    {
      name: "Ferran M.",
      rating: 5,
      text: "Me he operado con el gran Dr. Albert Pardo y su equipo. Lo que más puedo destacar es la profesionalidad y dedicación de este médico. Todo el personal es increíble, una amabilidad que te hace sentirte en casa. Lo recomiendo sobre todo a deportistas que esperan sanar sus lesiones de la manera más eficaz posible.",
      timeAgo: "hace 2 semanas",
    },
    {
      name: "Núria C.",
      rating: 5,
      text: "Me rompí el radio de la muñeca y me operó el Dr. Pardo. En tres semanas ya estaba moviendo la mano con normalidad. Gran profesional, excelente cirujano y gran persona.",
      timeAgo: "hace 1 mes",
    },
    {
      name: "Montserrat B.",
      rating: 5,
      text: "Feia mesos que tenia el dit bloquejat i no sabia què fer. El doctor em va explicar tot molt bé i després de l'operació vaig recuperar la mobilitat en pocs dies. Molt recomanable.",
      timeAgo: "hace 2 meses",
    },
    {
      name: "Marco R.",
      rating: 5,
      text: "Vine por un quiste en la muñeca que me molestaba al hacer deporte. Me quitó el quiste y la cicatriz casi ni se nota. Muy contento con el resultado.",
      timeAgo: "hace 4 meses",
    },
    {
      name: "Pere M.",
      rating: 5,
      text: "Mi madre de 72 años tenía rizartrosis y apenas podía abrir un bote. El Dr. Pardo la operó y ahora hace vida normal. Estamos muy agradecidos.",
      timeAgo: "hace 2 meses",
    },
    {
      name: "Jordi T.",
      rating: 5,
      text: "Em vaig lesionar el canell jugant a pàdel. Diagnòstic ràpid, em va explicar les opcions i em va tractar perfectament. En un mes i mig ja jugava una altra vegada.",
      timeAgo: "hace 3 meses",
    },
    {
      name: "Carmen D.",
      rating: 5,
      text: "Después de ver a varios médicos sin mejorar, el Dr. Pardo me hizo un diagnóstico claro y me operó del túnel carpiano. Por fin duermo sin hormigueos. Ojalá le hubiera encontrado antes.",
      timeAgo: "hace 6 meses",
    },
  ],
  ca: [
    {
      name: "Ferran M.",
      rating: 5,
      text: "M'he operat amb el gran Dr. Albert Pardo i el seu equip. El que més puc destacar és la professionalitat i dedicació d'aquest metge. Tot el personal és increïble, una amabilitat que et fa sentir com a casa. El recomano sobretot a esportistes que esperen guarir les seves lesions de la manera més eficaç possible.",
      timeAgo: "fa 2 setmanes",
    },
    {
      name: "Núria C.",
      rating: 5,
      text: "Em vaig trencar el radi del canell i em va operar el Dr. Pardo. En tres setmanes ja movia la mà amb normalitat. Gran professional, excel·lent cirurgià i gran persona.",
      timeAgo: "fa 1 mes",
    },
    {
      name: "Montserrat B.",
      rating: 5,
      text: "Feia mesos que tenia el dit bloquejat i no sabia què fer. El doctor em va explicar tot molt bé i després de l'operació vaig recuperar la mobilitat en pocs dies. Molt recomanable.",
      timeAgo: "fa 2 mesos",
    },
    {
      name: "Marco R.",
      rating: 5,
      text: "Vaig anar per un quist al canell que em molestava fent esport. Em va treure el quist i la cicatriu gairebé no es nota. Molt content amb el resultat.",
      timeAgo: "fa 4 mesos",
    },
    {
      name: "Pere M.",
      rating: 5,
      text: "La meva mare de 72 anys tenia rizartrosi i gairebé no podia obrir un pot. El Dr. Pardo la va operar i ara fa vida normal. Estem molt agraïts.",
      timeAgo: "fa 2 mesos",
    },
    {
      name: "Jordi T.",
      rating: 5,
      text: "Em vaig lesionar el canell jugant a pàdel. Diagnòstic ràpid, em va explicar les opcions i em va tractar perfectament. En un mes i mig ja jugava una altra vegada.",
      timeAgo: "fa 3 mesos",
    },
    {
      name: "Carmen D.",
      rating: 5,
      text: "Després de veure diversos metges sense millorar, el Dr. Pardo em va fer un diagnòstic clar i em va operar del túnel carpià. Per fi dormo sense formigueig. M'hagués agradat trobar-lo abans.",
      timeAgo: "fa 6 mesos",
    },
  ],
  en: [
    {
      name: "Ferran M.",
      rating: 5,
      text: "I had surgery with the great Dr. Albert Pardo and his team. What stands out most is the professionalism and dedication of this doctor. All the staff are incredible, so kind you feel right at home. I especially recommend him to athletes looking to heal their injuries as effectively as possible.",
      timeAgo: "2 weeks ago",
    },
    {
      name: "Núria C.",
      rating: 5,
      text: "I broke my wrist (radius) and Dr. Pardo operated on me. Within three weeks I was moving my hand normally again. Great professional, excellent surgeon and wonderful person.",
      timeAgo: "1 month ago",
    },
    {
      name: "Montserrat B.",
      rating: 5,
      text: "I had a locked finger for months and didn't know what to do. The doctor explained everything clearly and after the surgery I regained full movement in just a few days. Highly recommended.",
      timeAgo: "2 months ago",
    },
    {
      name: "Marco R.",
      rating: 5,
      text: "I came in for a wrist cyst that was bothering me during sports. He removed it and the scar is barely visible. Very happy with the result.",
      timeAgo: "4 months ago",
    },
    {
      name: "Pere M.",
      rating: 5,
      text: "My 72-year-old mother had thumb arthritis and could barely open a jar. Dr. Pardo operated and now she lives normally again. We are very grateful.",
      timeAgo: "2 months ago",
    },
    {
      name: "Jordi T.",
      rating: 5,
      text: "I injured my wrist playing padel. Quick diagnosis, clear explanation of my options, and perfect treatment. A month and a half later I was playing again.",
      timeAgo: "3 months ago",
    },
    {
      name: "Carmen D.",
      rating: 5,
      text: "After seeing several doctors without improvement, Dr. Pardo gave me a clear diagnosis and operated on my carpal tunnel. I finally sleep without tingling. Wish I had found him sooner.",
      timeAgo: "6 months ago",
    },
  ],
};
