"use client";

import { useState } from "react";
import { Clock, CheckCircle2, HeartHandshake, X, Check, Lock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth, useClerk } from "@clerk/nextjs";
import { useModava } from "@/context/modava-context";

interface CampaignItem {
  id: string;
  title: string;
  category: string;
  description: string;
  targetAmount?: number;
  currentAmount?: number;
  target?: number;
  raised?: number;
  daysLeft?: number;
  status?: string;
  image?: string;
}

export default function CampaignCard({
  campaign,
}: {
  campaign: CampaignItem;
}) {
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();
  const { addContribution, walletBalance } = useModava();

  // Local state for interactive Pledge Modal & Login Prompt
  const [showPledgeModal, setShowPledgeModal] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [pledgeAmount, setPledgeAmount] = useState<number>(500000);
  const [paymentSource, setPaymentSource] = useState<"wallet" | "va">("wallet");
  const [isSuccess, setIsSuccess] = useState(false);

  const initialRaised = campaign.currentAmount ?? campaign.raised ?? 0;
  const [currentRaised, setCurrentRaised] = useState<number>(initialRaised);

  const target = campaign.targetAmount ?? campaign.target ?? 10000000;
  const title = campaign.title || "Campaign Permodalan UMKM";
  const description = campaign.description || "Deskripsi campaign modal usaha.";
  const image = campaign.image || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800";
  const daysLeft = campaign.daysLeft ?? 30;
  const category = campaign.category || "Crowdfunding";
  const isCompleted = campaign.status === "selesai" || campaign.status === "FUNDED";

  const pct = Math.min(
    Math.round((currentRaised / (target || 1)) * 100),
    100
  );

  const handlePledgeClick = () => {
    if (!isSignedIn) {
      setShowLoginPrompt(true);
      return;
    }
    setShowPledgeModal(true);
  };

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pledgeAmount <= 0) return;

    if (paymentSource === "wallet" && pledgeAmount > walletBalance && walletBalance > 0) {
      alert("Saldo dompet Anda tidak mencukupi. Silakan gunakan metode Virtual Account atau Isi Saldo terlebih dahulu.");
      return;
    }

    // Add contribution to context & contributor portfolio
    addContribution(campaign.id, title, category, pledgeAmount, image);
    setCurrentRaised((prev) => prev + pledgeAmount);

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setShowPledgeModal(false);
    }, 2000);
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md">
        <Link href={`/crowdfunding/${campaign.id}`} className="relative aspect-[16/10] block group">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-[10px] font-bold uppercase rounded-md px-2.5 py-1 text-[#0A2328]">
            {category}
          </span>
        </Link>

        <div className="p-4 flex flex-col flex-1 space-y-3">
          <Link href={`/crowdfunding/${campaign.id}`} className="block space-y-1 group">
            <h3 className="text-[15px] font-bold text-[#0A2328] line-clamp-1 group-hover:text-[#13634E] transition-colors">
              {title}
            </h3>
            <p className="text-[12px] text-[#556061] leading-relaxed line-clamp-2">
              {description}
            </p>
          </Link>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[12px]">
              <span className="font-bold text-[#0A2328]">
                Terkumpul: Rp{formatRp(currentRaised)}
              </span>
              <span
                className={`font-bold ${
                  isCompleted ? "text-[#10B981]" : "text-[#13634e]"
                }`}
              >
                {pct}%
              </span>
            </div>
            <div className="h-[6px] bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  isCompleted ? "bg-[#10B981]" : "bg-[#13634e]"
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            {isCompleted ? (
              <span className="flex items-center gap-1 text-green-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Selesai
              </span>
            ) : (
              <span className="flex items-center gap-1 text-red-500 font-semibold">
                <Clock className="w-3.5 h-3.5" />
                {daysLeft} Hari Lagi
              </span>
            )}
            <span className="text-[#556061]">
              Target: Rp{formatRp(target)}
            </span>
          </div>

          {/* Action Buttons Grid: Lihat Detail & Dukung Campaign */}
          <div className="grid grid-cols-2 gap-2 mt-auto pt-1">
            <Link
              href={`/crowdfunding/${campaign.id}`}
              className="py-2 px-3 rounded-xl border border-gray-300 hover:border-[#0A2328] text-[12px] font-semibold text-[#0A2328] hover:bg-gray-50 transition text-center flex items-center justify-center gap-1"
            >
              <span>Lihat Detail</span>
              <ArrowRight className="w-3 h-3" />
            </Link>

            <button
              onClick={handlePledgeClick}
              className="py-2 px-3 rounded-xl bg-[#0A2328] hover:bg-[#13634E] text-white text-[12px] font-bold transition flex items-center justify-center gap-1 shadow-sm cursor-pointer"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-300" />
              <span>Dukung Modal</span>
            </button>
          </div>
        </div>
      </div>

      {/* LOGIN PROMPT MODAL FOR UNAUTHENTICATED USERS */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 text-center space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[#0A2328]">Login Diperlukan untuk Memberikan Modal</h3>
              <p className="text-xs text-[#556061] leading-relaxed">
                Anda harus masuk (login) ke akun Modava terlebih dahulu sebelum menyalurkan dukungan modal usaha atau pledge ke campaign ini.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 pt-2">
              <button
                onClick={() => {
                  setShowLoginPrompt(false);
                  if (openSignIn) openSignIn();
                  else window.location.href = "/masuk";
                }}
                className="w-full py-3 bg-[#13634E] hover:bg-[#0e4b3b] text-white text-xs font-bold rounded-2xl transition shadow-md"
              >
                Masuk / Daftar Sekarang
              </button>
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-2xl transition"
              >
                Nanti Saja
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PLEDGE INTERACTIVE MODAL */}
      {showPledgeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 space-y-5 animate-in fade-in zoom-in duration-200">
            {isSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-[#13634E] rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#0A2328]">Dukungan Berhasil!</h3>
                <p className="text-xs text-[#556061]">
                  Terima kasih! Dukungan Anda sebesar <strong>Rp {pledgeAmount.toLocaleString("id-ID")}</strong> telah disalurkan dan masuk ke portofolio kontributor Anda.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#13634E] bg-emerald-50 px-2 py-0.5 rounded-md">
                      {category}
                    </span>
                    <h3 className="text-base font-bold text-[#0A2328] mt-1 line-clamp-1">{title}</h3>
                  </div>
                  <button
                    onClick={() => setShowPledgeModal(false)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handlePledgeSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Pilih Nominal Dukungan Modal</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[100000, 500000, 1000000].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setPledgeAmount(amt)}
                          className={`py-2 text-xs font-bold rounded-xl border transition ${
                            pledgeAmount === amt
                              ? "bg-[#13634E] text-white border-[#13634E]"
                              : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          Rp {(amt / 1000).toFixed(0)}rb
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">Nominal Kustom (Rp)</label>
                    <input
                      type="text"
                      required
                      value={pledgeAmount.toLocaleString("id-ID")}
                      onChange={(e) => setPledgeAmount(Number(e.target.value.replace(/\D/g, "")) || 0)}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm font-bold text-[#0A2328] focus:ring-2 focus:ring-[#13634E]/30 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Metode Pembayaran</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentSource("wallet")}
                        className={`p-3 rounded-2xl border text-left transition ${
                          paymentSource === "wallet"
                            ? "bg-emerald-50 border-[#13634E] text-[#13634E]"
                            : "bg-white border-gray-200 text-gray-700"
                        }`}
                      >
                        <span className="block text-[11px] font-bold">Saldo Dompet</span>
                        <span className="text-[10px] text-gray-500 block">Rp {walletBalance.toLocaleString("id-ID")}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentSource("va")}
                        className={`p-3 rounded-2xl border text-left transition ${
                          paymentSource === "va"
                            ? "bg-emerald-50 border-[#13634E] text-[#13634E]"
                            : "bg-white border-gray-200 text-gray-700"
                        }`}
                      >
                        <span className="block text-[11px] font-bold">Virtual Account / QRIS</span>
                        <span className="text-[10px] text-gray-500 block">BCA, Mandiri, QRIS</span>
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-[#13634E] hover:bg-[#0e4b3b] text-white text-xs font-bold transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <HeartHandshake className="w-4 h-4" />
                    Konfirmasi Dukungan (Pledge)
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function formatRp(n?: number): string {
  if (!n) return "0";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}jt`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}rb`;
  return n.toString();
}
