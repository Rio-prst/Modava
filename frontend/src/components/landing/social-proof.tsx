import Image from "next/image";
import { Star, CheckCircle2 } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Kustini",
    role: "Owner Kopi Nadi",
    location: "Jakarta Selatan",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
    quote: "Modava membantu toko kopi kami mendapatkan modal ekspansi cabang ke-3 dalam 7 hari melalui crowdfunding komunitas. Catatan arus kas otomatisnya sangat membantu!",
    score: "Skor Kredit 845",
  },
  {
    name: "Budi Santoso",
    role: "Pemilik Batik Eco-Print",
    location: "Surakarta",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300",
    quote: "Panduan legalitas NIB di Modava sangat ringkas. Setelah NIB terdaftar, skor kelayakan usaha kami langsung naik dan kampanye permodalan sukses 100%.",
    score: "Skor Kredit 810",
  },
  {
    name: "Rina Wijaya",
    role: "Pendiri Keripik Mamah",
    location: "Bandung",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300",
    quote: "Kalkulator pajak UMKM 0,5% dan pembukuan harian sangat simpel digunakan di HP. Sangat direkomendasikan untuk pelaku UMKM yang ingin rapi secara finansial.",
    score: "Skor Kredit 790",
  },
];

export default function SocialProof() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3 py-1 bg-emerald-100 text-modava-primary text-xs font-bold rounded-full">
            Kisah Sukses UMKM
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-modava-text-dark tracking-tight">
            Dipercaya Oleh Lebih dari <span className="text-modava-primary">5.000+ Pelaku Usaha</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Dengar langsung pengalamaan UMKM yang telah berkembang pesat bersama ekosistem Modava.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-modava-bg p-7 rounded-3xl border border-gray-200/70 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    {t.score}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-gray-200/80 flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-modava-primary flex-shrink-0">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-modava-text-dark flex items-center gap-1">
                    {t.name} <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                  </h4>
                  <p className="text-[11px] text-gray-500">{t.role} • {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partner Logos */}
        <div className="pt-8 border-t border-gray-100 text-center space-y-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Didukung Ekosistem Keuangan & Kompetisi Web Dev 2026
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {["Veternity Beraksi 2026", "Pendamping NIB OSS", "Bank Mitra Komunitas", "Asosiasi UMKM Indonesia"].map((item) => (
              <div
                key={item}
                className="py-3 px-4 bg-gray-50 rounded-2xl border border-gray-200/60 text-xs font-bold text-gray-600 tracking-wide flex items-center justify-center text-center shadow-2xs"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
