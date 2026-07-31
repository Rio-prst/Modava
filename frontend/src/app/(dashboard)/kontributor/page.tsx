"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import KontributorHeader from "@/components/kontributor/kontributor-header";
import KontributorHeroCard from "@/components/kontributor/kontributor-hero-card";
import CampaignDidukung from "@/components/kontributor/campaign-didukung";
import RekomendasiCampaign from "@/components/kontributor/rekomendasi-campaign";
import RiwayatKontributor from "@/components/kontributor/riwayat-kontributor";

export default function KontributorDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6 max-w-7xl mx-auto relative pb-12">
      {/* Role Switcher Pill Bar */}
      <div className="flex items-center justify-between bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm w-fit">
        <Link
          href="/dashboard"
          className="px-4 py-1.5 rounded-xl text-xs font-semibold text-[#556061] hover:text-[#0A2328] transition"
        >
          Dashboard UMKM
        </Link>
        <button
          className="px-4 py-1.5 rounded-xl text-xs font-bold bg-[#13634E] text-white shadow-sm"
        >
          Dashboard Kontributor
        </button>
      </div>

      {/* Header */}
      <KontributorHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Banner: Total Kontribusi */}
      <KontributorHeroCard />

      {/* Main Grid: Left Campaign Supported & Recommendations, Right Recent History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Section (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <CampaignDidukung searchQuery={searchQuery} />
          <RekomendasiCampaign searchQuery={searchQuery} />
        </div>

        {/* Right Section (4 cols): Riwayat Terakhir */}
        <div className="lg:col-span-4 h-full">
          <RiwayatKontributor />
        </div>
      </div>

      {/* Floating Action Button (FAB) */}
      <Link
        href="/crowdfunding"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#13634E] hover:bg-[#0e4b3b] text-white shadow-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        title="Jelajahi Campaign"
      >
        <Plus className="w-7 h-7" />
      </Link>
    </div>
  );
}
