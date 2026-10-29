'use client';

import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

function ArchitecturalFrame() {
  return (
    <group>
      <mesh position={[-0.8, 0, 0]}>
        <boxGeometry args={[0.08, 2.4, 0.08]} />
        <meshStandardMaterial color="#c5a46d" />
      </mesh>
      <mesh position={[0.8, 0, 0]}>
        <boxGeometry args={[0.08, 2.4, 0.08]} />
        <meshStandardMaterial color="#c5a46d" />
      </mesh>
      <mesh position={[0, 1.16, 0]}>
        <boxGeometry args={[1.7, 0.08, 0.08]} />
        <meshStandardMaterial color="#c5a46d" />
      </mesh>
      <mesh position={[0, 0, -0.04]}>
        <boxGeometry args={[1.5, 2.15, 0.03]} />
        <meshStandardMaterial color="#7895a7" transparent opacity={0.3} roughness={0.25} />
      </mesh>
    </group>
  );
}

export default function ArchitectureScene() {
  return (
    <div
      className="bg-ivory aspect-square overflow-hidden"
      aria-label="Bản xem trước khung kiến trúc 3D"
    >
      <Canvas camera={{ position: [3, 2, 4], fov: 35 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[3, 5, 4]} intensity={2} />
        <ArchitecturalFrame />
        <OrbitControls enablePan={false} minDistance={3} maxDistance={7} />
      </Canvas>
    </div>
  );
}
