"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useModava } from "@/context/modava-context";

const statusStyles: Record<string, { bg: string; text: string }> = {
  verified: { bg: "#DCFCE7", text: "#166534" },
  pending: { bg: "#FEF3C7", text: "#B45309" },
  none: { bg: "#F3F4F6", text: "#6B7280" },
  Terverifikasi: { bg: "#DCFCE7", text: "#166534" },
  "Dalam Proses": { bg: "#FEF3C7", text: "#B45309" },
  "Belum Ada": { bg: "#F3F4F6", text: "#6B7280" },
};

const statusLabels: Record<string, string> = {
  verified: "Terverifikasi",
  pending: "Dalam Proses",
  none: "Belum Ada",
};

export default function WidgetLegalitas() {
  const { legalDocs } = useModava();
  const displayDocs = legalDocs.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl p-5 space-y-3.5 border border-gray-100/50 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-[#0A2328] font-semibold">
          Status Legalitas
        </p>
        <Link
          href="/legalitas"
          className="text-xs font-semibold text-[#13634E] hover:underline flex items-center gap-1"
        >
          <span>Kelola</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="space-y-3">
        {displayDocs.map((item) => {
          const style = statusStyles[item.status] || statusStyles["none"];
          const labelText = statusLabels[item.status] || item.status;
          return (
            <div
              key={item.id}
              className="flex items-center justify-between"
            >
              <span className="text-[13px] font-medium text-[#0A2328]">
                {item.name}
              </span>
              <span
                className="text-[11px] font-semibold rounded-full px-3 py-1"
                style={{ backgroundColor: style.bg, color: style.text }}
              >
                {labelText}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
