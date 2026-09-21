"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitWish } from "@/app/actions";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const MAX_MESSAGE = 500;
const INITIAL = { ok: false, errors: {}, values: { name: "", relation: "", message: "" } };

/** Form kirim doa & ucapan. Tersimpan ke database lewat Server Action. */
export function WishForm({ onSent }) {
  const [state, formAction, isPending] = useActionState(submitWish, INITIAL);
  const [count, setCount] = useState(0);
  const formRef = useRef(null);
  const statusRef = useRef(null);
  const lastSent = useRef(null);

  // Kosongkan form dan teruskan ucapan baru ke daftar
  useEffect(() => {
    if (!state.ok || !state.wish) return;
    if (lastSent.current === state.wish.id) return;

    lastSent.current = state.wish.id;
    formRef.current?.reset();
    setCount(0);
    statusRef.current?.focus();
    onSent?.(state.wish);
  }, [state, onSent]);

  const err = state.errors ?? {};

  return (
    <Card data-reveal="scale">
      <form ref={formRef} action={formAction} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="wish-name" label="Nama" error={err.name}>
            <input
              id="wish-name"
              name="name"
              type="text"
              maxLength={60}
              autoComplete="name"
              defaultValue={state.values?.name}
              aria-invalid={Boolean(err.name)}
              aria-describedby={err.name ? "wish-name-error" : undefined}
              className={inputClass(err.name)}
            />
          </Field>

          <Field id="wish-relation" label="Sebagai" error={err.relation} hint="Contoh: Sahabat, Hula-hula">
            <input
              id="wish-relation"
              name="relation"
              type="text"
              maxLength={40}
              defaultValue={state.values?.relation}
              aria-invalid={Boolean(err.relation)}
              aria-describedby={err.relation ? "wish-relation-error" : "wish-relation-hint"}
              className={inputClass(err.relation)}
            />
          </Field>
        </div>

        <Field id="wish-message" label="Doa & Ucapan" error={err.message}>
          <textarea
            id="wish-message"
            name="message"
            rows={4}
            maxLength={MAX_MESSAGE}
            defaultValue={state.values?.message}
            onChange={(e) => setCount(e.target.value.length)}
            aria-invalid={Boolean(err.message)}
            aria-describedby={err.message ? "wish-message-error" : "wish-message-count"}
            className={`${inputClass(err.message)} resize-y`}
          />
          <p
            id="wish-message-count"
            className="mt-2 text-right font-sans text-[0.75rem] text-muted-foreground tabular-nums"
          >
            {count} / {MAX_MESSAGE}
          </p>
        </Field>

        {err.form ? (
          <p className="rounded-xl bg-[#fdeaea] px-4 py-3 text-sm text-[#b91c1c]" role="alert">
            {err.form}
          </p>
        ) : null}

        <Button type="submit" disabled={isPending} className="w-full disabled:opacity-60">
          {isPending ? "Mengirim..." : "Kirim Ucapan"}
        </Button>

        <p
          ref={statusRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className={state.ok ? "text-center text-sm text-ulos" : "sr-only"}
        >
          {state.ok ? "Mauliate! Ucapan Anda sudah kami terima." : ""}
        </p>
      </form>
    </Card>
  );
}

function inputClass(hasError) {
  return `w-full rounded-xl border bg-ivory px-4 py-3 text-base outline-none transition-colors focus:border-gold ${
    hasError ? "border-[#b91c1c]" : "border-border"
  }`;
}

function Field({ id, label, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="font-sans text-[0.75rem] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </label>
      <div className="mt-3">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-[#b91c1c]" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 text-[0.75rem] text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
