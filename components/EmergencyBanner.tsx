"use client";

import { useState, useEffect } from "react";
import type { Dictionary } from "@/lib/i18n";
import { contact } from "@/lib/config";

const STORAGE_KEY = "emergency-banner-dismissed";

export default function EmergencyBanner({ dict }: { dict: Dictionary }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4">
      <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 shadow-xl sm:gap-4 sm:px-6 sm:py-4">
        {/* Urgency icon */}
        <div className="hidden shrink-0 sm:block">
          <svg
            className="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>

        <p className="flex-1 text-sm leading-snug text-red-800">
          {dict.emergencyBanner.text}
        </p>

        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700"
        >
          <span className="hidden sm:inline">{dict.emergencyBanner.cta}</span>
          <span className="sm:hidden">WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={handleClose}
          className="shrink-0 rounded-lg p-1 text-red-400 transition-colors hover:bg-red-100 hover:text-red-600"
          aria-label={dict.emergencyBanner.close}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
