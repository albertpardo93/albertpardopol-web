"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { OPEN_BOOKING_EVENT } from "./BookingModal";

export default function StickyCTA({ dict }: { dict: Dictionary }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 px-4 py-3 backdrop-blur-sm transition-transform duration-200 sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      role="complementary"
      aria-label="Book appointment"
    >
      <button
        type="button"
        data-cta="booking"
        data-location="sticky"
        className="block w-full rounded-xl bg-primary py-3.5 text-center text-base font-semibold text-white shadow-md shadow-primary/25 transition-all duration-300 hover:bg-primary-light hover:shadow-lg hover:shadow-primary/35"
        onClick={() => {
          window.dispatchEvent(new CustomEvent(OPEN_BOOKING_EVENT));
        }}
      >
        {dict.hero.cta}
      </button>
    </div>
  );
}
