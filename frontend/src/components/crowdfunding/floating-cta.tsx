import { TrendingUp } from "lucide-react";
import Link from "next/link";

export default function FloatingCta() {
  return (
    <Link
      href="/daftar/kontributor"
      className="fixed bottom-8 right-8 z-40 bg-[#EAB308] text-[#0A2328] px-6 py-3.5 rounded-full shadow-lg flex items-center gap-2 font-bold text-[14px] hover:opacity-90 transition"
    >
      <TrendingUp className="w-5 h-5" />
      Mulai Investasi
    </Link>
  );
}
