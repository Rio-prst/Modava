"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchCashFlowTransactions, createCashFlowTransaction, removeCashFlowTransaction } from "@/lib/api-client";

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
  isLoadingApi: boolean;
}

const ModavaContext = createContext<ModavaContextType | undefined>(undefined);

export function ModavaProvider({ children }: { children: React.ReactNode }) {
  const [isLoadingApi, setIsLoadingApi] = useState(true);

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

  // Load Initial Data from NestJS API Backend with Fallback
  useEffect(() => {
    async function loadApiData() {
      setIsLoadingApi(true);
      try {
        const res = await fetchCashFlowTransactions();
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          const mapped: Transaction[] = (res.data as Array<Record<string, unknown>>).map((t) => ({
            id: String(t.id || `tx-${Math.random()}`),
            date: t.date ? new Date(String(t.date)).toISOString().split("T")[0] : "2026-07-28",
            type: t.type === "EXPENSE" || t.type === "out" ? "out" : "in",
            category: String(t.category || "Transaksi Usaha"),
            amount: Number(t.amount) || 0,
            note: String(t.notes || t.note || "Transaksi Catatan Usaha"),
          }));
          setTransactions(mapped);
        }
      } catch {
        console.warn("Using fallback local context state for transactions");
      } finally {
        setIsLoadingApi(false);
      }
    }

    loadApiData();
  }, []);

  // Add & Delete Transactions with API Sync
  const addTransaction = (tx: Omit<Transaction, "id">) => {
    const newTx: Transaction = { ...tx, id: `tx-${Date.now()}` };
    setTransactions((prev) => [newTx, ...prev]);

    // Async attempt to post to API in background
    createCashFlowTransaction({
      type: tx.type === "out" ? "EXPENSE" : "INCOME",
      amount: tx.amount,
      category: tx.category,
      date: tx.date,
      notes: tx.note,
    }).catch(() => console.warn("Background API post fallback active"));
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    if (!id.startsWith("tx-")) {
      removeCashFlowTransaction(id).catch(() => console.warn("Background API delete fallback active"));
    }
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
        isLoadingApi,
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
