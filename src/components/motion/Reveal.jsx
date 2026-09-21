"use client";

import { useReveal } from "./useReveal";

/**
 * Bungkus satu blok konten; semua [data-reveal] di dalamnya ikut teranimasi.
 * Dipakai section agar tiap komponen tidak perlu memanggil hook sendiri.
 */
export function Reveal({
  as: Tag = "div",
  children,
  className = "",
  start,
  stagger,
  once,
  ...rest
}) {
  const scope = useReveal({ start, stagger, once });

  return (
    <Tag ref={scope} className={className} {...rest}>
      {children}
    </Tag>
  );
}
