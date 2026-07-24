"use client";

import { useState } from "react";
import { Search, ArrowDownRight, ArrowUpRight, Trash2, Calendar } from "lucide-react";
import { Transaction } from "./cash-flow-data";

interface TransactionTableProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

export default function TransactionTable({
  transactions,
  onDeleteTransaction,
}: TransactionTableProps) {
  const [filterType, setFilterType] = useState<"all" | "in" | "out">("all");
  const [search, setSearch] = useState<string>("");

  const filtered = transactions.filter((t) => {
    const matchesType = filterType === "all" || t.type === filterType;
    const matchesSearch =
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100/60 shadow-sm space-y-5">
      {/* Header controls: Tabs + Search + Month Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-2xl border border-gray-200/60 self-start">
          <button
            onClick={() => setFilterType("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              filterType === "all"
                ? "bg-white text-[#0A2328] shadow-sm"
                : "text-[#556061] hover:text-[#0A2328]"
            }`}
          >
            Semua ({transactions.length})
          </button>
          <button
            onClick={() => setFilterType("in")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              filterType === "in"
                ? "bg-[#13634E] text-white shadow-sm"
                : "text-[#556061] hover:text-[#0A2328]"
            }`}
          >
            Masuk ({transactions.filter((t) => t.type === "in").length})
          </button>
          <button
            onClick={() => setFilterType("out")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              filterType === "out"
                ? "bg-[#B91C1C] text-white shadow-sm"
                : "text-[#556061] hover:text-[#0A2328]"
            }`}
          >
            Keluar ({transactions.filter((t) => t.type === "out").length})
          </button>
        </div>

        {/* Search & Month Filter */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari transaksi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-gray-200 rounded-xl text-xs font-medium text-[#0A2328] focus:outline-none focus:ring-2 focus:ring-[#86E3CE]"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-[#FAF8F5] border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold text-[#0A2328]">
            <Calendar className="w-3.5 h-3.5 text-[#556061]" />
            <span>Mei 2024</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-[11px] font-bold text-[#556061] uppercase tracking-wider">
              <th className="py-3 px-4">Tanggal</th>
              <th className="py-3 px-4">Kategori & Keterangan</th>
              <th className="py-3 px-4">Tipe</th>
              <th className="py-3 px-4 text-right">Nominal</th>
              <th className="py-3 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-xs">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-[#556061]">
                  Tidak ada transaksi yang ditemukan.
                </td>
              </tr>
            ) : (
              filtered.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-[#FAF8F5]/60 transition-colors group"
                >
                  <td className="py-3.5 px-4 font-medium text-[#556061] whitespace-nowrap">
                    {new Date(tx.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-[#0A2328]">{tx.description}</p>
                    <p className="text-[11px] text-[#556061]">{tx.category}</p>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {tx.type === "in" ? (
                      <span className="inline-flex items-center gap-1 bg-[#DCFCE7] text-[#166534] text-[11px] font-bold px-2.5 py-1 rounded-full">
                        <ArrowDownRight className="w-3 h-3" />
                        Pemasukan
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-rose-100 text-[#B91C1C] text-[11px] font-bold px-2.5 py-1 rounded-full">
                        <ArrowUpRight className="w-3 h-3" />
                        Pengeluaran
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold whitespace-nowrap">
                    <span
                      className={
                        tx.type === "in" ? "text-[#166534]" : "text-[#B91C1C]"
                      }
                    >
                      {tx.type === "in" ? "+" : "-"} Rp{" "}
                      {tx.amount.toLocaleString("id-ID")}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <button
                      onClick={() => onDeleteTransaction(tx.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Hapus Transaksi"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
