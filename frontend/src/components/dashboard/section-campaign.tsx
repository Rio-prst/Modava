"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useModava } from "@/context/modava-context";
import CampaignCard from "./campaign-card";
import CampaignEmpty from "./campaign-empty";

export default function SectionCampaign() {
  const { campaigns } = useModava();

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-[#0A2328]">
          Campaign Crowdfunding Anda
        </h2>
        <Link
          href="/crowdfunding"
          className="flex items-center gap-1 text-[12px] font-semibold text-[#0A2328] hover:underline"
        >
          Lihat Semua Campaign
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {campaigns.map((c) => (
          <CampaignCard key={c.id} campaign={c} />
        ))}
        <CampaignEmpty />
      </div>
    </section>
  );
}
