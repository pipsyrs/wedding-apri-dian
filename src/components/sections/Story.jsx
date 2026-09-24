import { Section } from "@/components/ui/Section";
import { story } from "@/data/invitation";

export function Story() {
  return (
    <Section
      id="cerita"
      eyebrow="Barita"
      title="Perjalanan Kami"
      subtitle="Dari perkenalan hingga hari yang dinanti, setiap langkah dijalani bersama keluarga."
      tone="dim"
    >
      <ol className="relative mx-auto max-w-2xl" data-reveal-group>
        <span
          className="absolute bottom-6 left-[1.4rem] top-3 w-px bg-gradient-to-b from-gold via-gold/40 to-transparent sm:left-1/2"
          aria-hidden="true"
        />

        {story.map((item, i) => (
          <li
            key={item.year}
            data-reveal={i % 2 === 0 ? "left" : "right"}
            className={`relative pb-12 last:pb-0 sm:w-1/2 ${
              i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:ml-auto sm:pl-12"
            }`}
          >
            <span
              className={`absolute left-[1.4rem] top-2 z-10 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full bg-ulos ring-4 ring-ivory-dim sm:left-auto ${
                i % 2 === 0 ? "sm:-right-1.5 sm:translate-x-0" : "sm:-left-1.5 sm:-translate-x-1/2"
              }`}
              aria-hidden="true"
            />

            <div className="pl-12 sm:pl-0">
              <span className="font-sans text-[0.75rem] uppercase tracking-[0.3em] text-gold ms-5">
                {item.year}
              </span>
              <h3 className="mt-2 font-script text-3xl text-ulos">{item.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}