import { Menu, Bell } from "lucide-react";
import Link from "next/link";

export default function NavbarMobile() {
  return (
    <header className="sticky top-0 z-50 bg-modava-bg/95 backdrop-blur-sm">
      <div className="flex items-center justify-between h-14 px-5">
        <button
          aria-label="Menu"
          className="w-11 h-11 flex items-center justify-center -ml-2"
        >
          <Menu className="w-5 h-5 text-modava-text-dark" />
        </button>

        <Link href="/" className="text-xl font-bold text-modava-text-dark">
          Modava
        </Link>

        <button
          aria-label="Notifikasi"
          className="w-11 h-11 flex items-center justify-center -mr-2"
        >
          <Bell className="w-5 h-5 text-modava-text-dark" />
        </button>
      </div>
    </header>
  );
}
