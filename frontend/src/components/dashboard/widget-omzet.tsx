"use client";

import { TrendingUp } from "lucide-react";
import { useModava } from "@/context/modava-context";

export default function WidgetOmzet() {
  const { monthlyIncome } = useModava();
  const omzetNominal = monthlyIncome ?? 0;
  const growth = 8.4;
  const target = 30000000;
  const pct = Math.min(Math.round((omzetNominal / target) * 100), 100);

  return (
    <div className="bg-white rounded-2xl p-5 space-y-3 border border-gray-100/50 shadow-sm">
      <p className="text-[13px] text-[#556061] font-medium">
        Omzet Bulan Berjalan
      </p>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xl md:text-2xl font-bold text-[#0A2328]">
          Rp {omzetNominal.toLocaleString("id-ID")}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#16A34A] bg-[#DCFCE7]/60 px-2.5 py-1 rounded-full">
          <TrendingUp className="w-3.5 h-3.5" />
          +{growth}% vs bln lalu
        </span>
      </div>
      <div className="flex items-center gap-3 pt-2">
        <span className="text-xs text-[#556061] whitespace-nowrap">
          Target: Rp 30jt
        </span>
        <div className="flex-1 h-[6px] bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-[#13634E]"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
