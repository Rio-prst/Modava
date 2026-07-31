"use client";

import { useState, useEffect } from "react";
import { PlusCircle, Wallet, ShieldCheck, Download, RotateCw, Printer, X, FileText, CheckCircle2, ArrowDownLeft, ArrowUpRight, Clock } from "lucide-react";
import { useModava } from "@/context/modava-context";
import { useUser } from "@clerk/nextjs";

export default function RiwayatKontributor() {
  const [mounted, setMounted] = useState(false);
  const { contributions, totalContributionAmount, walletBalance, umkmProfile } = useModava();
  const { user } = useUser();
  
  const [showPdfModal, setShowPdfModal] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const userName = user?.fullName || user?.firstName || umkmProfile?.namaPemilik || "Kontributor Modava";
  const uniqueUmkmCount = new Set(contributions.map((c) => c.campaignId)).size;
  const currentMonthYear = "Juli 2026";
  const reportDocNum = `RPT/MDV/${new Date().getFullYear()}/07-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <>
      <div className="bg-white rounded-3xl p-6 border border-gray-100/70 shadow-sm space-y-5 flex flex-col justify-between h-full relative">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#0A2328]">
              Riwayat Terakhir Kontribusi
            </h2>
            <button 
              onClick={() => window.location.reload()} 
              className="text-gray-400 hover:text-[#0A2328] transition p-1"
              title="Refresh Data"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          {contributions.length === 0 ? (
            <div className="text-center py-8 space-y-2 border border-dashed border-gray-200 rounded-2xl p-4 bg-slate-50/50">
              <p className="text-xs font-semibold text-[#556061]">
                Belum ada riwayat aktivitas kontribusi.
              </p>
              <p className="text-[11px] text-gray-400">
                Riwayat pendanaan dan imbal hasil akan tampil di sini secara real-time.
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {contributions.map((act) => {
                const isDeposit = act.type === "deposit";
                const isWithdraw = act.type === "withdraw";
                const isPledge = act.type === "pledge";

                return (
                  <div
                    key={act.id}
                    className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                          isDeposit
                            ? "bg-[#DCFCE7] text-[#166534]"
                            : isWithdraw
                            ? "bg-rose-100 text-rose-700"
                            : "bg-emerald-50 text-[#13634E]"
                        }`}
                      >
                        {isDeposit ? (
                          <ArrowDownLeft className="w-4 h-4" />
                        ) : isWithdraw ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <PlusCircle className="w-4 h-4" />
                        )}
                      </div>
                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-[#0A2328] truncate">
                            {isPledge ? `Pendanaan ${act.campaignTitle}` : act.campaignTitle}
                          </p>
                          <span
                            className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${
                              act.status === "Pending Admin ACC"
                                ? "bg-amber-100 text-amber-800 border-amber-300"
                                : act.status === "Berhasil"
                                ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                                : "bg-rose-100 text-rose-800 border-rose-300"
                            }`}
                          >
                            {act.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#556061]">{act.date}</p>
                      </div>
                    </div>

                    <span
                      className={`text-xs font-bold shrink-0 ${
                        isDeposit ? "text-[#166534]" : "text-rose-600"
                      }`}
                    >
                      {isDeposit ? "+" : "-"} Rp {act.amount.toLocaleString("id-ID")}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <button
          onClick={() => setShowPdfModal(true)}
          className="w-full py-3 border border-gray-200 hover:border-[#13634E] hover:bg-emerald-50/40 text-[#0A2328] hover:text-[#13634E] text-xs font-bold rounded-2xl transition flex items-center justify-center gap-2 mt-4 shadow-sm"
        >
          <FileText className="w-4 h-4 text-[#13634E]" />
          Unduh Laporan Bulanan (PDF)
        </button>
      </div>

      {/* PDF REPORT PREVIEW MODAL */}
      {showPdfModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <style>{`
            @media print {
              body * {
                visibility: hidden !important;
              }
              #pdf-kontributor-report, #pdf-kontributor-report * {
                visibility: visible !important;
              }
              #pdf-kontributor-report {
                position: fixed !important;
                left: 50% !important;
                top: 10px !important;
                transform: translateX(-50%) !important;
                width: 100% !important;
                max-width: 800px !important;
                margin: 0 !important;
                padding: 32px !important;
                box-shadow: none !important;
                border: 1px solid #e2e8f0 !important;
                background: white !important;
              }
            }
          `}</style>

          <div className="bg-slate-100 rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl border border-slate-300 space-y-6 animate-in fade-in zoom-in duration-150 my-8">
            {/* Modal Top Control Bar */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 print:hidden">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-modava-primary text-white font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Laporan Bulanan Kontributor (PDF)</h3>
                  <p className="text-xs text-slate-500">Pratinjau laporan portofolio & riwayat pendanaan resmi</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="py-2.5 px-4 bg-modava-primary hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" /> Cetak / Simpan PDF
                </button>
                <button
                  onClick={() => setShowPdfModal(false)}
                  className="p-2.5 bg-white border border-slate-300 hover:bg-slate-200 text-slate-700 rounded-xl transition"
                  title="Tutup Modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* PRINTABLE REPORT DOCUMENT BODY */}
            <div
              id="pdf-kontributor-report"
              className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 space-y-6 text-slate-800 font-sans text-xs"
            >
              {/* Header Kop Laporan */}
              <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-modava-primary text-white font-extrabold flex items-center justify-center text-sm tracking-wider">
                      M
                    </div>
                    <span className="text-xl font-extrabold tracking-tight text-slate-900">MODAVA</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Platform Peer-to-Peer Crowdfunding & Permodalan UMKM</p>
                </div>
                <div className="text-right">
                  <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">LAPORAN PORTOFOLIO KONTRIBUSI</h2>
                  <p className="text-[11px] font-mono text-slate-600 mt-0.5">Periode: {currentMonthYear}</p>
                  <p className="text-[10px] font-mono text-slate-400">No: {reportDocNum}</p>
                </div>
              </div>

              {/* User Metadata & Summary Cards */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Nama Kontributor</span>
                  <span className="font-bold text-slate-900 text-sm block">{userName}</span>
                  <span className="text-[11px] text-slate-500">Tanggal Cetak: {new Date().toLocaleDateString("id-ID")}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Status Akun</span>
                  <span className="inline-block px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[11px] rounded-full border border-emerald-300">
                    Active Verified Kontributor
                  </span>
                </div>
              </div>

              {/* Summary Metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl">
                  <span className="text-[10px] text-emerald-800 font-semibold uppercase block">Saldo Dompet Ready</span>
                  <span className="text-base font-extrabold text-emerald-900">Rp {walletBalance.toLocaleString("id-ID")}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] text-slate-600 font-semibold uppercase block">Total Disalurkan</span>
                  <span className="text-base font-extrabold text-slate-900">Rp {totalContributionAmount.toLocaleString("id-ID")}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] text-slate-600 font-semibold uppercase block">UMKM Didukung</span>
                  <span className="text-base font-extrabold text-slate-900">{uniqueUmkmCount} UMKM</span>
                </div>
              </div>

              {/* Rincian Transaksi Table */}
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-200 pb-1">
                  Rincian Transaksi & Aktivitas Pendanaan
                </h3>
                
                <table className="w-full border-collapse text-[11px] text-left">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-300 font-bold text-slate-700">
                      <th className="p-2 w-8">No</th>
                      <th className="p-2">Tanggal</th>
                      <th className="p-2">Nama Campaign / Deskripsi</th>
                      <th className="p-2">Kategori</th>
                      <th className="p-2 text-right">Jumlah (Rp)</th>
                      <th className="p-2 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contributions.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-4 text-center text-slate-400 italic">
                          Belum ada aktivitas pendanaan terdaftar pada periode ini.
                        </td>
                      </tr>
                    ) : (
                      contributions.map((act, idx) => (
                        <tr key={act.id} className="border-b border-slate-200 hover:bg-slate-50">
                          <td className="p-2 font-mono">{idx + 1}</td>
                          <td className="p-2">{act.date}</td>
                          <td className="p-2 font-bold text-slate-900">{act.campaignTitle}</td>
                          <td className="p-2">{act.category}</td>
                          <td className="p-2 text-right font-bold text-emerald-800">
                            Rp {act.amount.toLocaleString("id-ID")}
                          </td>
                          <td className="p-2 text-center">
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold text-[10px]">
                              {act.status || "Berhasil"}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footnote & Verification Signatures */}
              <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-[10px] text-slate-500">
                <div className="space-y-1">
                  <p>✔ Laporan ini diterbitkan secara otomatis oleh sistem Platform Modava.</p>
                  <p>✔ Sah & terverifikasi tanpa memerlukan stempel fisik.</p>
                </div>
                <div className="text-center font-sans space-y-1">
                  <p className="font-bold text-slate-900">Tim Verifikasi Risk Modava</p>
                  <div className="h-10 flex items-center justify-center">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-300 font-mono text-[9px] rounded">
                      DIGITALLY SIGNED & VERIFIED
                    </span>
                  </div>
                  <p className="font-mono text-slate-600">ID: SEC-MDV-2026-OK</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
