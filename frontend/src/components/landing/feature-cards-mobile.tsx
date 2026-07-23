import { Wallet, Users } from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Manajemen Kas",
    description:
      "Pembukuan digital otomatis yang terhubung langsung dengan laporan laba rugi bulanan Anda.",
    bg: "bg-modava-accent-mint",
  },
  {
    icon: Users,
    title: "Crowdfunding",
    description:
      "Galang dana modal dari investor publik dengan skema bagi hasil yang adil dan transparan.",
    bg: "bg-modava-accent-blue",
  },
];

export default function FeatureCardsMobile() {
  return (
    <section className="px-5 space-y-4">
      {features.map((f) => {
        const Icon = f.icon;
        return (
          <div
            key={f.title}
            className="w-full bg-white rounded-xl p-4 flex items-start gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
          >
            <div
              className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${f.bg}`}
            >
              <Icon className="w-5 h-5 text-modava-text-dark" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-[15px] font-bold text-modava-text-dark">
                {f.title}
              </h3>
              <p className="text-[13px] text-modava-text-muted leading-relaxed">
                {f.description}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
