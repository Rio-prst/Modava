import { Search, SlidersHorizontal } from "lucide-react";

export default function ExploreHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-[26px] md:text-[28px] font-bold text-[#0A2328]">
          Explore Crowdfunding
        </h1>
        <p className="text-sm text-[#556061] mt-1">
          Temukan dan dukung UMKM lokal pilihan Anda.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative flex-1 sm:flex-none">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari UMKM..."
            className="w-full sm:w-[240px] h-10 rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm text-[#0A2328] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#1E6B52] focus:border-transparent"
          />
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50">
          <SlidersHorizontal className="w-4 h-4 text-[#0A2328]" />
        </button>
      </div>
    </div>
  );
}
