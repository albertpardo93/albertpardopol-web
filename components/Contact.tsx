import type { Dictionary } from "@/lib/i18n";
import { contact } from "@/lib/config";
import ScrollReveal from "./ScrollReveal";

export default function Contact({ dict }: { dict: Dictionary }) {
  return (
    <section id="contacto" className="bg-surface px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <h2 className="text-center font-display text-2xl font-semibold text-text-primary sm:text-3xl lg:text-4xl">
            {dict.contact.title}
          </h2>
        </ScrollReveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <ScrollReveal delay={1}>
            <a
              href={`mailto:${contact.email}`}
              className="flex h-full items-center gap-3 rounded-2xl border border-border bg-white p-5 transition-all hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.02] hover:border-primary/30"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-primary"
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
              </svg>
              <div>
                <p className="text-xs text-text-muted">{dict.contact.email}</p>
                <p className="text-sm font-medium text-text-primary">
                  {contact.email}
                </p>
              </div>
            </a>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full items-center gap-3 rounded-2xl border border-border bg-white p-5 transition-all hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.02] hover:border-primary/30"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0 text-primary"
                aria-hidden="true"
              >
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
                  fill="currentColor"
                />
                <path
                  d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.105-1.127l-.295-.178-2.868.852.852-2.868-.178-.295A8 8 0 1112 20z"
                  fill="currentColor"
                />
              </svg>
              <div>
                <p className="text-xs text-text-muted">{dict.contact.whatsapp}</p>
                <p className="text-sm font-medium text-text-primary">WhatsApp</p>
              </div>
            </a>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <p className="mt-8 rounded-xl bg-red-50 px-5 py-4 text-center text-sm text-red-800">
            {dict.contact.emergency}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
