# Modava — Modal untuk UMKM Naik Kelas

Platform web yang membantu pelaku UMKM mengelola keuangan usaha sekaligus membuka akses permodalan melalui skema *crowdfunding* berbasis komunitas. Modava menjembatani legalitas usaha (NIB, NPWP, Sertifikat Halal) dengan akses modal finansial, menjadikan status legalitas dan riwayat arus kas sebagai dasar skor kelayakan yang transparan bagi calon kontributor/investor mikro.

Dikembangkan untuk **Veternity Beraksi 2026 — Web Development Competition**
Sub Tema: **Micro-Capital Crowdfunding & Financial Management**

---

## Fitur

### Manajemen Keuangan & Modal (Fitur Inti)
- **Cash Flow Tracker** — pencatatan pemasukan & pengeluaran harian, otomatis menghitung laba-rugi bulanan
- **Skor Kelayakan Keuangan** — skor dari data cash flow + status legalitas sebagai bahan pengajuan modal/kredit
- **Modul Crowdfunding Komunitas** — UMKM membuat campaign kebutuhan modal, komunitas/investor mikro dapat patungan (pledge)
- **Simulasi Pinjaman Mikro** — simulasi cicilan pinjaman untuk evaluasi kemampuan bayar
- **Notifikasi In-App** — pemberitahuan saat campaign mendapat pledge baru atau target tercapai (polling, bukan WebSocket)

### Legalitas & Administrasi (Fitur Pendukung)
- **Cek Status Legalitas** — mengecek status legalitas usaha (NIB/NPWP/IUMK/Halal)
- **Panduan Perizinan** — panduan step-by-step mengurus NIB, NPWP, IUMK, Sertifikat Halal, TDP
- **Kalkulator Pajak UMKM** — menghitung pajak final UMKM dengan tarif 0,5%
- **Template Surat** — generate & unduh surat administratif (PDF)
- **Dashboard Progress** — melacak progres pengurusan legalitas
- **Profil UMKM** — menyimpan data usaha

## Tech Stack

| Komponen | Teknologi |
|---|---|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Styling/UI | Tailwind CSS + shadcn/ui |
| Form & Validasi | React Hook Form + Zod |
| Backend | NestJS + TypeScript |
| Database | Supabase (PostgreSQL) + Prisma ORM |
| Autentikasi | NextAuth.js (Auth.js) — Google Provider + JWT session |
| Generate PDF | pdf-lib |
| Storage (upload dokumen) | Supabase Storage |
| CI/CD | GitHub Actions (lint + build check) |
| Containerization | Docker + Docker Compose (untuk dev lokal) |
| Deployment | Vercel (FE) + Railway/Render (BE + DB) |

## Struktur Repo

Monorepo dengan dua project terpisah:

\```
modava/
├── frontend/           # Next.js app
│   ├── src/
│   │   ├── app/            # Routes & pages
│   │   ├── components/     # UI components
│   │   │   ├── ui/          # shadcn components
│   │   │   └── custom/      # Custom components
│   │   ├── context/         # React Context (global state)
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # Utilities & API client
│   │   └── types/           # TypeScript types
│   ├── .env.example
│   └── package.json
├── backend/            # NestJS app
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── umkm-profile/
│   │   │   ├── legalitas/
│   │   │   ├── cash-flow/
│   │   │   ├── credit-score/
│   │   │   ├── crowdfunding/
│   │   │   ├── loan-simulation/
│   │   │   └── notification/
│   │   ├── common/          # Guards, decorators, filters
│   │   └── main.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── .env.example
│   └── package.json
├── docs/               # Proposal, diagram arsitektur, mockup
├── .github/
│   └── workflows/
│       └── ci.yml      # Lint & build check otomatis untuk setiap PR
├── docker-compose.yml  # Containerize backend untuk deployment/testing
├── backend/Dockerfile
├── .gitignore
└── README.md
\```

## Cara Menjalankan

### Prasyarat
- Node.js ≥ 18
- Akun Supabase (untuk database & storage) — https://supabase.com
- npm atau pnpm

### Frontend

\```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
# buka http://localhost:3000
\```

### Backend

\```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npm run start:dev
# API berjalan di http://localhost:4000
\```

## Environment Variables

**`frontend/.env.example`**
\```
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
\```

**`backend/.env.example`**
\```
DATABASE_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
PORT=4000
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
\```

## Menjalankan dengan Docker (opsional)

Karena database menggunakan Supabase (cloud), Docker Compose di sini hanya diperlukan untuk containerize backend saat deployment atau testing environment yang konsisten — bukan untuk menjalankan database secara lokal.

\```bash
docker-compose up -d
\```

Contoh `docker-compose.yml` minimal:

\```yaml
services:
  backend:
    build: ./backend
    restart: unless-stopped
    env_file:
      - ./backend/.env
    ports:
      - "4000:4000"
\```

`DATABASE_URL` di `backend/.env` tetap mengarah ke connection string Supabase, contoh:
\```
DATABASE_URL=postgresql://postgres:[password]@[project-ref].supabase.co:5432/postgres
\```

Untuk deployment, `backend/Dockerfile` digunakan agar build backend konsisten di Railway/Render.

## CI/CD

Setiap Pull Request ke branch `dev` otomatis menjalankan lint dan build check melalui GitHub Actions (`.github/workflows/ci.yml`), untuk memastikan kode yang masuk tidak merusak build sebelum di-review.

## Branching Strategy

- `main` — branch stabil, digunakan untuk deployment
- `dev` — branch integrasi harian
- `feature/nama-fitur` — branch kerja per fitur (contoh: `feature/cash-flow-tracker`, `feature/crowdfunding-api`)

Alur kerja: buat branch dari `dev` → kerjakan fitur → pull request ke `dev` → setelah stabil, merge `dev` ke `main`.

## Lisensi

MIT
