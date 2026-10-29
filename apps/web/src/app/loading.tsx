export default function Loading() {
  return (
    <main className="bg-navy text-ivory grid min-h-screen place-items-center" aria-label="Đang tải">
      <div role="status" className="text-center">
        <span className="eyebrow">Eurowindow</span>
        <p className="font-display mt-4 text-2xl">Đang mở không gian...</p>
      </div>
    </main>
  );
}
