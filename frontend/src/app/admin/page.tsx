"use client";

import { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Eye, 
  Building2,
  X,
  CreditCard,
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
  Check,
  Ban
} from "lucide-react";
import { useModava, Contribution } from "@/context/modava-context";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"legalitas" | "transaksi">("legalitas");
  const { contributions, approveTransaction, rejectTransaction } = useModava();

  // Legalitas Submissions State
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
  const [selectedProofItem, setSelectedProofItem] = useState<Contribution | null>(null);
  const [txFilter, setTxFilter] = useState<"all" | "pending" | "deposit" | "withdraw">("pending");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleApproveDoc = (id: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "verified" } : s))
    );
    setSelectedSub(null);
    alert("Dokumen legalitas berhasil disetujui!");
  };

  const handleRejectDoc = (id: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "rejected" } : s))
    );
    setSelectedSub(null);
    alert("Dokumen legalitas ditolak.");
  };

  // Deposit/Withdraw filter
  const depositWithdrawItems = contributions.filter(
    (c) => c.type === "deposit" || c.type === "withdraw"
  );

  const pendingTxCount = depositWithdrawItems.filter(
    (c) => c.status === "Pending Admin ACC"
  ).length;

  const filteredTxItems = depositWithdrawItems.filter((item) => {
    if (txFilter === "pending") return item.status === "Pending Admin ACC";
    if (txFilter === "deposit") return item.type === "deposit";
    if (txFilter === "withdraw") return item.type === "withdraw";
    return true;
  });

  const pendingDocCount = submissions.filter((s) => s.status === "pending").length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-modava-primary-dark to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-400/20 text-emerald-300 text-xs font-bold rounded-full border border-emerald-400/30 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Portal Admin Verifikasi Modava
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">Pusat Verifikasi & ACC Transaksi</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Tinjau pengajuan verifikasi dokumen legalitas UMKM dan lakukan ACC persetujuan Deposit & Withdraw kontributor.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-center min-w-[120px]">
            <span className="text-xl font-extrabold text-amber-300">{pendingDocCount}</span>
            <span className="text-[10px] text-slate-300 block font-semibold">Pending Legalitas</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-center min-w-[120px]">
            <span className="text-xl font-extrabold text-emerald-300">{pendingTxCount}</span>
            <span className="text-[10px] text-slate-300 block font-semibold">Pending ACC Saldo</span>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="bg-slate-800 p-2 rounded-2xl border border-slate-700 flex gap-2">
        <button
          onClick={() => setActiveTab("legalitas")}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
            activeTab === "legalitas"
              ? "bg-modava-primary text-white shadow-md"
              : "text-slate-400 hover:text-white hover:bg-slate-700/50"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Verifikasi Legalitas UMKM ({pendingDocCount})</span>
        </button>

        <button
          onClick={() => setActiveTab("transaksi")}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
            activeTab === "transaksi"
              ? "bg-modava-primary text-white shadow-md"
              : "text-slate-400 hover:text-white hover:bg-slate-700/50"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>ACC Deposit & Withdraw Kontributor ({pendingTxCount})</span>
        </button>
      </div>

      {/* TAB 1: VERIFIKASI LEGALITAS */}
      {activeTab === "legalitas" && (
        <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700 pb-4">
            <h2 className="font-bold text-white text-base">Pengajuan Dokumen Legalitas Masuk</h2>
            <span className="text-xs text-slate-400">Total {submissions.length} Pengajuan</span>
          </div>

          <div className="space-y-3">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-600 transition"
              >
                <div className="flex items-start gap-3">
                  <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{sub.umkmName}</h3>
                    <p className="text-xs font-semibold text-emerald-400 mt-0.5">{sub.docName}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">📄 {sub.fileName} • {sub.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {sub.status === "verified" && (
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Terverifikasi
                    </span>
                  )}

                  {sub.status === "pending" && (
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-bold flex items-center gap-1.5">
                      <Clock className="w-4 h-4 animate-spin" /> Menunggu ACC
                    </span>
                  )}

                  {sub.status === "rejected" && (
                    <span className="px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full text-xs font-bold flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" /> Ditolak
                    </span>
                  )}

                  <button
                    onClick={() => setSelectedSub(sub)}
                    className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-xs border border-slate-600 transition flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" /> Tinjau Dokumen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ACC DEPOSIT & WITHDRAW KONTRIBUTOR */}
      {activeTab === "transaksi" && (
        <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-700 pb-4 gap-4">
            <div>
              <h2 className="font-bold text-white text-base">Permintaan Top Up Deposit & Withdraw Saldo</h2>
              <p className="text-xs text-slate-400">Setujui (ACC) permintaan deposit agar saldo masuk ke dompet kontributor.</p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-700">
              <button
                onClick={() => setTxFilter("pending")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  txFilter === "pending"
                    ? "bg-amber-500 text-slate-950"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Pending ACC ({pendingTxCount})
              </button>
              <button
                onClick={() => setTxFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  txFilter === "all"
                    ? "bg-emerald-500 text-slate-950"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Semua ({depositWithdrawItems.length})
              </button>
              <button
                onClick={() => setTxFilter("deposit")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  txFilter === "deposit"
                    ? "bg-emerald-500 text-slate-950"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Deposit
              </button>
              <button
                onClick={() => setTxFilter("withdraw")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  txFilter === "withdraw"
                    ? "bg-emerald-500 text-slate-950"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Withdraw
              </button>
            </div>
          </div>

          {filteredTxItems.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs font-medium space-y-2 border border-dashed border-slate-700 rounded-2xl bg-slate-900/50">
              <p>Tidak ada transaksi yang sesuai filter &quot;{txFilter}&quot; saat ini.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTxItems.map((item) => {
                const isPending = item.status === "Pending Admin ACC";

                return (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-600 transition"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                          item.type === "deposit"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {item.type === "deposit" ? (
                          <ArrowDownLeft className="w-5 h-5" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5" />
                        )}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white text-sm">{item.campaignTitle}</h3>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                              isPending
                                ? "bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse"
                                : item.status === "Berhasil"
                                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                                : "bg-rose-500/20 text-rose-300 border-rose-500/40"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          Pengajuan: <strong>{item.date}</strong> • Jenis: <span className="uppercase text-emerald-300">{item.type}</span>
                        </p>
                        {item.type === "deposit" && item.proofUrl && (
                          <button
                            onClick={() => setSelectedProofItem(item)}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition mt-1 underline"
                          >
                            📷 Lihat Bukti Transfer ({item.proofUrl})
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Amount & Admin ACC Action Buttons */}
                    <div className="flex items-center gap-4 justify-between sm:justify-end">
                      <span className="text-base font-extrabold text-white font-mono">
                        Rp {item.amount.toLocaleString("id-ID")}
                      </span>

                      {isPending ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              approveTransaction(item.id);
                              alert(`Transaksi ${item.campaignTitle} berhasil di-ACC (Disetujui)! Saldo dompet kontributor telah ter-update.`);
                            }}
                            className="py-2 px-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
                          >
                            <Check className="w-4 h-4" /> ACC / Setujui
                          </button>

                          <button
                            onClick={() => {
                              rejectTransaction(item.id);
                              alert(`Transaksi ${item.campaignTitle} ditolak oleh Admin.`);
                            }}
                            className="py-2 px-3 bg-rose-600/80 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5"
                          >
                            <Ban className="w-3.5 h-3.5" /> Tolak
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs font-semibold text-slate-400 italic">
                          Telah di-proses Admin
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* INSPECTION MODAL FOR BUKTI TRANSFER */}
      {selectedProofItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-700 space-y-5 animate-in fade-in zoom-in duration-200 text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">Bukti Transfer Deposito / Top Up</h3>
              </div>
              <button onClick={() => setSelectedProofItem(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <p><strong>Deskripsi Transaksi:</strong> {selectedProofItem.campaignTitle}</p>
              <p><strong>Nominal Deposit:</strong> Rp {selectedProofItem.amount.toLocaleString("id-ID")}</p>
              <p><strong>Tanggal Pengajuan:</strong> {selectedProofItem.date}</p>
              <p><strong>File Terlampir:</strong> <span className="text-emerald-400 font-mono">{selectedProofItem.proofUrl}</span></p>
            </div>

            {/* Mock Image/Doc Receipt Visual Box */}
            <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xl">
                📄
              </div>
              <p className="text-xs font-bold text-white">{selectedProofItem.proofUrl}</p>
              <p className="text-[11px] text-emerald-300 font-semibold bg-emerald-950/60 py-1.5 px-3 rounded-lg inline-block border border-emerald-800/40">
                ✓ Struk Bukti Transfer Terverifikasi Asli
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedProofItem(null)}
                className="py-2.5 px-5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition"
              >
                Tutup Resi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INSPECTION MODAL FOR LEGALITAS DOKUMEN */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-700 space-y-6 animate-in fade-in zoom-in duration-200 text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">Peninjauan Dokumen Legalitas</h3>
              </div>
              <button onClick={() => setSelectedSub(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <p><strong>Nama UMKM:</strong> {selectedSub.umkmName}</p>
              <p><strong>Nama Dokumen:</strong> {selectedSub.docName}</p>
              <p><strong>Nama File:</strong> {selectedSub.fileName}</p>
              <p><strong>Tanggal Pengajuan:</strong> {selectedSub.date}</p>
              <p><strong>Catatan Pengajuan:</strong> {selectedSub.notes}</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => handleRejectDoc(selectedSub.id)}
                className="py-2.5 px-4 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5"
              >
                <XCircle className="w-4 h-4" /> Tolak Dokumen
              </button>
              <button
                onClick={() => handleApproveDoc(selectedSub.id)}
                className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" /> Setujui & Tambah Skor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
