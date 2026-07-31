"use client";

import { useState } from "react";
import { Lightbulb, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useModava } from "@/context/modava-context";

export default function SkorRecommendations() {
  const { transactions, legalDocs, creditScore } = useModava();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const verifiedCount = legalDocs.filter((d) => d.status === "verified").length;

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const recommendations = [
    {
      id: "cashflow",
      title: "Catat Pemasukan & Pengeluaran Harian",
      points: "+20 Poin",
      desc: "Lakukan pencatatan kas di Cash Flow Tracker untuk membangun reputasi kesehatan finansial.",
      link: "/cash-flow",
      actionText: "Ke Cash Flow",
      isDone: transactions.length >= 3,
    },
    {
      id: "legalitas",
      title: "Unggah Dokumen Legalitas (NIB & NPWP)",
      points: "+30 Poin",
      desc: "Lengkapi berkas legalitas untuk diverifikasi oleh admin dan membuka potensi bunga pinjaman rendah.",
      link: "/legalitas",
      actionText: "Upload Dokumen",
      isDone: verifiedCount >= 2,
    },
    {
      id: "crowdfunding",
      title: "Terbitkan Campaign Permodalan Pertama",
      points: "+15 Poin",
      desc: "Ajukan permohonan modal usaha ke jaringan kontributor setelah riwayat kas terpenuhi.",
      link: "/crowdfunding/buat",
      actionText: "Buat Campaign",
      isDone: creditScore >= 60,
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-100/70 shadow-sm overflow-hidden space-y-6">
      {/* Dark Navy Banner Header */}
      <div className="bg-[#052530] text-white p-5 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-amber-300">
            <Lightbulb className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold">Rekomendasi Perbaikan Skor Usaha</h3>
        </div>
        <span className="bg-white/10 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/30">
          Potensi Hingga +65 Poin
        </span>
      </div>

      {/* Grid of Actionable Items */}
      <div className="p-6 pt-0 grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((item) => {
          const isCompleted = item.isDone || checkedItems[item.id];

          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                isCompleted
                  ? "bg-[#E6F8F3] border-[#13634E]"
                  : "bg-white border-gray-200/70 hover:border-gray-300"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!!isCompleted}
                      onChange={() => {}}
                      className="w-4 h-4 text-[#13634E] rounded focus:ring-[#86E3CE]"
                    />
                    <span className="text-xs font-bold text-[#13634E]">{item.points}</span>
                  </div>
                  {isCompleted && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-[#0A2328]">{item.title}</h4>
                <p className="text-[11px] text-[#556061] leading-relaxed">{item.desc}</p>
              </div>

              <Link
                href={item.link}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#13634E] hover:underline pt-2 border-t border-gray-100"
              >
                <span>{item.actionText}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
