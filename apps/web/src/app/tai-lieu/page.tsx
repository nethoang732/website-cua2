import type { Metadata } from 'next';
import { SectionLanding } from '../sections';

export const metadata: Metadata = { title: 'Tài liệu' };
export default function DocumentsPage() {
  return (
    <SectionLanding
      title="Tài liệu"
      description="Tài liệu sẽ được đăng tải sau khi kiểm tra nguồn và quyền sử dụng."
    />
  );
}
