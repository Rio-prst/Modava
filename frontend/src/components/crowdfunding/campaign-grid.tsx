"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { campaigns } from "./campaign-data";
import CampaignCard from "./campaign-card";

const PAGE_SIZE = 4;

export default function CampaignGrid() {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = campaigns.slice(0, visible);
  const hasMore = visible < campaigns.length;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {shown.map((c) => (
          <CampaignCard key={c.id} campaign={c} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="inline-flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-6 py-2.5 text-[13px] font-semibold text-[#0A2328] hover:bg-gray-50 transition"
          >
            Tampilkan Lebih Banyak
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
