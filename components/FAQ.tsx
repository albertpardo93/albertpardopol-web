"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import ScrollReveal from "./ScrollReveal";

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const id = question.replace(/\s+/g, "-").toLowerCase().slice(0, 30);

  return (
    <div className="border-b border-border">
      <h3>
        <button
          type="button"
          className="flex w-full items-center justify-between py-5 text-left text-base font-medium text-text-primary"
          aria-expanded={isOpen}
          aria-controls={`faq-${id}`}
          onClick={onToggle}
        >
          <span className="pr-4">{question}</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-primary" : "text-text-muted"}`}
            aria-hidden="true"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </h3>
      <div
        id={`faq-${id}`}
        role="region"
        className={`overflow-hidden transition-all duration-200 ${isOpen ? "max-h-96 pb-5" : "max-h-0"}`}
      >
        <p className="text-sm leading-relaxed text-text-secondary">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQ({ dict }: { dict: Dictionary }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-white px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <h2 className="text-center font-display text-2xl font-semibold text-text-primary sm:text-3xl lg:text-4xl">
            {dict.faq.title}
          </h2>
        </ScrollReveal>
        <div className="mt-12">
          {dict.faq.items.map((item, i) => (
            <ScrollReveal key={i} delay={i < 3 ? (i + 1) as 1 | 2 | 3 : undefined}>
              <AccordionItem
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
