"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { contact, booking } from "@/lib/config";

export const BOOKING_MODAL_ID = "booking-modal";
export const OPEN_BOOKING_EVENT = "open-booking-modal";

type Step = "insurance" | "centers" | "contact";

function fireConversion() {
  if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === "function") {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "conversion", {
      send_to: "AW-18025540899/zZzyCJnP8pEcEKPan5ND",
      value: 1.0,
      currency: "EUR",
    });
  }
}

function BackButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-4 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-text-secondary"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M10 12L6 8l4-4" />
      </svg>
      {label}
    </button>
  );
}

export default function BookingModal({ dict }: { dict: Dictionary }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState<Step>("insurance");
  const t = dict.bookingModal;

  const open = useCallback(() => {
    setStep("insurance");
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    const handler = () => open();
    window.addEventListener(OPEN_BOOKING_EVENT, handler);
    return () => window.removeEventListener(OPEN_BOOKING_EVENT, handler);
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      id={BOOKING_MODAL_ID}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-border bg-white p-0 shadow-xl backdrop:bg-black/40 backdrop:backdrop-blur-sm open:animate-[fade-in_150ms_ease-out]"
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <h2 className="font-display text-xl font-semibold text-text-primary">{t.title}</h2>
          <button
            type="button"
            onClick={close}
            className="ml-4 rounded-lg p-2 text-text-muted transition-colors hover:bg-surface hover:text-text-secondary"
            aria-label={t.close}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M15 5L5 15M5 5l10 10" />
            </svg>
          </button>
        </div>

        {/* Step 1: Insurance question */}
        {step === "insurance" && (
          <div className="mt-6">
            <p className="text-base font-medium text-text-secondary">
              {t.insuranceQuestion}
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <button
                type="button"
                data-cta="booking"
                data-location="insurance-yes"
                onClick={() => setStep("centers")}
                className="flex items-center gap-4 rounded-xl border border-border px-4 py-4 text-left transition-all hover:border-primary hover:shadow-sm"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 12l2 2 4-4" />
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                  </svg>
                </span>
                <span className="text-sm font-semibold text-text-primary">{t.yes}</span>
              </button>

              <button
                type="button"
                data-cta="booking"
                data-location="insurance-no"
                onClick={() => setStep("contact")}
                className="flex items-center gap-4 rounded-xl border border-border px-4 py-4 text-left transition-all hover:border-primary hover:shadow-sm"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface text-text-muted">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                  </svg>
                </span>
                <span className="text-sm font-semibold text-text-primary">{t.no}</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2a: Choose center (has insurance) */}
        {step === "centers" && (
          <div className="mt-4">
            <BackButton label={t.back} onClick={() => setStep("insurance")} />
            <p className="text-base font-medium text-text-secondary">
              {t.chooseCenter}
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={booking.vithas.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="booking"
                data-location="vithas"
                onClick={fireConversion}
                className="flex items-center gap-4 rounded-xl border border-border px-4 py-4 transition-all hover:border-primary hover:shadow-sm"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1" />
                    <rect x="5" y="2" width="14" height="19" rx="1" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{t.vithas}</p>
                  <p className="text-xs text-text-muted">{t.vithasDetail}</p>
                </div>
              </a>

              <a
                href={booking.bayes.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="booking"
                data-location="bayes"
                onClick={fireConversion}
                className="flex items-center gap-4 rounded-xl border border-border px-4 py-4 transition-all hover:border-primary hover:shadow-sm"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1" />
                    <rect x="5" y="2" width="14" height="19" rx="1" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{t.bayes}</p>
                  <p className="text-xs text-text-muted">{t.bayesDetail}</p>
                </div>
              </a>
            </div>
          </div>
        )}

        {/* Step 2b: Direct contact (no insurance) */}
        {step === "contact" && (
          <div className="mt-4">
            <BackButton label={t.back} onClick={() => setStep("insurance")} />
            <p className="text-base font-medium text-text-primary">
              {t.contactTitle}
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              {t.contactSubtitle}
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="booking"
                data-location="whatsapp"
                onClick={fireConversion}
                className="flex items-center gap-4 rounded-xl border border-border px-4 py-4 transition-all hover:border-primary hover:shadow-sm"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.105-1.127l-.295-.178-2.868.852.852-2.868-.178-.295A8 8 0 1112 20z" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{t.whatsapp}</p>
                  <p className="text-xs text-text-muted">WhatsApp</p>
                </div>
              </a>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}
