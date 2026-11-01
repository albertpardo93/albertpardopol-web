"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { contact } from "@/lib/config";
import { track } from "@/lib/track";
import { leadEventParams, whatsappHref } from "@/lib/attribution";

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
  disabled?: boolean;
};

export default function TrackedWhatsAppLink({ children, location, disabled = false, ...props }: Props) {
  return (
    <a
      {...props}
      href={disabled ? undefined : contact.whatsapp}
      aria-disabled={disabled || undefined}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="whatsapp"
      data-location={location}
      onClick={(event) => {
        if (disabled) { event.preventDefault(); return; }
        const { href, reference, attribution } = whatsappHref(contact.whatsapp);
        event.currentTarget.href = href;
        track("whatsapp_click", { location, ...leadEventParams(attribution), contact_reference: reference });
        fireWhatsAppConversion();
      }}
    >
      {children}
    </a>
  );
}
