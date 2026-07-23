import { Clock, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import type { Campaign } from "./campaign-data";

export default function CampaignCard({
  campaign,
}: {
  campaign: Campaign;
}) {
  const pct = Math.min(
    Math.round((campaign.raised / campaign.target) * 100),
    100
  );
  const isCompleted = campaign.status === "selesai";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md">
      <div className="relative aspect-[16/10]">
        <Image
          src={campaign.image}
          alt={campaign.title}
          fill
          className="object-cover"
        />
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-[10px] font-bold uppercase rounded-md px-2.5 py-1 text-[#0A2328]">
          {campaign.category}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1 space-y-3">
        <h3 className="text-[15px] font-bold text-[#0A2328] line-clamp-1">
          {campaign.title}
        </h3>
        <p className="text-[12px] text-[#556061] leading-relaxed line-clamp-2">
          {campaign.description}
        </p>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[12px]">
            <span className="font-bold text-[#0A2328]">
              Terkumpul: Rp{formatRp(campaign.raised)}
            </span>
            <span
              className={`font-bold ${
                isCompleted ? "text-[#10B981]" : "text-[#13634e]"
              }`}
            >
              {pct}%
            </span>
          </div>
          <div className="h-[6px] bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                isCompleted ? "bg-[#10B981]" : "bg-[#13634e]"
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px]">
          {isCompleted ? (
            <span className="flex items-center gap-1 text-green-600 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Selesai
            </span>
          ) : (
            <span className="flex items-center gap-1 text-red-500 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              {campaign.daysLeft} Hari Lagi
            </span>
          )}
          <span className="text-[#556061]">
            Target: Rp{formatRp(campaign.target)}
          </span>
        </div>

        <button className="w-full h-[38px] rounded-lg border border-[#0A2328] text-[13px] font-semibold text-[#0A2328] hover:bg-gray-50 transition mt-auto">
          Lihat Detail
        </button>
      </div>
    </div>
  );
}

function formatRp(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}jt`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}rb`;
  return n.toString();
}
