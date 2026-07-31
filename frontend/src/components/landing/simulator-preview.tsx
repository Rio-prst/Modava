"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, AlertCircle } from "lucide-react";

export default function SimulatorPreview() {
  const [amount, setAmount] = useState<number>(15000000);
  const [tenor, setTenor] = useState<number>(6);

  // Estimasi bunga/bagi hasil sederhana ~ 1.2% per bulan
  const totalRate = 0.012 * tenor;
  const totalReturn = amount * (1 + totalRate);
  const monthlyInstallment = Math.round(totalReturn / tenor);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="simulasi" className="py-20 bg-white border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <span className="px-3 py-1 bg-emerald-100 text-modava-primary text-xs font-bold rounded-full">
              Kalkulator & Evaluasi Mandiri
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-modava-text-dark tracking-tight leading-tight">
              Simulasi Permodalan & <br />
              <span className="text-modava-primary">Estimasi Cicilan UMKM</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Evaluasi kemampuan arus kas usaha Anda sebelum mengajukan penggalangan modal. Modava membantu menjaga rasio utang sehat agar modal benar-benar mendorong pertumbuhan.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-modava-primary flex items-center justify-center font-bold text-xs mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-sm text-modava-text-dark">Evaluasi Arus Kas Otomatis</h4>
                  <p className="text-xs text-gray-500">Skor kredit dihitung dari konsistensi pemasukan bersih bulanan.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-modava-primary flex items-center justify-center font-bold text-xs mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-sm text-modava-text-dark">Bagi Hasil Adil & Transparan</h4>
                  <p className="text-xs text-gray-500">Tanpa ada biaya tersembunyi, semua dihitung secara jujur.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-modava-primary flex items-center justify-center font-bold text-xs mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-sm text-modava-text-dark">Dukungan Pendampingan Perizinan</h4>
                  <p className="text-xs text-gray-500">UMKM ber-NIB mendapatkan tambahan poin skor kelayakan.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/daftar"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-modava-primary text-white font-bold text-sm rounded-xl hover:bg-emerald-700 transition-colors shadow-md"
              >
                Cek Skor Kelayakan Akun Saya <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Interactive Simulator Box */}
          <div className="lg:col-span-6 bg-gradient-to-br from-gray-900 via-modava-primary-dark to-emerald-950 p-6 sm:p-8 rounded-3xl text-white shadow-2xl border border-gray-800">
            <div className="flex items-center justify-between border-b border-emerald-800/80 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <Calculator className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base text-white">Kalkulator Simulasi</h3>
              </div>
              <span className="text-xs text-emerald-300 font-bold px-2.5 py-1 bg-emerald-950/80 border border-emerald-500/30 rounded-lg">
                Skema Bagi Hasil 1.2% / Bln
              </span>
            </div>

            {/* Slider Amount */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-baseline">
                <label className="text-xs font-semibold text-emerald-200">Jumlah Permodalan:</label>
                <span className="text-xl font-black text-emerald-300">{formatRupiah(amount)}</span>
              </div>
              <input
                type="range"
                min={2000000}
                max={50000000}
                step={1000000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>Rp 2.000.000</span>
                <span>Rp 50.000.000</span>
              </div>
            </div>

            {/* Tenor Selection Buttons */}
            <div className="space-y-3 mb-6">
              <label className="text-xs font-semibold text-emerald-200">Jangka Waktu (Tenor):</label>
              <div className="grid grid-cols-4 gap-2">
                {[3, 6, 12, 18].map((m) => (
                  <button
                    key={m}
                    onClick={() => setTenor(m)}
                    className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${
                      tenor === m
                        ? "bg-emerald-500 text-modava-primary-dark border-emerald-400 shadow-md"
                        : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {m} Bulan
                  </button>
                ))}
              </div>
            </div>

            {/* Calculation Result Summary */}
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-3 mb-6">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-300">Estimasi Cicilan per Bulan:</span>
                <span className="text-lg font-black text-emerald-300">{formatRupiah(monthlyInstallment)}</span>
              </div>
              <div className="flex justify-between items-center text-xs border-t border-white/10 pt-2 text-gray-400">
                <span>Total Pengembalian ({tenor} Bln):</span>
                <span className="font-bold text-white">{formatRupiah(Math.round(totalReturn))}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-emerald-200/80 bg-emerald-950/60 p-3 rounded-xl border border-emerald-800/40 mb-2">
              <AlertCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Hasil kalkulasi bersifat estimasi awal. Nilai final ditentukan setelah verifikasi berkas NIB.</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
