import Link from "next/link";
import { FileCheck2, ShieldCheck, CheckCircle2, BookOpen, FileSpreadsheet, Award } from "lucide-react";

const legalDocs = [
  {
    icon: ShieldCheck,
    title: "NIB (Nomor Induk Berusaha)",
    desc: "Identitas resmi pelaku usaha melalui sistem OSS RBA. Wajib untuk legalitas dasar.",
    badge: "Prioritas Utama",
  },
  {
    icon: FileCheck2,
    title: "Sertifikat Halal BPJPH",
    desc: "Memperluas jangkauan pasar F&B dengan jaminan kehalalan produk terverifikasi.",
    badge: "Sektor Kuliner",
  },
  {
    icon: FileSpreadsheet,
    title: "NPWP Usaha & Pajak 0,5%",
    desc: "Perhitungan pajak final UMKM secara otomatis sesuai PP No. 55 Tahun 2022.",
    badge: "Finansial & Pajak",
  },
  {
    icon: Award,
    title: "IUMK & Surat Izin Usaha",
    desc: "Generator dokumen dan template surat resmi administratif siap unduh format PDF.",
    badge: "Administrasi",
  },
];

export default function LegalSection() {
  return (
    <section id="legalitas" className="py-20 bg-modava-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3 py-1 bg-emerald-100 text-modava-primary text-xs font-bold rounded-full">
            Legalitas & Pendampingan Perizinan
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-modava-text-dark tracking-tight">
            Usaha Legal, Akses Modal <br />
            <span className="text-modava-primary">Makin Terbuka Lebar</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Status legalitas bukan sekadar formalitas, tetapi fondasi utama yang mendongkrak skor kredit kelayakan UMKM Anda di mata calon kontributor.
          </p>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {legalDocs.map((doc) => {
            const Icon = doc.icon;
            return (
              <div
                key={doc.title}
                className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-modava-primary flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                      {doc.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-modava-text-dark mb-2">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {doc.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs font-semibold text-modava-primary">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Modul Panduan & Generator PDF</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner Action */}
        <div className="bg-white p-8 rounded-3xl border border-emerald-200/80 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-modava-primary text-white flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base text-modava-text-dark">Belum Memiliki NIB atau Surat Usaha?</h4>
              <p className="text-xs text-gray-500">Ikuti panduan langkah demi langkah pengurusan NIB OSS gratis dalam platform Modava.</p>
            </div>
          </div>

          <Link
            href="/daftar"
            className="px-6 py-3 bg-modava-primary-dark text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-[#07333a] transition-colors whitespace-nowrap"
          >
            Mulai Panduan Legalitas
          </Link>
        </div>

      </div>
    </section>
  );
}
