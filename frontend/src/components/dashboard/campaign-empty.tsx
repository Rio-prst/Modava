import { Plus } from "lucide-react";

export default function CampaignEmpty() {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-colors hover:border-[#0A2328] cursor-pointer">
      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-4">
        <Plus className="w-6 h-6 text-gray-500" />
      </div>
      <h3 className="text-[15px] font-bold text-[#0A2328]">
        Ajukan Modal Baru
      </h3>
      <p className="text-[12px] text-[#556061] mt-1 max-w-[180px] leading-relaxed">
        Mulai campaign crowdfunding atau pengajuan pinjaman bank.
      </p>
    </div>
  );
}
