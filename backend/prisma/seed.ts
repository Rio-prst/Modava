import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  { name: 'Kuliner', slug: 'kuliner', description: 'Makanan dan minuman' },
  { name: 'Fashion', slug: 'fashion', description: 'Pakaian dan aksesoris' },
  {
    name: 'Kerajinan',
    slug: 'kerajinan',
    description: 'Kerajinan tangan dan handmade',
  },
  {
    name: 'Pertanian',
    slug: 'pertanian',
    description: 'Produk pertanian dan perkebunan',
  },
  { name: 'Peternakan', slug: 'peternakan', description: 'Produk peternakan' },
  {
    name: 'Perikanan',
    slug: 'perikanan',
    description: 'Produk perikanan dan kelautan',
  },
  { name: 'Jasa', slug: 'jasa', description: 'Jasa dan pelayanan' },
  {
    name: 'Teknologi',
    slug: 'teknologi',
    description: 'Teknologi dan digital',
  },
  {
    name: 'Pendidikan',
    slug: 'pendidikan',
    description: 'Pendidikan dan pelatihan',
  },
  {
    name: 'Kesehatan',
    slug: 'kesehatan',
    description: 'Produk kesehatan dan kecantikan',
  },
];

const legalitasGuides = [
  {
    documentType: 'NIB' as const,
    title: 'Panduan Pengurusan NIB',
    content:
      'Nomor Induk Berusaha (NIB) adalah identitas pelaku usaha yang diterbitkan oleh OSS RBA. NIB berlaku sebagai TDP, Izin Lokasi, dan Izin Usaha. Proses pengurusan dilakukan secara online melalui sistem OSS.',
    steps: [
      'Siapkan dokumen: KTP, NPWP, dan data usaha',
      'Buka portal OSS RBA (oss.go.id)',
      'Daftar akusn dan lakukan login',
      'Isi data pelaku usaha dan data usaha',
      'Upload dokumen persyaratan',
      'Submit dan dapatkan NIB secara elektronik',
    ],
    order: 1,
  },
  {
    documentType: 'NPWP' as const,
    title: 'Panduan Pembuatan NPWP',
    content:
      'Nomor Pokok Wajib Pajak (NPWP) adalah nomor yang diberikan kepada wajib pajak sebagai sarana administrasi perpajakan. Pengajuan NPWP dapat dilakukan melalui e-registration DJP Online.',
    steps: [
      'Akses ereg.pajak.go.id',
      'Daftar dengan NIK KTP dan KK',
      'Verifikasi data kependudukan',
      'Isi formulir pendaftaran',
      'Pilih kategori wajib pajak (OP/ Badan)',
      'Submit dan dapatkan NPWP elektronik',
    ],
    order: 2,
  },
  {
    documentType: 'IUMK' as const,
    title: 'Panduan IUMK',
    content:
      'Izin Usaha Mikro dan Kecil (IUMK) adalah izin usaha untuk pelaku UMKM yang diterbitkan oleh pemerintah daerah. IUMK dapat diurus melalui Dinas Perindustrian dan Perdagangan setempat atau OSS RBA.',
    steps: [
      'Siapkan NIB, KTP, NPWP, dan pasfoto',
      'Ajukan ke Dinas Perdagangan setempat',
      'Isi formulir permohonan',
      'Lakukan verifikasi dokumen',
      'Terima IUMK dalam 5-7 hari kerja',
    ],
    order: 3,
  },
  {
    documentType: 'SERTIFIKAT_HALAL' as const,
    title: 'Panduan Sertifikat Halal',
    content:
      'Sertifikat Halal adalah jaminan bahwa produk telah memenuhi syarat kehalalan sesuai syariat Islam. Pengajuan dilakukan melalui BPJPH dan LPH yang ditunjuk.',
    steps: [
      'Pastikan bahan baku halal dan terdokumentasi',
      'Ajukan ke BPJPH melalui Sihalal',
      'Lakukan audit oleh LPH',
      'Ikuti sidang fatwa MUI',
      'Terima Sertifikat Halal',
    ],
    order: 4,
  },
  {
    documentType: 'TDP' as const,
    title: 'Panduan TDP',
    content:
      'Tanda Daftar Perusahaan (TDP) adalah bukti pendaftaran perusahaan yang diterbitkan oleh Dinas Perindustrian dan Perdagangan. Sejak diterbitkannya NIB, TDP sudah terintegrasi dengan NIB.',
    steps: [
      'Siapkan NIB, Akta Pendirian, dan KTP',
      'Ajukan ke Dinas Perdagangan',
      'Isi formulir pendaftaran',
      'Lakukan pembayaran retribusi',
      'Terima TDP dalam 3-5 hari kerja',
    ],
    order: 5,
  },
];

