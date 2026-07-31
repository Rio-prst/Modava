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
    depositWallet(depositAmount, depositMethod);
    setShowDepositModal(false);
    triggerToast(`Berhasil Top Up Deposito Rp ${depositAmount.toLocaleString("id-ID")} via ${depositMethod}!`);
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
      triggerToast(`Penarikan dana Rp ${withdrawAmount.toLocaleString("id-ID")} ke ${withdrawBank} (${withdrawAccountNum}) berhasil diproses!`);
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

      {/* Main Hero Card */}
      <div className="relative overflow-hidden bg-[#052530] text-white rounded-3xl p-6 md:p-8 shadow-md border border-slate-800 space-y-6">
        {/* Background graphic circle overlays */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/5 rounded-full blur-xl pointer-events-none" />
        <div className="absolute right-12 -top-12 w-48 h-48 bg-[#86E3CE]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left: Balances */}
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#86E3CE]">
                <Wallet className="w-4 h-4" />
              </div>
              <span>Saldo Dompet & Portofolio Kontributor</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Card 1: Saldo Tersedia (Deposit) */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-1">
                <span className="text-[11px] font-semibold text-slate-300">Saldo Dompet Ready</span>
                <p className="text-2xl md:text-3xl font-bold tracking-tight text-emerald-300">
                  Rp {walletBalance.toLocaleString("id-ID")}
                </p>
                <span className="text-[10px] text-slate-300 block">Siap digunakan untuk pendanaan</span>
              </div>

              {/* Card 2: Total Kontribusi */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-1">
                <span className="text-[11px] font-semibold text-slate-300">Total Kontribusi Disalurkan</span>
                <p className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                  Rp {totalContributionAmount.toLocaleString("id-ID")}
                </p>
                <span className="text-[10px] text-slate-300 block">Tersebar di {uniqueUmkmCount} UMKM</span>
              </div>
            </div>
          </div>

          {/* Right: Action Buttons (Deposit & Withdraw) */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 justify-center shrink-0">
            <button
              onClick={() => setShowDepositModal(true)}
              className="inline-flex items-center justify-center gap-2 bg-[#13634E] hover:bg-[#0e4b3b] text-white px-5 py-3 rounded-2xl text-xs font-bold transition shadow-md shadow-emerald-900/40 border border-emerald-400/30"
            >
              <ArrowDownLeft className="w-4 h-4 text-emerald-300" />
              Isi Saldo (Deposito)
            </button>

            <button
              onClick={() => setShowWithdrawModal(true)}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-2xl text-xs font-bold transition border border-white/20"
            >
              <ArrowUpRight className="w-4 h-4 text-amber-300" />
              Tarik Dana (Withdraw)
            </button>
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

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#13634E] hover:bg-[#0e4b3b] text-white text-xs font-bold transition shadow-md"
              >
                Konfirmasi Top Up Saldo
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

            <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 flex items-center justify-between text-xs">
              <span className="text-emerald-800 font-semibold">Saldo Dompet Tersedia:</span>
              <strong className="text-emerald-900 font-bold text-sm">Rp {walletBalance.toLocaleString("id-ID")}</strong>
            </div>

            <form onSubmit={handleWithdrawSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Nominal Penarikan (Rp)</label>
                <input
                  type="text"
                  required
                  value={withdrawAmount.toLocaleString("id-ID")}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value.replace(/\D/g, "")) || 0)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm font-bold text-[#0A2328] focus:ring-2 focus:ring-[#13634E]/30 focus:outline-none"
                />
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

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Nomor Rekening</label>
                  <input
                    type="text"
                    required
                    value={withdrawAccountNum}
                    onChange={(e) => setWithdrawAccountNum(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800 focus:ring-2 focus:ring-[#13634E]/30 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Nama Pemilik Rekening</label>
                  <input
                    type="text"
                    required
                    value={withdrawAccountName}
                    onChange={(e) => setWithdrawAccountName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800 focus:ring-2 focus:ring-[#13634E]/30 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={withdrawAmount > walletBalance || walletBalance === 0}
                className={`w-full py-3.5 rounded-2xl text-xs font-bold transition shadow-md ${
                  withdrawAmount <= walletBalance && walletBalance > 0
                    ? "bg-[#052530] hover:bg-[#031820] text-white cursor-pointer"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300"
                }`}
              >
                {withdrawAmount > walletBalance
                  ? "Saldo Tidak Mencukupi"
                  : "Konfirmasi Penarikan Dana"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
