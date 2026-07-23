export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-[#f4f3ee] py-12 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2 space-y-3">
          <div className="text-lg font-bold text-modava-primary-dark">
            Modava
          </div>
          <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
            Solusi pemberdayaan ekonomi digital bagi pelaku usaha mikro, kecil,
            dan menengah di Indonesia.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold text-modava-text-dark">Produk</h4>
          <ul className="space-y-2 text-xs text-gray-500">
            <li>
              <a href="#" className="hover:underline">
                Laporan Keuangan
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Pinjaman Mikro
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Investasi
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold text-modava-text-dark">Legal</h4>
          <ul className="space-y-2 text-xs text-gray-500">
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Term of Service
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold text-modava-text-dark">Kontak</h4>
          <ul className="space-y-2 text-xs text-gray-500">
            <li>
              <a href="#" className="hover:underline">
                support@modava.id
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                WhatsApp Center
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-200 text-center">
        <p className="text-[10px] text-gray-400">
          &copy; 2024 Modava Indonesia. Terdaftar dan Diawasi oleh Otoritas Jasa
          Keuangan.
        </p>
      </div>
    </footer>
  );
}
