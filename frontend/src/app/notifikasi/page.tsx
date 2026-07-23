import Sidebar from "@/components/layout/sidebar";

export default function NotifikasiPage() {
  return (
    <div className="flex min-h-screen bg-modava-bg">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-modava-text-dark">Notifikasi</h1>
        <p className="text-sm text-gray-500 mt-2">Notifikasi dan pemberitahuan Anda.</p>
      </main>
    </div>
  );
}
