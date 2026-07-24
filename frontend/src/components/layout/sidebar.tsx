"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Wallet,
  BarChart3,
  Users,
  Landmark,
  ShieldCheck,
  Bell,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainNav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { label: "Cash Flow", href: "/cash-flow", icon: Wallet },
  { label: "Skor", href: "/skor", icon: BarChart3 },
  { label: "Crowdfunding", href: "/crowdfunding", icon: Users },
  { label: "Pinjaman", href: "/pinjaman", icon: Landmark },
  { label: "Legalitas", href: "/legalitas", icon: ShieldCheck },
];

const bottomNav = [
  { label: "Notifikasi", href: "/notifikasi", icon: Bell },
  { label: "Profil", href: "/profil", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-modava-bg border-r border-gray-200 p-6 flex flex-col justify-between hidden md:flex shrink-0">
      <div>
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight mb-8 block text-modava-primary-dark"
        >
          Modava
        </Link>

        <nav className="space-y-1">
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-full transition",
                  isActive
                    ? "bg-modava-accent text-modava-primary-dark"
                    : "text-gray-600 hover:text-black hover:bg-gray-100"
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-4">
        <div className="border-t border-gray-200 pt-4 space-y-1">
          {bottomNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-full transition",
                  isActive
                    ? "bg-[#86E3CE] text-[#0A2328]"
                    : "text-gray-600 hover:text-black hover:bg-gray-100"
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Bantuan & Support Box */}
        <div className="bg-[#EAE8E3] rounded-xl p-4 space-y-1">
          <p className="text-xs font-semibold text-[#0A2328]">
            Bantuan & Support
          </p>
          <p className="text-[11px] text-[#556061] leading-snug">
            Butuh pendampingan bisnis? Hubungi agen kami.
          </p>
        </div>
      </div>
    </aside>
  );
}
