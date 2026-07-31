"use client";

import SkorMainCard from "@/components/skor/skor-main-card";
import SkorStatCards from "@/components/skor/skor-stat-cards";
import SkorBreakdown from "@/components/skor/skor-breakdown";
import SkorRecommendations from "@/components/skor/skor-recommendations";

export default function SkorPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#0A2328]">
          Skor Kelayakan Keuangan
        </h1>
        <p className="text-sm text-[#556061] mt-1">
          Analisis real-time kesehatan finansial dan potensi pertumbuhan bisnis Anda.
        </p>
      </div>

      {/* Top Grid: Left Main Gauge Card (8 cols), Right Stat Cards (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8">
          <SkorMainCard />
        </div>
        <div className="lg:col-span-4">
          <SkorStatCards />
        </div>
      </div>

      {/* Rincian Komponen Skor (3 Column Cards) */}
      <SkorBreakdown />

      {/* Rekomendasi Perbaikan Skor */}
      <SkorRecommendations />
    </div>
  );
}
