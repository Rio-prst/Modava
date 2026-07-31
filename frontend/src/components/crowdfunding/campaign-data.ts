export interface Campaign {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  raised: number;
  target: number;
  daysLeft: number;
  status: "aktif" | "selesai";
}

export const campaigns: Campaign[] = [
  {
    id: 1,
    title: "Batik Modern Sahid",
    category: "KERAJINAN",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600",
    description: "Mengembangkan motif batik kontemporer dengan sentuhan digital printing untuk pasar milenial.",
    raised: 85000000,
    target: 85000000,
    daysLeft: 0,
    status: "selesai",
  },
  {
    id: 2,
    title: "Kopi Arabika Gayo",
    category: "KULINER",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    description: "Ekspansi lahan kopi arabika gayo dengan sistem agroforestri berkelanjutan.",
    raised: 45000000,
    target: 60000000,
    daysLeft: 12,
    status: "aktif",
  },
  {
    id: 3,
    title: "Ternak Lele Organik",
    category: "AGRIKULTUR",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600",
    description: "Budidaya lele organik dengan pakan fermentasi untuk hasil panen berkualitas ekspor.",
    raised: 18000000,
    target: 25000000,
    daysLeft: 24,
    status: "aktif",
  },
  {
    id: 4,
    title: "Tenun Ikat Nusantara",
    category: "TEKSTIL",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    description: "Melestarikan tenun ikat tradisional dengan desain modern untuk pasar global.",
    raised: 120000000,
    target: 120000000,
    daysLeft: 0,
    status: "selesai",
  },
  {
    id: 5,
    title: "Abon Ikan Tenggiri",
    category: "KULINER",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600",
    description: "Produksi abon ikan tenggiri homemade tanpa pengawet siap bersaing di pasar modern.",
    raised: 9000000,
    target: 30000000,
    daysLeft: 18,
    status: "aktif",
  },
  {
    id: 6,
    title: "Keripik Pisang Aroma",
    category: "KULINER",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    description: "Inovasi keripik pisang dengan varian rasa kekinian untuk oleh-oleh khas daerah.",
    raised: 55000000,
    target: 55000000,
    daysLeft: 0,
    status: "selesai",
  },
  {
    id: 7,
    title: "Mebel Rotan Cirebon",
    category: "KERAJINAN",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600",
    description: "Pengrajin rotan Cirebon go digital dengan koleksi furnitur minimalis kekinian.",
    raised: 35000000,
    target: 75000000,
    daysLeft: 30,
    status: "aktif",
  },
  {
    id: 8,
    title: "Madu Hutan Sumbawa",
    category: "AGRIKULTUR",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    description: "Panen madu hutan Sumbawa dengan teknik lestari dan sertifikasi organik.",
    raised: 95000000,
    target: 100000000,
    daysLeft: 5,
    status: "aktif",
  },
];
