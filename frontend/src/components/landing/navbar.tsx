"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Sparkles, UserCheck } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-900/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-modava-primary to-emerald-700 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              M
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-modava-text-dark group-hover:text-modava-primary transition-colors">
                Modava
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-modava-primary rounded-full">
                Veternity 2026
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            <a href="#fitur" className="hover:text-modava-primary transition-colors">
              Fitur Utama
            </a>
            <a href="#ekosistem" className="hover:text-modava-primary transition-colors">
              Ekosistem
            </a>
            <a href="#campaign" className="hover:text-modava-primary transition-colors">
              Crowdfunding
            </a>
            <a href="#simulasi" className="hover:text-modava-primary transition-colors">
              Simulasi Modal
            </a>
            <a href="#legalitas" className="hover:text-modava-primary transition-colors">
              Perizinan NIB
            </a>
            <a href="#faq" className="hover:text-modava-primary transition-colors">
              FAQ
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <SignedIn>
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="px-4 py-2 bg-emerald-50 text-modava-primary text-xs font-bold rounded-xl border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
                >
                  <UserCheck className="w-4 h-4" /> Dashboard Usaha
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>

            <SignedOut>
              <Link
                href="/masuk"
                className="px-5 py-2.5 text-sm font-semibold text-modava-text-dark hover:text-modava-primary transition-colors"
              >
                Masuk
              </Link>
              <Link
                href="/daftar"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-modava-primary to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow-md hover:from-emerald-700 hover:to-modava-primary transition-all group"
              >
                <Sparkles className="w-4 h-4 text-emerald-200 group-hover:rotate-12 transition-transform" />
                Daftar Sekarang
              </Link>
            </SignedOut>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-5 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3 font-medium text-gray-700 text-base border-b border-gray-100 pb-4">
            <a
              href="#fitur"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-modava-primary transition-colors"
            >
              Fitur Utama
            </a>
            <a
              href="#ekosistem"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-modava-primary transition-colors"
            >
              Ekosistem
            </a>
            <a
              href="#campaign"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-modava-primary transition-colors"
            >
              Crowdfunding Komunitas
            </a>
            <a
              href="#simulasi"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-modava-primary transition-colors"
            >
              Simulasi Modal
            </a>
            <a
              href="#legalitas"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-modava-primary transition-colors"
            >
              Legalitas & NIB
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-modava-primary transition-colors"
            >
              FAQ
            </a>
          </nav>
          <div className="flex flex-col gap-3 pt-2">
            <Link
              href="/masuk"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 border border-gray-300 rounded-xl text-modava-text-dark font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              Masuk ke Akun
            </Link>
            <Link
              href="/daftar"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 bg-modava-primary text-white rounded-xl font-semibold text-sm shadow-md hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              Daftar Akun Baru <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
