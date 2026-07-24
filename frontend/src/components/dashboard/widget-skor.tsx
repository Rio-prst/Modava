import { skorData } from "./dashboard-data";

export default function WidgetSkor() {
  const { score, label, description } = skorData;
  const angle = (score / 100) * 180;

  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-between h-full min-h-[300px] border border-gray-100/50 shadow-sm">
      <p className="text-[15px] font-semibold text-[#0A2328] text-center">
        Skor Kelayakan Keuangan
      </p>

      <div className="my-auto flex flex-col items-center">
        <svg
          viewBox="0 0 200 110"
          className="w-full max-w-[210px]"
          fill="none"
        >
          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            stroke="#E5E7EB"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* Active green arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            stroke="#13634E"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={`${(angle / 180) * 251.2} 251.2`}
          />
          <text
            x="100"
            y="70"
            textAnchor="middle"
            fill="#0A2328"
            fontSize="32"
            fontWeight="700"
            fontFamily="Plus Jakarta Sans, sans-serif"
          >
            {score}
          </text>
          <text
            x="100"
            y="92"
            textAnchor="middle"
            fill="#0A2328"
            fontSize="12"
            fontWeight="700"
            letterSpacing="0.5"
            fontFamily="Plus Jakarta Sans, sans-serif"
          >
            {label}
          </text>
        </svg>
      </div>

      <p className="text-[12px] text-[#556061] text-center leading-relaxed max-w-[240px]">
        {description}
      </p>
    </div>
  );
}
