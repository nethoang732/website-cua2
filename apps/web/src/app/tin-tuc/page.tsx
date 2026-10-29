import type { Metadata } from 'next';
import { SectionLanding } from '../sections';

export const metadata: Metadata = { title: 'Tin tức' };
export default function ArticlesPage() {
  return (
    <SectionLanding
      title="Tin tức"
      description="Nội dung bài viết chưa được đưa vào sitemap cho đến khi được xuất bản."
    />
  );
}
