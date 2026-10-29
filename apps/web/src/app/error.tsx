'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="bg-ivory grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="eyebrow">Đã có sự cố</p>
        <h1 className="display-title mt-4 text-4xl">Không thể tải nội dung này.</h1>
        <button
          type="button"
          onClick={reset}
          className="border-navy hover:bg-navy mt-8 border px-6 py-3 text-xs uppercase tracking-[.15em] hover:text-white"
        >
          Thử lại
        </button>
      </div>
    </main>
  );
}
