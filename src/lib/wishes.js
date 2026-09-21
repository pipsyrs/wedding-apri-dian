import "server-only";
import { sql } from "./db";

export const LIMITS = {
  name: { min: 2, max: 60 },
  relation: { max: 40 },
  message: { min: 4, max: 500 },
};

/** Ambil ucapan terbaru untuk ditampilkan di halaman. */
export async function getWishes(limit = 30) {
  return sql`
    SELECT id, name, relation, message, created_at
    FROM wishes
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;
}

/** Validasi input tamu. Mengembalikan objek error per field. */
export function validateWish({ name, relation, message }) {
  const errors = {};
  const clean = (v) => (typeof v === "string" ? v.trim() : "");

  const n = clean(name);
  const r = clean(relation);
  const m = clean(message);

  if (n.length < LIMITS.name.min) errors.name = "Mohon isi nama Anda.";
  else if (n.length > LIMITS.name.max) errors.name = `Nama maksimal ${LIMITS.name.max} karakter.`;

  if (r.length > LIMITS.relation.max) errors.relation = `Maksimal ${LIMITS.relation.max} karakter.`;

  if (m.length < LIMITS.message.min) errors.message = "Mohon tulis ucapan Anda.";
  else if (m.length > LIMITS.message.max)
    errors.message = `Ucapan maksimal ${LIMITS.message.max} karakter.`;

  return { errors, values: { name: n, relation: r, message: m } };
}

/** Simpan satu ucapan. Nilai disisipkan lewat parameterized query. */
export async function createWish({ name, relation, message }) {
  const [row] = await sql`
    INSERT INTO wishes (name, relation, message)
    VALUES (${name}, ${relation || null}, ${message})
    RETURNING id, name, relation, message, created_at
  `;
  return row;
}
