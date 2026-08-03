"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function Building({
  position,
  size,
  color,
  emissive,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  emissive?: string;
}) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        emissive={emissive ?? "#000"}
        emissiveIntensity={emissive ? 0.8 : 0}
        metalness={0.55}
        roughness={0.35}
      />
    </mesh>
  );
}

function Traffic() {
  const group = useRef<THREE.Group>(null);
  const cars = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        radius: 8 + (i % 5) * 2.2,
        speed: 0.15 + (i % 4) * 0.05,
        y: 1.2 + (i % 6) * 0.55,
        color: i % 3 === 0 ? "#FCEE0A" : i % 3 === 1 ? "#00E5FF" : "#FF1744",
        phase: i * 0.7,
      })),
    [],
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      const c = cars[i];
      const a = t * c.speed + c.phase;
      child.position.set(
        Math.cos(a) * c.radius,
        c.y,
        Math.sin(a) * c.radius,
      );
    });
  });

  return (
    <group ref={group}>
      {cars.map((c) => (
        <mesh key={c.id}>
          <boxGeometry args={[0.35, 0.12, 0.18]} />
          <meshStandardMaterial
            color={c.color}
            emissive={c.color}
            emissiveIntensity={1.5}
          />
        </mesh>
      ))}
    </group>
  );
}

function City() {
  const buildings = useMemo(() => {
    const items: Array<{
      key: string;
      position: [number, number, number];
      size: [number, number, number];
      color: string;
      emissive?: string;
    }> = [];
    for (let x = -10; x <= 10; x += 1.6) {
      for (let z = -10; z <= 10; z += 1.6) {
        if (Math.hypot(x, z) < 2.2) continue;
        const h = 1.2 + Math.abs(Math.sin(x * 2.1 + z * 1.3)) * 6.5;
        const tall = h > 5.5;
        items.push({
          key: `${x}-${z}`,
          position: [x, h / 2, z],
          size: [1.1, h, 1.1],
          color: tall ? "#141414" : "#111111",
          emissive: tall
            ? Math.sin(x + z) > 0
              ? "#FCEE0A"
              : "#00E5FF"
            : undefined,
        });
      }
    }
    return items;
  }, []);

  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <group ref={group}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[18, 64]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.7} roughness={0.4} />
      </mesh>
      {buildings.map(({ key, ...b }) => (
        <Building key={key} {...b} />
      ))}
      {/* Landmark tower */}
      <Building
        position={[0, 5.5, 0]}
        size={[1.4, 11, 1.4]}
        color="#101010"
        emissive="#FCEE0A"
      />
      <mesh position={[0, 11.3, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={2}
        />
      </mesh>
      <Traffic />
      <Sparkles count={80} scale={22} size={2} speed={0.3} color="#FCEE0A" />
      <Stars radius={60} depth={30} count={1200} factor={3} fade speed={0.6} />
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[8, 12, 4]} intensity={0.9} color="#ffe9a8" />
      <pointLight position={[0, 10, 0]} intensity={1.2} color="#FCEE0A" />
      <pointLight position={[-6, 4, 4]} intensity={0.8} color="#00E5FF" />
      <fog attach="fog" args={["#080808", 12, 34]} />
      <color attach="background" args={["#080808"]} />
    </>
  );
}

export function GvgCityCanvas({
  interactive = false,
}: {
  interactive?: boolean;
}) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [10, 8, 12], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Lights />
          <City />
          <EffectComposer>
            <Bloom
              intensity={interactive ? 1.1 : 0.85}
              luminanceThreshold={0.25}
              luminanceSmoothing={0.7}
              mipmapBlur
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
