"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  TrendingUp, 
  Award, 
  Users, 
  ShieldCheck 
} from "lucide-react";

export function BottomNavMobile() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Beranda", icon: Home },
    { href: "/cash-flow", label: "Kas", icon: TrendingUp },
    { href: "/skor", label: "Skor", icon: Award },
    { href: "/crowdfunding", label: "Modal", icon: Users },
    { href: "/legalitas", label: "Legal", icon: ShieldCheck },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-lg px-2 py-1.5 flex justify-around items-center">
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-2xl transition-all ${
              isActive
                ? "text-modava-primary font-bold bg-emerald-50"
                : "text-slate-500 hover:text-slate-900 font-medium"
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
            <span className="text-[10px]">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
