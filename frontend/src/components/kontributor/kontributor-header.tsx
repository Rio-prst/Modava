"use client";

import { useState } from "react";
import { Bell, Search, X, CheckCheck, ExternalLink, ShieldCheck, Heart } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

interface KontributorHeaderProps {
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export default function KontributorHeader({
  searchQuery = "",
  onSearchChange,
}: KontributorHeaderProps) {
  const { user } = useUser();
  const userName = user?.firstName || user?.fullName || "Kontributor Modava";

  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  // Notification items state
  const [notifications, setNotifications] = useState([
    {
      id: "n-1",
      title: "Dividen Bagi Hasil Cair 🎉",
      message: "Imbal hasil bulan ini sebesar Rp 750.000 dari Warung Berkah telah masuk ke saldo dompet.",
      time: "15 min lalu",
      read: false,
      icon: "reward",
    },
    {
      id: "n-2",
      title: "Target Campaign 90% Terpenuhi 🚀",
      message: "Campaign 'Batik Keraton Solo' hampir mencapai target pendanaan modal.",
      time: "2 jam lalu",
      read: false,
      icon: "campaign",
    },
    {
      id: "n-3",
      title: "Pengajuan Pledge Berhasil",
      message: "Pledge pendanaan Rp 1.000.000 untuk Mesin Roaster Kopi telah diverifikasi.",
      time: "1 hari lalu",
      read: true,
      icon: "check",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#0A2328]">
          Selamat Datang, {userName} 👋
        </h1>
        <p className="text-sm text-[#556061] mt-1">
          Lihat perkembangan kontribusi modal UMKM Anda hari ini.
        </p>
      </div>

      <div className="flex items-center gap-3 relative">
        {/* Search Input Bar */}
        {showSearchInput ? (
          <div className="relative flex items-center animate-in fade-in zoom-in duration-150">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              autoFocus
              placeholder="Cari campaign / UMKM..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="pl-9 pr-8 py-2 bg-white border border-[#13634E] rounded-full text-xs font-medium text-[#0A2328] focus:outline-none w-48 sm:w-64 shadow-sm"
            />
            <button
              onClick={() => {
                setShowSearchInput(false);
                onSearchChange?.("");
              }}
              className="absolute right-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowSearchInput(true)}
            className="w-10 h-10 rounded-full bg-white border border-gray-200/80 shadow-sm flex items-center justify-center text-[#0A2328] hover:bg-gray-50 transition"
            title="Cari Campaign / UMKM"
          >
            <Search className="w-4 h-4" />
          </button>
        )}

        {/* Bell Notification Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotificationMenu(!showNotificationMenu)}
            className="w-10 h-10 rounded-full bg-white border border-gray-200/80 shadow-sm flex items-center justify-center text-[#0A2328] hover:bg-gray-50 transition relative"
            title="Notifikasi"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse ring-2 ring-white" />
            )}
          </button>

          {/* NOTIFICATION POPOVER DROPDOWN */}
          {showNotificationMenu && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 p-5 z-50 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#13634E]" />
                  <h3 className="font-bold text-slate-900 text-sm">Notifikasi Kontributor</h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 font-extrabold text-[10px] rounded-full">
                      {unreadCount} Baru
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[11px] font-bold text-[#13634E] hover:underline flex items-center gap-1"
                  >
                    <CheckCheck className="w-3.5 h-3.5" /> Tandai Dibaca
                  </button>
                )}
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 rounded-2xl border transition-all text-xs space-y-1 ${
                      n.read
                        ? "bg-slate-50/60 border-slate-100 text-slate-600"
                        : "bg-emerald-50/50 border-emerald-200 text-slate-900 font-medium"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">{n.message}</p>
                  </div>
                ))}
              </div>

              {/* View All Link */}
              <div className="pt-2 border-t border-slate-100 text-center">
                <Link
                  href="/notifikasi"
                  onClick={() => setShowNotificationMenu(false)}
                  className="text-xs font-bold text-[#13634E] hover:underline inline-flex items-center gap-1"
                >
                  Lihat Semua Notifikasi
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
