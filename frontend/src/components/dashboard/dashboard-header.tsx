import Link from "next/link";
import { Plus } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-[26px] md:text-[28px] font-bold text-[#0A2328]">
          Halo, Warung Berkah
        </h1>
        <p className="text-sm text-[#556061] mt-1">
          Laporan perkembangan bisnismu hari ini.
        </p>
      </div>
      <Link
        href="/cash-flow"
        className="inline-flex items-center gap-2 bg-[#0A2328] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition shadow-sm"
      >
        <Plus className="w-4 h-4" />
        Tambah Transaksi
      </Link>
    </div>
  );
}
