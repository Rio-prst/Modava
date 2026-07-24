"use client";

import Image from "next/image";
import Link from "next/link";
import { supportedCampaigns } from "./kontributor-data";

export default function CampaignDidukung() {
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
          Lihat Semua
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {supportedCampaigns.map((camp) => (
          <div
            key={camp.id}
            className="bg-white rounded-2xl p-4 border border-gray-100/70 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-start gap-3">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                <Image
                  src={camp.image}
                  alt={camp.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-sm font-bold text-[#0A2328] truncate">
                    {camp.title}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#DCFCE7] text-[#166534]">
                    {camp.category}
                  </span>
                </div>
                <p className="text-xs text-[#556061] mt-1">
                  Progres Dana <span className="font-bold text-[#0A2328] float-right">{camp.progress}%</span>
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5 mt-3">
              <div className="h-[6px] bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#13634E]"
                  style={{ width: `${camp.progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#556061]">
                <span>Sisa {camp.daysLeft} Hari</span>
                <span>Target Rp {(camp.target / 1000000).toFixed(0)}jt</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
