import { legalitasData } from "./dashboard-data";

const statusStyles: Record<string, { bg: string; text: string }> = {
  Terverifikasi: { bg: "#DCFCE7", text: "#166534" },
  "Dalam Proses": { bg: "#FEF3C7", text: "#B45309" },
  "Belum Ada": { bg: "#F3F4F6", text: "#6B7280" },
};

export default function WidgetLegalitas() {
  return (
    <div className="bg-white rounded-2xl p-5 space-y-3.5 border border-gray-100/50 shadow-sm">
      <p className="text-[13px] text-[#556061] font-semibold">
        Status Legalitas
      </p>
      <div className="space-y-3">
        {legalitasData.map((item) => {
          const style = statusStyles[item.status] || statusStyles["Belum Ada"];
          return (
            <div
              key={item.label}
              className="flex items-center justify-between"
            >
              <span className="text-[13px] font-medium text-[#0A2328]">
                {item.label}
              </span>
              <span
                className="text-[11px] font-semibold rounded-full px-3 py-1"
                style={{ backgroundColor: style.bg, color: style.text }}
              >
                {item.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
