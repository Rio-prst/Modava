"use client";

import { PlusCircle, Wallet, ShieldCheck, Download, RotateCw } from "lucide-react";
import { recentActivities } from "./kontributor-data";

export default function RiwayatKontributor() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100/70 shadow-sm space-y-5 flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#0A2328]">
            Riwayat Terakhir
          </h2>
          <button className="text-gray-400 hover:text-[#0A2328] transition p-1">
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {recentActivities.map((act) => {
            return (
              <div
                key={act.id}
                className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      act.type === "pledge"
                        ? "bg-[#DCFCE7] text-[#166534]"
                        : act.type === "return"
                        ? "bg-emerald-50 text-[#13634E]"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {act.type === "pledge" ? (
                      <PlusCircle className="w-5 h-5" />
                    ) : act.type === "return" ? (
                      <Wallet className="w-4 h-4" />
                    ) : (
                      <ShieldCheck className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0A2328]">
                      {act.title}
                    </p>
                    <p className="text-[11px] text-[#556061]">{act.date}</p>
                  </div>
                </div>

                <span
                  className={`text-xs font-bold ${
                    act.amount.startsWith("+")
                      ? "text-[#166534]"
                      : "text-[#556061]"
                  }`}
                >
                  {act.amount}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <button className="w-full py-3 border border-gray-200 hover:border-[#0A2328] text-[#0A2328] text-xs font-bold rounded-2xl transition flex items-center justify-center gap-2 mt-4">
        <Download className="w-4 h-4" />
        Unduh Laporan Bulanan
      </button>
    </div>
  );
}
