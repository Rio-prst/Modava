import Link from "next/link";
import { HeartHandshake, ArrowLeft, Heart } from "lucide-react";
import { SignUp } from "@clerk/nextjs";

export default function DaftarKontributorPage() {
  return (
    <div className="min-h-screen bg-[#F5F3ED] py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full space-y-6">

        {/* Back Link */}
        <div>
          <Link
            href="/daftar"
            className="inline-flex items-center gap-2 text-xs font-bold text-modava-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Pilih Peran
          </Link>
        </div>

        {/* Card Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200/80 space-y-6">

          {/* Header */}
          <div className="flex items-center gap-3 border-b border-gray-100 pb-5">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-modava-text-dark flex items-center justify-center font-bold">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded-full">
                Pendaftaran Kontributor Modal
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-modava-text-dark">
                Dukung UMKM Lokal Indonesia
              </h1>
            </div>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
            <Heart className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 fill-amber-500" />
            <p className="text-xs text-amber-900 leading-relaxed">
              Sebagai kontributor, Anda akan menerima laporan transparan berkala serta pemberitahuan setiap ada pembagian hasil usaha dari UMKM mitra.
            </p>
          </div>

          <div className="flex justify-center">
            <SignUp afterSignUpUrl="/role-redirect" signInUrl="/masuk" />
          </div>

          {/* Footer Note */}
          <div className="border-t border-gray-100 pt-4 text-center text-xs text-gray-500">
            Sudah memiliki akun Modava?{" "}
            <Link href="/masuk" className="font-bold text-modava-primary hover:underline">
              Masuk di sini
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
