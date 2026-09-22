"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { gallery } from "@/data/invitation";

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null);
  const closeRef = useRef(null);
  const lastFocused = useRef(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const step = useCallback((delta) => {
    setActiveIndex((i) => (i === null ? i : (i + delta + gallery.length) % gallery.length));
  }, []);

  // Kunci scroll, kelola fokus, dan sediakan navigasi keyboard
  useEffect(() => {
    if (activeIndex === null) return;

    lastFocused.current = document.activeElement;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lastFocused.current?.focus?.();
    };
  }, [activeIndex, close, step]);

  const active = activeIndex === null ? null : gallery[activeIndex];

  return (
    <>
      <Section
        id="galeri"
        eyebrow="Gambar"
        title="Galeri Kami"
        subtitle="Beberapa momen yang kami rekam menjelang hari bahagia."
        contentClassName="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
      >
        {gallery.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            data-reveal="scale"
            data-reveal-group
            data-reveal-delay={i * 0.05}
            onClick={() => setActiveIndex(i)}
            aria-label={`Perbesar foto: ${photo.alt}`}
            className="group relative aspect-[2/3] cursor-pointer overflow-hidden rounded-2xl border border-border/60"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/35" />
            <span className="absolute inset-x-0 bottom-0 translate-y-full p-4 text-left font-sans text-[0.75rem] uppercase tracking-[0.2em] text-ivory transition-transform duration-500 group-hover:translate-y-0">
              {photo.alt}
            </span>
          </button>
        ))}
      </Section>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="relative h-[70vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes="90vw"
              className="rounded-2xl object-contain"
            />
          </div>

          <p className="mt-5 text-center font-sans text-xs tracking-[0.2em] text-ivory/70">
            {active.alt}
          </p>

          <div className="mt-6 flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <IconButton label="Foto sebelumnya" onClick={() => step(-1)} path="M15 6l-6 6 6 6" />
            <span className="font-sans text-xs tabular-nums text-ivory/75">
              {activeIndex + 1} / {gallery.length}
            </span>
            <IconButton label="Foto berikutnya" onClick={() => step(1)} path="M9 6l6 6-6 6" />
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Tutup galeri"
            className="absolute right-4 top-4 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      ) : null}
    </>
  );
}

function IconButton({ label, onClick, path }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-ink"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d={path} />
      </svg>
    </button>
  );
}
