import { Section } from "@/components/ui/Section";
import { getWishes } from "@/lib/wishes";
import { WishBoard } from "./WishBoard";

/** Server Component — ucapan dibaca dari database saat render. */
export async function Wishes() {
  let wishes = [];
  let loadFailed = false;

  try {
    const rows = await getWishes();
    // Serialisasi agar aman diteruskan ke Client Component
    wishes = rows.map((w) => ({
      id: String(w.id),
      name: w.name,
      relation: w.relation,
      message: w.message,
      created_at: new Date(w.created_at).toISOString(),
    }));
  } catch (error) {
    console.error("Gagal memuat ucapan:", error);
    loadFailed = true;
  }

  return (
    <Section
      id="ucapan"
      eyebrow="Tangiang"
      title="Doa & Ucapan"
      subtitle="Tinggalkan doa dan restu Anda untuk kedua mempelai."
      contentClassName="mx-auto w-full max-w-3xl space-y-14"
    >
      <WishBoard initialWishes={wishes} loadFailed={loadFailed} />
    </Section>
  );
}
