import { Reveal } from "@/components/motion/Reveal";
import { GorgaMotif } from "@/components/ornaments/GorgaMotif";
import { UlosBand } from "@/components/ornaments/UlosBand";
import { closing, couple, meta } from "@/data/invitation";

export function Closing() {
  return (
    <footer
      id="penutup"
      className="relative overflow-hidden bg-ink px-5 pb-[calc(var(--spacing-section)+5.5rem)] pt-section text-ivory sm:px-8 lg:pb-[calc(var(--spacing-section-lg)+5.5rem)] lg:pt-section-lg"
    >
      <div className="absolute inset-0 bg-gorga-weave opacity-[0.12]" aria-hidden="true" />
      <UlosBand className="absolute left-0 top-0" tone="dark" />

      <Reveal className="relative mx-auto max-w-2xl text-center" data-reveal-group>
        <GorgaMotif
          data-reveal="scale"
          variant="sitompi"
          className="mx-auto h-16 w-auto text-gold animate-drift"
        />

        <blockquote data-reveal className="mt-10">
          <p className="text-lg leading-relaxed text-ivory/85 text-balance sm:text-xl">
            {closing.verse}
          </p>
          <cite className="mt-5 block font-sans text-[0.75rem] uppercase not-italic tracking-[0.3em] text-gold">
            {closing.verseRef}
          </cite>
        </blockquote>

        <p data-reveal className="mx-auto mt-12 max-w-xl text-base leading-relaxed text-ivory/80">
          {closing.note}
        </p>

        <div data-reveal className="mt-14">
          <p className="font-sans text-[0.75rem] uppercase tracking-[0.3em] text-ivory/70">
            {closing.signature}
          </p>
          <p className="mt-6 font-script text-5xl leading-tight text-gold sm:text-6xl">
            {couple.groom.nickName}
            <span className="mx-3 text-ivory/75">&amp;</span>
            {couple.bride.nickName}
          </p>
          <p className="mt-6 text-sm text-ivory/75">{closing.families}</p>
        </div>

        <div data-reveal className="mt-16 border-t border-ivory/15 pt-8">
          <p className="font-sans text-[0.75rem] tracking-[0.25em] text-gold">{meta.hashtag}</p>
          <p className="mt-3 font-sans text-[0.75rem] tracking-[0.2em] text-ivory/70">
            Horas &middot; Gabe &middot; Sahat Sahat Ni Solu
          </p>
        </div>
      </Reveal>
    </footer>
  );
}
