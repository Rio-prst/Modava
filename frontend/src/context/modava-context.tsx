"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import {
  fetchCashFlowTransactions,
  createCashFlowTransaction,
  removeCashFlowTransaction,
  fetchPublicCampaigns,
  createCampaign as apiCreateCampaign
} from "@/lib/api-client";

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

export interface Campaign {
  id: string;
  title: string;
  category: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  daysLeft: number;
  status: string;
  image?: string;
  fundAllocation?: string;
  tenor?: number;
}

export interface Contribution {
  id: string;
  campaignId?: string;
  campaignTitle: string;
  category: string;
  amount: number;
  date: string;
  type: "pledge" | "return" | "deposit" | "withdraw";
  status: string;
  image?: string;
  target?: number;
  progress?: number;
  daysLeft?: number;
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

  campaigns: Campaign[];
  addCampaign: (campaign: Omit<Campaign, "id" | "currentAmount" | "status" | "daysLeft">) => void;

  contributions: Contribution[];
  addContribution: (campaignId: string, campaignTitle: string, category: string, amount: number, image?: string) => void;
  totalContributionAmount: number;

  walletBalance: number;
  depositWallet: (amount: number, method: string) => void;
  withdrawWallet: (amount: number, bank: string, accountNum: string) => boolean;

  creditScore: number;
  creditScoreTier: string;
  isLoadingApi: boolean;
  loadDemoData: () => void;
  clearAllData: () => void;
}

const ModavaContext = createContext<ModavaContextType | undefined>(undefined);

const defaultLegalDocs: LegalDoc[] = [
  { id: "nib", name: "Nomor Induk Berusaha (NIB)", status: "none", date: "-", file: null },
  { id: "npwp", name: "NPWP Usaha / Perorangan", status: "none", date: "-", file: null },
  { id: "halal", name: "Sertifikat Halal MUI / BPJPH", status: "none", date: "-", file: null },
  { id: "pirt", name: "Izin P-IRT", status: "none", date: "-", file: null },
  { id: "tdp", name: "Tanda Daftar Perusahaan (TDP)", status: "none", date: "-", file: null },
];

const demoTransactions: Transaction[] = [
  { id: "tx-1", date: "2026-07-24", type: "in", category: "Penjualan Sembako", amount: 1500000, note: "Pemasukan Harian Warung" },
  { id: "tx-2", date: "2026-07-23", type: "in", category: "Katering Acara", amount: 3500000, note: "DP Katering Syukuran" },
  { id: "tx-3", date: "2026-07-22", type: "out", category: "Stok Barang", amount: 2000000, note: "Beli Beras & Minyak Goreng" },
  { id: "tx-4", date: "2026-07-20", type: "in", category: "Penjualan Eceran", amount: 1200000, note: "Penjualan Toko" },
  { id: "tx-5", date: "2026-07-18", type: "out", category: "Operasional Usaha", amount: 500000, note: "Listrik & Air" },
];

const demoLegalDocs: LegalDoc[] = [
  { id: "nib", name: "Nomor Induk Berusaha (NIB)", status: "verified", date: "12 Mei 2026", file: "NIB_WarungBerkah_2026.pdf" },
  { id: "npwp", name: "NPWP Usaha / Perorangan", status: "verified", date: "15 Mei 2026", file: "NPWP_SriRaharju.pdf" },
  { id: "halal", name: "Sertifikat Halal MUI / BPJPH", status: "pending", date: "22 Juli 2026", file: "Pengajuan_Sertifikat_Halal.pdf" },
  { id: "pirt", name: "Izin P-IRT", status: "none", date: "-", file: null },
  { id: "tdp", name: "Tanda Daftar Perusahaan (TDP)", status: "none", date: "-", file: null },
];

const demoCampaigns: Campaign[] = [
  {
    id: "c-demo-1",
    title: "Ekspansi Cabang Warung Berkah - Sudirman",
    category: "Kuliner & Olahan Makanan",
    description: "Dana digunakan untuk renovasi tempat dan alat dapur baru.",
    targetAmount: 50000000,
    currentAmount: 42500000,
    daysLeft: 12,
    status: "ACTIVE",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
  },
];

