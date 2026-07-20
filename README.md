# Modava — Modal untuk UMKM Naik Kelas

Platform web yang membantu pelaku UMKM mengelola keuangan usaha sekaligus membuka akses permodalan melalui skema **crowdfunding berbasis komunitas**. Modava menjembatani legalitas usaha (NIB, NPWP, Sertifikat Halal) dengan akses modal finansial, menjadikan status legalitas dan riwayat arus kas sebagai dasar skor kelayakan yang transparan bagi calon kontributor atau investor mikro.

Dikembangkan untuk **Veternity Beraksi 2026 – Web Development Competition**

**Sub Tema:** Micro-Capital Crowdfunding & Financial Management

---

## Fitur

### Manajemen Keuangan & Permodalan (Fitur Inti)

- **Cash Flow Tracker**  
  Pencatatan pemasukan dan pengeluaran harian yang otomatis menghitung laba/rugi bulanan.

- **Skor Kelayakan Keuangan**  
  Menghasilkan skor berdasarkan arus kas dan status legalitas sebagai acuan pengajuan modal.

- **Crowdfunding Komunitas**  
  UMKM dapat membuat campaign kebutuhan modal dan menerima pendanaan dari komunitas atau investor mikro.

- **Simulasi Pinjaman Mikro**  
  Menghitung estimasi cicilan pinjaman agar UMKM dapat mengevaluasi kemampuan bayar.

- **Notifikasi In-App**  
  Memberikan pemberitahuan ketika campaign menerima pledge baru atau target pendanaan telah tercapai.

### Legalitas & Administrasi (Fitur Pendukung)

- **Cek Status Legalitas**
- **Panduan Perizinan**
  - NIB
  - NPWP
  - IUMK
  - Sertifikat Halal
  - TDP
- **Kalkulator Pajak UMKM**  
  Menghitung pajak final UMKM dengan tarif 0,5%.
- **Template Surat**  
  Generate dan mengunduh surat administratif dalam format PDF.
- **Dashboard Progress**  
  Melacak progres pengurusan legalitas usaha.
- **Profil UMKM**  
  Menyimpan informasi usaha pengguna.

---

## Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Styling/UI | Tailwind CSS + shadcn/ui |
| Form & Validasi | React Hook Form + Zod |
| Backend | NestJS + TypeScript |
| Database | Supabase PostgreSQL + Prisma ORM |
| Authentication | NextAuth.js (Auth.js) + Google Provider + JWT |
| Generate PDF | pdf-lib |
| File Storage | Supabase Storage |
| CI/CD | GitHub Actions |
| Containerization | Docker + Docker Compose |
| Deployment | Vercel (Frontend) + Railway / Render (Backend) |

---

## Struktur Repository

```text
modava/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   └── custom/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── types/
│   ├── .env.example
│   └── package.json
│
├── backend/
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
│   │   ├── common/
│   │   └── main.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── .env.example
│   └── package.json
│
├── docs/
├── .github/
│   └── workflows/
│       └── ci.yml
├── docker-compose.yml
├── backend/Dockerfile
├── .gitignore
└── README.md
```

---

## Cara Menjalankan

### Prasyarat

- Node.js 18 atau lebih baru
- Akun Supabase
- npm atau pnpm

### Frontend

```bash
cd frontend

npm install

cp .env.example .env.local

npm run dev
```

Akses aplikasi di:

```
http://localhost:3000
```

### Backend

```bash
cd backend

npm install

cp .env.example .env

npx prisma migrate dev

npm run start:dev
```

API berjalan di:

```
http://localhost:4000
```

---

## Environment Variables

### frontend/.env.example

```env
NEXT_PUBLIC_API_URL=http://localhost:4000

NEXTAUTH_URL=http://localhost:3000

NEXTAUTH_SECRET=

GOOGLE_CLIENT_ID=

GOOGLE_CLIENT_SECRET=
```

### backend/.env.example

```env
DATABASE_URL=

JWT_SECRET=

JWT_REFRESH_SECRET=

PORT=4000

SUPABASE_URL=

SUPABASE_SERVICE_ROLE_KEY=
```

---

## Docker (Opsional)

Karena database menggunakan **Supabase Cloud**, Docker Compose hanya digunakan untuk menjalankan backend di dalam container agar proses deployment dan testing lebih konsisten.

```bash
docker-compose up -d
```

Contoh `docker-compose.yml`:

```yaml
services:
  backend:
    build: ./backend
    restart: unless-stopped
    env_file:
      - ./backend/.env
    ports:
      - "4000:4000"
```

Contoh `DATABASE_URL`:

```env
DATABASE_URL=postgresql://postgres:[password]@[project-ref].supabase.co:5432/postgres
```

---

## CI/CD

Setiap Pull Request menuju branch `dev` akan menjalankan proses berikut melalui GitHub Actions:

- Lint
- Type Check
- Build Check

Tujuannya untuk memastikan perubahan yang masuk tidak merusak aplikasi sebelum di-merge.

---

## Branching Strategy

| Branch | Keterangan |
|---------|------------|
| `main` | Branch produksi |
| `dev` | Branch integrasi |
| `feature/*` | Pengembangan fitur |

Contoh:

```text
feature/cash-flow-tracker
feature/crowdfunding-api
feature/legalitas-dashboard
```

Workflow pengembangan:

```text
feature/* → Pull Request → dev → main
```
