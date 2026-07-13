"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function MountainScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(60, 30, 128, 64);
    const positions = geo.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      // Create mountain ridges using layered sine waves
      const height =
        Math.sin(x * 0.3) * 3 +
        Math.sin(x * 0.7 + 1) * 1.5 +
        Math.cos(y * 0.5) * 2 +
        Math.sin(x * 0.15 + y * 0.2) * 4 +
        Math.cos(x * 0.8 - y * 0.3) * 1.2;
      // Make mountains taller toward the back
      const depthFactor = (y + 15) / 30;
      positions.setZ(i, height * depthFactor * 1.5 - 2);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = -Math.PI / 2.5 + mouse.y * 0.02;
      meshRef.current.rotation.z = mouse.x * 0.015;
    }
  });

  return (
    <>
      {/* Main mountain mesh */}
      <mesh ref={meshRef} geometry={geometry} position={[0, -4, -10]} rotation={[-Math.PI / 2.5, 0, 0]}>
        <meshStandardMaterial
          color="#1B4332"
          roughness={0.85}
          metalness={0.1}
          flatShading
        />
      </mesh>

      {/* Background mountain layer */}
      <mesh position={[0, -2, -25]} rotation={[-Math.PI / 2.8, 0, 0]}>
        <planeGeometry args={[80, 40, 64, 32]} />
        <meshStandardMaterial color="#0f2a1f" roughness={0.9} flatShading />
      </mesh>

      {/* Ground plane */}
      <mesh position={[0, -8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#0D1117" />
      </mesh>
    </>
  );
}
