import { Invitation } from "@/components/Invitation";
import { Wishes } from "@/components/sections/Wishes";

// Ucapan dibaca dari database tiap permintaan, jadi halaman tidak dicache statis
export const dynamic = "force-dynamic";

export default function Home() {
  // Wishes dirender di server lalu diteruskan sebagai slot,
  // supaya modul database tidak ikut masuk ke bundle client.
  return <Invitation wishesSlot={<Wishes />} />;
}
