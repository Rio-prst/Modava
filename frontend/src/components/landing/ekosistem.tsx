import { Receipt, BarChart2, Users } from "lucide-react";

const features = [
  {
    icon: Receipt,
    title: "Catat Keuangan",
    description:
      "Pembukuan digital otomatis yang terhubung langsung dengan laporan laba rugi bulanan Anda.",
  },
  {
    icon: BarChart2,
    title: "Skor Kredit",
    description:
      "Gunakan data transaksi untuk membangun profil kredit digital guna mempermudah akses pinjaman.",
  },
  {
    icon: Users,
    title: "Crowdfunding",
    description:
      "Galang dana modal dari investor publik dengan skema bagi hasil yang adil dan transparan.",
  },
];

export default function Ekosistem() {
  return (
    <section className="space-y-10">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-modava-text-dark">
          Ekosistem Tumbuh Bersama
        </h2>
        <p className="text-xs text-gray-500">
          Layanan finansial lengkap dalam satu genggaman
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4"
            >
              <div className="w-10 h-10 bg-[#f3f4f6] rounded-lg flex items-center justify-center text-gray-700">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-modava-text-dark">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
