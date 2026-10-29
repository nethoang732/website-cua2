import type { Metadata } from 'next';
import { SectionLanding } from '../sections';

export const metadata: Metadata = { title: 'Công trình' };
export default function ProjectsPage() {
  return (
    <SectionLanding
      title="Công trình"
      description="Hồ sơ công trình và hình ảnh có quyền sử dụng sẽ được bổ sung sau."
    />
  );
}
