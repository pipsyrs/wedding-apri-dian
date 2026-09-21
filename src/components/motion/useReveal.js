"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, EASE } from "./gsap";

/**
 * Menganimasikan setiap [data-reveal] di dalam scope saat masuk viewport.
 * Varian diatur lewat atribut: data-reveal="up|fade|left|right|scale".
 * Elemen dengan [data-reveal-group] menjadi trigger bersama untuk stagger.
 */
export function useReveal(options = {}) {
  const scope = useRef(null);
  const { start = "top 85%", stagger = 0.09, once = true } = options;

  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Reduced motion: tampilkan langsung, tanpa gerak
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-reveal]", { opacity: 1, x: 0, y: 0, scale: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const groups = new Map();

        gsap.utils.toArray("[data-reveal]").forEach((el) => {
          const trigger = el.closest("[data-reveal-group]") || el;
          if (!groups.has(trigger)) groups.set(trigger, []);
          groups.get(trigger).push(el);
        });

        groups.forEach((items, trigger) => {
          gsap.fromTo(
            items,
            {
              opacity: 0,
              y: (i, el) => offsetFor(el).y,
              x: (i, el) => offsetFor(el).x,
              scale: (i, el) => (el.dataset.reveal === "scale" ? 0.94 : 1),
            },
            {
              opacity: 1,
              y: 0,
              x: 0,
              scale: 1,
              duration: 0.75,
              ease: EASE,
              stagger,
              delay: Number(trigger.dataset.revealDelay || 0),
              scrollTrigger: {
                trigger,
                start,
                toggleActions: once ? "play none none none" : "play none none reverse",
              },
            },
          );
        });
      });
    }, scope);

    return () => ctx.revert();
  }, [start, stagger, once]);

  return scope;
}

function offsetFor(el) {
  switch (el.dataset.reveal) {
    case "left":
      return { x: -36, y: 0 };
    case "right":
      return { x: 36, y: 0 };
    case "fade":
    case "scale":
      return { x: 0, y: 0 };
    default:
      return { x: 0, y: 28 };
  }
}
