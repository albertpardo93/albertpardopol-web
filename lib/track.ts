type TrackPayload = Record<string, string | number | boolean>;

/**
 * Lightweight GA4/Google Ads-compatible event tracking.
 */
export function track(event: string, payload?: TrackPayload): void {
  if (process.env.NODE_ENV === "development") {
    console.log(`[track] ${event}`, payload ?? "");
  }
  if (typeof window !== "undefined") {
    const win = window as typeof window & { gtag?: (...args: unknown[]) => void };
    win.gtag?.("event", event, payload ?? {});
  }
}
