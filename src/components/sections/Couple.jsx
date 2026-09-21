import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { GorgaMotif } from "@/components/ornaments/GorgaMotif";
import { UlosBand } from "@/components/ornaments/UlosBand";
import { couple } from "@/data/invitation";

function Person({ person, align = "left", reveal }) {
  return (
    <article
      data-reveal={reveal}
      className="group relative flex flex-col items-center text-center"
    >
      <div className="relative">
        <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-ivory shadow-lift sm:h-64 sm:w-64">
          <Image
            src={person.photo}
            alt={`Foto ${person.fullName}`}
            fill
            sizes="(max-width: 640px) 14rem, 16rem"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
        <span
          className="pointer-events-none absolute -inset-3 rounded-full border border-gold/40"
          aria-hidden="true"
        />
        <span
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-ulos px-4 py-1 font-sans text-[0.75rem] uppercase tracking-[0.25em] text-ivory"
          aria-hidden="true"
        >
          {person.marga}
        </span>
      </div>

      <h3 className="mt-10 font-script text-3xl leading-tight sm:text-4xl">{person.fullName}</h3>

      <p className="mt-4 text-sm text-muted-foreground">{person.order}</p>
      <p className="mt-1 text-base leading-relaxed">
        {person.father}
        <br />
        &amp; {person.mother}
      </p>

      <a
        href={`https://instagram.com/${person.instagram.replace("@", "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex min-h-11 cursor-pointer items-center gap-2 font-sans text-xs tracking-[0.15em] text-muted-foreground transition-colors hover:text-ulos"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
        {person.instagram}
      </a>
    </article>
  );
}

export function Couple() {
  return (
    <Section
      id="mempelai"
      eyebrow="Dalihan Na Tolu"
      title="Kedua Mempelai"
      subtitle="Dengan hormat dan sukacita, kedua keluarga memperkenalkan putra dan putri mereka."
      tone="dim"
    >
      <div className="relative" data-reveal-group>
        <div className="grid items-start gap-16 sm:gap-20 lg:grid-cols-[1fr_auto_1fr] lg:gap-12">
          <Person person={couple.groom} reveal="left" />

          <div
            data-reveal="scale"
            className="flex flex-col items-center justify-center gap-4 lg:pt-24"
          >
            <GorgaMotif variant="desa" className="h-14 w-14 text-gold animate-drift" />
            <span className="font-script text-5xl text-ulos">&amp;</span>
            <UlosBand className="w-20 rounded-full" />
          </div>

          <Person person={couple.bride} reveal="right" />
        </div>
      </div>
    </Section>
  );
}
