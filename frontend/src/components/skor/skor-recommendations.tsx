"use client";

import { useState } from "react";
import { Lightbulb, Lock } from "lucide-react";

export default function SkorRecommendations() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100/70 shadow-sm overflow-hidden space-y-6">
      {/* Dark Navy Banner Header */}
      <div className="bg-[#052530] text-white p-5 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-amber-300">
            <Lightbulb className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold">Rekomendasi Perbaikan Skor</h3>
        </div>
        <span className="bg-white/10 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/30">
          Potensi +12 Poin
        </span>
      </div>

      {/* Grid of Actionable Items */}
      <div className="p-6 pt-0 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Item 1 */}
        <div
          onClick={() => toggleItem("halal")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
            checkedItems["halal"]
              ? "bg-[#E6F8F3] border-[#13634E]"
              : "bg-white border-gray-200/70 hover:border-gray-300"
          }`}
        >
          <input
            type="checkbox"
            checked={!!checkedItems["halal"]}
            onChange={() => {}}
            className="mt-1 w-4 h-4 text-[#13634E] rounded focus:ring-[#86E3CE]"
          />
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#0A2328]">
                Lengkapi Sertifikasi Halal
              </h4>
              <span className="text-xs font-bold text-[#13634E]">+5 Poin</span>
            </div>
            <p className="text-[11px] text-[#556061] leading-relaxed">
              Menambah kepercayaan investor untuk pendanaan syariah.
            </p>
          </div>
        </div>

        {/* Item 2 */}
        <div
          onClick={() => toggleItem("q3")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
            checkedItems["q3"]
              ? "bg-[#E6F8F3] border-[#13634E]"
              : "bg-white border-gray-200/70 hover:border-gray-300"
          }`}
        >
          <input
            type="checkbox"
            checked={!!checkedItems["q3"]}
            onChange={() => {}}
            className="mt-1 w-4 h-4 text-[#13634E] rounded focus:ring-[#86E3CE]"
          />
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#0A2328]">
                Unggah Laporan Keuangan Q3
              </h4>
              <span className="text-xs font-bold text-[#13634E]">+2 Poin</span>
            </div>
            <p className="text-[11px] text-[#556061] leading-relaxed">
              Laporan periodik manual membantu validasi data otomatis.
            </p>
          </div>
        </div>

        {/* Item 3 */}
        <div
          onClick={() => toggleItem("bank")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
            checkedItems["bank"]
              ? "bg-[#E6F8F3] border-[#13634E]"
              : "bg-white border-gray-200/70 hover:border-gray-300"
          }`}
        >
          <input
            type="checkbox"
            checked={!!checkedItems["bank"]}
            onChange={() => {}}
            className="mt-1 w-4 h-4 text-[#13634E] rounded focus:ring-[#86E3CE]"
          />
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#0A2328]">
                Hubungkan Akun Bank Utama
              </h4>
              <span className="text-xs font-bold text-[#13634E]">+4 Poin</span>
            </div>
            <p className="text-[11px] text-[#556061] leading-relaxed">
              Berikan data transaksi real-time untuk akurasi skor kas.
            </p>
          </div>
        </div>

        {/* Item 4: Locked/Disabled */}
        <div className="p-4 rounded-2xl bg-[#EAE8E3]/60 border border-gray-200/50 flex items-start gap-3.5 opacity-80">
          <div className="mt-0.5 text-gray-500">
            <Lock className="w-4 h-4" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="text-xs font-bold text-[#0A2328]">
              Verifikasi Identitas Lanjutan
            </h4>
            <p className="text-[11px] text-[#556061] leading-relaxed">
              Beberapa aksi memerlukan verifikasi identitas lanjutan.{" "}
              <span className="font-bold text-[#0A2328] hover:underline cursor-pointer">
                Verifikasi Sekarang
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
