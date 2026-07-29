import Link from "next/link";
import { ShieldCheck, ArrowRight, CheckCircle2, Award, Zap, Coins } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Subtle Background Glow Spheres */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-emerald-100/80 text-modava-primary text-xs sm:text-sm font-semibold rounded-full border border-emerald-300/50 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <ShieldCheck className="w-4 h-4 text-modava-primary" />
              <span>Platform Permodalan & Financial Scoring UMKM No. 1</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-modava-text-dark">
              Modal Usaha Transparan, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-modava-primary via-emerald-600 to-teal-500 bg-clip-text text-transparent">
                UMKM Siap Naik Kelas
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Menjembatani legalitas usaha (NIB, NPWP, Sertifikat Halal) dengan permodalan berbasis komunitas. Ubah riwayat arus kas harian Anda menjadi skor kelayakan yang dipercaya calon kontributor.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/daftar"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-modava-primary to-emerald-700 text-white font-bold text-base rounded-2xl shadow-lg shadow-emerald-900/10 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
              >
                Daftar UMKM Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#campaign"
                className="w-full sm:w-auto px-7 py-4 border-2 border-gray-200 text-modava-text-dark font-semibold text-base rounded-2xl bg-white/80 hover:bg-gray-50 hover:border-gray-300 transition-all text-center"
              >
                Jelajahi Campaign
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm font-medium text-gray-600 border-t border-gray-200/80">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Tanpa Biaya Admin Bulanan</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Bebas Agunan Fisik Berat</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Integrasi Perizinan NIB</span>
              </div>
            </div>

          </div>

          {/* Right Hero Interactive Graphic / Mockup */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none bg-gradient-to-tr from-emerald-900 to-modava-primary-dark p-6 rounded-3xl shadow-2xl text-white overflow-hidden border border-emerald-700/30">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-emerald-700/50 pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
                    <Award className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <p className="text-xs text-emerald-200 font-medium">Dashboard UMKM</p>
                    <h4 className="font-bold text-sm">Warung Kopi Nadi</h4>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-400/20 text-emerald-300 text-xs font-bold rounded-full border border-emerald-400/30">
                  Verifikasi NIB Active
                </span>
              </div>

              {/* Score Display */}
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl mb-4 border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-emerald-200 font-semibold">Skor Kelayakan Modal</span>
                  <span className="text-xs text-emerald-300 font-bold bg-emerald-950/60 px-2 py-0.5 rounded">Level A+</span>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-black text-white">845</span>
                  <span className="text-xs text-emerald-200">/ 1000 Poin (Sangat Layak)</span>
                </div>
                <div className="w-full bg-emerald-950 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-400 to-teal-300 h-2.5 rounded-full w-[84.5%]" />
                </div>
              </div>

              {/* Mini Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <p className="text-[11px] text-emerald-200">Arus Kas Bulanan</p>
                  <p className="text-base font-bold text-white">+Rp 34.500.000</p>
                  <span className="text-[10px] text-emerald-400 font-semibold">↑ 18.4% bulan ini</span>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <p className="text-[11px] text-emerald-200">Campaign Aktif</p>
                  <p className="text-base font-bold text-emerald-300">78% Terkumpul</p>
                  <span className="text-[10px] text-gray-300">Rp 19.5M dari Rp 25M</span>
                </div>
              </div>

              {/* Live Activity Toast */}
              <div className="bg-emerald-950/80 p-3 rounded-xl border border-emerald-500/30 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center flex-shrink-0">
                  <Coins className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-white">Kontribusi Baru Received</p>
                  <p className="text-emerald-300">Bapak Hendra berkontribusi Rp 500.000</p>
                </div>
              </div>
            </div>

            {/* Floating Glass Badges */}
            <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white p-3.5 px-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 animate-bounce-slow">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-modava-primary flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Verifikasi Cepat</p>
                <p className="text-xs font-extrabold text-modava-text-dark">&lt; 24 Jam Disetujui</p>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 sm:-right-6 bg-white p-3 px-4 rounded-2xl shadow-xl border border-gray-100 hidden sm:flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-modava-primary text-white flex items-center justify-center text-xs font-bold">
                ✓
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-500">Legalitas UMKM</p>
                <p className="text-xs font-bold text-emerald-700">NIB & NPWP Terverifikasi</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
