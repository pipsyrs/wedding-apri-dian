"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap, EASE, SplitText } from "@/components/motion/gsap";
import { GorgaMotif } from "@/components/ornaments/GorgaMotif";
import { UlosBand } from "@/components/ornaments/UlosBand";
import { couple, mainEventDate, meta } from "@/data/invitation";

const dateLabel = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jakarta",
}).format(new Date(mainEventDate));

export function Hero({ active = true }) {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (!active) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-hero]", { opacity: 1, y: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const heading = root.current.querySelector("[data-hero-names]");
        const split = new SplitText(heading, { type: "chars" });

        const tl = gsap.timeline({ defaults: { ease: EASE } });

        tl.fromTo(
          "[data-hero-media]",
          { scale: 1.12, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.4 },
        )
          .fromTo(
            "[data-hero-eyebrow]",
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.7 },
            "-=0.9",
          )
          .fromTo(
            split.chars,
            { opacity: 0, y: 26, rotateX: -50 },
            { opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.022 },
            "-=0.45",
          )
          .fromTo(
            "[data-hero-detail]",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
            "-=0.3",
          );

        // Parallax lembut pada lapisan dekoratif
        gsap.to("[data-hero-media]", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 },
        });

        return () => split.revert();
      });
    }, root);

    return () => ctx.revert();
  }, [active]);

  return (
    <section
      ref={root}
      id="beranda"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink px-5 py-24 text-ivory"
    >
      <div data-hero-media className="absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src="/images/hero.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gorga-weave opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/55 to-ink" />
      </div>

      <UlosBand className="absolute left-0 top-0" tone="dark" />

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <GorgaMotif variant="simeol" className="h-10 w-40 text-gold" data-hero />

        <p
          data-hero-eyebrow
          className="mt-8 font-sans text-[0.75rem] uppercase tracking-[0.42em] text-gold"
        >
          Horas! Kami akan menikah
        </p>

        <h1
          data-hero-names
          className="mt-6 font-script text-[3.25rem] leading-[1.05] text-ivory sm:text-7xl lg:text-8xl"
        >
          {couple.groom.nickName} &amp; {couple.bride.nickName}
        </h1>

        <div data-hero-detail className="mt-8 flex items-center gap-4">
          <span className="h-px w-12 bg-gold/50" aria-hidden="true" />
          <time dateTime={mainEventDate} className="font-sans text-xs tracking-[0.22em] sm:text-sm">
            {dateLabel}
          </time>
          <span className="h-px w-12 bg-gold/50" aria-hidden="true" />
        </div>

        <p
          data-hero-detail
          className="mt-7 max-w-lg text-base leading-relaxed text-ivory/70 text-balance sm:text-lg"
        >
          Dengan sukacita dan doa kedua keluarga, kami mengundang Anda untuk menjadi saksi
          janji suci kami dalam adat Batak Toba.
        </p>

        <p data-hero-detail className="mt-6 font-sans text-[0.75rem] tracking-[0.3em] text-gold">
          {meta.hashtag}
        </p>

        <a
          data-hero-detail
          href="#mempelai"
          className="group mt-14 inline-flex cursor-pointer flex-col items-center gap-2 text-ivory/75 transition-colors hover:text-gold"
        >
          <span className="font-sans text-[0.75rem] uppercase tracking-[0.3em]">Geser ke bawah</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-1"
            aria-hidden="true"
          >
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </a>
      </div>
    </section>
  );
}
