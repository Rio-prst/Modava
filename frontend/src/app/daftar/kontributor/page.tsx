"use client";

import { useState } from "react";
import Link from "next/link";
import { HeartHandshake, ArrowLeft, CheckCircle2, ArrowRight, Heart, Sparkles } from "lucide-react";

export default function DaftarKontributorPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    namaLengkap: "",
    email: "",
    password: "",
    phone: "",
    minat: "Kuliner (F&B)",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F3ED] py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full space-y-6">
        
        {/* Back Link */}
        <div>
          <Link
            href="/daftar"
            className="inline-flex items-center gap-2 text-xs font-bold text-modava-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Pilih Peran
          </Link>
        </div>

        {/* Card Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200/80 space-y-6">
          
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-gray-100 pb-5">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-modava-text-dark flex items-center justify-center font-bold">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded-full">
                Pendaftaran Kontributor Modal
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-modava-text-dark">
                Dukung UMKM Lokal Indonesia
              </h1>
            </div>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-modava-text-dark">Selamat Bergabung!</h2>
              <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto">
                Akun Kontributor atas nama <strong>{formData.namaLengkap || "Anda"}</strong> berhasil dibuat. Siap memberikan dampak nyata bagi permodalan UMKM lokal.
              </p>
              <div className="pt-4">
                <Link
                  href="/masuk"
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-amber-500 text-modava-text-dark text-sm font-bold rounded-xl hover:bg-amber-400 transition-colors shadow-md"
                >
                  Masuk ke Dashboard Kontributor <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nama Lengkap Kontributor <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Hendra Wijaya"
                  value={formData.namaLengkap}
                  onChange={(e) => setFormData({ ...formData, namaLengkap: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Email Aktif <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Kata Sandi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Minimal 8 karakter"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    No. WhatsApp Active <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0812xxxxxxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Minat Pendanaan Sektor
                  </label>
                  <select
                    value={formData.minat}
                    onChange={(e) => setFormData({ ...formData, minat: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 bg-white"
                  >
                    <option value="Kuliner (F&B)">Kuliner (F&B)</option>
                    <option value="Fashion & Kriya">Fashion & Kriya</option>
                    <option value="Pertanian & Peternakan">Pertanian & Peternakan</option>
                    <option value="Jasa & Perdagangan">Jasa & Perdagangan</option>
                    <option value="Semua Sektor Usaha">Semua Sektor Usaha</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
                <Heart className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 fill-amber-500" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  Sebagai kontributor, Anda akan menerima laporan transparan berkala serta pemberitahuan setiap ada pembagian hasil usaha dari UMKM mitra.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-amber-500 text-modava-text-dark text-sm font-bold rounded-xl hover:bg-amber-400 transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  Daftar Kontributor Sekarang <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Footer Note */}
          <div className="border-t border-gray-100 pt-4 text-center text-xs text-gray-500">
            Sudah memiliki akun Modava?{" "}
            <Link href="/masuk" className="font-bold text-modava-primary hover:underline">
              Masuk di sini
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
