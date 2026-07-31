import { Plus } from "lucide-react";
import Link from "next/link";

export default function CampaignEmpty() {
  return (
    <Link
      href="/crowdfunding/buat"
      className="border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all hover:border-[#0A2328] hover:bg-white/50 cursor-pointer min-h-[280px]"
    >
      <div className="w-12 h-12 rounded-full bg-[#EAE8E3] flex items-center justify-center mb-4 transition-transform hover:scale-105">
        <Plus className="w-6 h-6 text-[#0A2328]" />
      </div>
      <h3 className="text-[16px] font-bold text-[#0A2328]">
        Ajukan Modal Baru
      </h3>
      <p className="text-[12px] text-[#556061] mt-1.5 max-w-[220px] leading-relaxed">
        Mulai campaign crowdfunding atau pengajuan pinjaman bank.
      </p>
    </Link>
  );
}
