"use server";

import { revalidatePath } from "next/cache";
import { createWish, validateWish } from "@/lib/wishes";

/**
 * Menerima kiriman ucapan dari form tamu.
 * Divalidasi ulang di server — validasi client hanya untuk kenyamanan.
 */
export async function submitWish(prevState, formData) {
  const { errors, values } = validateWish({
    name: formData.get("name"),
    relation: formData.get("relation"),
    message: formData.get("message"),
  });

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors, values };
  }

  let saved;
  try {
    saved = await createWish(values);
  } catch (error) {
    console.error("Gagal menyimpan ucapan:", error);
    return {
      ok: false,
      errors: { form: "Ucapan gagal dikirim. Mohon coba lagi sesaat lagi." },
      values,
    };
  }

  revalidatePath("/");

  // Baris yang baru tersimpan dikembalikan agar bisa langsung dirender
  // di client tanpa menunggu muat ulang halaman.
  return {
    ok: true,
    errors: {},
    values: { name: "", relation: "", message: "" },
    wish: {
      id: String(saved.id),
      name: saved.name,
      relation: saved.relation,
      message: saved.message,
      created_at: new Date(saved.created_at).toISOString(),
    },
  };
}
