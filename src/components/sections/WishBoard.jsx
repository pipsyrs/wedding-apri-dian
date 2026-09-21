"use client";

import { useState } from "react";
import { WishForm } from "./WishForm";
import { WishCard } from "./WishCard";

/**
 * Menggabungkan ucapan dari database dengan kiriman baru,
 * sehingga ucapan yang baru dikirim langsung tampil tanpa muat ulang.
 */
export function WishBoard({ initialWishes = [], loadFailed = false }) {
  const [newWishes, setNewWishes] = useState([]);

  // Kiriman terbaru di atas; saring duplikat bila halaman sempat ter-revalidate
  const seen = new Set(newWishes.map((w) => w.id));
  const wishes = [...newWishes, ...initialWishes.filter((w) => !seen.has(String(w.id)))];

  return (
    <>
      <WishForm onSent={(wish) => setNewWishes((prev) => [wish, ...prev])} />

      {loadFailed ? (
        <p className="text-center text-base text-muted-foreground">
          Ucapan belum dapat dimuat saat ini.
        </p>
      ) : wishes.length === 0 ? (
        <p className="text-center text-base text-muted-foreground" data-reveal>
          Belum ada ucapan. Jadilah yang pertama memberi doa.
        </p>
      ) : (
        <ul className="grid gap-5 md:grid-cols-2" data-reveal-group>
          {wishes.map((wish, i) => (
            <li key={wish.id}>
              <WishCard
                wish={wish}
                reveal={i % 2 === 0 ? "left" : "right"}
                delay={Math.min(i, 6) * 0.05}
                isNew={seen.has(String(wish.id))}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
