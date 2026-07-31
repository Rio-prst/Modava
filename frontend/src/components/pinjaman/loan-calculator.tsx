"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Calculator, 
  TrendingUp, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  Percent, 
  Calendar, 
  Wallet,
  Sparkles
} from "lucide-react";

export function LoanCalculator() {
  const router = useRouter();
  
  // Simulation States
  const [loanAmount, setLoanAmount] = useState<number>(15000000);
  const [tenorMonths, setTenorMonths] = useState<number>(6);
  const interestRateYearly = 6.5; // 6.5% p.a.
  
  // Data Cashflow UMKM (Simulasi dari cash-flow tracker)
  const monthlyNetProfit = 5200000; // Rp 5.200.000 / bulan

  // Calculations
  const monthlyInterestRate = interestRateYearly / 100 / 12;
  // Cicilan per bulan (metode anuitas sederhana)
  const monthlyInstallment = Math.round(
    (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenorMonths)) /
    (Math.pow(1 + monthlyInterestRate, tenorMonths) - 1)
  ) || Math.round((loanAmount + (loanAmount * (interestRateYearly / 100) * (tenorMonths / 12))) / tenorMonths);

  const totalReturn = monthlyInstallment * tenorMonths;
  const totalInterest = totalReturn - loanAmount;

  // Debt Service Coverage Ratio (DSCR) = Laba Bersih / Cicilan Bulanan
  const dscrRatio = (monthlyNetProfit / monthlyInstallment).toFixed(2);
  const dscrNumber = parseFloat(dscrRatio);

  let dscrStatus = {
    badge: "SANGAT AMAN",
    color: "bg-emerald-100 text-emerald-800 border-emerald-300",
    icon: ShieldCheck,
    desc: "Kemampuan bayar usaha Anda sangat kuat. Risiko gagal bayar amat rendah.",
  };

  if (dscrNumber < 1.0) {
    dscrStatus = {
      badge: "BERISIKO TINGGI",
      color: "bg-rose-100 text-rose-800 border-rose-300",
      icon: AlertCircle,
      desc: "Cicilan melebihi estimasi laba bersih bulanan. Disarankan kurangi nominal atau perpanjang tenor.",
    };
  } else if (dscrNumber < 1.4) {
    dscrStatus = {
      badge: "CUKUP / PERLU PERHATIAN",
      color: "bg-amber-100 text-amber-800 border-amber-300",
      icon: AlertCircle,
      desc: "Cicilan menyerap sebagian besar laba bersih. Cek beban pengeluaran rutin Anda.",
    };
  } else if (dscrNumber < 2.0) {
    dscrStatus = {
      badge: "AMAN",
      color: "bg-teal-100 text-teal-800 border-teal-300",
      icon: CheckCircle2,
      desc: "Usaha Anda memiliki kapasitas modal memadai untuk menutup angsuran bulanan.",
    };
  }

  // Pre-fill campaign CTA (PRD F6 Integration)
  const handleApplyCampaign = () => {
    const query = new URLSearchParams({
      amount: loanAmount.toString(),
      tenor: tenorMonths.toString(),
      installment: monthlyInstallment.toString(),
      fromSimulation: "true",
    }).toString();
    router.push(`/crowdfunding/buat?${query}`);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-modava-primary-dark via-[#134D3B] to-modava-primary rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3 max-w-2xl">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Simulasi Pinjaman & Analisis Kemampuan Bayar
          </h1>
          <p className="text-emerald-100/90 text-sm leading-relaxed">
            Hitung estimasi cicilan bulanan dan rasio kelayakan (DSCR) berdasarkan riwayat laba bersih dari **Cash Flow Tracker**. Hasil simulasi dapat langsung diajukan menjadi campaign crowdfunding.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Calculator Controls */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-modava-primary flex items-center justify-center font-bold">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-lg">Parameter Pinjaman</h2>
                <p className="text-xs text-slate-500">Sesuaikan kebutuhan modal usaha Anda</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600">
              Bunga ringan 6.5% p.a.
            </span>
          </div>

          {/* Amount Slider & Input */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-600" /> Nominal Pengajuan Modal
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">Rp</span>
                <input
                  type="text"
                  value={loanAmount.toLocaleString("id-ID")}
                  onChange={(e) => {
                    const val = parseInt(e.target.value.replace(/\D/g, "")) || 0;
                    setLoanAmount(Math.min(Math.max(val, 1000000), 100000000));
                  }}
                  className="pl-9 pr-3 py-1.5 w-40 text-right font-bold text-modava-primary border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-modava-primary/30"
                />
              </div>
            </div>
            <input
              type="range"
              min={2000000}
              max={50000000}
              step={1000000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-modava-primary"
            />
            <div className="flex justify-between text-xs text-slate-400 font-medium">
              <span>Rp 2 Juta</span>
              <span>Rp 25 Juta</span>
              <span>Rp 50 Juta</span>
            </div>
          </div>

          {/* Tenor Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" /> Jangka Waktu (Tenor)
            </label>
            <div className="grid grid-cols-4 gap-3">
              {[3, 6, 12, 24].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTenorMonths(t)}
                  className={`py-3 px-2 rounded-2xl text-xs sm:text-sm font-bold transition-all flex flex-col items-center justify-center gap-0.5 border ${
                    tenorMonths === t
                      ? "bg-modava-primary text-white border-modava-primary shadow-md shadow-emerald-700/20"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <span>{t} Bulan</span>
                  <span className={`text-[10px] font-normal ${tenorMonths === t ? "text-emerald-100" : "text-slate-400"}`}>
                    {(t / 12).toFixed(t % 12 === 0 ? 0 : 1)} Tahun
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate */}
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-emerald-600" />
              <span>Estimasi Margin / Bunga Kompetitif</span>
            </div>
            <span className="font-bold text-slate-900 text-sm">{interestRateYearly}% p.a. (Anuitas)</span>
          </div>

          {/* Cashflow Data Reference Alert */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-950 space-y-1">
              <p className="font-bold">Data Acuan Laba Bersih Usaha Anda:</p>
              <p>
                Berdasarkan pencatatan <strong>Cash Flow Tracker</strong> bulan ini, laba bersih Anda adalah{" "}
                <span className="font-bold text-emerald-800">Rp {monthlyNetProfit.toLocaleString("id-ID")}</span>/bulan.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Simulation Result & Capacity Analysis */}
        <div className="lg:col-span-5 space-y-6">
          {/* Result Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Hasil Kalkulasi</h3>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Simulasi Kebutuhan Modal
              </span>
            </div>

            {/* Main Installment Metric */}
            <div className="bg-gradient-to-br from-slate-900 to-modava-primary-dark p-6 rounded-2xl text-white space-y-2">
              <p className="text-xs text-emerald-300 font-medium">Estimasi Cicilan per Bulan</p>
              <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Rp {monthlyInstallment.toLocaleString("id-ID")}
              </p>
              <div className="pt-2 flex justify-between text-xs text-slate-300 border-t border-white/10">
                <span>Total Pinjaman: Rp {loanAmount.toLocaleString("id-ID")}</span>
                <span>Tenor: {tenorMonths} Bulan</span>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 block">Total Pengembalian</span>
                <span className="font-bold text-slate-900 text-sm">Rp {totalReturn.toLocaleString("id-ID")}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 block">Total Estimasi Bunga</span>
                <span className="font-bold text-slate-900 text-sm">Rp {totalInterest.toLocaleString("id-ID")}</span>
              </div>
            </div>

            {/* DSCR Capacity Status */}
            <div className={`p-4 rounded-2xl border ${dscrStatus.color} space-y-2`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <dscrStatus.icon className="w-5 h-5 shrink-0" />
                  <span className="font-bold text-xs uppercase tracking-wider">Rasio DSCR: {dscrRatio}x</span>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white/70">
                  {dscrStatus.badge}
                </span>
              </div>
              <p className="text-xs leading-relaxed opacity-90">{dscrStatus.desc}</p>
            </div>

            {/* CTA Button: Integrated Campaign PRD [F6] */}
            <button
              type="button"
              onClick={handleApplyCampaign}
              className="w-full py-4 px-6 bg-modava-primary hover:bg-emerald-800 text-white rounded-2xl font-bold text-sm shadow-lg shadow-emerald-700/25 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Ajukan Modal dari Hasil Simulasi Ini</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[11px] text-center text-slate-400">
              *Nominal Rp {loanAmount.toLocaleString("id-ID")} & Tenor {tenorMonths} bulan akan otomatis di-filled ke form Campaign Crowdfunding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
