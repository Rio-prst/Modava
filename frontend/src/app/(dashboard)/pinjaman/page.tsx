import { Metadata } from "next";
import { LoanCalculator } from "@/components/pinjaman/loan-calculator";

export const metadata: Metadata = {
  title: "Simulasi Pinjaman Mikro | Modava",
  description: "Hitung estimasi cicilan pinjaman mikro dan rasio kelayakan pembayaran usaha Anda.",
};

export default function PinjamanPage() {
  return <LoanCalculator />;
}
