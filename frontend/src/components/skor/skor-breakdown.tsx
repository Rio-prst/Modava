"use client";

import { Wallet, ShieldCheck, CreditCard } from "lucide-react";
import { useModava } from "@/context/modava-context";

export default function SkorBreakdown() {
  const { monthlyNetProfit, legalDocs, transactions } = useModava();

  // Dynamic calculations
  const verifiedCount = legalDocs.filter((d) => d.status === "verified").length;
  const legalPct = Math.round((verifiedCount / (legalDocs.length || 1)) * 100);

  const cashflowPct = monthlyNetProfit > 2000000 ? 100 : (monthlyNetProfit > 0 ? 60 : 20);
  const platformPct = transactions.length > 0 ? 80 : 0;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-[#0A2328]">
        Rincian Komponen Skor Usaha Anda
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Konsistensi Cash Flow */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100/70 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-[#DCFCE7] text-[#166534] flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-[#13634E]">{cashflowPct}%</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0A2328]">
                Kesehatan Cash Flow
              </h3>
              <p className="text-xs text-[#556061] mt-1 leading-relaxed">
                Rasio keuntungan dan stabilitas arus kas bulanan.
              </p>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-gray-50">
            <div className="h-[6px] bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#13634E] rounded-full transition-all"
                style={{ width: `${cashflowPct}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-semibold text-[#556061]">
              <span>Kesehatan Kas</span>
              <span className="text-[#13634E]">
                {cashflowPct >= 80 ? "Optimal" : cashflowPct >= 40 ? "Cukup" : "Perlu Pencatatan"}
              </span>
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
              <span className="text-xl font-bold text-[#13634E]">{legalPct}%</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0A2328]">
                Status Legalitas Dokumen
              </h3>
              <p className="text-xs text-[#556061] mt-1 leading-relaxed">
                Verifikasi NIB, NPWP, Sertifikat Halal, dan dokumen perizinan.
              </p>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-gray-50">
            <div className="h-[6px] bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#13634E] rounded-full transition-all"
                style={{ width: `${legalPct}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-semibold text-[#556061]">
              <span>Kelengkapan Berkas</span>
              <span className="text-[#13634E]">
                {verifiedCount} dari {legalDocs.length} Terverifikasi
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Aktivitas Platform */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100/70 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-amber-600">{platformPct}%</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0A2328]">
                Riwayat Aktivitas Platform
              </h3>
              <p className="text-xs text-[#556061] mt-1 leading-relaxed">
                Kedisiplinan pencatatan transaksi & partisipasi permodalan.
              </p>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-gray-50">
            <div className="h-[6px] bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all"
                style={{ width: `${platformPct}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-semibold text-[#556061]">
              <span>Tingkat Keaktifan</span>
              <span className="text-amber-600">
                {transactions.length > 0 ? "Aktif Mencatat" : "Belum Ada Aktivitas"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
