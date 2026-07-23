import { skorData } from "./dashboard-data";

export default function WidgetSkor() {
  const { score, label } = skorData;
  const angle = (score / 100) * 180;

  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col items-center">
      <p className="text-[14px] font-semibold text-[#556061] text-center">
        Skor Kelayakan Keuangan
      </p>

      <svg
        viewBox="0 0 200 110"
        className="w-full max-w-[180px] mt-4"
        fill="none"
      >
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          stroke="#E5E7EB"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          stroke="#13634e"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${angle} 180`}
        />
        <text
          x="100"
          y="62"
          textAnchor="middle"
          fill="#0A2328"
          fontSize="36"
          fontWeight="700"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          {score}
        </text>
      </svg>

      <p className="text-[14px] font-bold text-[#0A2328] text-center mt-1">
        {label}
      </p>
      <p className="text-[12px] text-[#556061] text-center leading-relaxed mt-1 max-w-[220px]">
        Kombinasi dari arus kas, legalitas, dan riwayat platform.
      </p>
    </div>
  );
}
