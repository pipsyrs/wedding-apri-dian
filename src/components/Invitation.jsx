"use client";

import { useEffect, useState } from "react";
import { AudioProvider } from "./audio/AudioContext";
import { MusicToggle } from "./audio/MusicToggle";
import { NavDock } from "./ui/NavDock";
import { CoverGate } from "./sections/CoverGate";
import { Hero } from "./sections/Hero";
import { Couple } from "./sections/Couple";
import { Countdown } from "./sections/Countdown";
import { Events } from "./sections/Events";
import { Story } from "./sections/Story";
import { Gallery } from "./sections/Gallery";
import { Location } from "./sections/Location";
import { DigitalEnvelope } from "./sections/DigitalEnvelope";
import { Closing } from "./sections/Closing";

/**
 * Shell undangan: mengatur cover gate, musik, navigasi, dan urutan section.
 * Menambah section cukup menyisipkannya ke dalam <main> di bawah.
 */
export function Invitation({ wishesSlot }) {
  const [opened, setOpened] = useState(false);

  // Tandai JS aktif agar elemen reveal boleh disembunyikan sebelum animasi
  useEffect(() => {
    document.documentElement.classList.add("js-motion");
    return () => document.documentElement.classList.remove("js-motion");
  }, []);

  useEffect(() => {
    if (opened) window.scrollTo({ top: 0, behavior: "auto" });
  }, [opened]);

  return (
    <AudioProvider>
      {!opened && <CoverGate onOpen={() => setOpened(true)} />}

      <div className={opened ? "" : "pointer-events-none select-none"} aria-hidden={!opened}>
        <main>
          <Hero active={opened} />
          <Couple />
          <Countdown />
          <Events />
          <Story />
          <Gallery />
          <Location />
          <DigitalEnvelope />
          {wishesSlot}
        </main>
        <Closing />
      </div>

      <NavDock visible={opened} />
      <MusicToggle visible={opened} />
    </AudioProvider>
  );
}
