"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Clock, ArrowRight, ShieldCheck, Heart } from "lucide-react";

const sampleCampaigns = [
  {
    id: 1,
    title: "Warung Kopi Nadi — Pembukaan Cabang Kemitraan Ke-3",
    category: "F&B / Kuliner",
    owner: "Sarah K.",
    location: "Jakarta Selatan",
    target: 25000000,
    collected: 19500000,
    daysLeft: 12,
    investors: 42,
    returnRate: "12% p.a.",
    nibVerified: true,
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Keripik Tempeh Mamah — Pembelian Mesin Kemasan Vacuum Auto",
    category: "Olahan Makanan",
    owner: "Rina Wijaya",
    location: "Bandung",
    target: 15000000,
    collected: 13800000,
    daysLeft: 4,
    investors: 29,
    returnRate: "10% p.a.",
    nibVerified: true,
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Batik Eco-Print Solo — Bahan Kain Sutra Organik Export",
    category: "Fashion & Kriya",
    owner: "Budi Santoso",
    location: "Surakarta",
    target: 40000000,
    collected: 26000000,
    daysLeft: 18,
    investors: 56,
    returnRate: "14% p.a.",
    nibVerified: true,
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&q=80&w=800",
  },
];

export default function CampaignShowcase() {
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="campaign" className="py-20 bg-modava-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200/80 pb-6">
          <div className="space-y-3 max-w-2xl">
            <span className="px-3 py-1 bg-emerald-100 text-modava-primary text-xs font-bold rounded-full">
              Crowdfunding Komunitas
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-modava-text-dark tracking-tight">
              Dukung Campaign UMKM Pilihan
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Setiap pendanaan didasari laporan arus kas terverifikasi dan skor kesehatan finansial yang transparan.
            </p>
          </div>

          <Link
            href="/crowdfunding"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-modava-text-dark font-bold text-sm rounded-xl hover:bg-emerald-50 hover:text-modava-primary hover:border-emerald-300 transition-all shadow-sm self-start md:self-auto"
          >
            Lihat Semua Campaign <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sampleCampaigns.map((item) => {
            const percentage = Math.round((item.collected / item.target) * 100);
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image Header */}
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 bg-modava-primary-dark/90 backdrop-blur-md text-white text-[11px] font-bold rounded-lg">
                        {item.category}
                      </span>
                      {item.nibVerified && (
                        <span className="px-2.5 py-1 bg-emerald-500/90 backdrop-blur-md text-white text-[11px] font-bold rounded-lg flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> NIB
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setLiked((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm text-gray-700 hover:text-red-500 transition-colors"
                      aria-label="Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${liked[item.id] ? "fill-red-500 text-red-500" : ""}`} />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{item.owner} • {item.location}</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Estimasi Bagi Hasil {item.returnRate}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-modava-text-dark line-clamp-2 leading-snug hover:text-modava-primary transition-colors cursor-pointer">
                      {item.title}
                    </h3>

                    {/* Progress Bar */}
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-modava-primary">{formatRupiah(item.collected)}</span>
                        <span className="text-gray-500">{percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-modava-primary to-emerald-500 h-2.5 rounded-full"
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-gray-500">
                        <span>Target: {formatRupiah(item.target)}</span>
                        <span className="flex items-center gap-1 font-semibold text-amber-700">
                          <Clock className="w-3 h-3" /> {item.daysLeft} hari lagi
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6 pt-2 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                    <Users className="w-4 h-4 text-modava-primary" />
                    <span>{item.investors} Kontributor</span>
                  </div>
                  <Link
                    href={`/crowdfunding`}
                    className="px-4 py-2 bg-modava-primary text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-colors"
                  >
                    Bantu Modal
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
