"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { music } from "@/data/invitation";

const AudioCtx = createContext(null);

/**
 * Satu elemen <audio> untuk seluruh halaman.
 * Browser memblokir autoplay bersuara sebelum ada interaksi, jadi pemutaran
 * sebenarnya dipicu saat tamu menekan "Buka Undangan" pada cover.
 */
export function AudioProvider({ children }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    // Lagu selesai — putar ulang dari awal bila tamu menekan tombol lagi
    const onEnded = () => {
      setIsPlaying(false);
      setHasEnded(true);
      el.currentTime = 0;
    };
    const onReady = () => {
      setIsReady(true);
      setHasError(false);
    };

    // File hilang, rusak, atau formatnya tidak didukung browser
    const onError = () => {
      setHasError(true);
      setIsReady(false);
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `Musik gagal dimuat: ${music.src}. Pastikan file ada di public/ dan benar-benar berformat MP3.`,
        );
      }
    };

    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);
    el.addEventListener("canplay", onReady);
    el.addEventListener("error", onError);

    // Muat bisa gagal sebelum efek ini terpasang — periksa kondisi terkini
    if (el.error) onError();
    else if (el.readyState >= 3) onReady();

    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("canplay", onReady);
      el.removeEventListener("error", onError);
    };
  }, []);

  const play = useCallback(async () => {
    const el = audioRef.current;
    if (!el) return false;
    try {
      el.volume = 0;
      await el.play();
      fadeTo(el, 0.45, 1200);
      return true;
    } catch {
      // Autoplay ditolak browser — tamu bisa menyalakan lewat tombol
      return false;
    }
  }, []);

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      // Lagu sudah habis — mulai lagi dari awal
      if (el.ended || el.currentTime >= el.duration) el.currentTime = 0;
      setHasEnded(false);
      el.volume = 0;
      el.play()
        .then(() => fadeTo(el, 0.45, 600))
        .catch(() => {});
    } else {
      fadeTo(el, 0, 400, () => el.pause());
    }
  }, []);

  const value = useMemo(
    () => ({ isPlaying, isReady, hasError, hasEnded, play, toggle }),
    [isPlaying, isReady, hasError, hasEnded, play, toggle],
  );

  return (
    <AudioCtx.Provider value={value}>
      <audio ref={audioRef} src={music.src} preload="auto" playsInline />
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio harus dipakai di dalam AudioProvider");
  return ctx;
}

// Fade manual agar transisi suara tidak kasar
function fadeTo(el, target, duration, done) {
  const start = el.volume;
  const startTime = performance.now();

  const step = (now) => {
    const t = Math.min((now - startTime) / duration, 1);
    // Clamp — pembulatan float bisa menghasilkan nilai di luar rentang [0,1]
    el.volume = Math.min(1, Math.max(0, start + (target - start) * t));
    if (t < 1) {
      requestAnimationFrame(step);
    } else if (done) {
      done();
    }
  };

  requestAnimationFrame(step);
}
