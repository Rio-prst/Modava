"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { recommendedCampaigns } from "./kontributor-data";

export default function RekomendasiCampaign() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-[#0A2328]">
        Rekomendasi Campaign Baru
      </h2>

      <div className="space-y-3">
        {recommendedCampaigns.map((rec) => (
          <div
            key={rec.id}
            className="bg-white rounded-2xl p-4 border border-gray-100/70 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4 cursor-pointer group"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                <Image
                  src={rec.image}
                  alt={rec.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-1 min-w-0">
                <h3 className="text-sm font-bold text-[#0A2328] truncate">
                  {rec.title}
                </h3>
                <p className="text-xs text-[#556061] line-clamp-1">
                  {rec.description}
                </p>

                <div className="flex items-center gap-4 text-xs pt-1">
                  <div>
                    <span className="text-[10px] text-[#556061] block uppercase tracking-wide">Imbal Hasil</span>
                    <span className="font-bold text-[#13634E]">{rec.returnRate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#556061] block uppercase tracking-wide">Tenor</span>
                    <span className="font-bold text-[#0A2328]">{rec.tenor}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-9 h-9 rounded-xl bg-[#052530] text-white flex items-center justify-center shrink-0 group-hover:bg-[#13634E] transition-colors">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
