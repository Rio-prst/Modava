"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  Users, 
  CheckCircle2, 
  Award, 
  Share2, 
  Heart, 
  Building2, 
  MapPin, 
  X,
  CreditCard,
  QrCode
} from "lucide-react";

export default function CampaignDetailPage() {
  const [activeTab, setActiveTab] = useState<"detail" | "laporan">("detail");
  const [isPledgeModalOpen, setIsPledgeModalOpen] = useState(false);
  const [pledgeAmount, setPledgeAmount] = useState<number>(100000);
  const [paymentMethod, setPaymentMethod] = useState<"qris" | "va">("qris");
  const [pledgeSuccess, setPledgeSuccess] = useState(false);

  // Mock Campaign Data
  const campaign = {
    id: "c-1",
    title: "Pengadaan Mesin Penggiling & Kemasan Kopi Organik",
    umkmName: "Kopi Gayo Organik - Pak Budi",
    location: "Takengon, Aceh Tengah",
    category: "Kuliner & Olahan Makanan",
    verified: true,
    score: 82, // Skor kelayakan 82 (A - Sangat Layak)
    scoreTier: "A (Sangat Layak)",
    target: 15000000,
    collected: 12750000,
    donorCount: 34,
    daysLeft: 12,
    tenor: 6,
    returnRate: "8.5% p.a.",
    description: `Usaha Kopi Gayo Organik kami telah berdiri sejak 2021 dan telah mengantongi sertifikat NIB, NPWP, serta Sertifikat Halal MUI. Untuk memenuhi peningkatan pesanan ekspor dari kafe mitra di Medan dan Jakarta, kami membutuhkan tambahan modal usaha guna membeli mesin roaster penggiling skala medium kapasitas 50kg/jam.`,
    allocation: [
      { item: "Mesin Roaster Penggiling 50kg/jam", pct: "70%", val: "Rp 10.500.000" },
      { item: "Stok Biji Kopi Mentah Grade-A", pct: "20%", val: "Rp 3.000.000" },
      { item: "Kemasan Aluminium Pouch Eco-VMPET", pct: "10%", val: "Rp 1.500.000" },
    ],
    progressReports: [
      {
        date: "20 Juli 2026",
        title: "DP Pembelian Mesin Roaster Telah Disetorkan",
        desc: "Tim kami telah membayar uang muka (DP) sebesar 30% ke distributor alat kopi di Medan. Pengiriman diperkirakan minggu depan.",
        author: "Pak Budi (Pemilik)",
      },
      {
        date: "10 Juli 2026",
        title: "Campaign Resmi Terbit & Capai 50% Target Dalam 3 Hari",
        desc: "Terima kasih kepada para kontributor komunitas Modava! 15 kontributor pertama telah menyalurkan dukungannya.",
        author: "Pak Budi (Pemilik)",
      },
    ]
  };

  const progressPct = Math.min(Math.round((campaign.collected / campaign.target) * 100), 100);

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPledgeSuccess(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Navigation & Header */}
      <div className="flex items-center justify-between">
        <Link 
          href="/crowdfunding"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-modava-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog Campaign
        </Link>
        <div className="flex gap-2">
          <button className="p-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-rose-500 transition-colors">
            <Heart className="w-4 h-4 fill-rose-500" />
          </button>
        </div>
      </div>

      {/* Main Grid: Left Details, Right Funding Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image, Details, Score & Tabs */}
        <div className="lg:col-span-8 space-y-6">
          {/* Gallery Header Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-900 group">
            <img 
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop"
              alt={campaign.title}
              className="w-full h-72 sm:h-96 object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 sm:p-8 flex flex-col justify-end text-white">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-emerald-500/90 backdrop-blur-md rounded-full text-xs font-bold text-white flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Terverifikasi Modava
                </span>
                <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-medium text-emerald-200">
                  {campaign.category}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                {campaign.title}
              </h1>
              <div className="flex items-center gap-4 text-xs text-slate-300 mt-2">
                <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5 text-emerald-400" /> {campaign.umkmName}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-emerald-400" /> {campaign.location}</span>
              </div>
            </div>
          </div>

          {/* Skor Kelayakan UMKM Card */}
          <div className="bg-gradient-to-br from-emerald-950 via-modava-primary-dark to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6 border border-emerald-800/40">
            <div className="flex items-center justify-between border-b border-emerald-800/50 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 font-extrabold text-lg">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Skor Kelayakan Keuangan UMKM</h3>
                  <p className="text-xs text-emerald-200/80">Kombinasi data arus kas riil + verifikasi legalitas</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-emerald-300">{campaign.score}</span>
                <span className="text-xs block font-bold text-emerald-100">{campaign.scoreTier}</span>
              </div>
            </div>

            {/* Score Component Breakdown */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-emerald-300 block font-bold">90%</span>
                <span className="text-slate-300 text-[11px]">Konsistensi Kas</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-emerald-300 block font-bold">100%</span>
                <span className="text-slate-300 text-[11px]">Status Legalitas</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-emerald-300 block font-bold">75%</span>
                <span className="text-slate-300 text-[11px]">Riwayat Platform</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex border-b border-slate-200 gap-6">
              <button
                onClick={() => setActiveTab("detail")}
                className={`pb-3 text-sm font-bold transition-colors border-b-2 ${
                  activeTab === "detail"
                    ? "border-modava-primary text-modava-primary"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                Rincian & Alokasi Modal
              </button>
              <button
                onClick={() => setActiveTab("laporan")}
                className={`pb-3 text-sm font-bold transition-colors border-b-2 flex items-center gap-2 ${
                  activeTab === "laporan"
                    ? "border-modava-primary text-modava-primary"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <span>Laporan Progres Penggunaan</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-extrabold">
                  {campaign.progressReports.length}
                </span>
              </button>
            </div>

            {/* Tab 1: Description & Allocation */}
            {activeTab === "detail" && (
              <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
                <div>
                  <h4 className="font-bold text-slate-900 mb-2 text-base">Tentang Campaign Ini</h4>
                  <p>{campaign.description}</p>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="font-bold text-slate-900 text-base">Rencana Alokasi Penggunaan Dana</h4>
                  <div className="space-y-2">
                    {campaign.allocation.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-medium text-slate-800">{item.item}</span>
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-bold text-xs">{item.pct}</span>
                          <span className="font-bold text-slate-900">{item.val}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Progress Reports */}
            {activeTab === "laporan" && (
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 text-base">Laporan Penggunaan Dana dari UMKM</h4>
                <div className="space-y-4 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                  {campaign.progressReports.map((report, idx) => (
                    <div key={idx} className="relative pl-10 space-y-1">
                      <div className="absolute left-2 top-1.5 w-4 h-4 rounded-full bg-modava-primary border-4 border-white shadow" />
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className="font-bold text-emerald-700">{report.author}</span>
                          <span>{report.date}</span>
                        </div>
                        <h5 className="font-bold text-slate-900 text-sm">{report.title}</h5>
                        <p className="text-xs text-slate-600 leading-relaxed">{report.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Funding Card Sidebar */}
        <div className="lg:col-span-4 space-y-6 sticky top-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
            {/* Target & Progress Metric */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-2xl sm:text-3xl font-extrabold text-modava-primary">
                  Rp {campaign.collected.toLocaleString("id-ID")}
                </span>
                <span className="text-xs font-extrabold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                  {progressPct}% Terkumpul
                </span>
              </div>
              <p className="text-xs text-slate-500">
                dari target <strong>Rp {campaign.target.toLocaleString("id-ID")}</strong>
              </p>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-modava-primary to-emerald-400 rounded-full transition-all duration-700" 
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              {/* Stat Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">{campaign.donorCount}</span>
                    <span className="text-slate-500 text-[10px]">Kontributor</span>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">{campaign.daysLeft} Hari</span>
                    <span className="text-slate-500 text-[10px]">Sisa Waktu</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Campaign Summary Metrics */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200/70 rounded-2xl text-xs space-y-2">
              <div className="flex justify-between text-slate-700">
                <span>Tenor Pengembalian:</span>
                <strong className="text-slate-900">{campaign.tenor} Bulan</strong>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Estimasi Bagi Hasil:</span>
                <strong className="text-emerald-700">{campaign.returnRate}</strong>
              </div>
            </div>

            {/* Action Pledge Button */}
            <button
              onClick={() => {
                setPledgeSuccess(false);
                setIsPledgeModalOpen(true);
              }}
              className="w-full py-4 bg-modava-primary hover:bg-emerald-800 text-white rounded-2xl font-bold text-base shadow-lg shadow-emerald-700/25 transition-all flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5 fill-white" /> Beri Kontribusi Modal
            </button>
            <p className="text-[11px] text-center text-slate-400">
              🔒 Transaksi aman & disimulasikan sesuai regulasi platform Modava.
            </p>
          </div>
        </div>
      </div>

      {/* Pledge Modal */}
      {isPledgeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative space-y-6">
            <button
              onClick={() => setIsPledgeModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {!pledgeSuccess ? (
              <form onSubmit={handlePledgeSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Beri Kontribusi Modal</h3>
                  <p className="text-xs text-slate-500 mt-1">Dukung pengadaan mesin kopi UMKM Pak Budi</p>
                </div>

                {/* Preset Amounts */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Pilih Nominal Dukungan</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[50000, 100000, 500000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setPledgeAmount(amt)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          pledgeAmount === amt
                            ? "bg-modava-primary text-white border-modava-primary"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        Rp {(amt / 1000).toFixed(0)}k
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Atau Masukkan Nominal Lain (Rp)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">Rp</span>
                    <input
                      type="text"
                      value={pledgeAmount.toLocaleString("id-ID")}
                      onChange={(e) => setPledgeAmount(Number(e.target.value.replace(/\D/g, "")) || 0)}
                      className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-modava-primary/30 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Metode Pembayaran (Simulasi)</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("qris")}
                      className={`p-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all ${
                        paymentMethod === "qris"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                          : "bg-slate-50 text-slate-600 border-slate-200"
                      }`}
                    >
                      <QrCode className="w-4 h-4 text-emerald-600" /> QRIS Instant
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("va")}
                      className={`p-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all ${
                        paymentMethod === "va"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                          : "bg-slate-50 text-slate-600 border-slate-200"
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-emerald-600" /> Virtual Account
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-modava-primary hover:bg-emerald-800 text-white font-bold rounded-2xl text-sm shadow-md shadow-emerald-700/20"
                >
                  Konfirmasi Kontribusi Rp {pledgeAmount.toLocaleString("id-ID")}
                </button>
              </form>
            ) : (
              /* Success State */
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">Kontribusi Berhasil!</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                  Terima kasih atas penyaluran modal Rp <strong>{pledgeAmount.toLocaleString("id-ID")}</strong> untuk {campaign.umkmName}.
                </p>
                <button
                  onClick={() => setIsPledgeModalOpen(false)}
                  className="w-full py-3 bg-modava-primary text-white rounded-2xl font-bold text-sm"
                >
                  Tutup
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
