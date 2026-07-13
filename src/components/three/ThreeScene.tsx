"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import MountainScene from "./MountainScene";
import Particles from "./Particles";
import FogEffect from "./FogEffect";

function SceneLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
    </div>
  );
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Suspense fallback={<SceneLoader />}>
        <Canvas
          camera={{ position: [0, 2, 15], fov: 60, near: 0.1, far: 100 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{ background: "transparent" }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.3} color="#8D99AE" />
          <directionalLight
            position={[10, 20, 5]}
            intensity={0.8}
            color="#D4AF37"
            castShadow={false}
          />
          <directionalLight
            position={[-5, 10, -5]}
            intensity={0.3}
            color="#1B4332"
          />
          <pointLight position={[0, 5, 10]} intensity={0.5} color="#D4AF37" distance={30} />

          {/* Atmospheric fog */}
          <fogExp2 attach="fog" color="#0D1117" density={0.035} />

          {/* Scene elements */}
          <MountainScene />
          <Particles count={2000} />
          <FogEffect />
        </Canvas>
      </Suspense>
    </div>
  );
}
