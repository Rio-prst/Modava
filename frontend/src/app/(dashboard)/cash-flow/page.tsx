"use client";

import { useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import CashFlowMetrics from "@/components/cash-flow/cash-flow-metrics";
import TransactionTable from "@/components/cash-flow/transaction-table";
import TransactionModal from "@/components/cash-flow/transaction-modal";
import { initialTransactions, Transaction } from "@/components/cash-flow/cash-flow-data";

export default function CashFlowPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalDefaultType, setModalDefaultType] = useState<"in" | "out">("in");

  const handleAddTransaction = (newTx: Omit<Transaction, "id">) => {
    const created: Transaction = {
      ...newTx,
      id: `tx-${Date.now()}`,
    };
    setTransactions((prev) => [created, ...prev]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const openModal = (type: "in" | "out") => {
    setModalDefaultType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header & Primary Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#0A2328]">
            Cash Flow Tracker
          </h1>
          <p className="text-sm text-[#556061] mt-1">
            Pencatatan pemasukan & pengeluaran harian untuk menjaga kesehatan arus kas usaha.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openModal("in")}
            className="inline-flex items-center gap-2 bg-[#13634E] hover:bg-[#0e4b3b] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-sm"
          >
            <ArrowDownRight className="w-4 h-4" />
            + Pemasukan
          </button>
          <button
            onClick={() => openModal("out")}
            className="inline-flex items-center gap-2 bg-[#B91C1C] hover:bg-[#991b1b] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-sm"
          >
            <ArrowUpRight className="w-4 h-4" />
            - Pengeluaran
          </button>
        </div>
      </div>

      {/* Summary Metrics Cards */}
      <CashFlowMetrics transactions={transactions} />

      {/* Transaction Table & Filter Section */}
      <TransactionTable
        transactions={transactions}
        onDeleteTransaction={handleDeleteTransaction}
      />

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTransaction={handleAddTransaction}
        defaultType={modalDefaultType}
      />
    </div>
  );
}
