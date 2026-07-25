"use client";

import React, { createContext, useContext, useState } from "react";

export interface Transaction {
  id: string;
  date: string;
  type: "in" | "out";
  category: string;
  amount: number;
  note: string;
}

export interface LegalDoc {
  id: string;
  name: string;
  status: "verified" | "pending" | "none";
  date: string;
  file: string | null;
}

interface ModavaContextType {
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  monthlyNetProfit: number;
  monthlyIncome: number;
  monthlyExpense: number;
  
  legalDocs: LegalDoc[];
  uploadLegalDoc: (docId: string, fileName: string) => void;

  creditScore: number;
  creditScoreTier: string;
}

const ModavaContext = createContext<ModavaContextType | undefined>(undefined);

export function ModavaProvider({ children }: { children: React.ReactNode }) {
  // Initial Mock Transactions
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "tx-1", date: "2026-07-24", type: "in", category: "Penjualan Sembako", amount: 1500000, note: "Pemasukan Harian Warung" },
    { id: "tx-2", date: "2026-07-23", type: "in", category: "Katering Acara", amount: 3500000, note: "DP Katering Syukuran" },
    { id: "tx-3", date: "2026-07-22", type: "out", category: "Stok Barang", amount: 2000000, note: "Beli Beras & Minyak Goreng" },
    { id: "tx-4", date: "2026-07-20", type: "in", category: "Penjualan Eceran", amount: 1200000, note: "Penjualan Toko" },
    { id: "tx-5", date: "2026-07-18", type: "out", category: "Operasional Usaha", amount: 500000, note: "Listrik & Air" },
  ]);

  // Initial Legal Documents
  const [legalDocs, setLegalDocs] = useState<LegalDoc[]>([
    { id: "nib", name: "Nomor Induk Berusaha (NIB)", status: "verified", date: "12 Mei 2026", file: "NIB_WarungBerkah_2026.pdf" },
    { id: "npwp", name: "NPWP Usaha / Perorangan", status: "verified", date: "15 Mei 2026", file: "NPWP_SriRaharju.pdf" },
    { id: "halal", name: "Sertifikat Halal MUI / BPJPH", status: "pending", date: "22 Juli 2026", file: "Pengajuan_Sertifikat_Halal.pdf" },
    { id: "pirt", name: "Izin P-IRT", status: "none", date: "-", file: null },
    { id: "tdp", name: "Tanda Daftar Perusahaan (TDP)", status: "none", date: "-", file: null },
  ]);

  // Add & Delete Transactions
  const addTransaction = (tx: Omit<Transaction, "id">) => {
    const newTx: Transaction = { ...tx, id: `tx-${Date.now()}` };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // Upload Legal Document
  const uploadLegalDoc = (docId: string, fileName: string) => {
    setLegalDocs((prev) =>
      prev.map((doc) =>
        doc.id === docId
          ? { ...doc, status: "pending", date: "Hari Ini", file: fileName }
          : doc
      )
    );
  };

  // Aggregated Calculations
  const monthlyIncome = transactions
    .filter((t) => t.type === "in")
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpense = transactions
    .filter((t) => t.type === "out")
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyNetProfit = monthlyIncome - monthlyExpense;

  // Dynamic Score Calculation (PRD Section 6)
  // Score = (0.5 * CashFlowScore) + (0.3 * LegalScore) + (0.2 * PlatformScore)
  const verifiedLegalCount = legalDocs.filter((d) => d.status === "verified").length;
  const legalScorePart = (verifiedLegalCount / legalDocs.length) * 100 * 0.3; // max 30 pts
  const cashflowScorePart = monthlyNetProfit > 2000000 ? 45 : 30; // max 50 pts
  const platformScorePart = 15; // max 20 pts

  const creditScore = Math.min(Math.round(cashflowScorePart + legalScorePart + platformScorePart), 100);
  let creditScoreTier = "B (Layak)";
  if (creditScore >= 80) creditScoreTier = "A (Sangat Layak)";
  else if (creditScore >= 60) creditScoreTier = "B (Layak)";
  else if (creditScore >= 40) creditScoreTier = "C (Cukup Layak)";
  else creditScoreTier = "D (Perlu Perbaikan)";

  return (
    <ModavaContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        monthlyNetProfit,
        monthlyIncome,
        monthlyExpense,
        legalDocs,
        uploadLegalDoc,
        creditScore,
        creditScoreTier,
      }}
    >
      {children}
    </ModavaContext.Provider>
  );
}

export function useModava() {
  const context = useContext(ModavaContext);
  if (!context) {
    throw new Error("useModava must be used within a ModavaProvider");
  }
  return context;
}
