import { Reveal } from "@/components/motion/Reveal";
import { UlosDivider } from "@/components/ornaments/UlosDivider";

/**
 * Kerangka section: padding, lebar maksimum, judul, dan konteks reveal.
 * Semua section memakai ini agar ritme vertikal konsisten.
 */
export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
  tone = "ivory",
  divider = true,
  contentClassName = "",
}) {
  const tones = {
    ivory: "bg-ivory text-ink",
    dim: "bg-ivory-dim text-ink",
    ink: "bg-ink text-ivory",
    ulos: "bg-ulos-deep text-ivory",
  };

  return (
    <section
      id={id}
      className={`relative overflow-hidden px-5 py-section sm:px-8 lg:py-section-lg ${tones[tone]} ${className}`}
    >
      <Reveal className="relative mx-auto w-full max-w-6xl">
        {(eyebrow || title) && (
          <header className="mb-12 text-center lg:mb-16" data-reveal-group>
            {eyebrow ? (
              <p
                data-reveal="fade"
                className="font-sans text-[0.75rem] uppercase tracking-[0.35em] text-gold"
              >
                {eyebrow}
              </p>
            ) : null}

            {title ? (
              <h2
                data-reveal
                className="mt-4 font-script text-4xl leading-tight text-balance sm:text-5xl lg:text-6xl"
              >
                {title}
              </h2>
            ) : null}

            {subtitle ? (
              <p
                data-reveal
                className={`mx-auto mt-5 max-w-2xl text-base leading-relaxed text-balance sm:text-lg ${
                  tone === "ink" || tone === "ulos" ? "text-ivory/75" : "text-muted-foreground"
                }`}
              >
                {subtitle}
              </p>
            ) : null}

            {divider ? <UlosDivider className="mt-7" /> : null}
          </header>
        )}

        <div className={contentClassName}>{children}</div>
      </Reveal>
    </section>
  );
}
