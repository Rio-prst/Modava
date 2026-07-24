"use client";

import { Wallet, ShieldCheck, CreditCard } from "lucide-react";

export default function SkorBreakdown() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-[#0A2328]">
        Rincian Komponen Skor
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Konsistensi Cash Flow */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100/70 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-[#DCFCE7] text-[#166534] flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-[#13634E]">90%</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0A2328]">
                Konsistensi Cash Flow
              </h3>
              <p className="text-xs text-[#556061] mt-1 leading-relaxed">
                Stabilitas pemasukan vs pengeluaran bulanan.
              </p>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-gray-50">
            <div className="h-[6px] bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#13634E] rounded-full w-[90%]" />
            </div>
            <div className="flex justify-between text-[11px] font-semibold text-[#556061]">
              <span>Kesehatan Kas</span>
              <span className="text-[#13634E]">Optimal</span>
            </div>
          </div>
        </div>

        {/* Card 2: Status Legalitas */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100/70 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-[#E6F8F3] text-[#13634E] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-[#13634E]">100%</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0A2328]">
                Status Legalitas
              </h3>
              <p className="text-xs text-[#556061] mt-1 leading-relaxed">
                Kepemilikan NIB, NPWP, dan Sertifikat terkait.
              </p>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-gray-50">
            <div className="h-[6px] bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#13634E] rounded-full w-[100%]" />
            </div>
            <div className="flex justify-between text-[11px] font-semibold text-[#556061]">
              <span>Dokumen Lengkap</span>
              <span className="text-[#13634E]">Terverifikasi</span>
            </div>
          </div>
        </div>

        {/* Card 3: Riwayat Pinjaman */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100/70 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-amber-600">75%</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0A2328]">
                Riwayat Pinjaman
              </h3>
              <p className="text-xs text-[#556061] mt-1 leading-relaxed">
                Kualitas pembayaran cicilan sebelumnya.
              </p>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-gray-50">
            <div className="h-[6px] bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full w-[75%]" />
            </div>
            <div className="flex justify-between text-[11px] font-semibold text-[#556061]">
              <span>Tingkat Kolektibilitas</span>
              <span className="text-amber-600">Lancar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
