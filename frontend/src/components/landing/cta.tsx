import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Cta() {
  return (
    <section className="text-center space-y-6 py-8">
      <div className="space-y-2 max-w-xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-modava-text-dark">
          Siap Bawa Usaha Anda ke Level Berikutnya?
        </h2>
        <p className="text-xs text-gray-500">
          Proses pendaftaran kurang dari 10 menit. Tanpa biaya admin bulanan
          untuk paket UMKM Pemula.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <Link
          href="/daftar"
          className="px-6 py-3 bg-modava-primary text-white text-sm font-medium rounded-lg hover:bg-[#0e4b3b] transition"
        >
          Mulai Gratis Sekarang
        </Link>
        <Link
          href="/tentang"
          className="inline-flex items-center gap-2 text-sm font-semibold text-modava-text-dark hover:underline"
        >
          Pelajari Skema Crowdfunding
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
