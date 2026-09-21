"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { UlosBand } from "@/components/ornaments/UlosBand";
import { gifts } from "@/data/invitation";

/** Tanda kasih digital — nomor rekening dengan tombol salin. */
export function DigitalEnvelope() {
  const [open, setOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const copy = async (gift) => {
    try {
      await navigator.clipboard.writeText(gift.account);
      setCopiedId(gift.id);
      setTimeout(() => setCopiedId((id) => (id === gift.id ? null : id)), 2200);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <Section
      id="amplop"
      eyebrow="Tumpak"
      title="Tanda Kasih"
      subtitle="Kehadiran dan doa Anda sudah lebih dari cukup. Namun bila ingin memberi tanda kasih, kami menyediakan kanal berikut."
      tone="dim"
      contentClassName="mx-auto w-full max-w-3xl"
    >
      <div className="flex flex-col items-center" data-reveal-group>
        {!open ? (
          <Button data-reveal variant="gold" onClick={() => setOpen(true)} aria-expanded={false}>
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
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            Buka Amplop Digital
          </Button>
        ) : (
          <div className="grid w-full gap-5 sm:grid-cols-2">
            {gifts.map((gift) => (
              <Card key={gift.id} framed={false} className="flex flex-col overflow-hidden !p-0">
                <UlosBand />
                <div className="flex flex-1 flex-col p-6">
                  <span className="font-sans text-[0.75rem] uppercase tracking-[0.25em] text-gold">
                    {gift.label}
                  </span>

                  <p className="mt-4 break-words font-serif text-xl tabular-nums text-ink">
                    {gift.account}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{gift.holder}</p>

                  <Button
                    variant="outline"
                    onClick={() => copy(gift)}
                    className="mt-6 w-full text-ulos"
                  >
                    {copiedId === gift.id ? "Tersalin" : "Salin"}
                  </Button>
                </div>
              </Card>
            ))}

            <p className="sr-only" role="status" aria-live="polite">
              {copiedId ? "Nomor berhasil disalin." : ""}
            </p>
          </div>
        )}
      </div>
    </Section>
  );
}
