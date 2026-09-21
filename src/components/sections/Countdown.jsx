"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/components/motion/gsap";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { mainEventDate } from "@/data/invitation";

const TARGET = new Date(mainEventDate).getTime();
const UNITS = [
  { key: "days", label: "Hari" },
  { key: "hours", label: "Jam" },
  { key: "minutes", label: "Menit" },
  { key: "seconds", label: "Detik" },
];

function remaining() {
  const diff = Math.max(TARGET - Date.now(), 0);
  const sec = Math.floor(diff / 1000);
  return {
    days: Math.floor(sec / 86400),
    hours: Math.floor((sec % 86400) / 3600),
    minutes: Math.floor((sec % 3600) / 60),
    seconds: sec % 60,
    done: diff === 0,
  };
}

const fullDate = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jakarta",
}).format(new Date(mainEventDate));

export function Countdown() {
  // null di render pertama agar markup server & client identik
  const [time, setTime] = useState(null);
  const prev = useRef({});

  useEffect(() => {
    setTime(remaining());
    const id = setInterval(() => setTime(remaining()), 1000);
    return () => clearInterval(id);
  }, []);

  // Denyut halus tiap angka berubah
  useEffect(() => {
    if (!time) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    UNITS.forEach(({ key }) => {
      if (prev.current[key] !== time[key]) {
        gsap.fromTo(
          `[data-unit="${key}"]`,
          { y: -8, opacity: 0.45 },
          { y: 0, opacity: 1, duration: 0.45, ease: "expo.out" },
        );
      }
    });
    prev.current = time;
  }, [time]);

  return (
    <Section
      id="hitung-mundur"
      eyebrow="Save the Date"
      title="Menuju Hari Bahagia"
      subtitle={fullDate}
      tone="ink"
    >
      <div className="flex flex-col items-center gap-12" data-reveal-group>
        <div
          data-reveal="scale"
          className="grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6"
          role="timer"
          aria-live="off"
        >
          {UNITS.map(({ key, label }) => (
            <div
              key={key}
              className="relative overflow-hidden rounded-2xl border border-gold/25 bg-ivory/5 px-3 py-7 text-center backdrop-blur-sm sm:py-9"
            >
              <div className="absolute inset-0 bg-gorga-weave opacity-10" aria-hidden="true" />
              <span
                data-unit={key}
                className="relative block font-serif text-4xl font-light tabular-nums text-gold sm:text-6xl"
              >
                {time ? String(time[key]).padStart(2, "0") : "--"}
              </span>
              <span className="relative mt-3 block font-sans text-[0.75rem] uppercase tracking-[0.28em] text-ivory/75">
                {label}
              </span>
            </div>
          ))}
        </div>

        <p data-reveal className="sr-only" aria-live="polite">
          {time
            ? time.done
              ? "Hari bahagia telah tiba."
              : `Tersisa ${time.days} hari menuju hari pernikahan.`
            : "Menghitung waktu menuju hari pernikahan."}
        </p>

        <Button
          as="a"
          data-reveal
          variant="gold"
          href={calendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M8 3v4M16 3v4M3 11h18M12 15v4M10 17h4" />
          </svg>
          Simpan ke Kalender
        </Button>
      </div>
    </Section>
  );
}

function calendarUrl() {
  const start = new Date(mainEventDate);
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
  const fmt = (d) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "Pernikahan Apri & Dian",
    dates: `${fmt(start)}/${fmt(end)}`,
    details: "Undangan pernikahan adat Batak Toba.",
    location: "Balige, Toba, Sumatera Utara",
  });

  return `https://calendar.google.com/calendar/render?${params}`;
}
