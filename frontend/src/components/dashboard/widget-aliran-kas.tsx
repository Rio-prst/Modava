"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useModava } from "@/context/modava-context";

export default function WidgetAliranKas() {
  const { transactions, monthlyIncome, monthlyExpense } = useModava();

  const hasTransactions = transactions.length > 0;

  return (
    <div className="bg-white rounded-2xl p-5 space-y-3 border border-gray-100/50 shadow-sm flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <p className="text-[13px] text-[#0A2328] font-semibold">
            Aliran Kas Usaha (Bulan Ini)
          </p>
          <Link
            href="/cash-flow"
            className="text-xs font-semibold text-[#13634E] hover:underline flex items-center gap-0.5"
          >
            <span>Rincian</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="flex items-center gap-3 text-xs font-medium">
          <span className="flex items-center gap-1.5 text-[#0A2328]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#13634E]" />
            Masuk: <strong className="text-[#13634E]">Rp {monthlyIncome.toLocaleString("id-ID")}</strong>
          </span>
          <span className="flex items-center gap-1.5 text-[#0A2328]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B91C1C]" />
            Keluar: <strong className="text-[#B91C1C]">Rp {monthlyExpense.toLocaleString("id-ID")}</strong>
          </span>
        </div>
      </div>

      {!hasTransactions ? (
        <div className="py-6 text-center text-xs text-[#556061] bg-gray-50/60 rounded-xl space-y-1">
          <p className="font-semibold text-[#0A2328]">Belum Ada Aliran Kas Tercatat</p>
          <p>Silakan catat transaksi harian Anda di Cash Flow Tracker untuk melihat grafik aliran kas.</p>
        </div>
      ) : (
        <div className="relative w-full h-[90px] mt-2">
          <svg
            viewBox="0 0 400 100"
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            {/* Smooth Green Spline (Masuk) */}
            <path
              d="M 10,70 C 60,35 90,35 120,60 C 150,85 180,20 220,20 C 260,20 290,80 340,75 C 370,70 390,30 395,25"
              fill="none"
              stroke="#13634E"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Smooth Red Dotted Spline (Keluar) */}
            <path
              d="M 10,85 C 50,75 80,82 120,80 C 160,78 190,50 230,55 C 270,60 290,90 330,85 C 370,80 390,60 395,50"
              fill="none"
              stroke="#B91C1C"
              strokeWidth="2.5"
              strokeDasharray="4 4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
