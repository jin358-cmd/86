"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Float } from "@react-three/drei";
import { Suspense, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

function Glasses({ mouse }: { mouse: MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      mouse.current.x * 0.45,
      0.06,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      mouse.current.y * 0.2,
      0.06,
    );
  });

  const glassMat = (
    <meshPhysicalMaterial
      color="#9adfff"
      metalness={0.15}
      roughness={0.05}
      transmission={0.92}
      thickness={0.4}
      transparent
      opacity={0.85}
      reflectivity={1}
      ior={1.5}
      clearcoat={1}
      clearcoatRoughness={0.05}
    />
  );

  const frameMat = (
    <meshStandardMaterial color="#101010" metalness={0.9} roughness={0.25} />
  );

  const accentMat = (
    <meshStandardMaterial
      color="#FCEE0A"
      emissive="#FCEE0A"
      emissiveIntensity={1.4}
      metalness={0.4}
      roughness={0.3}
    />
  );

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={group} position={[0, 0.05, 0]} scale={1.15}>
        {/* Frame bridge */}
        <mesh position={[0, 0.08, 0]} castShadow>
          <boxGeometry args={[0.28, 0.05, 0.08]} />
          {frameMat}
        </mesh>
        {/* Left rim */}
        <mesh position={[-0.55, 0, 0]} castShadow>
          <torusGeometry args={[0.38, 0.045, 16, 48]} />
          {frameMat}
        </mesh>
        {/* Right rim */}
        <mesh position={[0.55, 0, 0]} castShadow>
          <torusGeometry args={[0.38, 0.045, 16, 48]} />
          {frameMat}
        </mesh>
        {/* Lenses */}
        <mesh position={[-0.55, 0, 0.02]}>
          <circleGeometry args={[0.34, 48]} />
          {glassMat}
        </mesh>
        <mesh position={[0.55, 0, 0.02]}>
          <circleGeometry args={[0.34, 48]} />
          {glassMat}
        </mesh>
        {/* HUD accent dots */}
        <mesh position={[-0.55, 0.28, 0.05]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          {accentMat}
        </mesh>
        <mesh position={[0.55, 0.28, 0.05]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          {accentMat}
        </mesh>
        {/* Temples */}
        <mesh position={[-0.95, 0.02, -0.45]} rotation={[0, 0.35, 0]}>
          <boxGeometry args={[0.55, 0.04, 0.05]} />
          {frameMat}
        </mesh>
        <mesh position={[0.95, 0.02, -0.45]} rotation={[0, -0.35, 0]}>
          <boxGeometry args={[0.55, 0.04, 0.05]} />
          {frameMat}
        </mesh>
      </group>
    </Float>
  );
}

function SceneContent({
  mouse,
}: {
  mouse: MutableRefObject<{ x: number; y: number }>;
}) {
  return (
    <>
      <color attach="background" args={["#080808"]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 2]} intensity={1.4} color="#fff6c8" />
      <pointLight position={[-2, 1, 2]} intensity={1.2} color="#00E5FF" />
      <pointLight position={[2, -1, 1]} intensity={0.8} color="#FCEE0A" />
      <Glasses mouse={mouse} />
      <ContactShadows
        position={[0, -0.85, 0]}
        opacity={0.55}
        scale={8}
        blur={2.5}
        far={2}
      />
      <Environment preset="city" />
    </>
  );
}

export function NeuralGlassCanvas() {
  const mouse = useRef({ x: 0, y: 0 });

  return (
    <div
      className="h-full w-full"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      }}
    >
      <Canvas
        camera={{ position: [0, 0.1, 3.2], fov: 35 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <SceneContent mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  );
}
