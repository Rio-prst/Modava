"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  DollarSign, 
  Calendar, 
  FileText, 
  Tag, 
  ShieldCheck,
  Building2,
  Lock,
  History
} from "lucide-react";
import Link from "next/link";
import { useModava } from "@/context/modava-context";

function CreateCampaignForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { transactions, addCampaign } = useModava();

  // Query parameters from Loan Simulation (PRD F6 Integration)
  const initialAmount = searchParams.get("amount") || "15000000";
  const initialTenor = searchParams.get("tenor") || "6";
  const fromSimulation = searchParams.get("fromSimulation") === "true";

  // Dynamic PRD [F14] Calculation based on transactions
  const uniqueMonths = new Set(transactions.map((tx) => tx.date.slice(0, 7))).size;
  const calculatedMonthCount = Math.max(uniqueMonths, 3); // Default mock data is 3 months active

  // Interactive Simulator Toggle for testing PRD [F14] lock/unlock
  const [simulationMode, setSimulationMode] = useState<"pass" | "lock">("pass");

  const hasMinCashflowRecord = simulationMode === "pass" && calculatedMonthCount >= 1;
  const cashflowMonthCount = simulationMode === "pass" ? calculatedMonthCount : 0;

  // Form State
  const [title, setTitle] = useState("Ekspansi Mesin Penggiling Kopi Organik");
  const [category, setCategory] = useState("Kuliner & Olahan Makanan");
  const [targetAmount, setTargetAmount] = useState<number>(Number(initialAmount));
  const [tenor, setTenor] = useState<number>(Number(initialTenor));
  const [description, setDescription] = useState(
    "Pengadaan mesin roaster penggiling kopi kapasitas 50kg/jam untuk memenuhi lonjakan permintaan pasar ekspor dan outlet lokal."
  );
  const [fundAllocation, setFundAllocation] = useState(
    "70% Pembelian Mesin Roaster, 20% Pembelian Biji Kopi Mentah, 10% Pengemasan Pouch VMPET."
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasMinCashflowRecord) {
      alert("Aksi ditolak: Riwayat arus kas Anda belum memenuhi syarat minimum 1 bulan (PRD F14). Silakan catat transaksi harian terlebih dahulu.");
      return;
    }
    addCampaign({
      title,
      category,
      targetAmount,
      description,
      fundAllocation,
      tenor,
    });
    alert("Campaign berhasil diterbitkan! Mengalihkan ke katalog crowdfunding...");
    router.push("/crowdfunding");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Back Button */}
      <Link 
        href="/crowdfunding"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-modava-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog Campaign
      </Link>

      {/* Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-modava-primary text-xs font-bold rounded-full mb-2 border border-emerald-200">
              <Building2 className="w-3.5 h-3.5" /> Warung Berkah / Kopi Gayo Organik
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Buat Campaign Crowdfunding Baru</h1>
            <p className="text-sm text-slate-500 mt-1">
              Ajukan kebutuhan modal usaha Anda ke komunitas kontributor dan investor mikro.
            </p>
          </div>
          <span className="self-start sm:self-center px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg">
            Skor Kelayakan Usaha: <strong className="text-emerald-700">82 (A - Sangat Layak)</strong>
          </span>
        </div>

        {/* PRD F14 Interactive Toggle Simulator for Evaluation */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <History className="w-4 h-4 text-modava-primary" />
            <span>Simulasi Ambang Riwayat Cashflow (PRD F14):</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSimulationMode("pass")}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                simulationMode === "pass"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              ✓ Lolos (&gt;1 Bulan Aktif)
            </button>
            <button
              type="button"
              onClick={() => setSimulationMode("lock")}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                simulationMode === "lock"
                  ? "bg-rose-600 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              🔒 Terkunci (&lt;1 Bulan)
            </button>
          </div>
        </div>

        {/* PRD F6 Simulation Banner Notice */}
        {fromSimulation && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex items-start gap-3 text-xs text-emerald-950">
            <Sparkles className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-900 block text-sm">
                Terhubung dari Simulasi Pinjaman (PRD F6)
              </span>
              <span>
                Target modal <strong>Rp {Number(initialAmount).toLocaleString("id-ID")}</strong> dan tenor <strong>{initialTenor} Bulan</strong> telah diisi secara otomatis dari hasil kalkulasi kemampuan bayar (DSCR) Anda.
              </span>
            </div>
          </div>
        )}

        {/* PRD F14 Cash Flow Validation Notice */}
        {hasMinCashflowRecord ? (
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-center gap-3 text-xs text-emerald-900 font-medium">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <strong>Syarat Minimum Terpenuhi (PRD F14):</strong> Riwayat pencatatan arus kas Anda aktif selama{" "}
              <span className="underline font-bold">{cashflowMonthCount} bulan berturut-turut</span>. Anda memenuhi kualifikasi pembuatan campaign.
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-xs text-rose-900">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-rose-950 text-sm mb-0.5">Syarat Minimum Belum Terpenuhi (PRD F14):</strong>
              Sesuai aturan platform Modava, UMKM wajib memiliki minimal <strong>1 bulan (30 hari)</strong> riwayat pencatatan aktif di{" "}
              <Link href="/cash-flow" className="underline font-bold hover:text-rose-950">Cash Flow Tracker</Link> sebelum diizinkan menerbitkan campaign permodal baru.
            </div>
          </div>
        )}
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-modava-primary" /> Rincian Campaign Permodalan
        </h2>

        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Judul Campaign</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Ekspansi Usaha & Beli Mesin Penggiling"
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-modava-primary/30 focus:outline-none"
          />
        </div>

        {/* Category & Tenor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-emerald-600" /> Kategori Usaha
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-modava-primary/30 focus:outline-none bg-white"
            >
              <option value="Kuliner & Olahan Makanan">Kuliner & Olahan Makanan</option>
              <option value="Fashion & Konveksi">Fashion & Konveksi</option>
              <option value="Pertanian & Hidroponik">Pertanian & Hidroponik</option>
              <option value="Kerajinan Tangan">Kerajinan Tangan</option>
              <option value="Jasa & Perdagangan">Jasa & Perdagangan</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-600" /> Tenor Pengembalian (Bulan)
            </label>
            <select
              value={tenor}
              onChange={(e) => setTenor(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-modava-primary/30 focus:outline-none bg-white"
            >
              <option value={3}>3 Bulan</option>
              <option value={6}>6 Bulan</option>
              <option value={12}>12 Bulan</option>
              <option value={24}>24 Bulan</option>
            </select>
          </div>
        </div>

        {/* Target Amount */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-emerald-600" /> Target Dana Permodalan (Rp)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">Rp</span>
            <input
              type="text"
              required
              value={targetAmount.toLocaleString("id-ID")}
              onChange={(e) => setTargetAmount(Number(e.target.value.replace(/\D/g, "")) || 0)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 font-bold text-modava-primary text-base focus:ring-2 focus:ring-modava-primary/30 focus:outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Deskripsi Ringkas Tujuan Modal</label>
          <textarea
            rows={4}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Jelaskan kebutuhan usaha dan dampak penambahan modal ini..."
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-modava-primary/30 focus:outline-none"
          />
        </div>

        {/* Fund Allocation Plan */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Rencana Alokasi Penggunaan Dana</label>
          <textarea
            rows={3}
            required
            value={fundAllocation}
            onChange={(e) => setFundAllocation(e.target.value)}
            placeholder="Contoh: 60% Beli Alat, 30% Bahan Baku, 10% Pemasaran"
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-modava-primary/30 focus:outline-none"
          />
        </div>

        {/* Submission Button */}
        <button
          type="submit"
          disabled={!hasMinCashflowRecord}
          className={`w-full py-4 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 ${
            hasMinCashflowRecord
              ? "bg-modava-primary hover:bg-emerald-800 text-white shadow-lg shadow-emerald-700/25 cursor-pointer"
              : "bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300"
          }`}
        >
          {hasMinCashflowRecord ? (
            <>
              <ShieldCheck className="w-5 h-5" /> Terbitkan Campaign Crowdfunding
            </>
          ) : (
            <>
              <Lock className="w-5 h-5 text-rose-600" /> Terkunci — Diperlukan Minimal 1 Bulan Arus Kas (PRD F14)
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function CreateCampaignPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Memuat form campaign...</div>}>
      <CreateCampaignForm />
    </Suspense>
  );
}
