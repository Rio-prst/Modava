"use client";

import { TrendingUp, Wallet } from "lucide-react";
import { kontributorSummary } from "./kontributor-data";

export default function KontributorHeroCard() {
  return (
    <div className="relative overflow-hidden bg-[#052530] text-white rounded-3xl p-6 md:p-8 shadow-md border border-slate-800">
      {/* Background graphic circle overlay matching mockup */}
      <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/5 rounded-full blur-xl pointer-events-none" />
      <div className="absolute right-12 -top-12 w-48 h-48 bg-[#86E3CE]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Total Kontribusi
          </span>
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#86E3CE]">
            <Wallet className="w-5 h-5" />
          </div>
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Rp {kontributorSummary.totalContribution.toLocaleString("id-ID")}
          </h2>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <span className="inline-flex items-center gap-1 bg-[#13634E] text-emerald-100 text-xs font-semibold px-3 py-1 rounded-full">
            <TrendingUp className="w-3.5 h-3.5" />
            +{kontributorSummary.growthPercentage}% Bulan ini
          </span>
          <span className="text-xs text-slate-300 font-medium">
            Tersebar di {kontributorSummary.totalUmkmCount} UMKM
          </span>
        </div>
      </div>
    </div>
  );
}
