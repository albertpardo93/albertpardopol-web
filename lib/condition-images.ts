export const conditionImages: Record<string, string> = {
  "tunel-carpiano": "/conditions/tunel-carpiano.png",
  "dedo-en-gatillo": "/conditions/dedo-en-gatillo.png",
  "quistes-sinoviales": "/conditions/quistes-sinoviales.png",
  "lesiones-tendinosas": "/conditions/lesiones-tendinosas.png",
  "fracturas-mano-muneca": "/conditions/fracturas-mano-muneca.png",
  "artrosis-pulgar": "/conditions/artrosis-pulgar.png",
  "lesiones-deportivas-muneca": "/conditions/lesiones-deportivas-muneca.png",
  "patologia-codo": "/conditions/patologia-codo.png",
  "microcirugia-reconstructiva": "/conditions/microcirugia-reconstructiva.png",
  "fractura-escafoides": "/conditions/fractura-escafoides.webp",
  "fractura-radio-distal": "/conditions/fractura-radio-distal.webp",
  "fractura-metacarpiano": "/conditions/fractura-metacarpiano.webp",
  "fractura-dedo-falange": "/conditions/fractura-dedo-falange.webp",
};

export function getConditionImage(slug: string) {
  return conditionImages[slug] ?? conditionImages["fracturas-mano-muneca"];
}
