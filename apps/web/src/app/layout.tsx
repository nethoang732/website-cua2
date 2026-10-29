import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Eurowindow — Kiến tạo không gian sống',
    template: '%s | Eurowindow',
  },
  description:
    'Giải pháp cửa và vách kính cho kiến trúc hiện đại. Khám phá hành trình kiến tạo không gian sống cùng Eurowindow.',
  applicationName: 'Eurowindow',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Eurowindow',
    title: 'Eurowindow — Kiến tạo không gian sống',
    description: 'Giải pháp cửa và vách kính cho kiến trúc hiện đại.',
  },
};

export const viewport: Viewport = {
  themeColor: '#071B33',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
