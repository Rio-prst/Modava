"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Eye, 
  Building2,
  ArrowLeft,
  X
} from "lucide-react";

export default function AdminLegalitasPage() {
  const [submissions, setSubmissions] = useState([
    {
      id: "sub-1",
      umkmName: "Warung Berkah - Bu Sri",
      docName: "Sertifikat Halal MUI / BPJPH",
      fileName: "Pengajuan_Sertifikat_Halal_WarungBerkah.pdf",
      date: "22 Juli 2026",
      status: "pending",
      notes: "Sertifikat Halal program SEHALAL BPJPH.",
    },
    {
      id: "sub-2",
      umkmName: "Kerupuk Pak Budi",
      docName: "Nomor Induk Berusaha (NIB)",
      fileName: "NIB_KerupukBudi_2026.pdf",
      date: "21 Juli 2026",
      status: "pending",
      notes: "Pengajuan NIB risiko rendah.",
    },
    {
      id: "sub-3",
      umkmName: "Hidroponik Mandiri",
      docName: "NPWP Perorangan / Usaha",
      fileName: "NPWP_Hidroponik.pdf",
      date: "18 Juli 2026",
      status: "verified",
      notes: "Terverifikasi DJP Online.",
    },
  ]);

  const [selectedSub, setSelectedSub] = useState<typeof submissions[0] | null>(null);

  const handleApprove = (id: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "verified" } : s))
    );
    setSelectedSub(null);
    alert("Dokumen berhasil disetujui! Status UMKM otomatis ter-update.");
  };

  const handleReject = (id: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "rejected" } : s))
    );
    setSelectedSub(null);
    alert("Dokumen ditolak. Notifikasi telah dikirim ke UMKM terkait.");
  };

  const pendingCount = submissions.filter((s) => s.status === "pending").length;

  return (
    <div className="min-h-screen bg-[#FAF8F5] p-6 sm:p-10 space-y-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigation back */}
        <Link 
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-modava-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
        </Link>

        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-modava-primary-dark to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-400/20 text-emerald-300 text-xs font-bold rounded-full border border-emerald-400/30 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Panel Admin PRD [F15]
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">Verifikasi Dokumen Legalitas UMKM</h1>
            <p className="text-xs text-slate-300 mt-1">
              Tinjau dokumen legalitas yang diunggah UMKM sebelum disetujui untuk menaikkan Skor Kelayakan.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
            <span className="text-2xl font-extrabold text-amber-300">{pendingCount}</span>
            <span className="text-[11px] text-slate-300 block font-medium">Antrean Verifikasi</span>
          </div>
        </div>

        {/* Submission List Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="font-bold text-slate-900 text-base">Pengajuan Masuk</h2>
            <span className="text-xs text-slate-500">Total {submissions.length} Pengajuan</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px]">
                  <th className="py-3 px-4">Nama UMKM</th>
                  <th className="py-3 px-4">Jenis Dokumen</th>
                  <th className="py-3 px-4">Tanggal Pengajuan</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-900 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-emerald-600 shrink-0" /> {sub.umkmName}
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-700">{sub.docName}</td>
                    <td className="py-4 px-4 text-slate-500">{sub.date}</td>
                    <td className="py-4 px-4">
                      {sub.status === "pending" && (
                        <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full font-bold text-xs inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> Menunggu
                        </span>
                      )}
                      {sub.status === "verified" && (
                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-xs inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Disetujui
                        </span>
                      )}
                      {sub.status === "rejected" && (
                        <span className="px-2.5 py-1 bg-rose-100 text-rose-800 rounded-full font-bold text-xs inline-flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" /> Ditolak
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => setSelectedSub(sub)}
                        className="py-1.5 px-3 bg-slate-100 hover:bg-modava-primary hover:text-white text-slate-700 rounded-xl font-bold text-xs transition-colors inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> Tinjau Dokumen
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative">
            <button
              onClick={() => setSelectedSub(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Tinjauan Legalitas PRD [F15]
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-2">{selectedSub.docName}</h3>
              <p className="text-xs text-slate-500">{selectedSub.umkmName} • Diunggah {selectedSub.date}</p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs">
              <p className="font-bold text-slate-800">File Lampiran:</p>
              <div className="flex items-center justify-between bg-white p-3 rounded-xl border">
                <span className="font-mono text-slate-700 text-xs truncate max-w-[240px]">
                  📄 {selectedSub.fileName}
                </span>
                <button className="text-emerald-700 hover:underline font-bold text-xs">
                  Download
                </button>
              </div>
              <p className="text-slate-600 pt-1">Catatan Pengirim: {selectedSub.notes}</p>
            </div>

            {/* Action Buttons */}
            {selectedSub.status === "pending" && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleReject(selectedSub.id)}
                  className="py-3 px-4 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-2xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <XCircle className="w-4 h-4" /> Tolak Dokumen
                </button>
                <button
                  onClick={() => handleApprove(selectedSub.id)}
                  className="py-3 px-4 bg-modava-primary hover:bg-emerald-800 text-white rounded-2xl font-bold text-xs shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" /> Setujui Dokumen
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
