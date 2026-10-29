import type { Metadata } from 'next';
import { SectionLanding } from '../sections';

export const metadata: Metadata = { title: 'Tìm kiếm' };

export default function SearchPage() {
  return (
    <SectionLanding
      title="Tìm kiếm"
      description="Tìm kiếm nội dung sẽ được triển khai khi dữ liệu website sẵn sàng."
    />
  );
}
