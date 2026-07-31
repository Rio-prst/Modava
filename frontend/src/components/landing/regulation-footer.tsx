import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function RegulationFooter() {
  return (
    <footer className="bg-modava-primary-dark text-white border-t border-emerald-900/60 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-modava-primary to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Modava
              </span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed max-w-sm">
              Platform ekosistem finansial terintegrasi untuk UMKM. Menghubungkan legalitas usaha, kecerdasan skor kredit, dan akses permodalan komunitas yang adil & transparan.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Platform Terverifikasi & Aman</span>
            </div>
          </div>

          {/* Quick Links 1 */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-emerald-300 uppercase tracking-wider">Layanan Inti</h4>
            <ul className="space-y-2 text-xs text-gray-300 font-medium">
              <li><a href="#fitur" className="hover:text-emerald-300 transition-colors">Cash Flow Tracker</a></li>
              <li><a href="#ekosistem" className="hover:text-emerald-300 transition-colors">Skor Kelayakan Finansial</a></li>
              <li><a href="#campaign" className="hover:text-emerald-300 transition-colors">Crowdfunding Komunitas</a></li>
              <li><a href="#simulasi" className="hover:text-emerald-300 transition-colors">Simulasi Pinjaman Mikro</a></li>
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-emerald-300 uppercase tracking-wider">Legalitas UMKM</h4>
            <ul className="space-y-2 text-xs text-gray-300 font-medium">
              <li><a href="#legalitas" className="hover:text-emerald-300 transition-colors">Panduan NIB OSS RBA</a></li>
              <li><a href="#legalitas" className="hover:text-emerald-300 transition-colors">Sertifikat Halal BPJPH</a></li>
              <li><a href="#legalitas" className="hover:text-emerald-300 transition-colors">Kalkulator Pajak 0,5%</a></li>
              <li><a href="#legalitas" className="hover:text-emerald-300 transition-colors">Template Surat PDF</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-emerald-300 uppercase tracking-wider">Navigasi Akun</h4>
            <ul className="space-y-2 text-xs text-gray-300 font-medium">
              <li><Link href="/daftar" className="hover:text-emerald-300 transition-colors">Daftar Akun UMKM</Link></li>
              <li><Link href="/masuk" className="hover:text-emerald-300 transition-colors">Masuk Pengguna</Link></li>
              <li><a href="#faq" className="hover:text-emerald-300 transition-colors">Pusat Bantuan FAQ</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-100/60">
          <p>© 2026 Modava. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
