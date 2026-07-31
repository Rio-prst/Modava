"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useModava } from "@/context/modava-context";

export default function DashboardHeader() {
  const { user } = useUser();
  const { transactions } = useModava();

  const displayName = user?.firstName || user?.fullName || "Mitra UMKM";

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100/60 shadow-sm">
      <div>
        <h1 className="text-[24px] md:text-[26px] font-bold text-[#0A2328]">
          Halo, {displayName}! 👋
        </h1>
        <p className="text-sm text-[#556061] mt-0.5">
          {transactions.length === 0
            ? "Selamat datang! Silakan catat transaksi pertama Anda untuk mulai menganalisis keuangan."
            : "Berikut laporan perkembangan bisnis Anda hari ini."}
        </p>
      </div>

      <div className="flex items-center gap-2.5 flex-wrap">
        <Link
          href="/cash-flow"
          className="inline-flex items-center gap-2 bg-[#13634E] hover:bg-[#0E4F3E] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Tambah Transaksi
        </Link>
      </div>
    </div>
  );
}
