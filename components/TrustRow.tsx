import type { Dictionary } from "@/lib/i18n";

export default function TrustRow({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-y border-accent/40 bg-accent/15 py-4">
      <div className="mx-auto max-w-5xl px-4">
        <div className="scroll-snap-x scrollbar-hide flex gap-3 overflow-x-auto sm:flex-wrap sm:justify-center sm:gap-4 sm:overflow-visible">
          {dict.trust.items.map((item) => (
            <span
              key={item}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-text-secondary"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-primary"
                aria-hidden="true"
              >
                <path
                  d="M13.3 4.3L6 11.6L2.7 8.3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
