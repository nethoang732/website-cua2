'use client';

import dynamic from 'next/dynamic';

const ArchitectureScene = dynamic(() => import('./architecture-scene'), {
  ssr: false,
  loading: () => (
    <div className="bg-navy/5 text-navy/50 grid aspect-square place-items-center text-xs">
      Mô hình 3D sẽ được bổ sung
    </div>
  ),
});

export function ArchitecturePreview() {
  return <ArchitectureScene />;
}
