import Image from "next/image";
import Link from "next/link";
import { campaignActive } from "./dashboard-data";

export default function CampaignCard() {
  const pct = campaignActive.percentage;

  return (
    <div className="bg-white rounded-2xl border border-gray-100/60 overflow-hidden transition-all duration-300 hover:shadow-md flex flex-col justify-between">
      <div className="relative h-[160px] w-full">
        <Image
          src={campaignActive.image}
          alt={campaignActive.title}
          fill
          className="object-cover"
        />
        <span className="absolute top-3 right-3 bg-[#FFF5D6] text-[#0A2328] text-[11px] font-bold rounded-lg px-3 py-1 shadow-sm">
          Crowdfunding
        </span>
      </div>

      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-[16px] font-bold text-[#0A2328] leading-snug">
            {campaignActive.title}
          </h3>
          <p className="text-[12px] text-[#556061] leading-relaxed mt-1.5">
            {campaignActive.description}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-[13px]">
            <span className="font-semibold text-[#0A2328]">
              Terkumpul: <span className="font-bold">Rp {campaignActive.raised.toLocaleString("id-ID")}</span>
            </span>
            <span className="font-bold text-[#0A2328]">{pct}%</span>
          </div>
          <div className="h-[7px] bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-[#EAB308]"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="text-[12px] text-[#0A2328]">
            <span className="text-[#556061]">Sisa Waktu </span>
            <span className="font-bold block sm:inline">{campaignActive.daysLeft} Hari Lagi</span>
          </div>
          <Link
            href="/crowdfunding"
            className="bg-[#C68A16] hover:bg-[#B37B12] text-white text-[12px] font-semibold rounded-xl px-5 py-2.5 transition shadow-sm inline-block"
          >
            Kelola Campaign
          </Link>
        </div>
      </div>
    </div>
  );
}
