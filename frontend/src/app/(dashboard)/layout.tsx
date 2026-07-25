"use client";

import Sidebar from "@/components/layout/sidebar";
import { BottomNavMobile } from "@/components/layout/bottom-nav-mobile";
import { ModavaProvider } from "@/context/modava-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModavaProvider>
      <div className="flex min-h-screen bg-modava-bg pb-16 md:pb-0">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-8">{children}</main>
        <BottomNavMobile />
      </div>
    </ModavaProvider>
  );
}
