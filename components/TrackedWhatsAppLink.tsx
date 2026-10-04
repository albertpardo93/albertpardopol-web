"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { contact } from "@/lib/config";
import { track } from "@/lib/track";

const WHATSAPP_CONVERSION = "AW-18025540899/RygDCKLEluwcEKPan5ND";

function fireWhatsAppConversion() {
  const win = window as typeof window & {
    gtag?: (...args: unknown[]) => void;
  };

  win.gtag?.("event", "conversion", {
    send_to: WHATSAPP_CONVERSION,
    value: 1,
    currency: "EUR",
  });
}

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> & {
  children: ReactNode;
  location: string;
};

export default function TrackedWhatsAppLink({ children, location, ...props }: Props) {
  return (
    <a
      {...props}
      href={contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="whatsapp"
      data-location={location}
      onClick={() => {
        track("whatsapp_click", { location });
        fireWhatsAppConversion();
      }}
    >
      {children}
    </a>
  );
}
