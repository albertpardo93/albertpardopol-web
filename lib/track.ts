type TrackPayload = Record<string, string | number | boolean>;

/**
 * Lightweight event tracking stub.
 * Dev: logs to console. Prod: noop (swap with real analytics later).
 */
export function track(event: string, payload?: TrackPayload): void {
  if (process.env.NODE_ENV === "development") {
    console.log(`[track] ${event}`, payload ?? "");
  }
  // In production, replace with your analytics call:
  // e.g. gtag('event', event, payload);
}
