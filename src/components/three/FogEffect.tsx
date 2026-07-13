"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FogLayer({
  position,
  scale,
  speed,
  opacity,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  speed: number;
  opacity: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x =
        position[0] + Math.sin(state.clock.elapsedTime * speed) * 3;
      (meshRef.current.material as THREE.MeshBasicMaterial).opacity =
        opacity + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        color="#8D99AE"
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </mesh>
  );
}

export default function FogEffect() {
  return (
    <>
      <FogLayer position={[-5, -3, -5]} scale={[40, 4, 1]} speed={0.15} opacity={0.12} />
      <FogLayer position={[8, -2, -8]} scale={[35, 3, 1]} speed={0.1} opacity={0.08} />
      <FogLayer position={[-3, -4, -3]} scale={[50, 5, 1]} speed={0.08} opacity={0.15} />
      <FogLayer position={[0, -5, -2]} scale={[60, 6, 1]} speed={0.12} opacity={0.1} />
    </>
  );
}
