import Sidebar from "@/components/layout/sidebar";

export default function SkorPage() {
  return (
    <div className="flex min-h-screen bg-modava-bg">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-modava-text-dark">Skor Kelayakan</h1>
        <p className="text-sm text-gray-500 mt-2">Pantau skor kredit digital UMKM Anda.</p>
      </main>
    </div>
  );
}
