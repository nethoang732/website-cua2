import type { Metadata } from 'next';
import { SectionLanding } from '../sections';

export const metadata: Metadata = { title: 'Sản phẩm' };
export default function ProductsPage() {
  return (
    <SectionLanding
      title="Sản phẩm"
      description="Danh mục và thông số sản phẩm sẽ được bổ sung sau khi xác minh tài liệu chính thức."
    />
  );
}
