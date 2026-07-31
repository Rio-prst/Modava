"use client";

import { ArrowDownRight, ArrowUpRight, CheckCircle2, DollarSign } from "lucide-react";
import { Transaction } from "./cash-flow-data";

interface CashFlowMetricsProps {
  transactions: Transaction[];
}

export default function CashFlowMetrics({ transactions }: CashFlowMetricsProps) {
  const totalIncome = transactions
    .filter((t) => t.type === "in")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "out")
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalIncome - totalExpense;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Total Pemasukan */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100/60 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#556061]">Total Pemasukan</span>
          <div className="w-8 h-8 rounded-full bg-[#DCFCE7] text-[#166534] flex items-center justify-center">
            <ArrowDownRight className="w-4 h-4" />
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold text-[#0A2328]">
            Rp {totalIncome.toLocaleString("id-ID")}
          </p>
          <p className="text-[11px] font-semibold text-[#166534] mt-1">
            +12.5% dibanding bulan lalu
          </p>
        </div>
      </div>

      {/* Total Pengeluaran */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100/60 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#556061]">Total Pengeluaran</span>
          <div className="w-8 h-8 rounded-full bg-rose-100 text-[#B91C1C] flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold text-[#0A2328]">
            Rp {totalExpense.toLocaleString("id-ID")}
          </p>
          <p className="text-[11px] font-semibold text-[#B91C1C] mt-1">
            -4.2% dibanding bulan lalu
          </p>
        </div>
      </div>

      {/* Laba Bersih */}
      <div className="bg-[#13634E] rounded-2xl p-5 shadow-sm space-y-3 text-white">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold opacity-90">Laba Bersih Usaha</span>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-white" />
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold">
            Rp {netProfit.toLocaleString("id-ID")}
          </p>
          <p className="text-[11px] font-medium opacity-85 mt-1">
            {netProfit >= 0 ? "Kondisi Keuangan Sehat" : "Defisit Arus Kas Warning"}
          </p>
        </div>
      </div>

      {/* Status Ambang Syarat Campaign */}
      <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-emerald-200/60 shadow-sm space-y-2 flex flex-col justify-between">
        <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Syarat Campaign Terpenuhi
        </div>
        <div>
          <p className="text-xs font-semibold text-[#0A2328]">
            Riwayat Arus Kas Aktif
          </p>
          <p className="text-[11px] text-[#556061] leading-relaxed mt-0.5">
            Sudah memenuhi batas min. 1 bulan pencatatan untuk mengajukan crowdfunding.
          </p>
        </div>
      </div>
    </div>
  );
}
