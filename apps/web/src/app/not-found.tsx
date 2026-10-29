import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="bg-navy grid min-h-screen place-items-center px-6 text-center text-white">
      <div>
        <p className="eyebrow">404 · Không tìm thấy</p>
        <h1 className="display-title mt-5 text-5xl">Lối đi này chưa được mở.</h1>
        <Link
          href="/"
          className="border-gold text-gold hover:bg-gold hover:text-navy mt-8 inline-block border px-6 py-3 text-xs uppercase tracking-[.15em]"
        >
          Về trang chủ
        </Link>
      </div>
    </main>
  );
}
