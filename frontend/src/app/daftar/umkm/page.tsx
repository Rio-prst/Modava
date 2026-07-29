"use client";

import { useState } from "react";
import Link from "next/link";
import { Store, ArrowLeft, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

export default function DaftarUmkmPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    namaPemilik: "",
    email: "",
    password: "",
    namaUsaha: "",
    kategori: "Kuliner (F&B)",
    phone: "",
    nib: "",
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
            <div className="w-12 h-12 rounded-2xl bg-modava-primary text-white flex items-center justify-center font-bold">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 bg-emerald-100 text-modava-primary rounded-full">
                Pendaftaran Akun UMKM
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-modava-text-dark">
                Bawa Usaha Anda Naik Kelas
              </h1>
            </div>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-modava-primary rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-modava-text-dark">Pendaftaran Berhasil!</h2>
              <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto">
                Selamat, akun UMKM <strong>{formData.namaUsaha || "Anda"}</strong> berhasil dibuat. Silakan masuk untuk melengkapi berkas & mencatat arus kas.
              </p>
              <div className="pt-4">
                <Link
                  href="/masuk"
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-modava-primary text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-md"
                >
                  Lanjut Masuk ke Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nama Lengkap Pemilik Usaha <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={formData.namaPemilik}
                  onChange={(e) => setFormData({ ...formData, namaPemilik: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-modava-primary/50 focus:border-modava-primary"
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-modava-primary/50 focus:border-modava-primary"
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-modava-primary/50 focus:border-modava-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nama Brand / Usaha UMKM <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Warung Kopi Nadi"
                  value={formData.namaUsaha}
                  onChange={(e) => setFormData({ ...formData, namaUsaha: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-modava-primary/50 focus:border-modava-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Kategori Usaha
                  </label>
                  <select
                    value={formData.kategori}
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-modava-primary/50 focus:border-modava-primary bg-white"
                  >
                    <option value="Kuliner (F&B)">Kuliner (F&B)</option>
                    <option value="Fashion & Kriya">Fashion & Kriya</option>
                    <option value="Pertanian & Peternakan">Pertanian & Peternakan</option>
                    <option value="Jasa & Perdagangan">Jasa & Perdagangan</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-modava-primary/50 focus:border-modava-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nomor Induk Berusaha (NIB) <span className="text-gray-400 font-normal">(Opsional)</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="13 Digit Nomor NIB OSS (Jika ada)"
                    value={formData.nib}
                    onChange={(e) => setFormData({ ...formData, nib: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-modava-primary/50 focus:border-modava-primary"
                  />
                  <ShieldCheck className="w-5 h-5 text-emerald-600 absolute right-3 top-3.5" />
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Belum punya NIB? Anda bisa membuatnya gratis melalui panduan Modava setelah mendaftar.
                </p>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-modava-primary text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  Daftarkan Usaha Sekarang <ArrowRight className="w-4 h-4" />
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
