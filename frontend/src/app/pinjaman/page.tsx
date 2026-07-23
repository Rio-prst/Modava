import Sidebar from "@/components/layout/sidebar";

export default function PinjamanPage() {
  return (
    <div className="flex min-h-screen bg-modava-bg">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-modava-text-dark">Pinjaman</h1>
        <p className="text-sm text-gray-500 mt-2">Simulasi dan ajukan pinjaman mikro untuk usaha Anda.</p>
      </main>
    </div>
  );
}
