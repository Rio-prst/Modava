"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useModava } from "@/context/modava-context";
import { recommendedCampaigns as staticRecommended } from "./kontributor-data";

interface RekomendasiCampaignProps {
  searchQuery?: string;
}

export default function RekomendasiCampaign({ searchQuery = "" }: RekomendasiCampaignProps) {
  const { campaigns } = useModava();

  // Combine dynamic context campaigns with static recommendations
  const displayList = campaigns.length > 0 ? campaigns.map((c) => ({
    id: c.id,
    title: c.title,
    description: c.description,
    image: c.image || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
    returnRate: "15% p.a",
    tenor: `${c.tenor || 12} Bulan`,
  })) : staticRecommended;

  const filteredList = searchQuery.trim()
    ? displayList.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : displayList;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-[#0A2328]">
        Rekomendasi Campaign Permodalan UMKM
      </h2>

      {filteredList.length === 0 ? (
        <div className="bg-white rounded-2xl p-6 border border-gray-100/70 shadow-sm text-center text-xs text-[#556061]">
          Tidak ada rekomendasi campaign cocok dengan pencarian &quot;{searchQuery}&quot;.
        </div>
      ) : (
        <div className="space-y-3">
          {filteredList.map((rec) => (
            <Link
              key={rec.id}
              href="/crowdfunding"
              className="bg-white rounded-2xl p-4 border border-gray-100/70 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4 cursor-pointer group block"
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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
