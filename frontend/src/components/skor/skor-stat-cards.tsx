"use client";

export default function SkorStatCards() {
  return (
    <div className="flex flex-col gap-4 justify-between h-full">
      {/* Card 1: Peringkat Industri */}
      <div className="bg-white rounded-2xl p-5 border-l-4 border-l-[#052530] border border-gray-100/70 shadow-sm space-y-1">
        <span className="text-[11px] font-bold text-[#556061] uppercase tracking-wider">
          Peringkat Industri
        </span>
        <p className="text-xl font-bold text-[#0A2328]">Top 15%</p>
        <p className="text-xs text-[#556061]">Kuliner Jawa Barat</p>
      </div>

      {/* Card 2: Probabilitas Gagal Bayar */}
      <div className="bg-white rounded-2xl p-5 border-l-4 border-l-amber-500 border border-gray-100/70 shadow-sm space-y-1">
        <span className="text-[11px] font-bold text-[#556061] uppercase tracking-wider">
          Probabilitas Gagal Bayar
        </span>
        <p className="text-xl font-bold text-[#0A2328]">1.2%</p>
        <p className="text-xs text-emerald-700 font-semibold">Sangat Rendah</p>
      </div>

      {/* Card 3: Update Terakhir */}
      <div className="bg-white rounded-2xl p-5 border-l-4 border-l-[#13634E] border border-gray-100/70 shadow-sm space-y-1">
        <span className="text-[11px] font-bold text-[#556061] uppercase tracking-wider">
          Update Terakhir
        </span>
        <p className="text-xl font-bold text-[#0A2328]">Hari ini, 09:42</p>
        <p className="text-xs text-[#556061]">Data terhubung otomatis</p>
      </div>
    </div>
  );
}
