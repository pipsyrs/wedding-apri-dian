"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, EASE } from "@/components/motion/gsap";
import { useAudio } from "@/components/audio/AudioContext";
import { GorgaMotif } from "@/components/ornaments/GorgaMotif";
import { UlosBand } from "@/components/ornaments/UlosBand";
import { Button } from "@/components/ui/Button";
import { couple, mainEventDate } from "@/data/invitation";

const dateLabel = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jakarta",
}).format(new Date(mainEventDate));

/**
 * Layar pembuka. Menahan scroll sampai tamu menekan tombol —
 * interaksi itu sekaligus yang mengizinkan musik berbunyi.
 */
export function CoverGate({ onOpen }) {
  const root = useRef(null);
  const [isClosing, setIsClosing] = useState(false);
  const { play } = useAudio();

  // Kunci scroll selama cover tampil
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: EASE } })
          .from("[data-cover-frame]", { scale: 1.06, opacity: 0, duration: 1.1 })
          .from("[data-cover-ornament]", { opacity: 0, y: -16, duration: 0.7 }, "-=0.6")
          .from("[data-cover-line]", { opacity: 0, y: 24, duration: 0.7, stagger: 0.12 }, "-=0.35")
          .from("[data-cover-cta]", { opacity: 0, y: 20, duration: 0.6 }, "-=0.2");
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const handleOpen = () => {
    if (isClosing) return;
    setIsClosing(true);
    play();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      onOpen();
      return;
    }

    gsap.to(root.current, {
      opacity: 0,
      scale: 1.04,
      duration: 0.8,
      ease: "expo.inOut",
      onComplete: onOpen,
    });
  };

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label="Pembuka undangan"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-ink px-5 py-10"
    >
      <div
        data-cover-frame
        className="absolute inset-0 bg-gorga-weave opacity-[0.22]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,#1a1310_75%)]"
        aria-hidden="true"
      />

      <UlosBand className="absolute left-0 top-0" tone="dark" />
      <UlosBand className="absolute bottom-0 left-0" tone="dark" />

      <div className="relative flex w-full max-w-md flex-col items-center text-center">
        <GorgaMotif variant="ulos" className="h-16 w-auto text-gold animate-drift sm:h-20" data-hero />

        <p
          data-cover-line
          className="mt-8 font-sans text-[0.75rem] uppercase tracking-[0.4em] text-gold"
        >
          Undangan Pernikahan
        </p>

        <h1
          data-cover-line
          className="mt-5 font-script text-5xl leading-[1.1] text-ivory sm:text-6xl"
        >
          {couple.groom.nickName}
          <span className="mx-3 text-gold">&</span>
          {couple.bride.nickName}
        </h1>

        <div data-cover-line className="mt-6 flex items-center gap-3 text-ivory/70">
          <span className="h-px w-10 bg-gold/50" aria-hidden="true" />
          <time dateTime={mainEventDate} className="font-sans text-xs tracking-[0.2em]">
            {dateLabel}
          </time>
          <span className="h-px w-10 bg-gold/50" aria-hidden="true" />
        </div>

        <p data-cover-line className="mt-8 text-sm leading-relaxed text-ivory/80">
          Kepada Bapak/Ibu/Saudara/i,
          <br />
          tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir.
        </p>

        <div data-cover-cta className="relative mt-10">
          <span
            className="pointer-events-none absolute inset-0 rounded-full border border-gold/40 animate-pulse-ring"
            aria-hidden="true"
          />
          <Button variant="gold" onClick={handleOpen} disabled={isClosing}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M4 7l8 6 8-6" />
              <rect x="3" y="5" width="18" height="14" rx="2" />
            </svg>
            Buka Undangan
          </Button>
        </div>

        <p data-cover-cta className="mt-5 text-[0.75rem] text-ivory/70">
          Undangan akan diiringi musik
        </p>
      </div>
    </div>
  );
}
