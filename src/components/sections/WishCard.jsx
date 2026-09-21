import { GorgaMotif } from "@/components/ornaments/GorgaMotif";

const dateFmt = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

/** Satu kartu ucapan. Dipakai server (data awal) & client (kiriman baru). */
export function WishCard({ wish, reveal, delay = 0, isNew = false }) {
  return (
    <figure
      {...(isNew ? {} : { "data-reveal": reveal, "data-reveal-delay": delay })}
      className={`group relative flex h-full flex-col rounded-3xl border bg-ivory p-7 transition-shadow duration-300 hover:shadow-soft ${
        isNew ? "border-gold" : "border-border/70"
      }`}
    >
      <GorgaMotif
        variant="simeol"
        className="h-6 w-16 text-gold transition-transform duration-500 group-hover:translate-x-1"
      />

      <blockquote className="mt-5 flex-1 whitespace-pre-line text-base leading-relaxed text-ink/85">
        {wish.message}
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-border/70 pt-5">
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ulos/10 font-serif text-base text-ulos"
          aria-hidden="true"
        >
          {wish.name.charAt(0).toUpperCase()}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-base font-medium">{wish.name}</span>
          <span className="mt-0.5 block font-sans text-[0.75rem] uppercase tracking-[0.2em] text-muted-foreground">
            {wish.relation ? `${wish.relation} · ` : ""}
            <time dateTime={new Date(wish.created_at).toISOString()}>
              {dateFmt.format(new Date(wish.created_at))}
            </time>
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
