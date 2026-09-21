import { GorgaMotif } from "./GorgaMotif";

/** Pemisah antar section bergaya tenun ulos. */
export function UlosDivider({ className = "", label }) {
  return (
    <div
      className={`flex items-center justify-center gap-5 ${className}`}
      aria-hidden={label ? undefined : "true"}
    >
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60 sm:w-24" />

      {label ? (
        <>
          <GorgaMotif variant="desa" className="h-6 w-6 shrink-0 text-gold" />
          <span className="font-sans text-[0.75rem] uppercase tracking-[0.3em] text-muted-foreground">
            {label}
          </span>
          <GorgaMotif variant="desa" className="h-6 w-6 shrink-0 text-gold" />
        </>
      ) : (
        <GorgaMotif variant="desa" className="h-7 w-7 shrink-0 text-gold" />
      )}

      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60 sm:w-24" />
    </div>
  );
}
