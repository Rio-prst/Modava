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
| Frontend | Next.js 15 (App Router) + TypeScript |
| Styling/UI | Tailwind CSS + shadcn/ui |
| Form & Validasi | React Hook Form + Zod |
| Authentication | Clerk (Google OAuth & Email Authentication) |
| Backend | NestJS + TypeScript |
| Database | Supabase PostgreSQL + Prisma ORM |
| File Storage | Supabase Storage |
| Generate PDF | pdf-lib |
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

- Node.js 20 atau lebih baru
- Akun Clerk
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

```text
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

```text
http://localhost:4000
```

---

## Environment Variables

### frontend/.env.example

```env
NEXT_PUBLIC_API_URL=http://localhost:4000

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

CLERK_SECRET_KEY=
```

### backend/.env.example

```env
DATABASE_URL=

CLERK_SECRET_KEY=

SUPABASE_URL=

SUPABASE_SERVICE_ROLE_KEY=

PORT=4000
```

---

## Authentication Flow

Authentication menggunakan **Clerk** dengan dukungan:

- Google OAuth
- Email & Password Authentication
- Session Management
- Route Protection
- JWT Verification

Alur autentikasi:

```text
User
   │
   ▼
Clerk Authentication
   │
   ▼
Frontend (Next.js)
   │
Bearer Token
   ▼
NestJS API
   │
Verify Clerk JWT
   ▼
Business Logic
   ▼
Supabase PostgreSQL
```

NestJS hanya bertugas melakukan **verifikasi token** dan menangani business logic aplikasi. Seluruh proses login, session, dan OAuth dikelola oleh Clerk.

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

Contoh branch:

```text
feature/cash-flow-tracker
feature/crowdfunding-api
feature/legalitas-dashboard
```

Workflow pengembangan:

```text
feature/* → Pull Request → dev → main
```

---

## Development Guidelines

### Branch Naming

Gunakan format berikut untuk setiap branch:

```text
feature/<feature-name>
fix/<bug-name>
refactor/<module-name>
docs/<topic>
chore/<task>
```

Contoh:

```text
feature/google-auth
feature/cash-flow-tracker
feature/crowdfunding-api

fix/login-session

refactor/legalitas-module

docs/readme-update

chore/setup-ci
```

---

### Commit Convention

Seluruh commit pada repository ini wajib mengikuti standar **Conventional Commits**.

Format:

```text
<type>(scope): <description>
```

Contoh:

```text
feat(auth): integrate Clerk authentication

feat(auth): implement Google sign in

feat(cash-flow): add transaction form

feat(crowdfunding): create campaign API

fix(auth): validate Clerk JWT

refactor(legalitas): simplify validation logic

docs(readme): update project documentation

chore(ci): configure GitHub Actions
```

Jenis commit yang digunakan:

| Type | Deskripsi |
|------|-----------|
| `feat` | Menambahkan fitur baru |
| `fix` | Memperbaiki bug |
| `refactor` | Mengubah struktur kode tanpa mengubah perilaku |
| `docs` | Perubahan dokumentasi |
| `style` | Perubahan formatting tanpa mengubah logika |
| `test` | Menambah atau memperbarui pengujian |
| `chore` | Dependency, konfigurasi, tooling, atau CI/CD |

---

### Atomic Commits

Setiap commit harus bersifat **atomic**, yaitu hanya berisi satu perubahan yang saling berkaitan.

**Baik**

```text
feat(cash-flow): add transaction form

feat(cash-flow): implement monthly summary

fix(auth): validate Clerk JWT
```

**Kurang Baik**

```text
feat: add login, dashboard, crowdfunding, navbar, fix bugs, update README
```

---

### Pull Request Guidelines

Sebelum membuat Pull Request ke branch `dev`, pastikan:

- Menggunakan branch sesuai aturan penamaan.
- Menggunakan Conventional Commits.
- Satu Pull Request hanya berisi satu fitur atau satu perbaikan.
- Tidak terdapat lint error.
- Project dapat di-build tanpa error.
- Seluruh perubahan telah diuji sebelum diajukan untuk review.