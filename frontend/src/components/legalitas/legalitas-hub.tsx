"use client";

import { useState } from "react";
import { 
  ShieldCheck, 
  Upload, 
  FileText, 
  Calculator, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ExternalLink,
  Printer
} from "lucide-react";

export function LegalitasHub() {
  const [activeTab, setActiveTab] = useState<"status" | "panduan" | "pajak" | "surat">("status");

  // State Documents (PRD F8 Upload & Status Verification)
  const [documents, setDocuments] = useState([
    { id: "nib", name: "Nomor Induk Berusaha (NIB)", status: "verified", date: "12 Mei 2026", file: "NIB_WarungBerkah_2026.pdf" },
    { id: "npwp", name: "NPWP Usaha / Perorangan", status: "verified", date: "15 Mei 2026", file: "NPWP_SriRaharju.pdf" },
    { id: "halal", name: "Sertifikat Halal MUI / BPJPH", status: "pending", date: "22 Juli 2026", file: "Pengajuan_Sertifikat_Halal.pdf" },
    { id: "pirt", name: "Izin P-IRT (Pangan Industri Rumah Tangga)", status: "none", date: "-", file: null },
    { id: "tdp", name: "Tanda Daftar Perusahaan (TDP)", status: "none", date: "-", file: null },
  ]);

  // Tax Calculator State (PRD F10)
  const [monthlyTurnover, setMonthlyTurnover] = useState<number>(25000000);
  const pphRate = 0.005; // 0.5% PPh Final UMKM PP 55/2022
  const yearlyTurnover = monthlyTurnover * 12;
  // Bebas pajak UMKM perorangan omzet < 500 jt per tahun (UU HPP)
  const isTaxExempt = yearlyTurnover <= 500000000;
  const monthlyTaxDue = isTaxExempt ? 0 : Math.round(monthlyTurnover * pphRate);
  const yearlyTaxDue = isTaxExempt ? 0 : Math.round(yearlyTurnover * pphRate);

  // Template Surat Generator State (PRD F11)
  const [suratData, setSuratData] = useState({
    namaPemilik: "Sri Rahayu",
    nik: "3273015509820003",
    namaUsaha: "Warung Berkah Sembako & Katering",
    jenisUsaha: "Perdagangan Sembako & Jasa Katering",
    alamatUsaha: "Jl. Merdeka No. 45, Bandung",
    tahunBerdiri: "2021",
    tujuanSurat: "Persyaratan Pengajuan Modal Crowdfunding Modava",
  });
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  // Calculate Verification Progress (PRD F12)
  const verifiedCount = documents.filter((d) => d.status === "verified").length;
  const progressPct = Math.round((verifiedCount / documents.length) * 100);

  const handleFileUpload = (docId: string, fileName: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === docId
          ? { ...doc, status: "pending", date: "Hari Ini", file: fileName }
          : doc
      )
    );
    alert(`Dokumen ${fileName} berhasil diunggah! Status berubah menjadi "Menunggu Verifikasi Admin".`);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-modava-primary-dark via-[#114534] to-modava-primary rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-400/20 text-emerald-200 text-xs font-bold rounded-full border border-emerald-400/30 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Modul Legalitas PRD [F8, F9, F10, F11]
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Pusat Legalitas & Administrasi UMKM
            </h1>
            <p className="text-emerald-100/90 text-sm mt-1 max-w-2xl">
              Urus verifikasi dokumen usaha, ikuti panduan perizinan, hitung Pajak PPh Final 0.5%, dan generate Surat Keterangan Usaha (PDF).
            </p>
          </div>
          {/* Progress Legalitas Badge */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center shrink-0 min-w-[160px]">
            <span className="text-xs text-emerald-200 font-semibold block">Kelengkapan Legalitas</span>
            <span className="text-3xl font-extrabold text-emerald-300">{progressPct}%</span>
            <span className="text-[11px] text-slate-300 block">{verifiedCount} dari {documents.length} Terverifikasi</span>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="bg-white rounded-3xl p-3 border border-slate-200/80 shadow-sm flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab("status")}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            activeTab === "status"
              ? "bg-modava-primary text-white shadow-md shadow-emerald-700/20"
              : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> Status & Upload Dokumen
        </button>
        <button
          onClick={() => setActiveTab("panduan")}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            activeTab === "panduan"
              ? "bg-modava-primary text-white shadow-md shadow-emerald-700/20"
              : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          <BookOpen className="w-4 h-4" /> Panduan Perizinan
        </button>
        <button
          onClick={() => setActiveTab("pajak")}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            activeTab === "pajak"
              ? "bg-modava-primary text-white shadow-md shadow-emerald-700/20"
              : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          <Calculator className="w-4 h-4" /> Kalkulator Pajak 0.5%
        </button>
        <button
          onClick={() => setActiveTab("surat")}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            activeTab === "surat"
              ? "bg-modava-primary text-white shadow-md shadow-emerald-700/20"
              : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          <FileText className="w-4 h-4" /> Generator Surat PDF
        </button>
      </div>

      {/* TAB 1: Document Upload & Verification Status (PRD F8 & F12) */}
      {activeTab === "status" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="font-bold text-slate-900 text-lg">Daftar Dokumen Legalitas Usaha</h2>
                <p className="text-xs text-slate-500">
                  Dokumen yang diunggah akan diverifikasi secara manual oleh <strong>Admin Platform Modava</strong> sebelum menambah bobot Skor Kelayakan Usaha.
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                Bobot Skor Legalitas: 30%
              </span>
            </div>

            {/* Documents List */}
            <div className="space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:bg-white hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-3 rounded-xl bg-white border border-slate-200 text-modava-primary shadow-sm shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{doc.name}</h3>
                      {doc.file ? (
                        <p className="text-xs text-emerald-700 font-medium mt-0.5 flex items-center gap-1">
                          📄 {doc.file} ({doc.date})
                        </p>
                      ) : (
                        <p className="text-xs text-slate-400 mt-0.5">Belum ada dokumen yang diunggah</p>
                      )}
                    </div>
                  </div>

                  {/* Status Badge & Upload Actions */}
                  <div className="flex items-center gap-3">
                    {doc.status === "verified" && (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-xs font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Terverifikasi Admin
                      </span>
                    )}

                    {doc.status === "pending" && (
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 border border-amber-300 rounded-full text-xs font-bold flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-amber-600 animate-spin" /> Menunggu Verifikasi
                      </span>
                    )}

                    {doc.status === "none" && (
                      <span className="px-3 py-1 bg-slate-200 text-slate-700 rounded-full text-xs font-bold flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-slate-500" /> Belum Ada
                      </span>
                    )}

                    {/* File Input */}
                    <label className="cursor-pointer py-2 px-4 bg-white border border-slate-300 hover:border-modava-primary text-slate-700 hover:text-modava-primary rounded-xl font-bold text-xs shadow-sm transition-all flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{doc.status === "none" ? "Upload PDF" : "Ganti File"}</span>
                      <input
                        type="file"
                        accept=".pdf,.png,.jpg"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileUpload(doc.id, e.target.files[0].name);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Panduan Perizinan (PRD F9) */}
      {activeTab === "panduan" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="font-bold text-slate-900 text-lg">Panduan Langkah Perizinan UMKM</h2>
            <p className="text-xs text-slate-500">
              Ikuti panduan resmi pengurusan perizinan berikut untuk mempermudah proses verifikasi usaha Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Guide Card 1: NIB OSS */}
            <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/70 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-bold text-xs">Gratis & Instant</span>
                <ExternalLink className="w-4 h-4 text-emerald-700" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">1. Nomor Induk Berusaha (NIB) via OSS</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                NIB berfungsi sebagai identitas legalitas utama pengganti TDP & IUMK. Pengurusan dilakukan secara mandiri melalui laman resmi OSS.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                <li>Siapkan NIK KTP & Email Aktif</li>
                <li>Buka portal oss.go.id lalu pilih &quot;Hak Akses UMK&quot;</li>
                <li>Isi Data KBLI (Klasifikasi Baku Lapangan Usaha)</li>
                <li>Download & Cetak Dokumen NIB Format PDF</li>
              </ul>
            </div>

            {/* Guide Card 2: Halal BPJPH */}
            <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/70 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-bold text-xs">Program SEHALAL (Self-Declare)</span>
                <ExternalLink className="w-4 h-4 text-emerald-700" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">2. Sertifikat Halal (BPJPH Kemenag)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Penting bagi usaha makanan & minuman guna meningkatkan kepercayaan kontributor dan konsumen.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                <li>Sudah memiliki NIB berbasis Risiko</li>
                <li>Bahan baku yang digunakan dipastikan 100% Halal</li>
                <li>Daftar via Sihalal (ptsp.halal.go.id)</li>
                <li>Dampingan Proses Produk Halal (PPH) gratis</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Kalkulator Pajak UMKM 0.5% (PRD F10) */}
      {activeTab === "pajak" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="font-bold text-slate-900 text-lg">Kalkulator Pajak UMKM (PPh Final Tarif 0.5%)</h2>
            <p className="text-xs text-slate-500">
              Sesuai PP No. 55 Tahun 2022 & UU HPP: Omzet perorangan sampai Rp 500 Juta/tahun <strong>BEBAS PAJAK PPh Final</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Form */}
            <div className="lg:col-span-6 space-y-4">
              <label className="text-sm font-semibold text-slate-700">Estimasi Omzet Usaha Bulanan (Rp)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">Rp</span>
                <input
                  type="text"
                  value={monthlyTurnover.toLocaleString("id-ID")}
                  onChange={(e) => setMonthlyTurnover(Number(e.target.value.replace(/\D/g, "")) || 0)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-2xl font-bold text-modava-primary text-base focus:ring-2 focus:ring-modava-primary/30 focus:outline-none"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <p><strong>Omzet Tahunan (Estimasi):</strong> Rp {yearlyTurnover.toLocaleString("id-ID")}</p>
                <p><strong>Tarif PPh Final:</strong> 0.5% dari Omzet Bruto</p>
              </div>
            </div>

            {/* Result Box */}
            <div className="lg:col-span-6">
              <div className="bg-gradient-to-br from-slate-900 to-modava-primary-dark rounded-3xl p-6 text-white space-y-4 shadow-lg">
                <h3 className="text-xs text-emerald-300 font-bold uppercase tracking-wider">Hasil Hitung PPh Final</h3>
                {isTaxExempt ? (
                  <div className="space-y-2">
                    <span className="px-3 py-1 bg-emerald-400/20 text-emerald-200 rounded-full text-xs font-bold inline-block">
                      BEBAS PAJAK (Omzet &lt; Rp 500 Juta/Tahun)
                    </span>
                    <p className="text-3xl font-extrabold text-white">Rp 0 / bulan</p>
                    <p className="text-xs text-slate-300">
                      Anda mendapat insentif PTKP UMKM UU HPP sehingga tidak dikenakan kewajiban PPh Final 0.5%.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-3xl font-extrabold text-emerald-300">
                      Rp {monthlyTaxDue.toLocaleString("id-ID")} <span className="text-xs text-slate-300 font-normal">/ bulan</span>
                    </p>
                    <p className="text-xs text-slate-300">
                      Estimasi PPh Final Setahun: <strong>Rp {yearlyTaxDue.toLocaleString("id-ID")}</strong>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Generator Template Surat PDF (PRD F11) */}
      {activeTab === "surat" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="font-bold text-slate-900 text-lg">Generator Template Surat Keterangan Usaha (SKU)</h2>
                <p className="text-xs text-slate-500">
                  Buat dokumen administrasi resmi untuk pengajuan permodal atau kelengkapan berkas bank.
                </p>
              </div>
              <button
                onClick={() => setShowPdfPreview(!showPdfPreview)}
                className="py-2.5 px-4 bg-modava-primary hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>{showPdfPreview ? "Tutup Preview" : "Preview & Cetak PDF"}</span>
              </button>
            </div>

            {/* Input Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nama Pemilik Usaha</label>
                <input
                  type="text"
                  value={suratData.namaPemilik}
                  onChange={(e) => setSuratData({ ...suratData, namaPemilik: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl font-medium focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700">NIK (Nomor Induk Kependudukan)</label>
                <input
                  type="text"
                  value={suratData.nik}
                  onChange={(e) => setSuratData({ ...suratData, nik: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl font-medium focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nama Usaha / Brand</label>
                <input
                  type="text"
                  value={suratData.namaUsaha}
                  onChange={(e) => setSuratData({ ...suratData, namaUsaha: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl font-medium focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Jenis Bidang Usaha</label>
                <input
                  type="text"
                  value={suratData.jenisUsaha}
                  onChange={(e) => setSuratData({ ...suratData, jenisUsaha: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl font-medium focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold text-slate-700">Alamat Lengkap Usaha</label>
                <input
                  type="text"
                  value={suratData.alamatUsaha}
                  onChange={(e) => setSuratData({ ...suratData, alamatUsaha: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl font-medium focus:outline-none"
                />
              </div>
            </div>

            {/* Document PDF Preview Area */}
            {showPdfPreview && (
              <div className="p-8 bg-slate-100 rounded-3xl border border-slate-300 space-y-4">
                <style>{`
                  @media print {
                    body * {
                      visibility: hidden !important;
                    }
                    #pdf-sku-document, #pdf-sku-document * {
                      visibility: visible !important;
                    }
                    #pdf-sku-document {
                      position: fixed !important;
                      left: 50% !important;
                      top: 20px !important;
                      transform: translateX(-50%) !important;
                      width: 100% !important;
                      max-width: 800px !important;
                      margin: 0 !important;
                      padding: 40px !important;
                      box-shadow: none !important;
                      border: 1px solid #000 !important;
                      background: white !important;
                    }
                  }
                `}</style>
                <div className="flex justify-end gap-2 print:hidden">
                  <button
                    onClick={() => window.print()}
                    className="py-2 px-4 bg-modava-primary hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
                  >
                    <Printer className="w-4 h-4" /> Unduh / Cetak File PDF
                  </button>
                </div>
                <div id="pdf-sku-document" className="bg-white p-8 max-w-2xl mx-auto shadow-2xl rounded-xl space-y-6 text-slate-900 font-serif text-sm border">
                  {/* Kop Surat Header */}
                  <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
                    <h3 className="font-bold text-base uppercase">SURAT KETERANGAN USAHA (SKU)</h3>
                    <p className="text-xs font-mono">Nomor: 517/SKU/MODAVA/{new Date().getFullYear()}</p>
                  </div>

                  {/* Body Text */}
                  <p className="text-justify leading-relaxed">
                    Yang bertanda tangan di bawah ini menerangkan bahwa:
                  </p>

                  <div className="pl-6 space-y-1 font-mono text-xs">
                    <p>Nama Pemilik : {suratData.namaPemilik}</p>
                    <p>NIK          : {suratData.nik}</p>
                    <p>Nama Usaha   : {suratData.namaUsaha}</p>
                    <p>Bidang Usaha : {suratData.jenisUsaha}</p>
                    <p>Alamat Usaha : {suratData.alamatUsaha}</p>
                  </div>

                  <p className="text-justify leading-relaxed">
                    Adalah benar pemilik dan pengelola aktif dari kegiatan usaha tersebut di atas yang berjalan sejak tahun {suratData.tahunBerdiri}. Surat keterangan ini dibuat untuk keperluan {suratData.tujuanSurat}.
                  </p>

                  {/* Signatures */}
                  <div className="flex justify-between pt-8 text-center text-xs">
                    <div>
                      <p>Pemilik Usaha,</p>
                      <div className="h-16" />
                      <p className="font-bold border-b border-slate-900 inline-block">{suratData.namaPemilik}</p>
                    </div>
                    <div>
                      <p>Bandung, {new Date().toLocaleDateString("id-ID")}</p>
                      <p>Mengetahui Admin Modava,</p>
                      <div className="h-16" />
                      <p className="font-bold border-b border-slate-900 inline-block">Tim Verifikasi Modava</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
