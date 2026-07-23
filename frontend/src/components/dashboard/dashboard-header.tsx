import { Plus } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-[26px] md:text-[28px] font-bold text-[#0A2328]">
          Halo, Warung Berkah
        </h1>
        <p className="text-sm text-[#556061] mt-1">
          {new Date().toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
      <button className="inline-flex items-center gap-2 bg-[#0A2328] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition">
        <Plus className="w-4 h-4" />
        Tambah Transaksi
      </button>
    </div>
  );
}
