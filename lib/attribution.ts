/** Only marketing metadata belongs here. Never include form fields or medical information. */
export type Touch = {
  channel: "paid" | "organic" | "referral" | "direct" | "unknown";
  source: string;
  medium: string;
  campaign?: string;
  clickId?: string;
  clickIdType?: "gclid" | "gbraid" | "wbraid" | "msclkid";
  landingPath: string;
  capturedAt: number;
};
export type LeadAttribution = {
  consent: "accepted" | "unavailable";
  session?: Touch;
  firstTouch?: Touch;
};
export const SESSION_KEY = "lead-attribution-session-v1";
export const FIRST_KEY = "lead-attribution-first-v1";
const SESSION_TTL = 30 * 60 * 1000;
const FIRST_TTL = 90 * 24 * 60 * 60 * 1000;

function token(value: unknown): string | undefined {
  if (typeof value !== "string" || !value || value.length > 100) return undefined;
  // Reject email addresses, URLs, control characters and arbitrary pasted data.
  return /^[\p{L}\p{N} _().+-]+$/u.test(value) ? value : undefined;
}

export function classifyTouch(href: string, referrer: string, now = Date.now()): Touch {
  const url = new URL(href);
  const params = url.searchParams;
  const base: Touch = {
    channel: "direct", source: "(direct)", medium: "(none)",
    landingPath: url.pathname, capturedAt: now,
  };
  const campaign = token(params.get("utm_campaign"));
  for (const key of ["gclid", "gbraid", "wbraid", "msclkid"] as const) {
    const id = params.get(key);
    if (id && /^[A-Za-z0-9_-]{1,500}$/.test(id)) {
      return { ...base, channel: "paid", source: key === "msclkid" ? "bing" : "google", medium: "cpc", campaign, clickId: id, clickIdType: key };
    }
  }
  const source = token(params.get("utm_source"))?.toLowerCase();
  const medium = token(params.get("utm_medium"))?.toLowerCase();
  if (source && medium) {
    return { ...base, source, medium, campaign,
      channel: /^(cpc|ppc|paid|paidsearch|paid_search|paid-social|paid_social|display|cpm|cpv)$/.test(medium)
        ? "paid" : medium === "organic" ? "organic" : "referral" };
  }
  try {
    const host = new URL(referrer).hostname.toLowerCase().replace(/^www\./, "");
    if (host === url.hostname.replace(/^www\./, "")) return base;
    const search = /(^|\.)google\.(com|es|cat|fr|co\.uk)$/.test(host) ? "google"
      : /(^|\.)bing\.com$/.test(host) ? "bing"
      : /(^|\.)search\.yahoo\.com$/.test(host) ? "yahoo"
      : /(^|\.)duckduckgo\.com$/.test(host) ? "duckduckgo" : undefined;
    return { ...base, channel: search ? "organic" : "referral", source: search ?? host, medium: search ? "organic" : "referral" };
  } catch {
    return base;
  }
}

export function sanitizeTouch(value: unknown): Touch | undefined {
  if (!value || typeof value !== "object") return undefined;
  const input = value as Record<string, unknown>;
  if (!["paid", "organic", "referral", "direct", "unknown"].includes(String(input.channel))) return undefined;
  const source = token(input.source);
  const medium = token(input.medium);
  if (!source || !medium || typeof input.capturedAt !== "number" || !Number.isFinite(input.capturedAt)) return undefined;
  const path = typeof input.landingPath === "string" && /^\/[A-Za-z0-9/_-]*$/.test(input.landingPath)
    ? input.landingPath.slice(0, 300) : "/";
  const touch: Touch = { channel: input.channel as Touch["channel"], source, medium, campaign: token(input.campaign), landingPath: path, capturedAt: input.capturedAt };
  if (["gclid", "gbraid", "wbraid", "msclkid"].includes(String(input.clickIdType)) && typeof input.clickId === "string" && /^[A-Za-z0-9_-]{1,500}$/.test(input.clickId)) {
    touch.clickId = input.clickId;
    touch.clickIdType = input.clickIdType as Touch["clickIdType"];
  }
  return touch;
}

