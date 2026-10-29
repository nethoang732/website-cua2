import type { Metadata } from 'next';
import { SectionLanding } from '../sections';

export const metadata: Metadata = { title: 'Liên hệ' };
export default function ContactPage() {
  return (
    <SectionLanding
      title="Kết nối với chúng tôi"
      description="Biểu mẫu liên hệ sẽ được hoàn thiện cùng quy trình tiếp nhận và bảo vệ dữ liệu khách hàng."
    />
  );
}
