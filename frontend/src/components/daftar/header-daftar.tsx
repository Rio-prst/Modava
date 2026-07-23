import { HelpCircle } from "lucide-react";
import Link from "next/link";

export default function HeaderDaftar() {
  return (
    <header className="flex items-center justify-between">
      <Link href="/" className="text-[22px] font-bold text-[#0A2328]">
        Modava
      </Link>
      <Link
        href="/bantuan"
        className="flex items-center gap-1.5 text-sm text-[#5A686B] hover:underline"
      >
        <HelpCircle className="w-4 h-4" />
        Bantuan
      </Link>
    </header>
  );
}
