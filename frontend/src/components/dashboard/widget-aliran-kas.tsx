"use client";

import { aliranKasData } from "./dashboard-data";

export default function WidgetAliranKas() {
  return (
    <div className="bg-white rounded-2xl p-5 space-y-3 border border-gray-100/50 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-[#0A2328] font-semibold">
          Aliran Kas (Mei)
        </p>
        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="flex items-center gap-1.5 text-[#0A2328]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#13634E]" />
            Masuk
          </span>
          <span className="flex items-center gap-1.5 text-[#0A2328]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B91C1C]" />
            Keluar
          </span>
        </div>
      </div>

      {/* SVG Wave Chart matching mockup exactly */}
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

          {/* Smooth Red Dotted/Dashed Spline (Keluar) */}
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

      {/* X Axis labels */}
      <div className="flex justify-between text-[11px] font-medium text-[#556061] px-1">
        {aliranKasData.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}
