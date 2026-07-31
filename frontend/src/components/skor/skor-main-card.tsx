"use client";

import { Download, TrendingUp } from "lucide-react";

import { useModava } from "@/context/modava-context";

export default function SkorMainCard() {
  const { creditScore, creditScoreTier } = useModava();
  const score = creditScore;
  const angle = (score / 100) * 180;
  const labelTier = creditScoreTier;

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100/70 shadow-sm flex flex-col lg:flex-row items-center gap-8 justify-between">
      {/* Left side: Gauge Chart */}
      <div className="flex flex-col items-center shrink-0 w-full lg:w-auto">
        <div className="relative flex flex-col items-center">
          <svg viewBox="0 0 200 115" className="w-64 md:w-72" fill="none">
            {/* Background Grey Arc */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              stroke="#F3F4F6"
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* Active Green Arc */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              stroke="#13634E"
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray={`${(angle / 180) * 251.2} 251.2`}
            />
            <text
              x="100"
              y="68"
              textAnchor="middle"
              fill="#0A2328"
              fontSize="32"
              fontWeight="800"
              fontFamily="Plus Jakarta Sans, sans-serif"
            >
              {score}
            </text>
            <text
              x="100"
              y="96"
              textAnchor="middle"
              fill="#13634E"
              fontSize="9"
              fontWeight="800"
              letterSpacing="0.5"
              fontFamily="Plus Jakarta Sans, sans-serif"
            >
              {labelTier}
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold text-[#556061] mt-2">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            0-40
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            41-70
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#13634E]" />
            71-100
          </span>
        </div>
      </div>

      {/* Right side: Insights & CTA */}
      <div className="space-y-5 flex-1">
        {/* Mint Insights Box */}
        <div className="bg-[#E6F8F3] rounded-2xl p-4 border border-[#86E3CE]/40 space-y-1">
          <div className="flex items-center gap-1.5 text-[#13634E] text-xs font-bold">
            <TrendingUp className="w-4 h-4" />
            Insights Pertumbuhan
          </div>
          <p className="text-xs text-[#0A2328] leading-relaxed">
            Skor Anda naik 5 poin sejak bulan lalu. Bisnis Anda sekarang berada di persentil ke-15 teratas kategori kuliner UMKM.
          </p>
        </div>

        <p className="text-xs md:text-sm text-[#556061] leading-relaxed">
          Kelayakan finansial Anda dinilai <strong className="text-[#0A2328]">Sangat Baik</strong>. Anda memenuhi syarat untuk mengajukan pendanaan crowdfunding hingga <strong className="text-[#13634E]">Rp 250.000.000</strong>.
        </p>

        <button className="inline-flex items-center gap-2.5 bg-[#052530] hover:bg-[#0A2328] text-white px-6 py-3 rounded-2xl text-xs font-bold transition shadow-md">
          Unduh Sertifikat Skor
          <Download className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
