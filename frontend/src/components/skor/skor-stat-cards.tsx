"use client";

import { useModava } from "@/context/modava-context";

export default function SkorStatCards() {
  const { creditScoreTier, transactions, legalDocs } = useModava();
  const verifiedCount = legalDocs.filter((d) => d.status === "verified").length;

  return (
    <div className="flex flex-col gap-4 justify-between h-full">
      {/* Card 1: Peringkat & Tier Usaha */}
      <div className="bg-white rounded-2xl p-5 border-l-4 border-l-[#052530] border border-gray-100/70 shadow-sm space-y-1">
        <span className="text-[11px] font-bold text-[#556061] uppercase tracking-wider">
          Klasifikasi Usaha
        </span>
        <p className="text-xl font-bold text-[#0A2328]">{creditScoreTier}</p>
        <p className="text-xs text-[#556061]">Evaluasi kelayakan Modava</p>
      </div>

      {/* Card 2: Legalitas Terverifikasi */}
      <div className="bg-white rounded-2xl p-5 border-l-4 border-l-amber-500 border border-gray-100/70 shadow-sm space-y-1">
        <span className="text-[11px] font-bold text-[#556061] uppercase tracking-wider">
          Kelengkapan Legalitas
        </span>
        <p className="text-xl font-bold text-[#0A2328]">
          {verifiedCount} dari {legalDocs.length} Berkas
        </p>
        <p className="text-xs text-emerald-700 font-semibold">
          {verifiedCount > 0 ? "Terverifikasi Sebagian" : "Belum Ada Berkas"}
        </p>
      </div>

      {/* Card 3: Total Aktivitas Transaksi */}
      <div className="bg-white rounded-2xl p-5 border-l-4 border-l-[#13634E] border border-gray-100/70 shadow-sm space-y-1">
        <span className="text-[11px] font-bold text-[#556061] uppercase tracking-wider">
          Aktivitas Transaksi
        </span>
        <p className="text-xl font-bold text-[#0A2328]">
          {transactions.length} Transaksi
        </p>
        <p className="text-xs text-[#556061]">Tercatat di Cash Flow Tracker</p>
      </div>
    </div>
  );
}
