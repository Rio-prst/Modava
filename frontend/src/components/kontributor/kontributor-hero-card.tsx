"use client";

import { useState } from "react";
import { Wallet, ArrowDownLeft, ArrowUpRight, CheckCircle2, AlertCircle, X } from "lucide-react";
import { useModava } from "@/context/modava-context";

export default function KontributorHeroCard() {
  const { walletBalance, totalContributionAmount, contributions, depositWallet, withdrawWallet } = useModava();

  // Modals state
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  // Form states
  const [depositAmount, setDepositAmount] = useState<number>(500000);
  const [depositMethod, setDepositMethod] = useState<string>("Virtual Account BCA");
  const [depositProofName, setDepositProofName] = useState<string>("Bukti_Transfer_Struk.pdf");

  const [withdrawAmount, setWithdrawAmount] = useState<number>(200000);
  const [withdrawBank, setWithdrawBank] = useState<string>("BCA");
  const [withdrawAccountNum, setWithdrawAccountNum] = useState<string>("8830192841");
  const [withdrawAccountName, setWithdrawAccountName] = useState<string>("Budi Santoso");

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const uniqueUmkmCount = new Set(contributions.map((c) => c.campaignId)).size;

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (depositAmount <= 0) return;
    depositWallet(depositAmount, depositMethod, depositProofName);
    setShowDepositModal(false);
    triggerToast(`Pengajuan Top Up Rp ${depositAmount.toLocaleString("id-ID")} diajukan! Menunggu ACC Admin Portal.`);
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmount <= 0) return;
    if (withdrawAmount > walletBalance) {
      alert("Saldo tidak mencukupi untuk melakukan penarikan ini.");
      return;
    }
    const success = withdrawWallet(withdrawAmount, withdrawBank, withdrawAccountNum);
    if (success) {
      setShowWithdrawModal(false);
      triggerToast(`Pengajuan Penarikan Rp ${withdrawAmount.toLocaleString("id-ID")} diajukan! Menunggu ACC Admin Portal.`);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#052530] text-white px-5 py-3 rounded-2xl shadow-xl border border-emerald-500/40 flex items-center gap-3 text-xs font-bold animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="bg-[#052530] rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold border border-emerald-500/30">
              <Wallet className="w-3.5 h-3.5" /> Dompet Digital Kontributor
            </div>
            <h2 className="text-3xl font-black tracking-tight pt-1">
              Rp {walletBalance.toLocaleString("id-ID")}
            </h2>
            <p className="text-xs text-slate-300">Saldo aktif tersedia untuk kontribusi crowdfunding</p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setShowDepositModal(true)}
              className="py-3 px-5 bg-[#13634E] hover:bg-[#0e4b3b] text-white font-bold text-xs rounded-2xl shadow-lg transition flex items-center gap-2 border border-emerald-400/30"
            >
              <ArrowDownLeft className="w-4 h-4" /> Top Up Saldo
            </button>

            <button
              onClick={() => setShowWithdrawModal(true)}
              className="py-3 px-5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-2xl transition flex items-center gap-2 border border-white/15 backdrop-blur-md"
            >
              <ArrowUpRight className="w-4 h-4" /> Tarik Dana
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-1">
            <span className="text-slate-400 block text-[11px]">Total Kontribusi Aktif</span>
            <span className="text-lg font-bold text-emerald-300 block">
              Rp {totalContributionAmount.toLocaleString("id-ID")}
            </span>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-1">
            <span className="text-slate-400 block text-[11px]">UMKM Didukung</span>
            <span className="text-lg font-bold text-white block">
              {uniqueUmkmCount} Usaha Lokal
            </span>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-1">
            <span className="text-slate-400 block text-[11px]">Estimasi Bagi Hasil / th</span>
            <span className="text-lg font-bold text-amber-300 block">
              12.5% p.a.
            </span>
          </div>
        </div>
      </div>

      {/* DEPOSIT MODAL */}
      {showDepositModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#13634E] flex items-center justify-center font-bold">
                  <ArrowDownLeft className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-[#0A2328]">Top Up Saldo Deposito</h3>
              </div>
              <button
                onClick={() => setShowDepositModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDepositSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Pilih Nominal Top Up</label>
                <div className="grid grid-cols-3 gap-2">
                  {[100000, 500000, 1000000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setDepositAmount(amt)}
                      className={`py-2 text-xs font-bold rounded-xl border transition ${
                        depositAmount === amt
                          ? "bg-[#13634E] text-white border-[#13634E]"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      Rp {(amt / 1000).toFixed(0)}rb
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Nominal Kustom (Rp)</label>
                <input
                  type="text"
                  required
                  value={depositAmount.toLocaleString("id-ID")}
                  onChange={(e) => setDepositAmount(Number(e.target.value.replace(/\D/g, "")) || 0)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm font-bold text-[#0A2328] focus:ring-2 focus:ring-[#13634E]/30 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Metode Pembayaran</label>
                <select
                  value={depositMethod}
                  onChange={(e) => setDepositMethod(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs font-semibold text-gray-800 focus:ring-2 focus:ring-[#13634E]/30 focus:outline-none bg-white"
                >
                  <option value="Virtual Account BCA">Virtual Account BCA</option>
                  <option value="Virtual Account Mandiri">Virtual Account Mandiri</option>
                  <option value="Virtual Account BRI">Virtual Account BRI</option>
                  <option value="QRIS / Instant E-Wallet">QRIS / Instant E-Wallet (GoPay/OVO)</option>
                  <option value="Transfer Bank Manual">Transfer Bank Manual</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Unggah Bukti Transfer / Resi Pembayaran</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setDepositProofName(file.name);
                    }
                  }}
                  className="w-full text-xs text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-[#13634E] hover:file:bg-emerald-100 cursor-pointer"
                />
                <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Terlampir: {depositProofName}
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#13634E] hover:bg-[#0e4b3b] text-white text-xs font-bold transition shadow-md"
              >
                Konfirmasi & Ajukan Top Up Saldo
              </button>
            </form>
          </div>
        </div>
      )}

      {/* WITHDRAW MODAL */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-[#0A2328]">Penarikan Dana (Withdraw)</h3>
              </div>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleWithdrawSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Jumlah Penarikan (Rp)</label>
                <input
                  type="text"
                  required
                  value={withdrawAmount.toLocaleString("id-ID")}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value.replace(/\D/g, "")) || 0)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm font-bold text-[#0A2328] focus:ring-2 focus:ring-[#13634E]/30 focus:outline-none"
                />
                <p className="text-[11px] text-gray-500 mt-1">
                  Saldo Tersedia: <strong className="text-[#13634E]">Rp {walletBalance.toLocaleString("id-ID")}</strong>
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Bank Tujuan</label>
                <select
                  value={withdrawBank}
                  onChange={(e) => setWithdrawBank(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs font-semibold text-gray-800 focus:ring-2 focus:ring-[#13634E]/30 focus:outline-none bg-white"
                >
                  <option value="BCA">Bank BCA</option>
                  <option value="Mandiri">Bank Mandiri</option>
                  <option value="BRI">Bank BRI</option>
                  <option value="BNI">Bank BNI</option>
                  <option value="CIMB Niaga">Bank CIMB Niaga</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Nomor Rekening</label>
                <input
                  type="text"
                  required
                  value={withdrawAccountNum}
                  onChange={(e) => setWithdrawAccountNum(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs font-semibold text-[#0A2328] focus:ring-2 focus:ring-[#13634E]/30 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Nama Pemilik Rekening</label>
                <input
                  type="text"
                  required
                  value={withdrawAccountName}
                  onChange={(e) => setWithdrawAccountName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs font-semibold text-[#0A2328] focus:ring-2 focus:ring-[#13634E]/30 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-md"
              >
                Ajukan Penarikan Dana
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
