"use client";

import { useState } from "react";
import Image from "next/image";

const images = [
  { src: "/albert-pardo-pol.jpg", alt: "Dr. Albert Pardo Pol", position: "center" },
  { src: "/dr-pardo-quirofano.jpg", alt: "Dr. Albert Pardo Pol en quirófano", position: "top" },
  { src: "/albert-pardo-pol-3.jpg", alt: "Dr. Albert Pardo Pol", position: "center" },
];

export default function HeroImage() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div className="hero-animate-image h-64 w-64 sm:h-96 sm:w-80 lg:h-[28rem] lg:w-96">
      <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl shadow-black/30 ring-1 ring-white/20">
        {/* Images */}
        {images.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            width={500}
            height={600}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
            style={{ objectPosition: img.position }}
            priority={i === 0}
          />
        ))}

        {/* Arrows */}
        <button
          type="button"
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white/90 backdrop-blur-sm transition-all hover:bg-black/50"
          aria-label="Foto anterior"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M8.5 10.5L5 7l3.5-3.5" />
          </svg>
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white/90 backdrop-blur-sm transition-all hover:bg-black/50"
          aria-label="Siguiente foto"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M5.5 3.5L9 7l-3.5 3.5" />
          </svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-4 bg-white" : "w-1.5 bg-white/50"
              }`}
              aria-label={`Foto ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
