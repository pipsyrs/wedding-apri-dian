import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { GorgaMotif } from "@/components/ornaments/GorgaMotif";
import { events } from "@/data/invitation";

const dateFmt = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

const timeFmt = new Intl.DateTimeFormat("id-ID", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Jakarta",
});

export function Events() {
  return (
    <Section
      id="acara"
      eyebrow="Ulaon"
      title="Rangkaian Acara"
      subtitle="Tiga tahapan adat yang menandai perjalanan kami menjadi satu keluarga."
      contentClassName="mx-auto grid max-w-3xl gap-7 md:grid-cols-2"
    >
      {events.map((event, i) => {
        const date = new Date(event.date);

        return (
          <Card
            key={event.id}
            data-reveal
            data-reveal-group
            data-reveal-delay={i * 0.08}
            className="group flex flex-col hover:shadow-lift"
          >
            <GorgaMotif
              variant={["simeol", "desa", "ipon"][i % 3]}
              className="mx-auto h-9 w-24 text-gold transition-transform duration-500 group-hover:scale-110"
            />

            <h3 className="mt-6 text-center font-script text-3xl text-ulos">{event.name}</h3>

            <dl className="mt-7 space-y-4 border-t border-border/70 pt-6 text-center text-sm">
              <div className="flex items-center justify-center gap-2">
                <dt className="sr-only">Tanggal</dt>
                <Icon path="M3 5h18v16H3zM8 3v4M16 3v4M3 11h18" />
                <dd>
                  <time dateTime={event.date}>{dateFmt.format(date)}</time>
                </dd>
              </div>

              <div className="flex items-center justify-center gap-2">
                <dt className="sr-only">Waktu</dt>
                <Icon path="M12 7v5l3 2M12 21a9 9 0 100-18 9 9 0 000 18z" />
                <dd>{timeFmt.format(date)} WIB &ndash; selesai</dd>
              </div>

              <div>
                <dt className="sr-only">Lokasi</dt>
                <dd className="flex flex-col items-center gap-1">
                  <span className="flex items-center gap-2 font-medium">
                    <Icon path="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    {event.venue}
                  </span>
                  <span className="text-muted-foreground">{event.address}</span>
                </dd>
              </div>
            </dl>

            <Button
              as="a"
              variant="outline"
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 w-full text-ulos"
            >
              Lihat Peta
            </Button>
          </Card>
        );
      })}
    </Section>
  );
}

function Icon({ path }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0 text-gold"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}
