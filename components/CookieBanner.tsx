"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

const texts = {
  es: {
    message:
      "Esta web utiliza cookies técnicas necesarias para su correcto funcionamiento. No utilizamos cookies de análisis ni publicitarias.",
    accept: "Aceptar",
    reject: "Rechazar",
    moreInfo: "Política de cookies",
  },
  ca: {
    message:
      "Aquest web utilitza cookies tècniques necessàries per al seu correcte funcionament. No utilitzem cookies d'anàlisi ni publicitàries.",
    accept: "Acceptar",
    reject: "Rebutjar",
    moreInfo: "Política de cookies",
  },
  en: {
    message:
      "This website uses essential technical cookies required for its proper functioning. We do not use analytics or advertising cookies.",
    accept: "Accept",
    reject: "Reject",
    moreInfo: "Cookie policy",
  },
};

export default function CookieBanner({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);
  const t = texts[locale];

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-border bg-white p-5 shadow-xl sm:flex-row sm:items-center sm:gap-6">
        <p className="flex-1 text-sm leading-relaxed text-text-secondary">
          {t.message}{" "}
          <Link
            href={`/${locale}/politica-de-cookies`}
            className="font-medium text-primary underline underline-offset-2 hover:text-primary-light"
          >
            {t.moreInfo}
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={handleReject}
            className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface"
          >
            {t.reject}
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-light"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
