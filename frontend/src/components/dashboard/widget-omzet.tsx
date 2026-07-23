import { TrendingUp } from "lucide-react";
import { omzetData } from "./dashboard-data";

export default function WidgetOmzet() {
  const pct = Math.round((omzetData.nominal / omzetData.target) * 100);

  return (
    <div className="bg-white rounded-2xl p-5 space-y-3">
      <p className="text-[12px] text-[#556061] font-medium">
        Omzet Bulan Berjalan
      </p>
      <div className="flex items-baseline justify-between">
        <span className="text-lg md:text-xl font-bold text-[#0A2328]">
          Rp{formatRp(omzetData.nominal)}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
          <TrendingUp className="w-3 h-3" />
          +{omzetData.growth}% vs bln lalu
        </span>
      </div>
      <div className="space-y-1.5">
        <div className="h-[6px] bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-[#16A34A]"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-[#556061]">
          <span>{pct}%</span>
          <span>Target: Rp{formatRp(omzetData.target)}</span>
        </div>
      </div>
    </div>
  );
}

function formatRp(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}jt`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}rb`;
  return n.toString();
}