const demoContributions: Contribution[] = [
  {
    id: "act-1",
    campaignId: "c-demo-1",
    campaignTitle: "Batik Keraton Solo",
    category: "Produksi",
    amount: 5000000,
    date: "2026-07-25",
    type: "pledge",
    status: "Berhasil",
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&q=80&w=800",
    progress: 85,
    daysLeft: 12,
    target: 50000000,
  },
];

export function ModavaProvider({ children }: { children: React.ReactNode }) {
  const { getToken, isSignedIn } = useAuth();
  const [isLoadingApi, setIsLoadingApi] = useState(false);

  // Default state: clean transactions, clean legal docs, clean campaigns
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [legalDocs, setLegalDocs] = useState<LegalDoc[]>(defaultLegalDocs);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [walletBalance, setWalletBalance] = useState<number>(0);

  // Load Initial Data from NestJS API Backend with Clerk Token
  useEffect(() => {
    async function loadApiData() {
      setIsLoadingApi(true);
      try {
        let token: string | null = null;
        if (isSignedIn && getToken) {
          token = await getToken();
        }

        const res = await fetchCashFlowTransactions(token);
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          const mapped: Transaction[] = (res.data as Array<Record<string, unknown>>).map((t) => ({
            id: String(t.id || `tx-${Math.random()}`),
            date: t.date || t.transactionDate ? new Date(String(t.date || t.transactionDate)).toISOString().split("T")[0] : "2026-07-28",
            type: t.type === "EXPENSE" || t.type === "out" ? "out" : "in",
            category: String(t.category || "Transaksi Usaha"),
            amount: Number(t.amount) || 0,
            note: String(t.description || t.notes || t.note || "Transaksi Catatan Usaha"),
          }));
          setTransactions(mapped);
        }

        const campRes = await fetchPublicCampaigns();
        if (campRes.success && Array.isArray(campRes.data) && campRes.data.length > 0) {
          const mappedCamps: Campaign[] = (campRes.data as Array<Record<string, unknown>>).map((c) => ({
            id: String(c.id || `c-${Math.random()}`),
            title: String(c.title || "Campaign Permodalan"),
            category: String(c.category || "Kuliner & Olahan Makanan"),
            description: String(c.description || "Deskripsi campaign modal"),
            targetAmount: Number(c.fundingGoal || c.targetAmount) || 10000000,
            currentAmount: Number(c.amountRaised || c.currentAmount) || 0,
            daysLeft: 30,
            status: String(c.status || "ACTIVE"),
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
          }));
          setCampaigns(mappedCamps);
        }
      } catch (err) {
        console.log("No remote data found for account:", err);
      } finally {
        setIsLoadingApi(false);
      }
    }

    loadApiData();
  }, [isSignedIn, getToken]);

  // Add & Delete Transactions with API Sync
  const addTransaction = async (tx: Omit<Transaction, "id">) => {
    const newTx: Transaction = { ...tx, id: `tx-${Date.now()}` };
    setTransactions((prev) => [newTx, ...prev]);

    try {
      const token = isSignedIn && getToken ? await getToken() : null;
      await createCashFlowTransaction({
        type: tx.type === "out" ? "EXPENSE" : "INCOME",
        amount: tx.amount,
        category: tx.category,
        date: tx.date,
        notes: tx.note,
      }, token);
    } catch {
      console.warn("Background API post fallback active");
    }
  };

  const deleteTransaction = async (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    if (!id.startsWith("tx-")) {
      try {
        const token = isSignedIn && getToken ? await getToken() : null;
        await removeCashFlowTransaction(id, token);
      } catch {
        console.warn("Background API delete fallback active");
      }
    }
  };

  // Add Crowdfunding Campaign with API Sync
  const addCampaign = async (newCamp: Omit<Campaign, "id" | "currentAmount" | "status" | "daysLeft">) => {
    const created: Campaign = {
      ...newCamp,
      id: `c-${Date.now()}`,
      currentAmount: 0,
      daysLeft: 30,
      status: "ACTIVE",
      image: newCamp.image || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
    };
    setCampaigns((prev) => [created, ...prev]);

    try {
      const token = isSignedIn && getToken ? await getToken() : null;
      await apiCreateCampaign({
        title: newCamp.title,
        fundingGoal: newCamp.targetAmount,
        description: newCamp.description,
        durationDays: 30,
      }, token);
    } catch {
      console.warn("Background campaign creation fallback active");
    }
  };

  // Add Contribution / Pledge
  const addContribution = (campaignId: string, campaignTitle: string, category: string, amount: number, image?: string) => {
    const newContrib: Contribution = {
      id: `contrib-${Date.now()}`,
      campaignId,
      campaignTitle,
      category,
      amount,
      date: new Date().toISOString().split("T")[0],
      type: "pledge",
      status: "Berhasil",
      image: image || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
      progress: 10,
      daysLeft: 30,
      target: 50000000,
    };
    setContributions((prev) => [newContrib, ...prev]);
  };

  // Deposit Wallet
  const depositWallet = (amount: number, method: string) => {
    setWalletBalance((prev) => prev + amount);
    const newContrib: Contribution = {
      id: `dep-${Date.now()}`,
      campaignTitle: `Top Up Saldo (${method})`,
      category: "Deposit Saldo",
      amount,
      date: new Date().toISOString().split("T")[0],
      type: "deposit",
      status: "Berhasil",
    };
    setContributions((prev) => [newContrib, ...prev]);
  };

  // Withdraw Wallet
  const withdrawWallet = (amount: number, bank: string, accountNum: string) => {
    if (amount > walletBalance) {
      return false; // Insufficient balance
    }
    setWalletBalance((prev) => prev - amount);
    const newContrib: Contribution = {
      id: `wd-${Date.now()}`,
      campaignTitle: `Penarikan Dana (${bank} - ${accountNum})`,
      category: "Tarik Saldo",
      amount,
      date: new Date().toISOString().split("T")[0],
      type: "withdraw",
      status: "Berhasil",
    };
    setContributions((prev) => [newContrib, ...prev]);
    return true;
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

  // Helper functions for demo testing
  const loadDemoData = () => {
    setTransactions(demoTransactions);
    setLegalDocs(demoLegalDocs);
    setCampaigns(demoCampaigns);
    setContributions(demoContributions);
    setWalletBalance(10000000);
  };

  const clearAllData = () => {
    setTransactions([]);
    setLegalDocs(defaultLegalDocs);
    setCampaigns([]);
    setContributions([]);
    setWalletBalance(0);
  };

  // Aggregated Calculations
  const monthlyIncome = transactions
    .filter((t) => t.type === "in")
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpense = transactions
    .filter((t) => t.type === "out")
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyNetProfit = monthlyIncome - monthlyExpense;

  const totalContributionAmount = contributions
    .filter((c) => c.type === "pledge")
    .reduce((sum, c) => sum + c.amount, 0);

  // Dynamic Score Calculation (PRD Section 6)
  const verifiedLegalCount = legalDocs.filter((d) => d.status === "verified").length;
  const legalScorePart = (verifiedLegalCount / legalDocs.length) * 100 * 0.3; // max 30 pts
  const cashflowScorePart = monthlyNetProfit > 2000000 ? 50 : (monthlyNetProfit > 0 ? 30 : 10); // max 50 pts
  const platformScorePart = transactions.length > 0 ? 20 : 0; // max 20 pts

  const creditScore = Math.min(Math.round(cashflowScorePart + legalScorePart + platformScorePart), 100);
  let creditScoreTier = "D (Perlu Perbaikan)";
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
        campaigns,
        addCampaign,
        contributions,
        addContribution,
        totalContributionAmount,
        walletBalance,
        depositWallet,
        withdrawWallet,
        creditScore,
        creditScoreTier,
        isLoadingApi,
        loadDemoData,
        clearAllData,
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
