import Image from "next/image";

export default function TestimonialBanner() {
  return (
    <div className="relative rounded-2xl overflow-hidden h-[160px] md:h-[200px]">
      <Image
        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200"
        alt="Testimonial UMKM"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A2328]/80 via-[#0A2328]/50 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-8">
        <p className="text-white text-sm md:text-[15px] leading-relaxed max-w-full md:max-w-[500px] font-medium">
          &ldquo;Berkat Modava, toko saya bisa naik kelas dalam 6 bulan. Dari
          pembukuan manual sampai dapat pendanaan komunitas.&rdquo;
        </p>
        <p className="text-white/80 text-[13px] mt-2">
          &mdash; Ibu Dewi, Pemilik Toko Berkah Jaya
        </p>
      </div>
    </div>
  );
}
