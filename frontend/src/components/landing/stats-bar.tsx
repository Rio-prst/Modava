import { Users, TrendingUp, ShieldCheck, Clock } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: "Rp 14.8+ M",
    label: "Total Modal Disalurkan",
    desc: "Bagi UMKM mikro di seluruh Indonesia",
  },
  {
    icon: Users,
    value: "5.200+",
    label: "UMKM Didampingi",
    desc: "Telah mendaftar & memiliki NIB",
  },
  {
    icon: ShieldCheck,
    value: "98.4%",
    label: "Tingkat Keberhasilan",
    desc: "Pengembalian & bagi hasil lancar",
  },
  {
    icon: Clock,
    value: "< 48 Jam",
    label: "Proses Verifikasi",
    desc: "Evaluasi kelayakan instan & transparan",
  },
];

export default function StatsBar() {
  return (
    <section className="py-10 bg-gradient-to-r from-modava-primary-dark via-[#093530] to-modava-primary text-white shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-emerald-800/60">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`flex flex-col items-center text-center p-4 ${
                  idx !== 0 ? "pt-6 lg:pt-4" : ""
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mb-3 text-emerald-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">
                  {stat.value}
                </h3>
                <p className="text-xs sm:text-sm font-bold text-emerald-200 uppercase tracking-wider mb-1">
                  {stat.label}
                </p>
                <p className="text-[11px] text-emerald-100/70">{stat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
