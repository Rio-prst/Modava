import Link from "next/link";
import Image from "next/image";

export default function HeroMobile() {
  return (
    <section className="px-5 pt-6 text-center space-y-6">
      <div className="space-y-3">
        <h1 className="text-[28px] leading-tight font-extrabold text-modava-text-dark">
          Tumbuhkan Bisnis{" "}
          <span className="text-modava-primary">UMKM</span> Sekarangg
        </h1>
        <p className="text-sm text-modava-text-muted leading-relaxed max-w-[90%] mx-auto">
          Solusi finansial terintegrasi untuk usaha mikro. Dari pencatatan
          keuangan otomatis hingga akses permodalan kolektif yang transparan.
        </p>
      </div>

      <div className="w-full">
        <Image
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600&h=700"
          alt="Ilustrasi UMKM"
          width={600}
          height={500}
          className="w-full aspect-[4/3] object-cover rounded-xl"
        />
      </div>

      <div className="space-y-3 pb-2">
        <Link
          href="/daftar"
          className="block w-full h-12 leading-[48px] text-center rounded-lg bg-modava-primary-dark text-white text-[15px] font-medium"
        >
          Daftar
        </Link>
        <Link
          href="/masuk"
          className="block w-full h-12 leading-[48px] text-center rounded-lg bg-white border-2 border-modava-text-dark text-modava-text-dark text-[15px] font-medium"
        >
          Masuk
        </Link>
      </div>
    </section>
  );
}
