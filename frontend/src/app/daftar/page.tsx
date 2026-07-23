import HeaderDaftar from "@/components/daftar/header-daftar";
import RoleCards from "@/components/daftar/role-cards";
import TestimonialBanner from "@/components/daftar/testimonial-banner";
import FooterDaftar from "@/components/daftar/footer-daftar";

export default function DaftarPage() {
  return (
    <div className="relative min-h-screen bg-[#F5F3ED] overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#E3F0EC] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-16 py-8 md:py-12 space-y-10 md:space-y-14">
        <HeaderDaftar />

        <main className="space-y-10 md:space-y-14">
          <div className="text-center space-y-3 max-w-[600px] mx-auto">
            <h1 className="text-[28px] md:text-4xl font-bold text-[#0A2328]">
              Pilih Peran Anda
            </h1>
            <p className="text-sm md:text-[15px] text-[#5A686B] leading-relaxed">
              Pilih peran yang sesuai dengan kebutuhan Anda. Ingin
              mengembangkan usaha sebagai UMKM atau menjadi bagian dari
              ekosistem sebagai Kontributor?
            </p>
          </div>

          <RoleCards />

          <TestimonialBanner />
        </main>

        <FooterDaftar />
      </div>
    </div>
  );
}
