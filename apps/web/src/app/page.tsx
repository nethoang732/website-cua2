import Link from 'next/link';
import { ArrowDownRight, ArrowRight, Menu } from 'lucide-react';

const navigation = [
  ['Giới thiệu', '/gioi-thieu'],
  ['Sản phẩm', '/san-pham'],
  ['Công trình', '/cong-trinh'],
  ['Tin tức', '/tin-tuc'],
  ['Tài liệu', '/tai-lieu'],
] as const;

function BrandMark() {
  return (
    <Link href="/" aria-label="Eurowindow — Trang chủ" className="flex items-center gap-3">
      <span className="border-gold/70 text-gold grid h-10 w-10 place-items-center border">
        <span className="font-display text-2xl leading-none">E</span>
      </span>
      <span className="text-[11px] font-semibold leading-[1.1] tracking-[.2em] text-white">
        EURO
        <br />
        WINDOW
      </span>
    </Link>
  );
}

function ArchitecturalStudy() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 560 660"
      fill="none"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient
          id="glass"
          x1="86"
          x2="450"
          y1="100"
          y2="568"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A8BBC1" stopOpacity=".5" />
          <stop offset="1" stopColor="#D8CBB5" stopOpacity=".08" />
        </linearGradient>
        <linearGradient id="wall" x1="400" x2="552" y1="90" y2="586" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E8E3D8" stopOpacity=".5" />
          <stop offset="1" stopColor="#8C9AA0" stopOpacity=".12" />
        </linearGradient>
      </defs>
      <path d="M20 610 246 75l294 176v409H20Z" fill="#123B63" fillOpacity=".2" />
      <path
        d="M91 580V183l170-86v483H91Z"
        fill="url(#glass)"
        stroke="#E4D6B8"
        strokeOpacity=".72"
      />
      <path
        d="M261 97 442 197v383H261V97Z"
        fill="url(#wall)"
        stroke="#E4D6B8"
        strokeOpacity=".72"
      />
      <path
        d="M91 183h170M91 380h170M174 141v439m87-483v483m0-383 181 100m-181 97 181 100m-181-1h181m-91-246v483"
        stroke="#F6F4EF"
        strokeOpacity=".58"
      />
      <path d="M0 580h560M51 615h509" stroke="#C5A46D" strokeOpacity=".72" />
      <path d="m92 580 170-200 180 200" stroke="#C5A46D" strokeOpacity=".45" />
      <circle cx="432" cy="112" r="34" fill="#C5A46D" fillOpacity=".32" />
      <circle cx="432" cy="112" r="49" stroke="#C5A46D" strokeOpacity=".45" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="bg-ivory min-h-screen overflow-hidden">
      <header className="bg-navy/80 absolute inset-x-0 top-0 z-20 border-b border-white/10 backdrop-blur-md">
        <div className="mx-auto flex h-[82px] max-w-[1440px] items-center justify-between px-5 md:px-10 xl:px-16">
          <BrandMark />
          <nav aria-label="Điều hướng chính" className="hidden items-center gap-8 lg:flex">
            {navigation.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="hover:text-gold text-[11px] uppercase tracking-[.15em] text-white/75 transition"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <Link
              href="/tim-kiem"
              className="hidden text-[11px] uppercase tracking-[.16em] text-white/70 transition hover:text-white sm:block"
            >
              Tìm kiếm
            </Link>
            <Link
              href="/lien-he"
              className="border-gold/70 hover:bg-gold hover:text-navy hidden border px-5 py-3 text-[10px] font-semibold uppercase tracking-[.16em] text-white transition sm:block"
            >
              Kết nối với chúng tôi
            </Link>
            <button
              type="button"
              aria-label="Mở menu"
              className="grid h-10 w-10 place-items-center border border-white/20 text-white lg:hidden"
            >
              <Menu size={19} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <section className="bg-navy relative min-h-[720px] text-white md:min-h-[800px] lg:min-h-[860px]">
        <div className="hero-grid absolute inset-0 opacity-70" />
        <div className="absolute inset-y-0 right-0 w-full overflow-hidden opacity-60 md:w-[58%] md:opacity-100">
          <ArchitecturalStudy />
          <div className="from-navy via-navy/65 md:from-navy md:via-navy/25 absolute inset-0 bg-gradient-to-r to-transparent" />
          <div className="from-navy/75 to-navy/15 absolute inset-0 bg-gradient-to-t via-transparent" />
        </div>
        <div className="relative mx-auto flex min-h-[720px] max-w-[1440px] items-center px-5 pb-14 pt-36 md:min-h-[800px] md:px-10 lg:min-h-[860px] xl:px-16">
          <div className="max-w-[720px]">
            <p className="eyebrow mb-7">Tầm nhìn vượt khỏi giới hạn</p>
            <h1 className="display-title max-w-[760px] text-[3.5rem] leading-[.99] text-white sm:text-7xl lg:text-[6.2rem]">
              Mở lối cho <br />
              <span className="text-gold">ánh sáng</span> chạm <br />
              vào không gian.
            </h1>
            <p className="mt-8 max-w-[420px] text-sm leading-7 text-white/65 md:text-base">
              Giải pháp cửa và vách kính nâng tầm kiến trúc, nơi mỗi đường nét được tạo nên để sống
              cùng thời gian.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href="/san-pham"
                className="bg-gold text-navy group inline-flex items-center gap-5 px-6 py-4 text-[11px] font-semibold uppercase tracking-[.16em] transition hover:bg-white"
              >
                Khám phá giải pháp{' '}
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </Link>
              <Link
                href="/cong-trinh"
                className="hover:text-gold text-[11px] uppercase tracking-[.16em] text-white/70 transition"
              >
                Xem công trình
              </Link>
            </div>
          </div>
          <div className="absolute bottom-12 right-5 hidden items-center gap-4 text-[10px] uppercase tracking-[.2em] text-white/55 md:flex xl:right-16">
            <span className="bg-gold/80 h-px w-16" />
            Giải pháp cho kiến trúc đương đại
          </div>
          <div className="absolute bottom-10 left-5 flex items-center gap-3 text-[10px] uppercase tracking-[.2em] text-white/45 md:left-10 xl:left-16">
            <ArrowDownRight size={15} className="text-gold" />
            Cuộn để khám phá
          </div>
        </div>
        <div className="absolute bottom-0 left-[67%] top-[82px] hidden w-px bg-white/10 lg:block" />
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 md:grid-cols-[.8fr_1.2fr] md:px-10 md:py-28 xl:px-16">
        <div>
          <p className="eyebrow">Triết lý kiến tạo</p>
          <h2 className="display-title mt-5 max-w-md text-4xl leading-tight md:text-5xl">
            Một đường nét đẹp. Một trải nghiệm khác biệt.
          </h2>
        </div>
        <div className="border-gold/50 grid gap-8 border-l pl-6 md:grid-cols-2 md:gap-12 md:pl-10">
          <p className="text-navy/65 max-w-md text-sm leading-7">
            Từ ánh sáng đầu ngày đến sự tĩnh tại cuối buổi, mỗi không gian đều có cách riêng để kể
            câu chuyện của mình.
          </p>
          <Link
            href="/gioi-thieu"
            className="border-navy/15 hover:border-gold group flex items-start justify-between border-b pb-5 text-xs uppercase tracking-[.15em] transition"
          >
            Khám phá Eurowindow{' '}
            <ArrowRight size={17} className="text-gold transition group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 md:flex-row md:items-end md:justify-between md:px-10 xl:px-16">
          <div>
            <p className="eyebrow">Bắt đầu hành trình</p>
            <h2 className="display-title mt-4 text-4xl md:text-5xl">
              Không gian của bạn, tầm nhìn của bạn.
            </h2>
          </div>
          <Link
            href="/lien-he"
            className="group inline-flex items-center gap-4 text-xs font-semibold uppercase tracking-[.16em]"
          >
            Kết nối với chuyên gia{' '}
            <ArrowRight size={17} className="text-gold transition group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <footer className="bg-navy text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-9 md:flex-row md:items-center md:justify-between md:px-10 xl:px-16">
          <BrandMark />
          <p className="max-w-lg text-xs leading-6 text-white/55">
            Eurowindow — Kiến tạo không gian sống. Thông tin sản phẩm sẽ được cập nhật sau khi xác
            minh nội dung chính thức.
          </p>
          <span className="text-[10px] uppercase tracking-[.16em] text-white/40">
            © {new Date().getFullYear()} Eurowindow
          </span>
        </div>
      </footer>
    </main>
  );
}
