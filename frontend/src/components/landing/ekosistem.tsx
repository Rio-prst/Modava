import { Receipt, BarChart3, HeartHandshake, ShieldCheck, ArrowUpRight, Calculator, FileText, Bell } from "lucide-react";

const features = [
  {
    icon: Receipt,
    badge: "Keuangan Digital",
    title: "Cash Flow Tracker Otomatis",
    description: "Pencatatan harian pemasukan & pengeluaran yang otomatis menghitung arus kas bersih serta estimasi laba/rugi bulanan usaha Anda.",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    icon: BarChart3,
    badge: "Algoritma AI",
    title: "Skor Kelayakan Finansial",
    description: "Skor otomatis berbasis kesehatan riwayat transaksi dan kepemilikan dokumen legalitas sebagai dasar pengajuan modal yang dipercaya.",
    color: "bg-teal-50 text-teal-700 border-teal-200",
  },
  {
    icon: HeartHandshake,
    badge: "Bebas Agunan Berat",
    title: "Crowdfunding Komunitas",
    description: "Ciptakan kampanye kebutuhan modal dan terima pendanaan mikro langsung dari investor komunitas dengan skema bagi hasil transparan.",
    color: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  {
    icon: ShieldCheck,
    badge: "Legalitas & Perizinan",
    title: "Hub Perizinan NIB & Halal",
    description: "Panduan praktis pengurusan NIB, NPWP, Sertifikat Halal BPJPH, kalkulator pajak 0.5%, serta pembuat surat administratif otomatis.",
    color: "bg-emerald-50 text-emerald-800 border-emerald-300",
  },
];

export default function Ekosistem() {
  return (
    <section id="ekosistem" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-modava-primary text-xs font-bold rounded-full">
            Fitur Utama & Ekosistem
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-modava-text-dark tracking-tight">
            Semua Layanan Finansial UMKM <br />
            <span className="text-modava-primary">Dalam Satu Platform Terpadu</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Modava memadukan manajemen keuangan harian, kecerdasan skor kredit, kemudahan akses modal komunitas, dan kepastian legalitas usaha.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative bg-white p-7 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${item.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-modava-text-dark mb-3 group-hover:text-modava-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-50 flex items-center text-xs font-bold text-modava-primary group-hover:translate-x-1 transition-transform">
                  <span>Pelajari Selengkapnya</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Supporting Modules Grid */}
        <div className="bg-gradient-to-br from-emerald-950 to-modava-primary-dark rounded-3xl p-8 lg:p-12 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="px-3 py-1 bg-emerald-400/20 text-emerald-300 text-xs font-bold rounded-full border border-emerald-400/30">
                Fitur Pendukung Unggulan
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Kelola Administrasi & Simulasi Pajak Tanpa Pusing
              </h3>
              <p className="text-emerald-100/80 text-sm leading-relaxed">
                Dilengkapi simulasi pinjaman mikro instan, notifikasi otomatis penerimaan dana pledge, kalkulator pajak final UMKM 0,5%, serta template PDF surat usaha legal.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors">
                <Calculator className="w-6 h-6 text-emerald-300 mb-3" />
                <h4 className="font-bold text-sm text-white mb-1">Simulasi Pinjaman</h4>
                <p className="text-xs text-emerald-200/80">Hitung estimasi angsuran & kemampuan bayar sebelum mendana.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors">
                <FileText className="w-6 h-6 text-emerald-300 mb-3" />
                <h4 className="font-bold text-sm text-white mb-1">Template Surat PDF</h4>
                <p className="text-xs text-emerald-200/80">Generate surat izin & rekomendasi usaha siap cetak.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors">
                <Bell className="w-6 h-6 text-emerald-300 mb-3" />
                <h4 className="font-bold text-sm text-white mb-1">Notifikasi In-App</h4>
                <p className="text-xs text-emerald-200/80">Update real-time saat pendanaan campaign bertambah.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
