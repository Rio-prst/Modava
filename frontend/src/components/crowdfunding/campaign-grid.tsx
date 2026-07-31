"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useModava } from "@/context/modava-context";
import { campaigns as staticCampaigns } from "./campaign-data";
import CampaignCard from "./campaign-card";

const PAGE_SIZE = 8;

interface CampaignGridProps {
  selectedCategory?: string;
}

export default function CampaignGrid({
  selectedCategory = "Semua Kategori",
}: CampaignGridProps) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const { campaigns: userCampaigns } = useModava();

  // Combine user-created campaigns first, then static campaigns
  const allCampaigns = [...userCampaigns, ...staticCampaigns];

  // Filter campaigns by selected category
  const filteredCampaigns = selectedCategory === "Semua Kategori"
    ? allCampaigns
    : allCampaigns.filter((c) =>
        c.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );

  const shown = filteredCampaigns.slice(0, visible);
  const hasMore = visible < filteredCampaigns.length;

  return (
    <div className="space-y-8">
      {shown.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center space-y-2">
          <p className="text-sm font-bold text-[#0A2328]">
            Tidak ada campaign ditemukan untuk kategori &quot;{selectedCategory}&quot;.
          </p>
          <p className="text-xs text-[#556061]">
            Silakan pilih kategori lain atau terbitkan campaign permodal pertama Anda!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {shown.map((c) => (
            <CampaignCard key={c.id} campaign={c} />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="inline-flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-6 py-2.5 text-[13px] font-semibold text-[#0A2328] hover:bg-gray-50 transition cursor-pointer"
          >
            Tampilkan Lebih Banyak
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
