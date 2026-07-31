"use client";

import { useState } from "react";
import { X, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { categoryOptions, Transaction } from "./cash-flow-data";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (tx: Omit<Transaction, "id">) => void;
  defaultType?: "in" | "out";
}

export default function TransactionModal({
  isOpen,
  onClose,
  onAddTransaction,
  defaultType = "in",
}: TransactionModalProps) {
  const [type, setType] = useState<"in" | "out">(defaultType);
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      setError("Masukkan nominal yang valid");
      return;
    }
    if (!category) {
      setError("Pilih kategori transaksi");
      return;
    }

    onAddTransaction({
      date,
      type,
      category,
      description: description || category,
      amount: parseFloat(amount),
    });

    // Reset & close
    setAmount("");
    setCategory("");
    setDescription("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#0A2328]">Catat Transaksi</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Type selector tabs */}
        <div className="grid grid-cols-2 gap-2 bg-[#FAF8F5] p-1.5 rounded-2xl border border-gray-200/60">
          <button
            type="button"
            onClick={() => {
              setType("in");
              setCategory("");
            }}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              type === "in"
                ? "bg-[#13634E] text-white shadow-sm"
                : "text-[#556061] hover:text-[#0A2328]"
            }`}
          >
            <ArrowDownRight className="w-4 h-4" />
            Pemasukan (Kas Masuk)
          </button>
          <button
            type="button"
            onClick={() => {
              setType("out");
              setCategory("");
            }}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              type === "out"
                ? "bg-[#B91C1C] text-white shadow-sm"
                : "text-[#556061] hover:text-[#0A2328]"
            }`}
          >
            <ArrowUpRight className="w-4 h-4" />
            Pengeluaran (Kas Keluar)
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-xs font-semibold p-3 rounded-xl border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nominal */}
          <div>
            <label className="block text-xs font-semibold text-[#556061] mb-1.5">
              Nominal Transaksi (Rp)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[#0A2328] text-lg">
                Rp
              </span>
              <input
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#FAF8F5] border border-gray-200 rounded-2xl font-bold text-lg text-[#0A2328] focus:outline-none focus:ring-2 focus:ring-[#86E3CE]"
              />
            </div>
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-xs font-semibold text-[#556061] mb-1.5">
              Kategori
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF8F5] border border-gray-200 rounded-2xl text-sm font-medium text-[#0A2328] focus:outline-none focus:ring-2 focus:ring-[#86E3CE]"
            >
              <option value="">-- Pilih Kategori --</option>
              {categoryOptions[type].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Tanggal */}
          <div>
            <label className="block text-xs font-semibold text-[#556061] mb-1.5">
              Tanggal Transaksi
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF8F5] border border-gray-200 rounded-2xl text-sm font-medium text-[#0A2328] focus:outline-none focus:ring-2 focus:ring-[#86E3CE]"
            />
          </div>

          {/* Catatan */}
          <div>
            <label className="block text-xs font-semibold text-[#556061] mb-1.5">
              Keterangan / Catatan (Opsional)
            </label>
            <input
              type="text"
              placeholder="Mis: Pembelian bahan mentah warung"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF8F5] border border-gray-200 rounded-2xl text-sm font-medium text-[#0A2328] focus:outline-none focus:ring-2 focus:ring-[#86E3CE]"
            />
          </div>

          {/* Buttons */}
          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#556061] hover:bg-gray-100 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className={`px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-md transition ${
                type === "in"
                  ? "bg-[#13634E] hover:bg-[#0e4b3b]"
                  : "bg-[#B91C1C] hover:bg-[#991b1b]"
              }`}
            >
              Simpan Transaksi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
