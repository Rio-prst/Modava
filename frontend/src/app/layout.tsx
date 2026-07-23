import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Modava - Modal untuk UMKM Naik Kelas",
  description:
    "Solusi finansial terintegrasi untuk usaha mikro. Dari pencatatan keuangan otomatis hingga akses permodalan kolektif yang transparan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={plusJakartaSans.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
