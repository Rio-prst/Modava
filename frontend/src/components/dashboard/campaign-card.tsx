import { Clock } from "lucide-react";
import Image from "next/image";
import { campaignActive } from "./dashboard-data";

export default function CampaignCard() {
  const pct = Math.round(
    (campaignActive.raised / campaignActive.target) * 100
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="relative h-[150px]">
        <Image
          src={campaignActive.image}
          alt={campaignActive.title}
          fill
          className="object-cover"
        />
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-[10px] font-bold uppercase rounded-md px-2.5 py-1 text-[#0A2328]">
          Crowdfunding
        </span>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="text-[15px] font-bold text-[#0A2328]">
          {campaignActive.title}
        </h3>
        <p className="text-[12px] text-[#556061] leading-relaxed line-clamp-2">
          Mengembangkan usaha kuliner rumahan dengan inovasi menu sehat dan
          kemasan kekinian.
        </p>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-[12px]">
            <span className="font-bold text-[#0A2328]">
              Terkumpul: Rp{formatRp(campaignActive.raised)}
            </span>
            <span className="font-bold text-[#EAB308]">{pct}%</span>
          </div>
          <div className="h-[6px] bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-[#EAB308]"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-[11px] text-red-500 font-semibold">
            <Clock className="w-3.5 h-3.5" />
            {campaignActive.daysLeft} Hari Lagi
          </span>
          <button className="bg-[#EAB308] text-[#0A2328] text-[11px] font-semibold rounded-lg px-4 py-1.5 hover:opacity-90 transition">
            Kelola Campaign
          </button>
        </div>
      </div>
    </div>
  );
}

function formatRp(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}jt`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}rb`;
  return n.toString();
}
