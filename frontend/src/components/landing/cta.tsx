import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Cta() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-modava-primary-dark via-[#093530] to-modava-primary rounded-3xl p-8 sm:p-14 text-white text-center space-y-8 shadow-2xl relative overflow-hidden border border-emerald-700/40">
          
          {/* Background Glows */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-400/20 text-emerald-300 text-xs font-bold rounded-full border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Mulai Langkah Pertama Usaha Anda
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
              Siap Membawa Usaha UMKM Anda <br />
              <span className="text-emerald-300">Naik Kelas Hari Ini?</span>
            </h2>

            <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              Proses pendaftaran kurang dari 5 menit. Dapatkan fitur pembukuan harian gratis, panduan legalitas NIB, dan akses ke ribuan calon kontributor modal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pt-2">
            <Link
              href="/daftar"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-400 text-modava-primary-dark font-extrabold text-base rounded-2xl shadow-lg hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Daftar Usaha UMKM Gratis
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/masuk"
              className="w-full sm:w-auto px-7 py-4 border border-emerald-400/40 text-white font-bold text-base rounded-2xl hover:bg-white/10 transition-colors text-center"
            >
              Masuk ke Dashboard
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-emerald-200/80 relative z-10 pt-4 border-t border-white/10 max-w-md mx-auto">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verifikasi Aman
            </span>
            <span>•</span>
            <span>Bebas Biaya Bulanan</span>
            <span>•</span>
            <span>Support 24/7</span>
          </div>

        </div>
      </div>
    </section>
  );
}
