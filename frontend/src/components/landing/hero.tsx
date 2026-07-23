import Image from "next/image";
import { ShieldCheck, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#e1f5ee] text-modava-primary text-xs font-semibold rounded-full">
          <ShieldCheck className="w-3.5 h-3.5" />
          Partner UMKM Terpercaya OJK
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-modava-text-dark">
          Modal untuk UMKM <br />
          <span className="text-modava-primary">Naik Kelas</span>
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed max-w-md">
          Solusi finansial terintegrasi untuk usaha mikro. Dari pencatatan
          keuangan otomatis hingga akses permodalan kolektif yang transparan.
        </p>
        <div className="flex items-center gap-4 pt-2">
          <Link
            href="/daftar"
            className="px-6 py-3 bg-modava-primary-dark text-white text-sm font-medium rounded-lg hover:bg-[#153e46] transition"
          >
            Daftar Sekarang
          </Link>
          <Link
            href="/masuk"
            className="px-6 py-3 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
          >
            Masuk
          </Link>
        </div>
      </div>

      <div className="relative">
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white">
          <Image
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800"
            alt="Office workspace"
            width={800}
            height={320}
            className="w-full h-[320px] object-cover"
          />
        </div>
        <div className="absolute -bottom-6 -left-6 bg-white p-3 px-4 rounded-xl shadow-xl flex items-center gap-3 border border-gray-100">
          <div className="w-10 h-10 bg-modava-primary text-white rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
              Skor Kredit UMKM
            </p>
            <p className="text-sm font-bold text-modava-primary">Level: A+ Pro</p>
          </div>
        </div>
      </div>
    </section>
  );
}
