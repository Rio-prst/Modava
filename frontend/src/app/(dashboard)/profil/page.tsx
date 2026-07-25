"use client";

import { useState } from "react";
import { 
  Building2, 
  User, 
  Save, 
  Camera, 
  CheckCircle2
} from "lucide-react";

export default function ProfilPage() {
  const [profile, setProfile] = useState({
    namaUsaha: "Warung Berkah Sembako & Katering",
    kategori: "Kuliner & Olahan Makanan",
    tahunBerdiri: "2021",
    namaPemilik: "Sri Rahayu",
    nik: "3273015509820003",
    email: "warungberkah.bdg@gmail.com",
    telepon: "+62 812-3456-7890",
    alamat: "Jl. Merdeka No. 45, Kecamatan Coblong, Kota Bandung, Jawa Barat 40132",
    deskripsi: "Usaha warung sembako dan penyedia jasa katering rumahan yang melayani kebutuhan konsumsi harian masyarakat sekitar dan acara skala menengah.",
    logoUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=300&auto=format&fit=crop",
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-modava-primary-dark via-[#134D3B] to-modava-primary rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative group">
            <img
              src={profile.logoUrl}
              alt={profile.namaUsaha}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-white/30 shadow-md"
            />
            <button className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-5 h-5" />
            </button>
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-400/20 text-emerald-200 text-xs font-bold rounded-full border border-emerald-400/30 mb-1">
              <Building2 className="w-3.5 h-3.5" /> Profil Usaha Terdaftar PRD [F2]
            </div>
            <h1 className="text-2xl font-extrabold">{profile.namaUsaha}</h1>
            <p className="text-xs text-emerald-100/90 flex items-center gap-2 mt-1">
              <span>{profile.kategori}</span> • <span>Berdiri {profile.tahunBerdiri}</span>
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 text-center shrink-0">
          <span className="text-xs text-slate-300 font-semibold block">Skor Kelayakan Usaha</span>
          <span className="text-2xl font-extrabold text-emerald-300">82 (A)</span>
        </div>
      </div>

      {/* Save Success Alert */}
      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Profil UMKM Anda berhasil diperbarui!
        </div>
      )}

      {/* Form Edit Profil */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <User className="w-5 h-5 text-modava-primary" /> Informasi Pemilik & Identitas Usaha
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Nama Usaha / Brand</label>
            <input
              type="text"
              required
              value={profile.namaUsaha}
              onChange={(e) => setProfile({ ...profile, namaUsaha: e.target.value })}
              className="w-full p-3 rounded-2xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-modava-primary/30 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Kategori Usaha</label>
            <select
              value={profile.kategori}
              onChange={(e) => setProfile({ ...profile, kategori: e.target.value })}
              className="w-full p-3 rounded-2xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-modava-primary/30 focus:outline-none bg-white"
            >
              <option value="Kuliner & Olahan Makanan">Kuliner & Olahan Makanan</option>
              <option value="Fashion & Konveksi">Fashion & Konveksi</option>
              <option value="Pertanian & Hidroponik">Pertanian & Hidroponik</option>
              <option value="Kerajinan Tangan">Kerajinan Tangan</option>
              <option value="Jasa & Perdagangan">Jasa & Perdagangan</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Nama Pemilik Usaha</label>
            <input
              type="text"
              required
              value={profile.namaPemilik}
              onChange={(e) => setProfile({ ...profile, namaPemilik: e.target.value })}
              className="w-full p-3 rounded-2xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-modava-primary/30 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">NIK (Nomor Induk Kependudukan)</label>
            <input
              type="text"
              required
              value={profile.nik}
              onChange={(e) => setProfile({ ...profile, nik: e.target.value })}
              className="w-full p-3 rounded-2xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-modava-primary/30 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Email Operasional</label>
            <input
              type="email"
              required
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full p-3 rounded-2xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-modava-primary/30 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Nomor Telepon / WhatsApp</label>
            <input
              type="text"
              required
              value={profile.telepon}
              onChange={(e) => setProfile({ ...profile, telepon: e.target.value })}
              className="w-full p-3 rounded-2xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-modava-primary/30 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700">Alamat Lengkap Tempat Usaha</label>
          <textarea
            rows={3}
            required
            value={profile.alamat}
            onChange={(e) => setProfile({ ...profile, alamat: e.target.value })}
            className="w-full p-3 rounded-2xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-modava-primary/30 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700">Deskripsi Ringkas Kegiatan Usaha</label>
          <textarea
            rows={4}
            required
            value={profile.deskripsi}
            onChange={(e) => setProfile({ ...profile, deskripsi: e.target.value })}
            className="w-full p-3 rounded-2xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-modava-primary/30 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-modava-primary hover:bg-emerald-800 text-white rounded-2xl font-bold text-sm shadow-lg shadow-emerald-700/25 transition-all flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" /> Simpan Perubahan Profil UMKM
        </button>
      </form>
    </div>
  );
}
