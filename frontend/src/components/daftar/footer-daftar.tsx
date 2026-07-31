import Link from "next/link";

export default function FooterDaftar() {
  return (
    <footer className="text-center text-[11px] md:text-[12px] text-[#5A686B] flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
      <span>&copy; 2026 Modava Indonesia.</span>
      <span className="hidden sm:inline">&middot;</span>
      <div className="flex items-center gap-2">
        <Link href="/syarat" className="hover:underline">
          Syarat &amp; Ketentuan
        </Link>
        <span>&middot;</span>
        <Link href="/privasi" className="hover:underline">
          Kebijakan Privasi
        </Link>
      </div>
    </footer>
  );
}
