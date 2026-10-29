import Link from 'next/link';

export function SectionLanding({ title, description }: { title: string; description: string }) {
  return (
    <main className="bg-ivory grid min-h-screen place-items-center px-6 text-center">
      <div className="max-w-xl">
        <p className="eyebrow">Eurowindow</p>
        <h1 className="display-title mt-5 text-5xl">{title}</h1>
        <p className="text-navy/65 mt-5 text-sm leading-7">{description}</p>
        <Link
          href="/"
          className="border-navy hover:bg-navy mt-8 inline-block border px-6 py-3 text-xs uppercase tracking-[.15em] hover:text-white"
        >
          Về trang chủ
        </Link>
      </div>
    </main>
  );
}
