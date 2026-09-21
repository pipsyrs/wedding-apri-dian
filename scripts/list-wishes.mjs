// Melihat isi tabel ucapan: node scripts/list-wishes.mjs
import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
const sql = neon(env.match(/^DATABASE_URL\s*=\s*"?([^"\n]+)"?/m)[1]);

const rows = await sql`
  SELECT id, name, relation, left(message, 45) AS cuplikan, created_at
  FROM wishes ORDER BY created_at DESC
`;
console.log(`Total ucapan: ${rows.length}`);
console.table(rows);
