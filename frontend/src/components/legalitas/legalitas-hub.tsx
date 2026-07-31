"use client";

import { useState, useEffect } from "react";
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
  Printer,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  CheckSquare,
  Square,
  Sparkles,
  Building,
  Award
} from "lucide-react";

import { useModava } from "@/context/modava-context";

// Guideline data structure for perizinan
interface PerizinanGuide {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  portalUrl: string;
  portalName: string;
  description: string;
  requirements: string[];
  steps: { id: string; text: string }[];
  duration: string;
  cost: string;
}

const PERIZINAN_GUIDES: PerizinanGuide[] = [
  {
    id: "nib",
    title: "1. Nomor Induk Berusaha (NIB) via OSS RBA",
    badge: "Gratis & Instant (10 Menit)",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    portalUrl: "https://oss.go.id",
    portalName: "oss.go.id",
    description: "NIB berfungsi sebagai identitas legalitas utama pengganti TDP, SIUP & IUMK. Pengurusan dilakukan secara mandiri & gratis melalui sistem OSS RBA Kemeninvest/BKPM.",
    requirements: [
      "NIK KTP Pemilik Usaha",
      "Email aktif & No. WhatsApp",
      "NPWP Pribadi / Usaha (opsional)",
      "Data lokasi & Modal usaha",
      "Kode KBLI 5 Digit yang sesuai"
    ],
    steps: [
      { id: "nib-1", text: "Buka portal resmi oss.go.id lalu klik 'Daftar' pilih 'Hak Akses UMK'." },
      { id: "nib-2", text: "Lakukan verifikasi akun via link yang dikirim ke email atau OTP WhatsApp." },
      { id: "nib-3", text: "Isi data profil pemilik usaha, alamat tempat usaha, dan jumlah tenaga kerja." },
      { id: "nib-4", text: "Pilih Kode KBLI 5 Digit (misal: 47111 untuk Perdagangan Eceran Sembako)." },
      { id: "nib-5", text: "Centang Pernyataan Mandiri Kesanggupan, lalu klik 'Terbitkan NIB'." },
      { id: "nib-6", text: "Unduh file PDF NIB dan Cetak untuk diunggah ke Modava." }
    ],
    duration: "10-15 Menit",
    cost: "Rp 0 (Gratis Total)"
  },
  {
    id: "halal",
    title: "2. Sertifikat Halal Self-Declare (BPJPH Kemenag)",
    badge: "Program SEHALAL Gratis",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-300",
    portalUrl: "https://ptsp.halal.go.id",
    portalName: "ptsp.halal.go.id (Sihalal)",
    description: "Sertifikasi Halal resmi Kemenag untuk usaha makanan & minuman skala mikro/kecil. Sangat meningkatkan kepercayaan konsumen & kontributor crowdfunding.",
    requirements: [
      "Sudah memiliki NIB OSS aktif",
      "Produk tidak berisiko (bukan daging sembelihan)",
      "Bahan dipastikan 100% Halal bersertifikat",
      "Proses produksi sederhana dan higienis",
      "Surat Pernyataan Kehalalan Produk (dapat digenerate di Modava)"
    ],
    steps: [
      { id: "halal-1", text: "Login ke laman Sihalal ptsp.halal.go.id menggunakan NIB." },
      { id: "halal-2", text: "Pilih jalur pendaftaran 'Self Declare (Dampingan PPH Gratis)'." },
      { id: "halal-3", text: "Input data produk, komposisi bahan baku, dan narasi proses produksi." },
      { id: "halal-4", text: "Unggah Surat Pernyataan Kehalalan Produk (Template PDF Modava)." },
      { id: "halal-5", text: "Pilih Pendamping PPH terdekat untuk memverifikasi lokasi usaha." },
      { id: "halal-6", text: "Sidang Fatwa MUI & Penerbitan Sertifikat Halal Digital." }
    ],
    duration: "7 - 14 Hari Kerja",
    cost: "Rp 0 (Subsidi APBN/APBD)"
  },
  {
    id: "pirt",
    title: "3. Izin P-IRT Pangan Industri Rumah Tangga (BPOM)",
    badge: "Online via SPP-IRT",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    portalUrl: "https://sppirt.pom.go.id",
    portalName: "sppirt.pom.go.id",
    description: "Izin edar produk pangan olahan olahan rumahan berskala mikro/kecil dari BPOM agar produk dapat dijual secara luas di supermarket dan e-commerce.",
    requirements: [
      "NIB OSS aktif",
      "Rancangan desain label kemasan produk (memuat komposisi & tanggal kadaluarsa)",
      "Denah lokasi/ruang produksi rumahan",
      "Surat Pernyataan Komitmen P-IRT"
    ],
    steps: [
      { id: "pirt-1", text: "Login ke sistem SPP-IRT terintegrasi OSS di sppirt.pom.go.id." },
      { id: "pirt-2", text: "Input data jenis pangan, komposisi, jenis kemasan, dan proses pengolahan." },
      { id: "pirt-3", text: "Unggah rancangan label kemasan sesuai aturan BPOM." },
      { id: "pirt-4", text: "Nomor SPP-IRT 15 Digit akan langsung terbit secara otomatis." },
      { id: "pirt-5", text: "Ikuti Penyuluhan Keamanan Pangan (PKP) dari Dinkes setempat secara online/offline." }
    ],
    duration: "1 - 3 Hari (Instant SPP-IRT)",
    cost: "Rp 0 (Gratis)"
  },
  {
    id: "haki",
    title: "4. Perlindungan Merek & Hak Cipta (DJKI Kemenkumham)",
    badge: "Tarif UMKM Terjangkau",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
    portalUrl: "https://dgip.go.id",
    portalName: "dgip.go.id",
    description: "Perlindungan hukum atas nama brand, logo, dan hak cipta karya agar tidak ditiru atau diklaim oleh pihak lain di kemudian hari.",
    requirements: [
      "Surat Keterangan UMKM dari Dinas (bisa pakai Surat Keterangan Usaha SKU Modava)",
      "Etiket / Gambar Logo Merek (Format JPEG/PNG)",
      "Tanda Tangan Pemohon Merek",
      "Kelas Barang/Jasa (NICE Classification)"
    ],
    steps: [
      { id: "haki-1", text: "Lakukan penelusuran nama merek di pdki-indonesia.dgip.go.id untuk memastikan belum ada yang menggunakan." },
      { id: "haki-2", text: "Buka portal merek.dgip.go.id dan buat akun pemohon." },
      { id: "haki-3", text: "Pilih permohonan 'Usaha Mikro Kecil' untuk mendapatkan potongan biaya resmi." },
      { id: "haki-4", text: "Unggah SKU, Logo Merek, dan bayar PNBP via SIMPADU Kemenkumham." },
      { id: "haki-5", text: "Proses Pengumuman & Pemeriksaan Substantif hingga sertifikat merek terbit." }
    ],
    duration: "6 - 12 Bulan",
    cost: "Rp 500.000 (Tarif UMKM khusus)"
  }
];

