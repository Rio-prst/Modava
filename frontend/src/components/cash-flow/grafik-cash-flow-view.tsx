"use client";

import { useState } from "react";
import { TrendingUp, Flame, AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react";

export default function GrafikCashFlowView() {
  const [timeframe, setTimeframe] = useState<"mingguan" | "bulanan" | "tahunan">("bulanan");

  return (
    <div className="space-y-6">
      {/* Timeframe Selector Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0A2328]">Analisis Keuangan</h2>
          <p className="text-xs text-[#556061] mt-0.5">
            Pantau arus kas bisnis Anda secara real-time.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
          <button
            onClick={() => setTimeframe("mingguan")}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition ${
              timeframe === "mingguan"
                ? "bg-[#13634E] text-white shadow-sm font-bold"
                : "text-[#556061] hover:text-[#0A2328]"
            }`}
          >
            Mingguan
          </button>
          <button
            onClick={() => setTimeframe("bulanan")}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition ${
              timeframe === "bulanan"
                ? "bg-[#13634E] text-white shadow-sm font-bold"
                : "text-[#556061] hover:text-[#0A2328]"
            }`}
          >
            Bulanan
          </button>
          <button
            onClick={() => setTimeframe("tahunan")}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition ${
              timeframe === "tahunan"
                ? "bg-[#13634E] text-white shadow-sm font-bold"
                : "text-[#556061] hover:text-[#0A2328]"
            }`}
          >
            Tahunan
          </button>
        </div>
      </div>

      {/* Main Grid: Chart on Left, Metrics on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Main Chart Card (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-gray-100/70 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#0A2328]">
              Arus Kas (Pemasukan vs Pengeluaran)
            </h3>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-2 text-[#0A2328]">
                <span className="w-3 h-3 rounded-full bg-[#13634E]" />
                Pemasukan
              </span>
              <span className="flex items-center gap-2 text-[#0A2328]">
                <span className="w-3 h-3 rounded-full bg-[#052530]" />
                Pengeluaran
              </span>
            </div>
          </div>

          {/* SVG Smooth Chart matching mockup */}
          <div className="relative w-full h-[260px] pt-4">
            <svg
              viewBox="0 0 700 240"
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              {/* Grid Lines */}
              {[30, 70, 110, 150, 190, 230].map((y, i) => (
                <line
                  key={i}
                  x1="40"
                  y1={y}
                  x2="690"
                  y2={y}
                  stroke="#F3F4F6"
                  strokeWidth="1.5"
                />
              ))}

              {/* Y Axis Labels */}
              <text x="5" y="35" fill="#9CA3AF" fontSize="10" fontWeight="600">65jt</text>
              <text x="5" y="75" fill="#9CA3AF" fontSize="10" fontWeight="600">55jt</text>
              <text x="5" y="115" fill="#9CA3AF" fontSize="10" fontWeight="600">45jt</text>
              <text x="5" y="155" fill="#9CA3AF" fontSize="10" fontWeight="600">35jt</text>
              <text x="5" y="195" fill="#9CA3AF" fontSize="10" fontWeight="600">25jt</text>
              <text x="5" y="235" fill="#9CA3AF" fontSize="10" fontWeight="600">20jt</text>

              {/* Pemasukan Gradient Area */}
              <defs>
                <linearGradient id="pemasukanGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#13634E" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#13634E" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <path
                d="M 50,170 C 80,150 110,180 140,130 C 170,80 200,90 230,75 C 260,60 290,100 320,85 C 350,70 380,45 410,35 C 440,25 470,60 500,45 C 530,30 560,40 590,25 C 620,15 650,20 680,10 L 680,230 L 50,230 Z"
                fill="url(#pemasukanGrad)"
              />

              {/* Pemasukan Line (Green Solid Spline) */}
              <path
                d="M 50,170 C 80,150 110,180 140,130 C 170,80 200,90 230,75 C 260,60 290,100 320,85 C 350,70 380,45 410,35 C 440,25 470,60 500,45 C 530,30 560,40 590,25 C 620,15 650,20 680,10"
                fill="none"
                stroke="#13634E"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Pengeluaran Line (Dark Dotted Spline) */}
              <path
                d="M 50,190 C 80,180 110,210 140,165 C 170,140 200,150 230,130 C 260,110 290,145 320,125 C 350,110 380,105 410,95 C 440,90 470,110 500,90 C 530,75 560,115 590,110 C 620,100 650,95 680,85"
                fill="none"
                stroke="#052530"
                strokeWidth="2.5"
                strokeDasharray="5 5"
                strokeLinecap="round"
              />
            </svg>

            {/* X Axis Labels */}
            <div className="flex justify-between text-[11px] font-semibold text-[#9CA3AF] pt-2 px-6">
              {["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Stats Column (4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-5">
          {/* Card 1: Rata-Rata Pemasukan */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100/70 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#556061]">
                Rata-Rata Pemasukan
              </span>
              <TrendingUp className="w-5 h-5 text-[#13634E]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0A2328]">
                Rp 45.200.000
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-[#DCFCE7] text-[#166534] text-xs font-bold px-2.5 py-0.5 rounded-full">
                  +8.4%
                </span>
                <span className="text-xs text-[#556061]">vs bulan lalu</span>
              </div>
            </div>
          </div>

          {/* Card 2: Burn Rate */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100/70 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#556061]">
                Burn Rate
              </span>
              <Flame className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0A2328]">
                Rp 12.850.000
              </p>
              <div className="space-y-1.5 mt-3">
                <div className="h-[7px] bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#13634E] rounded-full w-[28%]" />
                </div>
                <p className="text-xs text-[#556061]">
                  28% dari total anggaran bulanan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Wawasan Bisnis */}
      <div className="space-y-4 pt-2">
        <h3 className="text-lg font-bold text-[#0A2328]">Wawasan Bisnis</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Peringatan Pengeluaran */}
          <div className="bg-[#FAF8F5] rounded-3xl p-5 border-l-4 border-l-rose-500 border border-gray-200/60 space-y-2">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
              <div className="w-7 h-7 rounded-xl bg-rose-100 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
              </div>
              Peringatan Pengeluaran
            </div>
            <p className="text-xs text-[#556061] leading-relaxed">
              Pengeluaran naik 12% dari bulan lalu karena kenaikan harga bahan baku kopi dari supplier utama.
            </p>
          </div>

          {/* Card 2: Target Terlampaui */}
          <div className="bg-[#FAF8F5] rounded-3xl p-5 border-l-4 border-l-emerald-600 border border-gray-200/60 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
              <div className="w-7 h-7 rounded-xl bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              Target Terlampaui
            </div>
            <p className="text-xs text-[#556061] leading-relaxed">
              Laba bersih bulan ini melampaui target sebesar 15% berkat promo bundling &quot;Weekend Barista&quot;.
            </p>
          </div>

          {/* Card 3: Saran Optimalisasi */}
          <div className="bg-[#FAF8F5] rounded-3xl p-5 border-l-4 border-l-amber-500 border border-gray-200/60 space-y-2">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
              <div className="w-7 h-7 rounded-xl bg-amber-100 flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-amber-600" />
              </div>
              Saran Optimalisasi
            </div>
            <p className="text-xs text-[#556061] leading-relaxed">
              Arus kas stabil. Anda memiliki surplus Rp 10jt yang bisa dialokasikan untuk cicilan modal crowdfunding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
