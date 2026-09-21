// Membuat tabel ucapan. Jalankan sekali: node scripts/init-db.mjs
import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

// Muat DATABASE_URL dari .env.local tanpa dependensi tambahan
const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
const match = env.match(/^DATABASE_URL\s*=\s*"?([^"\n]+)"?/m);
if (!match) throw new Error("DATABASE_URL tidak ditemukan di .env.local");

const sql = neon(match[1]);

await sql`
  CREATE TABLE IF NOT EXISTS wishes (
    id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name        text        NOT NULL,
    relation    text,
    message     text        NOT NULL,
    created_at  timestamptz NOT NULL DEFAULT now()
  )
`;

// Urutan tampil: terbaru dulu
await sql`CREATE INDEX IF NOT EXISTS wishes_created_at_idx ON wishes (created_at DESC)`;

const [{ count }] = await sql`SELECT count(*)::int AS count FROM wishes`;
console.log(`Tabel "wishes" siap. Jumlah baris saat ini: ${count}`);