type ClerkUser = {
  clerkUserId: string;
  email: string;
  name: string;
  role: 'UMKM' | 'CONTRIBUTOR' | 'ADMIN';
};

const clerkUsers: ClerkUser[] = [
  {
    clerkUserId: 'clerk_demo_warung_makan',
    email: 'warung@demo.modava.id',
    name: 'Budi Santoso',
    role: 'UMKM',
  },
  {
    clerkUserId: 'clerk_demo_batik',
    email: 'batik@demo.modava.id',
    name: 'Sari Dewi',
    role: 'UMKM',
  },
  {
    clerkUserId: 'clerk_demo_kerajinan',
    email: 'kerajinan@demo.modava.id',
    name: 'Agus Pratama',
    role: 'UMKM',
  },
  {
    clerkUserId: 'clerk_demo_contributor',
    email: 'contributor@demo.modava.id',
    name: 'Rina Wijaya',
    role: 'CONTRIBUTOR',
  },
  {
    clerkUserId: 'clerk_demo_admin',
    email: 'admin@demo.modava.id',
    name: 'Admin Modava',
    role: 'ADMIN',
  },
];

async function main() {
  console.log('Seeding BusinessCategory...');
  for (const category of categories) {
    await prisma.businessCategory.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  console.log('Seeding LegalitasGuide...');
  for (const guide of legalitasGuides) {
    await prisma.legalitasGuide.upsert({
      where: { documentType: guide.documentType },
      update: {},
      create: guide,
    });
  }

  console.log('Seeding Users...');
  const createdUsers: Record<string, { id: string }> = {};
  for (const u of clerkUsers) {
    const user = await prisma.user.upsert({
      where: { clerkUserId: u.clerkUserId },
      update: {},
      create: u,
    });
    createdUsers[u.clerkUserId] = { id: user.id };
  }

  const kategoriKuliner = await prisma.businessCategory.findUniqueOrThrow({
    where: { slug: 'kuliner' },
  });
  const kategoriFashion = await prisma.businessCategory.findUniqueOrThrow({
    where: { slug: 'fashion' },
  });
  const kategoriKerajinan = await prisma.businessCategory.findUniqueOrThrow({
    where: { slug: 'kerajinan' },
  });

  console.log('Seeding UMKM Profiles...');

  const warung = await prisma.uMKMProfile.upsert({
    where: { userId: createdUsers['clerk_demo_warung_makan'].id },
    update: {},
    create: {
      userId: createdUsers['clerk_demo_warung_makan'].id,
      businessName: 'Warung Makan Sari Rasa',
      description:
        'Warung makan nusantara dengan menu khas Jawa Timur, buka setiap hari dari pukul 07.00 - 21.00 WIB.',
      categoryId: kategoriKuliner.id,
      address: 'Jl. Merdeka No. 123',
      city: 'Malang',
      province: 'Jawa Timur',
      postalCode: '65111',
      phoneNumber: '081234567890',
      nibNumber: 'NIB-912345678901234',
      npwpNumber: '99.999.999.9-999.999',
    },
  });

  const batik = await prisma.uMKMProfile.upsert({
    where: { userId: createdUsers['clerk_demo_batik'].id },
    update: {},
    create: {
      userId: createdUsers['clerk_demo_batik'].id,
      businessName: 'Batik Ciprat Nusantara',
      description:
        'Produksi batik ciprat khas Pekalongan dengan motif modern untuk kalangan muda.',
      categoryId: kategoriFashion.id,
      address: 'Jl. Batik Indah No. 45',
      city: 'Pekalongan',
      province: 'Jawa Tengah',
      postalCode: '51111',
      phoneNumber: '081345678901',
      nibNumber: 'NIB-912345678901235',
      npwpNumber: null,
    },
  });

  const kerajinan = await prisma.uMKMProfile.upsert({
    where: { userId: createdUsers['clerk_demo_kerajinan'].id },
    update: {},
    create: {
      userId: createdUsers['clerk_demo_kerajinan'].id,
      businessName: 'Kerajinan Tangan Lestari',
      description: 'Kerajinan anyaman bambu dan eceng gondok dari Yogyakarta.',
      categoryId: kategoriKerajinan.id,
      address: 'Jl. Kaliurang Km 7',
      city: 'Yogyakarta',
      province: 'DI Yogyakarta',
      postalCode: '55281',
      phoneNumber: '081456789012',
      nibNumber: null,
      npwpNumber: null,
    },
  });

  console.log('Seeding Legalitas Documents...');

  const adminUser = await prisma.user.findFirstOrThrow({
    where: { role: 'ADMIN' },
  });

  const docNibWarung = await prisma.legalitasDocument.upsert({
    where: {
      umkmProfileId_documentType: {
        umkmProfileId: warung.id,
        documentType: 'NIB',
      },
    },
    update: {},
    create: {
      umkmProfileId: warung.id,
      documentType: 'NIB',
      status: 'VERIFIED',
      fileUrl: 'https://storage.modava.id/demo/warung/nib.pdf',
      fileName: 'nib_warung.pdf',
      verifiedById: adminUser.id,
      submittedAt: new Date('2025-11-01'),
      verifiedAt: new Date('2025-11-05'),
    },
  });

  const docNpwpWarung = await prisma.legalitasDocument.upsert({
    where: {
      umkmProfileId_documentType: {
        umkmProfileId: warung.id,
        documentType: 'NPWP',
      },
    },
    update: {},
    create: {
      umkmProfileId: warung.id,
      documentType: 'NPWP',
      status: 'VERIFIED',
      fileUrl: 'https://storage.modava.id/demo/warung/npwp.pdf',
      fileName: 'npwp_warung.pdf',
      verifiedById: adminUser.id,
      submittedAt: new Date('2025-11-01'),
      verifiedAt: new Date('2025-11-05'),
    },
  });

  await prisma.legalitasDocument.upsert({
    where: {
      umkmProfileId_documentType: {
        umkmProfileId: warung.id,
        documentType: 'IUMK',
      },
    },
    update: {},
    create: {
      umkmProfileId: warung.id,
      documentType: 'IUMK',
      status: 'SUBMITTED',
      fileUrl: 'https://storage.modava.id/demo/warung/iumk.pdf',
      fileName: 'iumk_warung.pdf',
      submittedAt: new Date('2026-01-15'),
    },
  });

  await prisma.legalitasDocument.upsert({
    where: {
      umkmProfileId_documentType: {
        umkmProfileId: batik.id,
        documentType: 'NIB',
      },
    },
    update: {},
    create: {
      umkmProfileId: batik.id,
      documentType: 'NIB',
      status: 'VERIFIED',
      fileUrl: 'https://storage.modava.id/demo/batik/nib.pdf',
      fileName: 'nib_batik.pdf',
      verifiedById: adminUser.id,
      submittedAt: new Date('2026-01-10'),
      verifiedAt: new Date('2026-01-15'),
    },
  });

  await prisma.legalitasDocument.upsert({
    where: {
      umkmProfileId_documentType: {
        umkmProfileId: batik.id,
        documentType: 'NPWP',
      },
    },
    update: {},
    create: {
      umkmProfileId: batik.id,
      documentType: 'NPWP',
      status: 'SUBMITTED',
      fileUrl: 'https://storage.modava.id/demo/batik/npwp.pdf',
      fileName: 'npwp_batik.pdf',
      submittedAt: new Date('2026-02-01'),
    },
  });

  console.log('Seeding Cash Flow Transactions...');

  const currentYear = 2026;

  const warungTransactions: Array<{
    type: 'INCOME' | 'EXPENSE';
    amount: string;
    description: string;
    category: string;
    transactionDate: Date;
  }> = [];

  const warungMonthlyData = [
    { month: 1, income: '15000000', expense: '9500000' },
    { month: 2, income: '16500000', expense: '10200000' },
    { month: 3, income: '18000000', expense: '11000000' },
    { month: 4, income: '17000000', expense: '10500000' },
    { month: 5, income: '19000000', expense: '11500000' },
    { month: 6, income: '20000000', expense: '12000000' },
  ];

  for (const md of warungMonthlyData) {
    warungTransactions.push({
      type: 'INCOME',
      amount: md.income,
      description: `Pendapatan warung bulan ${md.month}`,
      category: 'Penjualan',
      transactionDate: new Date(currentYear, md.month - 1, 28),
    });
    warungTransactions.push({
      type: 'EXPENSE',
      amount: md.expense,
      description: `Biaya operasional bulan ${md.month}`,
      category: 'Operasional',
      transactionDate: new Date(currentYear, md.month - 1, 25),
    });
  }

  for (const t of warungTransactions) {
    await prisma.cashFlowTransaction.create({
      data: { umkmProfileId: warung.id, ...t },
    });
  }

  const batikMonthlyData = [
    { month: 4, income: '8000000', expense: '5500000' },
    { month: 5, income: '9500000', expense: '6200000' },
    { month: 6, income: '11000000', expense: '7000000' },
  ];

  for (const md of batikMonthlyData) {
    await prisma.cashFlowTransaction.create({
      data: {
        umkmProfileId: batik.id,
        type: 'INCOME',
        amount: md.income,
        description: `Pendapatan batik bulan ${md.month}`,
        category: 'Penjualan',
        transactionDate: new Date(currentYear, md.month - 1, 28),
      },
    });
    await prisma.cashFlowTransaction.create({
      data: {
        umkmProfileId: batik.id,
        type: 'EXPENSE',
        amount: md.expense,
        description: `Biaya produksi bulan ${md.month}`,
        category: 'Produksi',
        transactionDate: new Date(currentYear, md.month - 1, 25),
      },
    });
  }

  await prisma.cashFlowTransaction.create({
    data: {
      umkmProfileId: kerajinan.id,
      type: 'INCOME',
      amount: '3000000',
      description: 'Pendapatan anyaman bulan Juni',
      category: 'Penjualan',
      transactionDate: new Date(2026, 5, 28),
    },
  });

  console.log('Seeding CashFlowMonthlySummary...');

  for (const md of warungMonthlyData) {
    const income = Number(md.income);
    const expense = Number(md.expense);
    await prisma.cashFlowMonthlySummary.upsert({
      where: {
        umkmProfileId_month_year: {
          umkmProfileId: warung.id,
          month: md.month,
          year: currentYear,
        },
      },
      update: {},
      create: {
        umkmProfileId: warung.id,
        month: md.month,
        year: currentYear,
        totalIncome: md.income,
        totalExpense: md.expense,
        netProfit: String(income - expense),
        transactionCount: 2,
      },
    });
  }

  for (const md of batikMonthlyData) {
    const income = Number(md.income);
    const expense = Number(md.expense);
    await prisma.cashFlowMonthlySummary.upsert({
      where: {
        umkmProfileId_month_year: {
          umkmProfileId: batik.id,
          month: md.month,
          year: currentYear,
        },
      },
      update: {},
      create: {
        umkmProfileId: batik.id,
        month: md.month,
        year: currentYear,
        totalIncome: md.income,
        totalExpense: md.expense,
        netProfit: String(income - expense),
        transactionCount: 2,
      },
    });
  }

  await prisma.cashFlowMonthlySummary.upsert({
    where: {
      umkmProfileId_month_year: {
        umkmProfileId: kerajinan.id,
        month: 6,
        year: currentYear,
      },
    },
    update: {},
    create: {
      umkmProfileId: kerajinan.id,
      month: 6,
      year: currentYear,
      totalIncome: '3000000',
      totalExpense: '0',
      netProfit: '3000000',
      transactionCount: 1,
    },
  });

  console.log('Seeding CreditScores...');

  const warungCreditScore = await prisma.creditScore.upsert({
    where: { id: '' },
    update: {},
    create: {
      umkmProfileId: warung.id,
      overallScore: 3.42,
      cashFlowScore: 3.85,
      legalitasScore: 3.2,
      platformHistoryScore: 2.8,
      tier: 'B',
      breakdown: {
        cashFlowScore: 3.85,
        legalitasScore: 3.2,
        platformHistoryScore: 2.8,
        weightFormula: '0.5 * cashFlow + 0.3 * legalitas + 0.2 * platform',
        scale: '0.00 - 4.00',
        calculatedAt: new Date().toISOString(),
        recommendations: [
          {
            field: 'legalitas',
            message:
              'Lengkapi IUMK (Izin Usaha Mikro dan Kecil) untuk meningkatkan skor legalitas.',
            potential: '+0.2 poin',
          },
        ],
      },
    },
  });

  await prisma.creditScore.upsert({
    where: { id: '' },
    update: {},
    create: {
      umkmProfileId: batik.id,
      overallScore: 2.35,
      cashFlowScore: 2.6,
      legalitasScore: 1.6,
      platformHistoryScore: 2.4,
      tier: 'C',
      breakdown: {
        cashFlowScore: 2.6,
        legalitasScore: 1.6,
        platformHistoryScore: 2.4,
        weightFormula: '0.5 * cashFlow + 0.3 * legalitas + 0.2 * platform',
        scale: '0.00 - 4.00',
        calculatedAt: new Date().toISOString(),
        recommendations: [
          {
            field: 'legalitas',
            message: 'Lengkapi NPWP untuk meningkatkan skor legalitas.',
            potential: '+0.2 poin',
          },
          {
            field: 'legalitas',
            message:
              'Lengkapi IUMK (Izin Usaha Mikro dan Kecil) untuk meningkatkan skor legalitas.',
            potential: '+0.2 poin',
          },
        ],
      },
    },
  });

  await prisma.creditScore.upsert({
    where: { id: '' },
    update: {},
    create: {
      umkmProfileId: kerajinan.id,
      overallScore: 0.96,
      cashFlowScore: 1.2,
      legalitasScore: 0,
      platformHistoryScore: 0,
      tier: 'D',
      breakdown: {
        cashFlowScore: 1.2,
        legalitasScore: 0,
        platformHistoryScore: 0,
        weightFormula: '0.5 * cashFlow + 0.3 * legalitas + 0.2 * platform',
        scale: '0.00 - 4.00',
        calculatedAt: new Date().toISOString(),
        recommendations: [
          {
            field: 'legalitas',
            message:
              'Lengkapi NIB (Nomor Induk Berusaha) untuk meningkatkan skor legalitas.',
            potential: '+0.2 poin',
          },
          {
            field: 'legalitas',
            message: 'Lengkapi NPWP untuk meningkatkan skor legalitas.',
            potential: '+0.2 poin',
          },
          {
            field: 'legalitas',
            message:
              'Lengkapi IUMK (Izin Usaha Mikro dan Kecil) untuk meningkatkan skor legalitas.',
            potential: '+0.2 poin',
          },
          {
            field: 'cashFlow',
            message:
              'Catat arus kas 3 bulan berturut-turut untuk +0,3 poin pada skor arus kas.',
            potential: '+0.3 poin',
          },
          {
            field: 'platform',
            message:
              'Buat campaign crowdfunding pertama Anda untuk mendapatkan skor riwayat platform.',
            potential: '+1.2 poin',
          },
        ],
      },
    },
  });

  console.log('Seeding LoanSimulations...');

  const loanWarung = await prisma.loanSimulation.create({
    data: {
      umkmProfileId: warung.id,
      amount: '10000000',
      tenor: 12,
      interestRate: 0.5,
      monthlyPayment: '858333',
      totalPayment: '10300000',
      totalInterest: '300000',
    },
  });

  const loanBatik = await prisma.loanSimulation.create({
    data: {
      umkmProfileId: batik.id,
      amount: '5000000',
      tenor: 6,
      interestRate: 0.5,
      monthlyPayment: '847917',
      totalPayment: '5087500',
      totalInterest: '87500',
    },
  });

  console.log('Seeding Campaigns...');

  const campaignWarung = await prisma.campaign.create({
    data: {
      umkmProfileId: warung.id,
      title: 'Perluasan Warung Makan Sari Rasa',
      description:
        'Kami ingin memperluas warung makan untuk menambah kapasitas tempat duduk dan membuka cabang baru di area kampus Universitas Brawijaya. Dana akan digunakan untuk renovasi, pembelian peralatan dapur, dan modal kerja 3 bulan pertama.',
      fundingGoal: '10000000',
      amountRaised: '3500000',
      status: 'ACTIVE',
      startDate: new Date('2026-06-01'),
      endDate: new Date('2026-08-01'),
      loanSimulationId: loanWarung.id,
    },
  });

  await prisma.campaign.create({
    data: {
      umkmProfileId: batik.id,
      title: 'Pengembangan Motif Batik Digital',
      description:
        'Mengembangkan motif batik baru dengan sentuhan digital untuk menarik pasar milenial. Dana akan digunakan untuk pelatihan desain, pembelian software, dan pemasaran digital.',
      fundingGoal: '5000000',
      amountRaised: '0',
      status: 'DRAFT',
      loanSimulationId: loanBatik.id,
    },
  });

  console.log('Seeding Pledges...');

  const contributorUser = createdUsers['clerk_demo_contributor'];

  await prisma.pledge.create({
    data: {
      campaignId: campaignWarung.id,
      userId: contributorUser.id,
      amount: '3500000',
      message: 'Semangat buka cabang barunya! 🙌',
    },
  });

  console.log('Seeding Campaign Media...');

  await prisma.campaignMedia.create({
    data: {
      campaignId: campaignWarung.id,
      fileUrl: 'https://storage.modava.id/demo/warung/campaign.jpg',
      fileType: 'IMAGE',
      isPrimary: true,
    },
  });

  console.log('Seeding Fund Usage Reports...');

  await prisma.fundUsageReport.create({
    data: {
      campaignId: campaignWarung.id,
      description: 'Renovasi tempat duduk',
      amount: '4000000',
      status: 'PLANNED',
    },
  });

  await prisma.fundUsageReport.create({
    data: {
      campaignId: campaignWarung.id,
      description: 'Peralatan dapur baru',
      amount: '3500000',
      status: 'PLANNED',
    },
  });

  await prisma.fundUsageReport.create({
    data: {
      campaignId: campaignWarung.id,
      description: 'Modal kerja 3 bulan',
      amount: '2500000',
      status: 'PLANNED',
    },
  });

  console.log('Seeding Notifications...');

  await prisma.notification.create({
    data: {
      userId: createdUsers['clerk_demo_warung_makan'].id,
      type: 'SCORE_UPDATED',
      title: 'Skor kelayakan diperbarui!',
      message: 'Skor kelayakan keuangan Anda kini 3.42 (Tier B).',
      referenceId: warungCreditScore.id,
      referenceType: 'credit_score',
    },
  });

  await prisma.notification.create({
    data: {
      userId: createdUsers['clerk_demo_warung_makan'].id,
      type: 'LEGALITAS_VERIFIED',
      title: 'Dokumen terverifikasi!',
      message: 'Dokumen NIB Anda telah diverifikasi oleh admin.',
      referenceId: docNibWarung.id,
      referenceType: 'legalitas',
    },
  });

  await prisma.notification.create({
    data: {
      userId: createdUsers['clerk_demo_warung_makan'].id,
      type: 'LEGALITAS_VERIFIED',
      title: 'Dokumen terverifikasi!',
      message: 'Dokumen NPWP Anda telah diverifikasi oleh admin.',
      referenceId: docNpwpWarung.id,
      referenceType: 'legalitas',
    },
  });

  await prisma.notification.create({
    data: {
      userId: contributorUser.id,
      type: 'PLEDGE_NEW',
      title: 'Pendanaan berhasil!',
      message:
        'Anda telah mendanai campaign "Perluasan Warung Makan Sari Rasa" sebesar Rp3.500.000.',
      referenceId: campaignWarung.id,
      referenceType: 'campaign',
    },
  });

  console.log('');
  console.log('=== Seed completed successfully! ===');
  console.log();
  console.log('Demo accounts (Clerk User IDs):');
  console.log('  UMKM (Warung):  clerk_demo_warung_makan');
  console.log('  UMKM (Batik):   clerk_demo_batik');
  console.log('  UMKM (Kerajinan): clerk_demo_kerajinan');
  console.log('  Contributor:    clerk_demo_contributor');
  console.log('  Admin:          clerk_demo_admin');
  console.log();
  console.log('Admin email: admin@demo.modava.id');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
