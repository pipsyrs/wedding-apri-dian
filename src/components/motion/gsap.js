"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Registrasi sekali untuk seluruh aplikasi
if (typeof window !== "undefined" && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export const EASE = "expo.out";
export const EASE_SOFT = "power2.out";

export { gsap, ScrollTrigger, SplitText };
