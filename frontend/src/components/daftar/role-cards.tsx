import { Store, HeartHandshake, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const roles = [
  {
    icon: Store,
    iconBg: "bg-[#0A2328]",
    title: "UMKM",
    description:
      "Catat keuangan, bangun skor kredit, dan akses pendanaan komunitas untuk mengembangkan usaha Anda.",
    features: [
      "Pencatatan keuangan otomatis",
      "Skor kredit digital",
      "Akses crowdfunding",
    ],
    cta: "Pilih Peran UMKM",
    ctaBg: "bg-[#0A2328]",
    ctaColor: "text-white",
    href: "/daftar/umkm",
  },
  {
    icon: HeartHandshake,
    iconBg: "bg-[#86E3CE]",
    title: "Kontributor",
    description:
      "Dukung UMKM lokal dan dapatkan peluang investasi mikro dengan dampak sosial nyata.",
    features: [
      "Investasi mikro",
      "Dampak sosial langsung",
      "Laporan transparan",
    ],
    cta: "Pilih Peran Kontributor",
    ctaBg: "bg-[#EAB308]",
    ctaColor: "text-[#0A2328]",
    href: "/daftar/kontributor",
  },
];

export default function RoleCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      {roles.map((role) => {
        const Icon = role.icon;
        return (
          <div
            key={role.title}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-md flex flex-col"
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${role.iconBg}`}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>

            <h3 className="text-lg md:text-xl font-bold text-[#0A2328] mt-6">
              {role.title}
            </h3>
            <p className="text-sm md:text-[14px] text-[#5A686B] leading-relaxed mt-2">
              {role.description}
            </p>

            <ul className="space-y-3 mt-6 flex-1">
              {role.features.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#0A2328] shrink-0" />
                  <span className="text-[13px] md:text-[14px] font-medium text-[#0A2328]">
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href={role.href}
              className={`w-full h-12 rounded-full flex items-center justify-center gap-2 font-semibold text-sm transition-opacity hover:opacity-90 mt-8 ${role.ctaBg} ${role.ctaColor}`}
            >
              {role.cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
