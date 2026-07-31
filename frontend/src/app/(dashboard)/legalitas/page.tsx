import { Metadata } from "next";
import { LegalitasHub } from "@/components/legalitas/legalitas-hub";

export const metadata: Metadata = {
  title: "Legalitas Usaha & Administrasi | Modava",
  description: "Cek verifikasi dokumen legalitas, kalkulator PPh final 0.5%, panduan perizinan, dan generator SKU PDF.",
};

export default function LegalitasPage() {
  return <LegalitasHub />;
}
