"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { OPEN_BOOKING_EVENT } from "./BookingModal";

interface ConditionItem {
  name: string;
  description: string;
  detail: string;
}

export default function ConditionModal({ dict }: { dict: Dictionary }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [item, setItem] = useState<ConditionItem | null>(null);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ConditionItem>).detail;
      setItem(detail);
      dialogRef.current?.showModal();
    };
    window.addEventListener("open-condition-modal", handler);
    return () => window.removeEventListener("open-condition-modal", handler);
  }, []);

  if (!item) return null;

  return (
    <dialog
      ref={dialogRef}
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-border bg-white p-0 shadow-xl backdrop:bg-black/40 backdrop:backdrop-blur-sm open:animate-[fade-in_150ms_ease-out]"
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <h2 className="font-display text-xl font-semibold text-text-primary">{item.name}</h2>
          <button
            type="button"
            onClick={close}
            className="ml-4 rounded-lg p-2 text-text-muted transition-colors hover:bg-surface hover:text-text-secondary"
            aria-label={dict.conditions.close}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M15 5L5 15M5 5l10 10" />
            </svg>
          </button>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-text-secondary">
          {item.detail}
        </p>

        <button
          type="button"
          data-cta="booking"
          data-location="condition-modal"
          className="mt-6 block w-full rounded-xl bg-primary py-3.5 text-center text-base font-semibold text-white shadow-md shadow-primary/20 transition-all duration-300 hover:bg-primary-light hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02]"
          onClick={() => {
            close();
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent(OPEN_BOOKING_EVENT));
            }, 150);
          }}
        >
          {dict.conditions.bookCta}
        </button>
      </div>
    </dialog>
  );
}
