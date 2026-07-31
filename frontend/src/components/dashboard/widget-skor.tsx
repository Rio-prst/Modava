"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useModava } from "@/context/modava-context";

export default function WidgetSkor() {
  const { creditScore, creditScoreTier } = useModava();
  const score = creditScore;
  const label = creditScoreTier.toUpperCase();
  const angle = (score / 100) * 180;
  const description = `Skor keuangan Anda saat ini adalah ${score} (${creditScoreTier}). Berpeluang mendapatkan bunga crowdfunding yang lebih rendah.`;

  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-between h-full min-h-[300px] border border-gray-100/50 shadow-sm space-y-4">
      <p className="text-[15px] font-semibold text-[#0A2328] text-center">
        Skor Kelayakan Keuangan
      </p>

      <div className="my-auto flex flex-col items-center">
        <svg
          viewBox="0 0 200 110"
          className="w-full max-w-[210px]"
          fill="none"
        >
          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            stroke="#E5E7EB"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* Active green arc */}
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
            fontSize="30"
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
            fontSize="8.5"
            fontWeight="800"
            letterSpacing="0.5"
            fontFamily="Plus Jakarta Sans, sans-serif"
          >
            {label}
          </text>
        </svg>
      </div>

      <p className="text-[12px] text-[#556061] text-center leading-relaxed max-w-[240px]">
        {description}
      </p>

      <Link
        href="/skor"
        className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-[#13634E] text-xs font-bold rounded-xl text-center flex items-center justify-center gap-1.5 transition"
      >
        <span>Lihat Rincian & Analisis Skor</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
