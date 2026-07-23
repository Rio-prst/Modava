export default function RegulationFooter() {
  return (
    <footer className="px-5 py-8 text-center space-y-4">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-modava-text-muted">
        Terdaftar & Diawasi Oleh
      </p>
      <div className="flex items-center justify-center gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-[60px] h-6 rounded-md bg-gray-200" />
        ))}
      </div>
    </footer>
  );
}
