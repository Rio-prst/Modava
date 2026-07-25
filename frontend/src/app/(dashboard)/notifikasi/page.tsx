"use client";

import { useState } from "react";
import { 
  Bell, 
  Heart, 
  ShieldCheck, 
  TrendingUp, 
  CheckCheck,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

export default function NotifikasiPage() {
  const [filter, setFilter] = useState<"all" | "pledge" | "legalitas">("all");
  const [notifications, setNotifications] = useState([
    {
      id: "n-1",
      type: "pledge",
      title: "Kontribusi Modal Baru Masuk! 🎉",
      message: "Kontributor Pak Andi menyalurkan dukungan Rp 500.000 untuk campaign Pengadaan Mesin Roaster.",
      time: "10 menit yang lalu",
      read: false,
      link: "/crowdfunding/c-1",
    },
    {
      id: "n-2",
      type: "legalitas",
      title: "Dokumen NIB Terverifikasi ✅",
      message: "Admin Platform Modava telah menyetujui Nomor Induk Berusaha (NIB) Anda. Skor legalitas naik +0.3 poin!",
      time: "2 jam yang lalu",
      read: false,
      link: "/legalitas",
    },
    {
      id: "n-3",
      type: "pledge",
      title: "Target Campaign Mencapai 85%",
      message: "Selamat! Dana terkumpul untuk campaign Ekspansi Mesin Kopi sudah mencapai Rp 12.750.000 dari target Rp 15.000.000.",
      time: "Yesterday",
      read: true,
      link: "/crowdfunding/c-1",
    },
    {
      id: "n-4",
      type: "cashflow",
      title: "Pengingat Pencatatan Arus Kas",
      message: "Jangan lupa catat transaksi bulanan di Cash Flow Tracker agar tren kesehatan usaha Anda tetap up-to-date.",
      time: "3 hari lalu",
      read: true,
      link: "/cash-flow",
    },
  ]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const filteredNotifs = notifications.filter((n) => {
    if (filter === "pledge") return n.type === "pledge";
    if (filter === "legalitas") return n.type === "legalitas";
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-modava-primary-dark via-[#134D3B] to-modava-primary rounded-3xl p-6 sm:p-8 text-white shadow-xl flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-400/20 text-emerald-200 text-xs font-bold rounded-full border border-emerald-400/30 mb-2">
            <Bell className="w-3.5 h-3.5" /> Notifikasi In-App PRD [F7]
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">Pusat Notifikasi</h1>
          <p className="text-xs text-emerald-100/90 mt-1">
            Pantau pembaruan pledge modal baru, progres campaign, dan status verifikasi legalitas usaha Anda.
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-xs font-bold text-emerald-200 border border-white/20 transition-all flex items-center gap-1.5 shrink-0"
          >
            <CheckCheck className="w-4 h-4" /> Tandai Semua Dibaca
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-3xl p-3 border border-slate-200/80 shadow-sm flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`py-2.5 px-4 rounded-2xl font-bold text-xs transition-all ${
            filter === "all" ? "bg-modava-primary text-white" : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          Semua ({notifications.length})
        </button>
        <button
          onClick={() => setFilter("pledge")}
          className={`py-2.5 px-4 rounded-2xl font-bold text-xs transition-all ${
            filter === "pledge" ? "bg-modava-primary text-white" : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          Pledge & Modal
        </button>
        <button
          onClick={() => setFilter("legalitas")}
          className={`py-2.5 px-4 rounded-2xl font-bold text-xs transition-all ${
            filter === "legalitas" ? "bg-modava-primary text-white" : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          Verifikasi Legalitas
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifs.map((n) => (
          <Link
            key={n.id}
            href={n.link}
            className={`block p-5 rounded-3xl border transition-all hover:shadow-md ${
              !n.read
                ? "bg-emerald-50/60 border-emerald-200"
                : "bg-white border-slate-200/80 hover:border-slate-300"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-2xl shrink-0 ${
                n.type === "pledge"
                  ? "bg-rose-100 text-rose-600"
                  : n.type === "legalitas"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-blue-100 text-blue-600"
              }`}>
                {n.type === "pledge" && <Heart className="w-5 h-5 fill-rose-500" />}
                {n.type === "legalitas" && <ShieldCheck className="w-5 h-5" />}
                {n.type === "cashflow" && <TrendingUp className="w-5 h-5" />}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className={`text-sm font-bold ${!n.read ? "text-emerald-950" : "text-slate-900"}`}>
                    {n.title}
                  </h3>
                  <span className="text-[11px] text-slate-400 font-medium">{n.time}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
              </div>

              <ChevronRight className="w-5 h-5 text-slate-400 self-center shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
