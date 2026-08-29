"use client";

import { type ReactNode } from "react";
import { OPEN_BOOKING_EVENT } from "./BookingModal";
import { track } from "@/lib/track";

export default function BookingTrigger({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      data-cta="booking"
      data-location="modal"
      className={className}
      onClick={() => {
        track("booking_modal_open", { location: "page_cta" });
        window.dispatchEvent(new CustomEvent(OPEN_BOOKING_EVENT));
        onClick?.();
      }}
    >
      {children}
    </button>
  );
}
