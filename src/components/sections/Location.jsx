import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { location } from "@/data/invitation";

export function Location() {
  return (
    <Section
      id="lokasi"
      eyebrow="Inganan"
      title="Lokasi Acara"
      subtitle="Kami menantikan kehadiran Anda di Balige, tepi Danau Toba."
      tone="dim"
      contentClassName="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center"
    >
      <div
        data-reveal="left"
        data-reveal-group
        className="relative overflow-hidden rounded-3xl border border-border shadow-soft"
      >
        <iframe
          src={location.mapEmbed}
          title={`Peta lokasi ${location.venue}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="h-[320px] w-full border-0 sm:h-[420px]"
        />
      </div>

      <div data-reveal="right" className="space-y-7">
        <div>
          <h3 className="font-script text-4xl text-ulos">{location.venue}</h3>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {location.address}
          </p>
        </div>

        <ul className="space-y-3 border-t border-border pt-6">
          {location.notes.map((note) => (
            <li key={note} className="flex gap-3 text-sm text-muted-foreground">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                aria-hidden="true"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {note}
            </li>
          ))}
        </ul>

        <Button as="a" href={location.mapUrl} target="_blank" rel="noopener noreferrer">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          Buka di Google Maps
        </Button>
      </div>
    </Section>
  );
}
