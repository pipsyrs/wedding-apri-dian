"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { id: "beranda", label: "Beranda", path: "M3 11l9-8 9 8M5 10v10h14V10" },
  { id: "mempelai", label: "Mempelai", path: "M12 21s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.5-7 10-7 10z" },
  { id: "acara", label: "Acara", path: "M3 5h18v16H3zM8 3v4M16 3v4M3 11h18" },
  { id: "galeri", label: "Galeri", path: "M3 5h18v14H3zM3 15l5-5 4 4 3-3 6 6" },
  { id: "ucapan", label: "Ucapan", path: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" },
];

/** Navigasi bawah untuk mobile, menyamping di layar besar. Maksimal 5 item. */
export function NavDock({ visible = true }) {
  const [current, setCurrent] = useState("beranda");

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visibleEntry) setCurrent(visibleEntry.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Navigasi undangan"
      inert={!visible}
      className={`fixed bottom-5 left-1/2 z-40 -translate-x-1/2 transition-all duration-500 ${
        visible ? "opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <ul className="flex items-center gap-1 rounded-full border border-gold/30 bg-ink/85 p-1.5 shadow-lift backdrop-blur">
        {LINKS.map((link) => {
          const isActive = current === link.id;

          return (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`grid h-11 w-11 cursor-pointer place-items-center rounded-full transition-colors duration-300 sm:h-12 sm:w-auto sm:gap-2 sm:px-4 ${
                  isActive ? "bg-gold text-ink" : "text-ivory/80 hover:bg-ivory/10 hover:text-gold"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-[18px] w-[18px] shrink-0"
                  aria-hidden="true"
                >
                  <path d={link.path} />
                </svg>
                <span className="hidden font-sans text-[0.75rem] uppercase tracking-[0.15em] sm:inline">
                  {link.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