export function sanitizeAttribution(value: unknown): LeadAttribution {
  if (!value || typeof value !== "object" || (value as LeadAttribution).consent !== "accepted") return { consent: "unavailable" };
  const input = value as LeadAttribution;
  return { consent: "accepted", session: sanitizeTouch(input.session), firstTouch: sanitizeTouch(input.firstTouch) };
}

export function touchLabel(touch?: Touch): string {
  if (!touch) return "Origen desconocido (sin datos de medición)";
  if (touch.channel === "direct") return "Directo / origen no identificable";
  if (touch.channel === "unknown") return "Origen desconocido";
  const label = { paid: "Pago", organic: "Orgánico", referral: "Referencia" }[touch.channel];
  return `${label} · ${touch.source} / ${touch.medium}${touch.campaign ? ` · ${touch.campaign}` : ""}`;
}

let entryTouch: Touch | undefined;
let volatileSession: { touch: Touch; updatedAt: number } | undefined;
let volatileFirst: Touch | undefined;

export function hasAttributionConsent(): boolean {
  try { return typeof window !== "undefined" && window.localStorage.getItem("cookie-consent") === "accepted"; }
  catch { return false; }
}

export function clearAttribution(): void {
  volatileSession = undefined;
  volatileFirst = undefined;
  entryTouch = undefined;
  try { window.sessionStorage.removeItem(SESSION_KEY); window.localStorage.removeItem(FIRST_KEY); } catch { /* Storage may be disabled. */ }
}

export function captureAttribution(): LeadAttribution {
  if (typeof window === "undefined") return { consent: "unavailable" };
  const now = Date.now();
  // Keep the entry in page memory while the visitor decides; persist only after acceptance.
  entryTouch ??= classifyTouch(window.location.href, document.referrer, now);
  if (!hasAttributionConsent()) return { consent: "unavailable" };
  let session = volatileSession;
  let first = volatileFirst;
  try {
    const saved = JSON.parse(window.sessionStorage.getItem(SESSION_KEY) ?? "null");
    const touch = sanitizeTouch(saved?.touch);
    if (!session && touch && typeof saved.updatedAt === "number") session = { touch, updatedAt: saved.updatedAt };
    first ??= sanitizeTouch(JSON.parse(window.localStorage.getItem(FIRST_KEY) ?? "null"));
  } catch { /* Continue with in-memory attribution if storage is unavailable or corrupt. */ }
  // Internal navigation keeps the session source. A new external campaign starts a new touch.
  const newEntry = session && entryTouch.capturedAt > session.updatedAt && entryTouch.channel !== "direct";
  if (!session || now - session.updatedAt > SESSION_TTL || newEntry) session = { touch: entryTouch, updatedAt: now };
  session.updatedAt = now;
  if (!first || now - first.capturedAt > FIRST_TTL) first = session.touch;
  volatileSession = session;
  volatileFirst = first;
  try {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    window.localStorage.setItem(FIRST_KEY, JSON.stringify(first));
  } catch { /* A blocked storage API must never break contact. */ }
  return { consent: "accepted", session: session.touch, firstTouch: first };
}

export function leadEventParams(attribution = captureAttribution()): Record<string, string> {
  return {
    lead_channel: attribution.session?.channel ?? "unknown",
    lead_source: attribution.session?.source ?? "unknown",
    lead_medium: attribution.session?.medium ?? "unknown",
  };
}

export function whatsappHref(base: string): { href: string; reference: string; attribution: LeadAttribution } {
  const attribution = captureAttribution();
  const reference = `W-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const url = new URL(base);
  const original = url.searchParams.get("text") ?? "Hola, me gustaría solicitar información.";
  url.searchParams.set("text", original);
  return { href: url.toString(), reference, attribution };
}
