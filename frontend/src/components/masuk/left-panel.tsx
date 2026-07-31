import Image from "next/image";
import Link from "next/link";

export default function LeftPanel() {
  return (
    <div className="hidden md:flex flex-col bg-[#FAF8F5]">
      <Link
        href="/"
        className="text-[22px] font-bold text-[#0A2328] absolute top-8 left-8"
      >
        Modava
      </Link>

      <div className="flex-1 flex flex-col items-center justify-center px-12">
        <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100">
          <Image
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600"
            alt="Tim UMKM"
            width={600}
            height={400}
            className="w-full object-cover"
          />
        </div>

        <h2 className="text-[24px] md:text-[28px] font-bold text-[#0A2328] text-center leading-tight mt-8">
          Tumbuh Bersama{" "}
          <span className="text-[#1E6B52]">Mitra Finansial</span> Terpercaya
        </h2>
        <p className="text-[13px] md:text-[14px] text-[#556061] text-center leading-relaxed max-w-[80%] mt-3">
          Kelola keuangan, bangun skor kredit, dan akses pendanaan komunitas
          dalam satu platform terintegrasi.
        </p>
      </div>

      <p className="text-[10px] font-semibold tracking-widest text-[#556061] text-center pb-8 opacity-70 uppercase">
        Keamanan Terjamin &middot; Terdaftar di OJK
      </p>
    </div>
  );
}
