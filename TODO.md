# 📝 TODO & Checklist Pengembangan — Modava

> Documented based on **PRD Modava v2.0** (Veternity Beraksi 2026 Competition).

---

## 📌 Matrix Priority & Status Overview

- **Fitur Inti (Must-Have)**: Cash Flow Tracker, Credit Score Breakdown, Crowdfunding & Detail Campaign, Simulasi Pinjaman Terintegrasi, Validasi Syarat Minimum Campaign, Auth & Panel Admin.
- **Fitur Pendukung (Should-Have)**: Upload & Verifikasi Legalitas, Panduan Perizinan, Kalkulator Pajak UMKM 0.5%, Generator PDF Template Surat, Profil UMKM, Notifikasi.

---

## 🚀 1. Authentication & Session (`auth`) — [Priority: MUST]

- [ ] **NextAuth.js Integration**
  - [ ] Setup NextAuth Provider (Google OAuth + Credentials / JWT).
  - [ ] Middleware proteksi route group `(dashboard)/*` (redirect ke `/masuk` jika unauthenticated).
- [ ] **NestJS Auth Guard**
  - [ ] JWT Verification Guard di NestJS Backend untuk mengamankan API endpoints.

---

## 💰 2. Cash Flow Tracker (`cash-flow`) — [Priority: MUST]

- [x] **Frontend UI (`/cash-flow`)**
  - [x] Form Input Transaksi (Tanggal, Tipe: Masuk/Keluar, Kategori, Nominal, Catatan).
  - [x] Tabel Riwayat Transaksi dengan filter bulan & pencarian.
  - [x] Card Summary: Total Pemasukan, Total Pengeluaran, Laba/Rugi Bersih.
  - [x] Indikator Syarat Minimum Campaign PRD [F14] (Pencatatan > 1 Bulan).
- [ ] **Backend NestJS (`cash-flow` module)**
  - [ ] CRUD API untuk data transaksi arus kas.
  - [ ] Endpoint Agregasi Bulanan & Laba/Rugi.
- [ ] **Validasi Ambang Minimum [F14]**
  - [ ] Logika pengecekan minimal 1 bulan riwayat pencatatan aktif sebelum UMKM diizinkan membuat campaign.

---

## 📊 3. Skor Kelayakan Keuangan (`credit-score`) — [Priority: MUST]

- [ ] **Frontend UI (`/skor`)**
  - [ ] Tampilan Skor IPK (0.00 – 4.00) & Tier (A / B / C / D).
  - [ ] Breakdown 3 Komponen Utama:
    - 50% Kesehatan Arus Kas
    - 30% Status Legalitas
    - 20% Riwayat Platform
  - [ ] Panel Rekomendasi Peningkatan Skor (Actionable tips untuk menaikkan skor).
- [ ] **Backend NestJS (`credit-score` module)**
  - [ ] Rule-based / Weighted Scoring Engine otomatis berdasarkan data `cash-flow` + `legalitas` + `crowdfunding`.

---

## 🧮 4. Simulasi Pinjaman Mikro & Integrasi Campaign (`loan-simulation`) — [Priority: MUST]

- [ ] **Frontend UI (`/pinjaman`)**
  - [ ] Form Kalkulator Simulasi Pinjaman (Nominal Kebutuhan, Tenor Bulan, Estimasi Bunga/Cicilan).
  - [ ] Indikator Kemampuan Bayar / DSCR (Debt Service Coverage Ratio) berdasarkan laba bersih bulanan dari Cash Flow.
  - [ ] **CTA Integrasi Langsung [F6]**: Button *"Ajukan Modal dari Hasil Simulasi Ini"* yang otomatis membuka form pembuatan campaign dengan nominal & tenor pre-filled.
- [ ] **Backend NestJS (`loan-simulation` module)**
  - [ ] Formula kalkulasi cicilan & rasio kelayakan pinjaman.

---

## 🤝 5. Crowdfunding & Detail Campaign (`crowdfunding`) — [Priority: MUST]

- [ ] **Frontend UI (`/crowdfunding`)**
  - [ ] Form / Modal Pembuatan Campaign Baru (auto-fill dari Simulasi, validasi syarat minimum cash flow).
  - [ ] **Halaman Detail Campaign (`/crowdfunding/[id]`)**:
    - Header & Galeri Foto Campaign
    - Detail Profil UMKM & Skor Kelayakan (dengan breakdown)
    - Progress Bar Dana Terkumpul & Sisa Waktu
    - Modal Beri Kontribusi / Pledge (Simulasi Pembayaran)
    - Tab Laporan Progres Penggunaan Dana dari UMKM
- [ ] **Backend NestJS (`crowdfunding` module)**
  - [ ] CRUD API Campaign (Create, Read, List with filters: skor/kategori/legalitas, Update).
  - [ ] API Pledge / Kontribusi (Simulasi penambahan dana & kuota).
  - [ ] API Laporan Progres Penggunaan Dana.

---

## 📜 6. Legalitas & Administrasi (`legalitas`) — [Priority: SHOULD / MUST]

- [ ] **Frontend UI (`/legalitas`)**
  - [ ] Upload Dokumen Legalitas (NIB, NPWP, Sertifikat Halal, Izin PIRT, TDP) ke Supabase Storage.
  - [ ] Dashboard Progress Pengurusan Legalitas.
  - [ ] Panduan Perizinan per jenis dokumen.
  - [ ] **Kalkulator Pajak UMKM [F10]**: Hitung otomatis PPh Final tarif 0.5%.
  - [ ] **Generator Template Surat PDF [F11]**: Form & download PDF surat administratif usaha via `pdf-lib`.
- [ ] **Panel Admin Verifikasi [F15]**
  - [ ] Halaman Admin (`/admin/legalitas`): Peninjauan dokumen yang diunggah UMKM & approval (Ubah status dokumen ke "Terverifikasi").
- [ ] **Backend NestJS (`legalitas` module)**
  - [ ] API Upload & status tracking dokumen legalitas.
  - [ ] API Admin Verification Endpoint.

---

## 👤 7. Profil UMKM & Notifikasi (`umkm-profile`, `notification`) — [Priority: MUST]

- [ ] **Frontend UI (`/profil`)**
  - [ ] Form Edit Profil UMKM (Nama usaha, kategori, deskripsi, alamat, kontak, logo).
- [ ] **Frontend UI (`/notifikasi`)**
  - [ ] List Notifikasi In-App (Pledge baru masuk, Target campaign tercapai, Dokumen legalitas diverifikasi).
- [ ] **Backend NestJS (`umkm-profile` & `notification` modules)**
  - [ ] API Profil UMKM & Management Notifikasi.

---

## 🗄️ 8. Database Migration & Dummy Data Seeding

- [ ] Sync Schema Prisma ke Supabase PostgreSQL (`npx prisma migrate dev`).
- [ ] Script Seed Data (`prisma/seed.ts`):
  - 3-5 Profil UMKM realistis dengan variasi skor (Warung Berkah, Kerupuk Pak Budi, dll.).
  - Data Arus Kas harian/bulanan.
  - Dokumen Legalitas dummy.
  - Campaign aktif & selesai.

---

## 🛠️ 9. DevOps & Deployment

- [ ] Deployment Frontend (Vercel).
- [ ] Deployment Backend NestJS (Railway / Render / Docker).
- [ ] Test E2E Flow (Pencatatan -> Legalitas -> Simulasi -> Campaign -> Pledge).
