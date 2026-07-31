"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "Apa itu Modava dan bagaimana cara kerja permodalannya?",
    a: "Modava adalah platform finansial terintegrasi untuk UMKM yang menggabungkan pencatatan arus kas otomatis, penilaian skor kelayakan kredit berbasis data, pendampingan legalitas NIB, serta penggalangan dana crowdfunding mikro berbasis komunitas.",
  },
  {
    q: "Apakah UMKM membutuhkan jaminan atau agunan fisik?",
    a: "Tidak. Pengajuan modal di Modava berbasis kelayakan riwayat arus kas dan legalitas perizinan usaha (NIB & NPWP), sehingga bebas dari persyaratan jaminan aset fisik yang memberatkan.",
  },
  {
    q: "Bagaimana skor kelayakan finansial dihitung?",
    a: "Skor dihitung secara otomatis oleh algoritma transparan berdasarkan 3 pilar utama: konsistensi pencatatan transaksi harian, rasio arus kas bersih bulanan, serta kepemilikan dokumen legalitas resmi.",
  },
  {
    q: "Berapa lama proses pencairan dana crowdfunding?",
    a: "Setelah kampanye pendanaan mencapai target dan lolos verifikasi berkas, dana akan dicairkan langsung ke rekening UMKM dalam kurun waktu 1 hingga 3 hari kerja.",
  },
  {
    q: "Apakah layanan dasar Modava dikenakan biaya?",
    a: "Fitur pencatatan keuangan harian, panduan legalitas NIB, dan kalkulator pajak 0,5% dapat digunakan 100% GRATIS tanpa biaya langganan bulanan.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-modava-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-modava-primary text-xs font-bold rounded-full">
            <HelpCircle className="w-3.5 h-3.5" /> Pertanyaan Umum
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-modava-text-dark tracking-tight">
            Sering Ditanyakan (FAQ)
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Segala hal yang perlu Anda ketahui tentang layanan dan ekosistem Modava.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-base text-modava-text-dark hover:text-modava-primary transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-modava-primary" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
