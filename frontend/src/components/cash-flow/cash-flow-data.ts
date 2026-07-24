export interface Transaction {
  id: string;
  date: string;
  type: "in" | "out";
  category: string;
  description: string;
  amount: number;
}

export const initialTransactions: Transaction[] = [
  {
    id: "tx-1",
    date: "2024-05-24",
    type: "in",
    category: "Penjualan Produk",
    description: "Pesanan Katering Kantor PT Maju Bersama",
    amount: 4500000,
  },
  {
    id: "tx-2",
    date: "2024-05-23",
    type: "out",
    category: "Bahan Baku",
    description: "Pembelian Beras, Daging, & Bumbu Dapur",
    amount: 1850000,
  },
  {
    id: "tx-3",
    date: "2024-05-22",
    type: "in",
    category: "Penjualan Harian",
    description: "Omzet Warung Makan Cabang Utama",
    amount: 2100000,
  },
  {
    id: "tx-4",
    date: "2024-05-20",
    type: "out",
    category: "Gaji & Uang Makan",
    description: "Gaji 3 Karyawan Dapur (Minggu ke-3)",
    amount: 1500000,
  },
  {
    id: "tx-5",
    date: "2024-05-18",
    type: "out",
    category: "Operasional & Listrik",
    description: "Pembayaran Listrik & Token Gas Elpiji",
    amount: 650000,
  },
  {
    id: "tx-6",
    date: "2024-05-15",
    type: "in",
    category: "Penjualan Produk",
    description: "Katering Acara Syukuran Pernikahan",
    amount: 8500000,
  },
  {
    id: "tx-7",
    date: "2024-05-12",
    type: "out",
    category: "Bahan Baku",
    description: "Stok Kemasan & Box Makanan Eco-friendly",
    amount: 1200000,
  },
  {
    id: "tx-8",
    date: "2024-05-10",
    type: "in",
    category: "Penjualan Harian",
    description: "Omzet Rata-rata Mingguan Warung",
    amount: 9900000,
  },
];

export const categoryOptions = {
  in: ["Penjualan Harian", "Penjualan Produk", "Jasa Katering", "Investasi / Modal", "Lain-lain"],
  out: ["Bahan Baku", "Operasional & Listrik", "Gaji & Uang Makan", "Sewa Tempat", "Kemasan & Peralatan", "Lain-lain"],
};
