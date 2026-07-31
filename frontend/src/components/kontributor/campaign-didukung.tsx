"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useModava } from "@/context/modava-context";

export default function CampaignDidukung() {
  const { contributions } = useModava();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#0A2328]">
          Campaign Sedang Didukung
        </h2>
        <Link
          href="/crowdfunding"
          className="text-xs font-semibold text-[#13634E] hover:underline"
        >
          Jelajahi Katalog
        </Link>
      </div>

      {contributions.length === 0 ? (
        <div className="bg-white rounded-2xl p-6 border border-gray-100/70 shadow-sm text-center space-y-3">
          <p className="text-sm font-semibold text-[#0A2328]">
            Anda belum mendukung campaign permodal UMKM manapun.
          </p>
          <p className="text-xs text-[#556061]">
            Jelajahi campaign aktif dan dukung pertumbuhan UMKM lokal sekarang.
          </p>
          <Link
            href="/crowdfunding"
            className="inline-flex items-center gap-2 bg-[#13634E] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#0e4b3b] transition"
          >
            <Plus className="w-4 h-4" />
            Jelajahi Campaign
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contributions.map((camp) => {
            const progress = camp.progress || 50;
            const daysLeft = camp.daysLeft || 30;
            const target = camp.target || 50000000;
            const image = camp.image || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800";

            return (
              <div
                key={camp.id}
                className="bg-white rounded-2xl p-4 border border-gray-100/70 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={image}
                      alt={camp.campaignTitle}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="text-sm font-bold text-[#0A2328] truncate">
                        {camp.campaignTitle}
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#DCFCE7] text-[#166534]">
                        {camp.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#556061] mt-1">
                      Kontribusi Anda: <strong className="text-[#13634E]">Rp {camp.amount.toLocaleString("id-ID")}</strong>
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 mt-3">
                  <div className="h-[6px] bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#13634E]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#556061]">
                    <span>Sisa {daysLeft} Hari</span>
                    <span>Target Rp {(target / 1000000).toFixed(0)}jt</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
