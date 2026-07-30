"use client";

import { useState } from "react";
import { Mail, Eye, EyeOff, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import InputField from "./input-field";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("sri.rahayu@warungberkah.com");
  const [password, setPassword] = useState("password123");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      document.cookie = "modava_session=demo_active_user; path=/";
      router.push("/dashboard");
    }, 600);
  };

  const handleQuickLogin = (role: "umkm" | "kontributor") => {
    setIsLoading(true);
    setTimeout(() => {
      document.cookie = `modava_session=${role}_active_user; path=/`;
      if (role === "kontributor") {
        router.push("/kontributor");
      } else {
        router.push("/dashboard");
      }
    }, 400);
  };

  return (
    <div className="w-full max-w-[420px] mx-auto px-5 md:px-0 space-y-6">
      <div className="md:hidden mb-4">
        <Link href="/" className="text-[22px] font-bold text-[#0A2328]">
          Modava
        </Link>
      </div>

      <div>
        <h1 className="text-[28px] font-bold text-[#0A2328]">
          Selamat Datang Kembali
        </h1>
        <p className="text-sm text-[#556061] mt-1">
          Masuk ke akun Modava Anda untuk melanjutkan.
        </p>
      </div>

      {/* Google Login Option */}
      <button
        type="button"
        onClick={() => handleQuickLogin("umkm")}
        className="w-full h-[46px] flex items-center justify-center gap-3 rounded-xl border border-[#D1D5DB] bg-white text-sm font-medium text-[#0A2328] hover:bg-gray-50 transition shadow-xs"
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Masuk dengan Google
      </button>

      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px bg-[#E5E7EB]" />
        <span className="text-[11px] text-[#556061] whitespace-nowrap">
          Atau gunakan email
        </span>
        <div className="flex-1 h-px bg-[#E5E7EB]" />
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <InputField
          label="Email Bisnis"
          type="email"
          placeholder="nama@ukmanda.com"
          icon={Mail}
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />

        <InputField
          label="Kata Sandi"
          type={showPassword ? "text" : "password"}
          placeholder="Masukkan kata sandi"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          rightLabel={
            <span className="text-[12px] font-semibold text-[#0A2328] hover:underline cursor-pointer">
              Lupa password?
            </span>
          }
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 text-gray-400" />
              ) : (
                <Eye className="w-4 h-4 text-gray-400" />
              )}
            </button>
          }
        />

        <label className="flex items-center gap-2 cursor-pointer pt-1">
          <input
            type="checkbox"
            defaultChecked
            className="w-4 h-4 rounded border-gray-300 text-[#0A2328] accent-[#0A2328]"
          />
          <span className="text-[13px] text-[#0A2328]">
            Ingat saya untuk 30 hari
          </span>
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 rounded-xl bg-modava-primary text-white text-sm font-bold hover:bg-emerald-800 transition shadow-md flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <span>Memproses masuk...</span>
          ) : (
            <>
              <span>Masuk ke Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-[#556061] pt-2">
        Belum memiliki akun Modava?{" "}
        <Link
          href="/daftar"
          className="text-[#1E6B52] font-semibold hover:underline"
        >
          Daftar akun baru
        </Link>
      </p>
    </div>
  );
}
