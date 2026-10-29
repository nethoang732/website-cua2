import type { Metadata } from 'next';
import { SectionLanding } from '../sections';

export const metadata: Metadata = { title: 'Giới thiệu' };
export default function AboutPage() {
  return (
    <SectionLanding
      title="Giới thiệu"
      description="Nội dung giới thiệu sẽ được xây dựng sau khi có thông tin chính thức đã xác minh."
    />
  );
}
