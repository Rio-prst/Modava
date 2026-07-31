import { Metadata } from "next";
import { Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Panel - Verifikasi Legalitas & Transaksi | Modava",
  description: "Portal Khusus Admin Modava untuk peninjauan legalitas dan ACC deposit/withdraw.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Admin Security Navigation Bar */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/30">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
              Modava Admin Portal
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 font-semibold">
                Internal Only
              </span>
            </h1>
            <p className="text-xs text-slate-400">Verifikasi Dokumen Legalitas UMKM & ACC Deposit / Withdraw</p>
          </div>
        </div>
      </header>

      {/* Admin Content Area */}
      <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
        {children}
      </main>
    </div>
  );
}
