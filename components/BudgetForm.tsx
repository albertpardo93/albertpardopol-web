"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";
import { track } from "@/lib/track";
import BookingTrigger from "@/components/BookingTrigger";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function BudgetForm({
  dict,
  conditionName,
  defaultCenter = "",
  title,
  subtitle,
  className = "mt-10",
}: {
  dict: Dictionary;
  conditionName: string;
  defaultCenter?: "vic" | "vithas" | "";
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const submittingRef = useRef(false);
  const [diagnosisStatus, setDiagnosisStatus] = useState("");
  const t = dict.budgetForm;
  const formTitle = title ?? t.title;
  const formSubtitle = subtitle ?? t.subtitle;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submittingRef.current) return;
    submittingRef.current = true;
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      diagnosisStatus: (form.elements.namedItem("diagnosisStatus") as HTMLSelectElement).value,
      preferredCenter: (form.elements.namedItem("preferredCenter") as HTMLSelectElement).value,
      privacyConsent: (form.elements.namedItem("privacyConsent") as HTMLInputElement).checked,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
      condition: conditionName,
    };

    try {
      const res = await fetch("/api/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");
      const result = (await res.json()) as { id?: string };
      if (!result.id) throw new Error("Missing submission ID");
      track("budget_form_submit", { condition: conditionName });
      if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === "function") {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "conversion", {
          send_to: "AW-18025540899/zZzyCJnP8pEcEKPan5ND",
          value: 1.0,
          currency: "EUR",
          transaction_id: result.id,
        });
      }
      setStatus("success");
    } catch {
      submittingRef.current = false;
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="mt-10 rounded-2xl border border-green-200 bg-green-50 px-6 py-8 text-center sm:px-8">
        <svg
          className="mx-auto h-12 w-12 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <h3 className="mt-4 font-display text-lg font-semibold text-green-800">
          {t.successTitle}
        </h3>
        <p className="mt-2 text-sm text-green-700">{t.successMessage}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Collapsed bubble */}
      {!open && (
        <button
          type="button"
          onClick={() => {
            track("budget_form_open", { condition: conditionName });
            setOpen(true);
          }}
          className="group flex w-full items-center gap-3 rounded-2xl border border-primary/15 bg-surface px-6 py-5 text-left transition-all duration-200 hover:border-primary/30 hover:shadow-md hover:scale-[1.01]"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          </span>
          <div className="flex-1">
            <span className="font-display text-base font-semibold text-text-primary sm:text-lg">
              {formTitle}
            </span>
            <span className="mt-0.5 block text-sm text-text-secondary">
              {formSubtitle}
            </span>
          </div>
          <svg className="h-5 w-5 shrink-0 text-text-muted transition-transform group-hover:text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      )}

      {/* Expanded form */}
      {open && (
        <div className="rounded-2xl border border-primary/15 bg-surface px-6 py-8 sm:px-8">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-text-primary sm:text-xl">
              {formTitle}
            </h3>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-border/50 hover:text-text-primary"
              aria-label={dict.emergencyBanner.close}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            {formSubtitle}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="budget-diagnosis" className="block text-sm font-medium text-text-primary">
                  {t.diagnosisStatus}
                </label>
                <select
                  id="budget-diagnosis"
                  name="diagnosisStatus"
                  required
                  value={diagnosisStatus}
                  onChange={(event) => setDiagnosisStatus(event.target.value)}
                  className="mt-1.5 block w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-text-primary transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="" disabled>{t.diagnosisPlaceholder}</option>
                  <option value="diagnosis-confirmed">{t.diagnosisConfirmed}</option>
                  <option value="surgery-recommended">{t.surgeryRecommended}</option>
                  <option value="tests-available">{t.testsAvailable}</option>
                  <option value="needs-assessment">{t.needsAssessment}</option>
                </select>
              </div>
              <div>
                <label htmlFor="budget-center" className="block text-sm font-medium text-text-primary">
                  {t.preferredCenter}
                </label>
                <select
                  id="budget-center"
                  name="preferredCenter"
                  required
                  defaultValue={defaultCenter}
                  className="mt-1.5 block w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-text-primary transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="" disabled>{t.centerPlaceholder}</option>
                  <option value="vic">{t.centerVic}</option>
                  <option value="vithas">{t.centerVithas}</option>
                  <option value="no-preference">{t.centerNoPreference}</option>
                </select>
              </div>
            </div>

            {diagnosisStatus === "needs-assessment" && (
              <div className="rounded-xl border border-primary/15 bg-white px-4 py-3 text-sm text-text-secondary">
                <p>{t.assessmentAdvice}</p>
                <BookingTrigger className="mt-3 font-semibold text-primary underline underline-offset-4 hover:text-primary-light">
                  {t.assessmentCta}
                </BookingTrigger>
              </div>
            )}

            <div>
              <label
                htmlFor="budget-name"
                className="block text-sm font-medium text-text-primary"
              >
                {t.name}
              </label>
              <input
                type="text"
                id="budget-name"
                name="name"
                required
                placeholder={t.namePlaceholder}
                className="mt-1.5 block w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="budget-email"
                  className="block text-sm font-medium text-text-primary"
                >
                  {t.email}
                </label>
                <input
                  type="email"
                  id="budget-email"
                  name="email"
                  required
                  placeholder={t.emailPlaceholder}
                  className="mt-1.5 block w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="budget-phone"
                  className="block text-sm font-medium text-text-primary"
                >
                  {t.phone}
                </label>
                <input
                  type="tel"
                  id="budget-phone"
                  name="phone"
                  placeholder={t.phonePlaceholder}
                  className="mt-1.5 block w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="budget-message"
                className="block text-sm font-medium text-text-primary"
              >
                {t.message}
              </label>
              <textarea
                id="budget-message"
                name="message"
                required
                rows={4}
                placeholder={t.messagePlaceholder}
                className="mt-1.5 block w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
            </div>

            <label className="flex items-start gap-3 rounded-xl border border-border bg-white px-4 py-3 text-sm leading-relaxed text-text-secondary">
              <input
                type="checkbox"
                name="privacyConsent"
                required
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-border text-primary focus:ring-primary"
              />
              <span>
                {t.privacyConsent}{" "}
                <Link href="/politica-de-privacidad" target="_blank" className="font-medium text-primary underline underline-offset-2">
                  {t.privacyLink}
                </Link>.
              </span>
            </label>

            {status === "error" && (
              <p className="text-sm text-red-600">{t.errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all duration-300 hover:bg-primary-light hover:shadow-lg hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100 sm:w-auto"
            >
              {status === "sending" ? t.sending : status === "error" ? t.retry : t.submit}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
