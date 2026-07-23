import Image from "next/image";

export default function SocialProof() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
      <div className="lg:col-span-5 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <Image
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
          alt="Sarah K"
          width={600}
          height={200}
          className="w-full h-48 object-cover rounded-xl"
        />
        <div className="p-2 space-y-2">
          <p className="text-xs text-gray-600 leading-relaxed italic">
            &ldquo;Modava membantu toko kopi saya mendapatkan modal ekspansi
            dalam 7 hari melalui crowdfunding.&rdquo;
          </p>
          <p className="text-xs font-bold text-modava-text-dark">
            &mdash; Sarah K, Owner Kopi Nadi
          </p>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-8 pl-0 lg:pl-6">
        <h2 className="text-2xl font-bold text-modava-text-dark leading-snug">
          Telah Dipercaya oleh +5000 UMKM &amp; Mitra Strategis
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          {["BANK PARTNER", "GOV TECH", "AGRI CORP", "FINANCE CO"].map(
            (name) => (
              <div
                key={name}
                className="bg-[#f0f0ea] py-3 px-2 rounded-lg text-[10px] font-bold tracking-wider text-gray-400"
              >
                {name}
              </div>
            )
          )}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <div className="flex -space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full bg-gray-300 border-2 border-modava-bg"
                style={{ backgroundColor: `oklch(${0.3 + i * 0.1} 0 0)` }}
              />
            ))}
            <div className="w-7 h-7 rounded-full bg-modava-primary text-white text-[9px] font-bold flex items-center justify-center border-2 border-modava-bg">
              +12
            </div>
          </div>
          <p className="text-[11px] text-gray-500 font-medium">
            UMKM baru bergabung hari ini di Jakarta &amp; Surabaya
          </p>
        </div>
      </div>
    </section>
  );
}
