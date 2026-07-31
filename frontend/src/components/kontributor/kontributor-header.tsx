"use client";

import { Bell, Search } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function KontributorHeader() {
  const { user } = useUser();
  const userName = user?.firstName || user?.fullName || "Kontributor Modava";

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#0A2328]">
          Selamat Datang, {userName} 👋
        </h1>
        <p className="text-sm text-[#556061] mt-1">
          Lihat perkembangan kontribusi modal UMKM Anda hari ini.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="w-10 h-10 rounded-full bg-white border border-gray-200/80 shadow-sm flex items-center justify-center text-[#0A2328] hover:bg-gray-50 transition">
          <Search className="w-4 h-4" />
        </button>
        <button className="w-10 h-10 rounded-full bg-white border border-gray-200/80 shadow-sm flex items-center justify-center text-[#0A2328] hover:bg-gray-50 transition relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>
    </div>
  );
}
