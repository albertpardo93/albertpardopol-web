"use client";

import type { ReactNode } from "react";
import { booking } from "@/lib/config";

function fireConversion() {
  const win = window as typeof window & {
    gtag?: (...args: unknown[]) => void;
  };

  win.gtag?.("event", "conversion", {
    send_to: "AW-18025540899/zZzyCJnP8pEcEKPan5ND",
    value: 1,
    currency: "EUR",
  });
}

export default function VicBookingLink({
  children,
  className,
  location,
}: {
  children: ReactNode;
  className?: string;
  location: string;
}) {
  return (
    <a
      href={booking.bayes.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="booking"
      data-location={location}
      className={className}
      onClick={fireConversion}
    >
      {children}
    </a>
  );
}
