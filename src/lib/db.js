import "server-only";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL belum diset. Salin .env.example ke .env.local lalu isi kredensialnya.");
}

// Tagged template dari driver Neon sudah memakai parameterized query,
// jadi nilai yang disisipkan tidak pernah digabung mentah ke SQL.
export const sql = neon(process.env.DATABASE_URL);