export function LegalitasHub() {
  const [activeTab, setActiveTab] = useState<"status" | "panduan" | "pajak" | "surat">("status");
  const { legalDocs: documents, uploadLegalDoc, umkmProfile } = useModava();

  // Expand state for Panduan Perizinan
  const [expandedGuides, setExpandedGuides] = useState<Record<string, boolean>>({
    nib: true, // Default NIB open
    halal: true,
  });

  // Step Checklist State
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({
    "nib-1": true,
    "nib-2": true,
  });

  const toggleGuideExpand = (guideId: string) => {
    setExpandedGuides((prev) => ({ ...prev, [guideId]: !prev[guideId] }));
  };

  const toggleStepCheck = (stepId: string) => {
    setCompletedSteps((prev) => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  // Tax Calculator State (PRD F10)
  const [monthlyTurnover, setMonthlyTurnover] = useState<number>(25000000);
  const pphRate = 0.005; // 0.5% PPh Final UMKM PP 55/2022
  const yearlyTurnover = monthlyTurnover * 12;
  const isTaxExempt = yearlyTurnover <= 500000000;
  const monthlyTaxDue = isTaxExempt ? 0 : Math.round(monthlyTurnover * pphRate);
  const yearlyTaxDue = isTaxExempt ? 0 : Math.round(yearlyTurnover * pphRate);

  // Template Surat Generator State (PRD F11 - Extended for Multiple Document Types)
  const [selectedTemplate, setSelectedTemplate] = useState<"sku" | "halal" | "pirt" | "omzet" | "domisili">("sku");

  const [suratData, setSuratData] = useState({
    namaPemilik: umkmProfile?.namaPemilik || "Sri Rahayu",
    nik: umkmProfile?.nik || "3273015509820003",
    namaUsaha: umkmProfile?.namaUsaha || "Warung Berkah Sembako & Katering",
    jenisUsaha: umkmProfile?.kategori || "Perdagangan Sembako & Jasa Katering",
    alamatUsaha: umkmProfile?.alamat || "Jl. Merdeka No. 45, Bandung",
    tahunBerdiri: umkmProfile?.tahunBerdiri || "2021",
    tujuanSurat: "Persyaratan Pengajuan Modal Crowdfunding Modava",
    omzetBulanan: "25.000.000",
    keuntunganBulanan: "8.500.000",
  });
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  // Auto-sync with UMKM Profile from Account Context
  useEffect(() => {
    if (umkmProfile) {
      setSuratData((prev) => ({
        ...prev,
        namaPemilik: umkmProfile.namaPemilik || prev.namaPemilik,
        nik: umkmProfile.nik || prev.nik,
        namaUsaha: umkmProfile.namaUsaha || prev.namaUsaha,
        jenisUsaha: umkmProfile.kategori || prev.jenisUsaha,
        alamatUsaha: umkmProfile.alamat || prev.alamatUsaha,
        tahunBerdiri: umkmProfile.tahunBerdiri || prev.tahunBerdiri,
      }));
    }
  }, [umkmProfile]);

  const handleSyncProfile = () => {
    if (umkmProfile) {
      setSuratData((prev) => ({
        ...prev,
        namaPemilik: umkmProfile.namaPemilik,
        nik: umkmProfile.nik,
        namaUsaha: umkmProfile.namaUsaha,
        jenisUsaha: umkmProfile.kategori,
        alamatUsaha: umkmProfile.alamat,
        tahunBerdiri: umkmProfile.tahunBerdiri,
        tujuanSurat: "Persyaratan Pengajuan Modal Crowdfunding Modava",
      }));
    }
  };

  // Calculate Verification Progress (PRD F12)
  const verifiedCount = documents.filter((d) => d.status === "verified").length;
  const progressPct = Math.round((verifiedCount / documents.length) * 100);

  const handleFileUpload = (docId: string, fileName: string) => {
    uploadLegalDoc(docId, fileName);
    alert(`Dokumen ${fileName} berhasil diunggah! Status berubah menjadi "Menunggu Verifikasi Admin".`);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-modava-primary-dark via-[#114534] to-modava-primary rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-400/20 text-emerald-200 text-xs font-bold rounded-full border border-emerald-400/30 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Modul Legalitas & Administrasi Resmi
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Pusat Legalitas & Administrasi UMKM
            </h1>
            <p className="text-emerald-100/90 text-sm mt-1 max-w-2xl">
              Urus verifikasi dokumen usaha, ikuti panduan perizinan, hitung Pajak PPh Final 0.5%, dan cetak template surat perizinan (PDF).
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
          <BookOpen className="w-4 h-4" /> Panduan Perizinan Interaktif
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

      {/* TAB 2: Panduan Perizinan Interaktif & Expandable (PRD F9) */}
      {activeTab === "panduan" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-modava-primary" /> Panduan Langkah Perizinan Resmi UMKM
              </h2>
              <p className="text-xs text-slate-500">
                Klik kartu untuk <strong>meng-expand alur langkah, checklist dokumen, & tautan portal resmi</strong> pengurusan perizinan.
              </p>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold">
              Panduan Resmi Pemerintah 2026
            </span>
          </div>

          <div className="space-y-4">
            {PERIZINAN_GUIDES.map((guide) => {
              const isExpanded = !!expandedGuides[guide.id];

              return (
                <div
                  key={guide.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isExpanded 
                      ? "border-emerald-500 shadow-md bg-white" 
                      : "border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  {/* Card Header (Clickable Expand Button) */}
                  <div
                    onClick={() => toggleGuideExpand(guide.id)}
                    className="p-5 cursor-pointer flex items-center justify-between gap-4 select-none"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-md font-bold text-[11px] border ${guide.badgeColor}`}>
                          {guide.badge}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">
                          ⏱️ Estimasi: {guide.duration} • 💰 Biaya: {guide.cost}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                        {guide.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-1">
                        {guide.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <a
                        href={guide.portalUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="py-1.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1 transition"
                      >
                        <span>Akses {guide.portalName}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200">
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-emerald-600" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content Section */}
                  {isExpanded && (
                    <div className="p-6 border-t border-slate-100 bg-slate-50/40 space-y-6 text-xs">
                      {/* Description full */}
                      <p className="text-slate-700 leading-relaxed font-medium bg-white p-4 rounded-xl border border-slate-200/80">
                        💡 {guide.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Dokumen Persyaratan */}
                        <div className="md:col-span-5 space-y-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                          <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5 text-modava-primary">
                            <ShieldCheck className="w-4 h-4" /> Persyaratan Dokumen Wajib:
                          </h4>
                          <ul className="space-y-2 text-slate-700">
                            {guide.requirements.map((req, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Interactive Step-by-Step Checklist */}
                        <div className="md:col-span-7 space-y-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5 text-modava-primary">
                              <CheckCircle2 className="w-4 h-4" /> Alur Langkah Pengurusan (Checklist Progres):
                            </h4>
                            <span className="text-[11px] text-slate-400 font-medium">Klik untuk centang</span>
                          </div>

                          <div className="space-y-2">
                            {guide.steps.map((step) => {
                              const isChecked = !!completedSteps[step.id];

                              return (
                                <div
                                  key={step.id}
                                  onClick={() => toggleStepCheck(step.id)}
                                  className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                                    isChecked
                                      ? "bg-emerald-50/70 border-emerald-300 text-emerald-900 font-medium"
                                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                                  }`}
                                >
                                  {isChecked ? (
                                    <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                                  ) : (
                                    <Square className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                  )}
                                  <span className={isChecked ? "line-through text-emerald-800" : ""}>
                                    {step.text}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Direct Action Link */}
                      <div className="flex justify-end pt-2">
                        <a
                          href={guide.portalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="py-2.5 px-5 bg-modava-primary hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-md transition flex items-center gap-2"
                        >
                          <span>Buka Portal {guide.portalName}</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
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
                      🎉 Bebas Pajak (UU HPP 2022)
                    </span>
                    <p className="text-3xl font-extrabold text-emerald-300">Rp 0 / bulan</p>
                    <p className="text-xs text-slate-300">
                      Omzet tahunan Anda (Rp {yearlyTurnover.toLocaleString("id-ID")}) masih di bawah batas non-pajak Rp 500.000.000/tahun.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <span className="px-3 py-1 bg-amber-400/20 text-amber-200 rounded-full text-xs font-bold inline-block">
                      Kena Tarif PPh Final 0.5%
                    </span>
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

      {/* TAB 4: Generator Template Surat PDF Beragam Perizinan & Administrasi (PRD F11) */}
      {activeTab === "surat" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
              <div>
                <h2 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-modava-primary" /> Generator Template Surat Perizinan & Administrasi (PDF)
                </h2>
                <p className="text-xs text-slate-500">
                  Pilih jenis surat perizinan yang dibutuhkan untuk kelengkapan administrasi bank, BPOM, BPJPH, atau crowdfunding.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSyncProfile}
                  className="py-2.5 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs border border-slate-300 transition-all flex items-center gap-1.5"
                  title="Sinkronkan data dengan profil akun UMKM Anda"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Samakan Data Akun</span>
                </button>
                <button
                  onClick={() => setShowPdfPreview(!showPdfPreview)}
                  className="py-2.5 px-4 bg-modava-primary hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>{showPdfPreview ? "Tutup Preview" : "Preview & Cetak PDF"}</span>
                </button>
              </div>
            </div>

            {/* Template Selector Options */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Pilih Jenis Surat Perizinan / Administrasi:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <button
                  onClick={() => setSelectedTemplate("sku")}
                  className={`p-3 rounded-2xl border text-left text-xs font-bold transition-all ${
                    selectedTemplate === "sku"
                      ? "bg-modava-primary text-white border-modava-primary shadow-md"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  📄 SKU (Surat Keterangan Usaha)
                </button>

                <button
                  onClick={() => setSelectedTemplate("halal")}
                  className={`p-3 rounded-2xl border text-left text-xs font-bold transition-all ${
                    selectedTemplate === "halal"
                      ? "bg-modava-primary text-white border-modava-primary shadow-md"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  🕌 Surat Kehalalan (BPJPH)
                </button>

                <button
                  onClick={() => setSelectedTemplate("pirt")}
                  className={`p-3 rounded-2xl border text-left text-xs font-bold transition-all ${
                    selectedTemplate === "pirt"
                      ? "bg-modava-primary text-white border-modava-primary shadow-md"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  🥣 Surat Komitmen P-IRT (BPOM)
                </button>

                <button
                  onClick={() => setSelectedTemplate("omzet")}
                  className={`p-3 rounded-2xl border text-left text-xs font-bold transition-all ${
                    selectedTemplate === "omzet"
                      ? "bg-modava-primary text-white border-modava-primary shadow-md"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  💰 Surat Keterangan Omzet
                </button>

                <button
                  onClick={() => setSelectedTemplate("domisili")}
                  className={`p-3 rounded-2xl border text-left text-xs font-bold transition-all ${
                    selectedTemplate === "domisili"
                      ? "bg-modava-primary text-white border-modava-primary shadow-md"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  🏠 Surat Domisili Usaha (SKDU)
                </button>
              </div>
            </div>

            {/* Input Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nama Pemilik Usaha</label>
                <input
                  type="text"
                  value={suratData.namaPemilik}
                  onChange={(e) => setSuratData({ ...suratData, namaPemilik: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-modava-primary"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700">NIK (Nomor Induk Kependudukan)</label>
                <input
                  type="text"
                  value={suratData.nik}
                  onChange={(e) => setSuratData({ ...suratData, nik: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-modava-primary"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nama Usaha / Brand</label>
                <input
                  type="text"
                  value={suratData.namaUsaha}
                  onChange={(e) => setSuratData({ ...suratData, namaUsaha: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-modava-primary"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Jenis Bidang Usaha</label>
                <input
                  type="text"
                  value={suratData.jenisUsaha}
                  onChange={(e) => setSuratData({ ...suratData, jenisUsaha: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-modava-primary"
                />
              </div>

              {selectedTemplate === "omzet" && (
                <>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Estimasi Omzet Bulanan (Rp)</label>
                    <input
                      type="text"
                      value={suratData.omzetBulanan}
                      onChange={(e) => setSuratData({ ...suratData, omzetBulanan: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-modava-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Estimasi Keuntungan Bersih Bulanan (Rp)</label>
                    <input
                      type="text"
                      value={suratData.keuntunganBulanan}
                      onChange={(e) => setSuratData({ ...suratData, keuntunganBulanan: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-modava-primary"
                    />
                  </div>
                </>
              )}

              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold text-slate-700">Alamat Lengkap Usaha</label>
                <input
                  type="text"
                  value={suratData.alamatUsaha}
                  onChange={(e) => setSuratData({ ...suratData, alamatUsaha: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-modava-primary"
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
                <div className="flex justify-between items-center print:hidden">
                  <span className="text-xs font-bold text-slate-600">
                    Preview Tampilan Dokumen Cetak PDF
                  </span>
                  <button
                    onClick={() => window.print()}
                    className="py-2 px-4 bg-modava-primary hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
                  >
                    <Printer className="w-4 h-4" /> Unduh / Cetak File PDF
                  </button>
                </div>

                {/* PDF PRINT TEMPLATE CONTAINER */}
                <div id="pdf-sku-document" className="bg-white p-8 max-w-2xl mx-auto shadow-2xl rounded-xl space-y-6 text-slate-900 font-serif text-sm border">
                  
                  {/* TEMPLATE 1: SKU (Surat Keterangan Usaha) */}
                  {selectedTemplate === "sku" && (
                    <>
                      <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
                        <h3 className="font-bold text-base uppercase tracking-wider">SURAT KETERANGAN USAHA (SKU)</h3>
                        <p className="text-xs font-mono">Nomor: 517/SKU/MODAVA/{new Date().getFullYear()}</p>
                      </div>

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
                    </>
                  )}

                  {/* TEMPLATE 2: Surat Pernyataan Kehalalan Produk (BPJPH) */}
                  {selectedTemplate === "halal" && (
                    <>
                      <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
                        <h3 className="font-bold text-base uppercase tracking-wider">SURAT PERNYATAAN KEHALALAN PRODUK (SELF DECLARE)</h3>
                        <p className="text-xs font-mono">Lampiran Pendaftaran Sihalal BPJPH No: {suratData.nik}/HALAL/{new Date().getFullYear()}</p>
                      </div>

                      <p className="text-justify leading-relaxed">
                        Saya yang bertanda tangan di bawah ini:
                      </p>

                      <div className="pl-6 space-y-1 font-mono text-xs">
                        <p>Nama Pemilik : {suratData.namaPemilik}</p>
                        <p>NIK          : {suratData.nik}</p>
                        <p>Nama Brand   : {suratData.namaUsaha}</p>
                        <p>Kategori     : {suratData.jenisUsaha}</p>
                        <p>Alamat Usaha : {suratData.alamatUsaha}</p>
                      </div>

                      <p className="text-justify leading-relaxed">
                        Dengan ini menyatakan dengan sesungguhnya bahwa seluruh bahan baku, bahan tambahan, dan proses pengolahan produk pada usaha <strong>{suratData.namaUsaha}</strong> dipastikan 100% Halal, bebas dari najis, bahan haram, serta diproduksi secara suci dan higienis sesuai standar BPJPH Kemenag.
                      </p>
                    </>
                  )}

                  {/* TEMPLATE 3: Surat Pernyataan Pemenuhan Komitmen P-IRT */}
                  {selectedTemplate === "pirt" && (
                    <>
                      <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
                        <h3 className="font-bold text-base uppercase tracking-wider">SURAT PERNYATAAN PEMENUHAN KOMITMEN P-IRT</h3>
                        <p className="text-xs font-mono">Lampiran SPP-IRT BPOM Online No: {suratData.nik}/PIRT/{new Date().getFullYear()}</p>
                      </div>

                      <p className="text-justify leading-relaxed">
                        Yang bertanda tangan di bawah ini penanggung jawab usaha pangan rumahan:
                      </p>

                      <div className="pl-6 space-y-1 font-mono text-xs">
                        <p>Nama Penanggung Jawab : {suratData.namaPemilik}</p>
                        <p>NIK                   : {suratData.nik}</p>
                        <p>Nama Usaha Pangan     : {suratData.namaUsaha}</p>
                        <p>Jenis Produk Pangan   : {suratData.jenisUsaha}</p>
                        <p>Alamat Ruang Produksi : {suratData.alamatUsaha}</p>
                      </div>

                      <p className="text-justify leading-relaxed">
                        Menyatakan siap memenuhi seluruh komitmen keamanan pangan olahan rumahan, menjaga higienitas sanitasi tempat produksi, dan tidak menggunakan bahan berbahaya (Formalin, Boraks, Pewarna Tekstil) sesuai ketentuan regulasi BPOM RI.
                      </p>
                    </>
                  )}

                  {/* TEMPLATE 4: Surat Keterangan Omzet Usaha */}
                  {selectedTemplate === "omzet" && (
                    <>
                      <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
                        <h3 className="font-bold text-base uppercase tracking-wider">SURAT KETERANGAN OMZET & PENGHASILAN USAHA</h3>
                        <p className="text-xs font-mono">Nomor: 882/OMZET/MODAVA/{new Date().getFullYear()}</p>
                      </div>

                      <p className="text-justify leading-relaxed">
                        Menyatakan rincian perkiraan finansial usaha aktif sebagai berikut:
                      </p>

                      <div className="pl-6 space-y-1 font-mono text-xs">
                        <p>Nama Pemilik Usaha  : {suratData.namaPemilik}</p>
                        <p>NIK                 : {suratData.nik}</p>
                        <p>Nama Usaha / Brand  : {suratData.namaUsaha}</p>
                        <p>Estimasi Omzet/Bulan: Rp {suratData.omzetBulanan}</p>
                        <p>Laba Bersih/Bulan   : Rp {suratData.keuntunganBulanan}</p>
                        <p>Alamat Tempat Usaha : {suratData.alamatUsaha}</p>
                      </div>

                      <p className="text-justify leading-relaxed">
                        Surat keterangan omzet ini diterbitkan secara sah berdasarkan rekapan transaksi pembukuan usaha sebagai bukti kelayakan finansial pengajuan pinjaman modal / crowdfunding Modava.
                      </p>
                    </>
                  )}

                  {/* TEMPLATE 5: Surat Pernyataan Domisili Usaha (SKDU) */}
                  {selectedTemplate === "domisili" && (
                    <>
                      <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
                        <h3 className="font-bold text-base uppercase tracking-wider">SURAT PERNYATAAN DOMISILI TEMPAT USAHA</h3>
                        <p className="text-xs font-mono">Nomor: 301/DOMISILI/MODAVA/{new Date().getFullYear()}</p>
                      </div>

                      <p className="text-justify leading-relaxed">
                        Yang bertanda tangan di bawah ini menerangkan domisili fisik usaha:
                      </p>

                      <div className="pl-6 space-y-1 font-mono text-xs">
                        <p>Nama Pengelola Usaha : {suratData.namaPemilik}</p>
                        <p>NIK                  : {suratData.nik}</p>
                        <p>Nama Tempat Usaha    : {suratData.namaUsaha}</p>
                        <p>Bidang Usaha         : {suratData.jenisUsaha}</p>
                        <p>Alamat Fisik Usaha   : {suratData.alamatUsaha}</p>
                      </div>

                      <p className="text-justify leading-relaxed">
                        Menyatakan bahwa lokasi usaha tersebut di atas benar-benar beroperasi di alamat tersebut dan tidak dalam sengketa pihak manapun.
                      </p>
                    </>
                  )}

                  {/* Signatures Footer */}
                  <div className="flex justify-between pt-8 text-center text-xs">
                    <div>
                      <p>Pemilik / Pengelola Usaha,</p>
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
