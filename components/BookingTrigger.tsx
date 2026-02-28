"use client";

import { type ReactNode } from "react";
import { OPEN_BOOKING_EVENT } from "./BookingModal";

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
        window.dispatchEvent(new CustomEvent(OPEN_BOOKING_EVENT));
        onClick?.();
      }}
    >
      {children}
    </button>
  );
}
