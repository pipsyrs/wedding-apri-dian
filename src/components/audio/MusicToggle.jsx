"use client";

import { useAudio } from "./AudioContext";
import { music } from "@/data/invitation";

/** Kontrol musik mengambang — wajib terlihat selama musik bisa berbunyi. */
export function MusicToggle({ visible = true }) {
  const { isPlaying, toggle, hasError } = useAudio();

  // Sembunyikan kontrol bila file musik tidak bisa dimuat
  if (hasError) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isPlaying ? `Hentikan musik: ${music.title}` : `Putar musik: ${music.title}`}
      aria-pressed={isPlaying}
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      className={`fixed bottom-24 right-5 z-40 grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-gold/50 bg-ink/85 text-gold shadow-lift backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-ink active:scale-95 sm:bottom-8 sm:right-8 sm:h-14 sm:w-14 ${
        visible ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {isPlaying ? (
        <span className="flex items-end gap-[3px]" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="w-[3px] rounded-full bg-current"
              style={{
                height: `${[10, 16, 8, 13][i]}px`,
                animation: `drift ${0.9 + i * 0.22}s ease-in-out ${i * 0.1}s infinite alternate`,
              }}
            />
          ))}
        </span>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      )}
    </button>
  );
}
