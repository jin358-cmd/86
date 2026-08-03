"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import {
  Suspense,
  useMemo,
  useRef,
  type MutableRefObject,
} from "react";
import * as THREE from "three";

type Look = { x: number; y: number };

/** First-person look: panoramic Night City, no glasses frame occlusion. */
function VrLookRig({ look }: { look: MutableRefObject<Look> }) {
  const { camera } = useThree();
  const yaw = useRef(0);
  const pitch = useRef(0.08);

  useFrame(() => {
    yaw.current = THREE.MathUtils.lerp(yaw.current, look.current.x * 1.15, 0.07);
    pitch.current = THREE.MathUtils.lerp(
      pitch.current,
      0.06 + look.current.y * 0.35,
      0.07,
    );
    camera.position.set(0, 14.5, 0);
    camera.rotation.order = "YXZ";
    camera.rotation.y = yaw.current;
    camera.rotation.x = -pitch.current;
  });

  return null;
}

function NeonSign({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  return (
    <mesh position={position} scale={scale}>
      <planeGeometry args={[1.8, 0.55]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2.4}
        toneMapped={false}
      />
    </mesh>
  );
}

function Billboards() {
  const signs = useMemo(
    () =>
      [
        { p: [-6, 9, -14] as [number, number, number], c: "#00E5FF", s: 1.4 },
        { p: [7, 11, -16] as [number, number, number], c: "#FCEE0A", s: 1.6 },
        { p: [-11, 7, -8] as [number, number, number], c: "#FF1744", s: 1.1 },
        { p: [12, 8, -10] as [number, number, number], c: "#7C4DFF", s: 1.2 },
        { p: [0, 16, -18] as [number, number, number], c: "#00E5FF", s: 2 },
        { p: [-14, 12, 4] as [number, number, number], c: "#FCEE0A", s: 1.3 },
        { p: [15, 10, 6] as [number, number, number], c: "#FF1744", s: 1.25 },
      ] as const,
    [],
  );

  return (
    <group>
      {signs.map((s, i) => (
        <NeonSign key={i} position={s.p} color={s.c} scale={s.s} />
      ))}
    </group>
  );
}

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
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        emissive={emissive ?? "#000"}
        emissiveIntensity={emissive ? 1.1 : 0}
        metalness={0.65}
        roughness={0.28}
      />
    </mesh>
  );
}

function WindowGrid({
  position,
  size,
  color,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.8}
        toneMapped={false}
      />
    </mesh>
  );
}

function AerialTraffic() {
  const group = useRef<THREE.Group>(null);
  const cars = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        radius: 10 + (i % 7) * 3.2,
        speed: 0.12 + (i % 5) * 0.04,
        y: 4 + (i % 8) * 1.1,
        color: i % 3 === 0 ? "#FCEE0A" : i % 3 === 1 ? "#00E5FF" : "#FF1744",
        phase: i * 0.55,
      })),
    [],
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      const c = cars[i];
      const a = t * c.speed + c.phase;
      child.position.set(Math.cos(a) * c.radius, c.y, Math.sin(a) * c.radius);
      child.rotation.y = -a + Math.PI / 2;
    });
  });

  return (
    <group ref={group}>
      {cars.map((c) => (
        <mesh key={c.id}>
          <boxGeometry args={[0.55, 0.12, 0.22]} />
          <meshStandardMaterial
            color={c.color}
            emissive={c.color}
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function RainStreaks() {
  const ref = useRef<THREE.Points>(null);
  const { positions, speeds } = useMemo(() => {
    const count = 900;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 70;
      positions[i * 3 + 1] = Math.random() * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 70;
      speeds[i] = 8 + Math.random() * 14;
    }
    return { positions, speeds };
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < speeds.length; i++) {
      arr[i * 3 + 1] -= speeds[i] * delta;
      if (arr[i * 3 + 1] < 0) arr[i * 3 + 1] = 38 + Math.random() * 6;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#9ad8ff"
        size={0.08}
        transparent
        opacity={0.45}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function NightCity() {
  const buildings = useMemo(() => {
    const items: Array<{
      key: string;
      position: [number, number, number];
      size: [number, number, number];
      color: string;
      emissive?: string;
      windows?: boolean;
    }> = [];

    for (let x = -22; x <= 22; x += 2.2) {
      for (let z = -22; z <= 22; z += 2.2) {
        const dist = Math.hypot(x, z);
        if (dist < 3.5) continue;
        const h =
          3 +
          Math.abs(Math.sin(x * 0.55 + z * 0.4)) * 10 +
          Math.abs(Math.cos(x * 0.2 - z * 0.3)) * 6;
        const tall = h > 12;
        const neonPick = Math.sin(x * 1.7 + z) > 0.35;
        items.push({
          key: `${x}-${z}`,
          position: [x, h / 2, z],
          size: [1.6 + (tall ? 0.4 : 0), h, 1.6 + (tall ? 0.3 : 0)],
          color: tall ? "#0d0f14" : "#0a0b10",
          emissive: tall
            ? neonPick
              ? "#FCEE0A"
              : "#00E5FF"
            : undefined,
          windows: tall || h > 8,
        });
      }
    }
    return items;
  }, []);

  return (
    <group>
      {/* Street plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[48, 72]} />
        <meshStandardMaterial
          color="#05060a"
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>
      {/* Wet road glow ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[4, 28, 64]} />
        <meshStandardMaterial
          color="#061018"
          emissive="#00E5FF"
          emissiveIntensity={0.15}
          transparent
          opacity={0.35}
        />
      </mesh>

      {buildings.map(({ key, windows, ...b }) => (
        <group key={key}>
          <Building {...b} />
          {windows ? (
            <WindowGrid
              position={[b.position[0], b.position[1] * 0.7, b.position[2] + b.size[2] / 2 + 0.02]}
              size={[b.size[0] * 0.7, b.size[1] * 0.55, 0.05]}
              color={b.emissive === "#FCEE0A" ? "#ffe566" : "#66f0ff"}
            />
          ) : null}
        </group>
      ))}

      {/* Landmark megatower ahead */}
      <Building
        position={[0, 18, -20]}
        size={[3.2, 36, 3.2]}
        color="#08090d"
        emissive="#FCEE0A"
      />
      <mesh position={[0, 37, -20]}>
        <sphereGeometry args={[0.7, 20, 20]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>

      <Billboards />
      <AerialTraffic />
      <RainStreaks />
      <Sparkles count={120} scale={50} size={2.2} speed={0.25} color="#FCEE0A" />
      <Stars radius={90} depth={40} count={1800} factor={3.2} fade speed={0.5} />
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <color attach="background" args={["#03050a"]} />
      <fog attach="fog" args={["#03050a", 18, 55]} />
      <ambientLight intensity={0.18} />
      <directionalLight position={[10, 22, 8]} intensity={0.35} color="#8aa0c8" />
      <pointLight position={[0, 20, -8]} intensity={1.4} color="#FCEE0A" distance={40} />
      <pointLight position={[-12, 10, 4]} intensity={1.1} color="#00E5FF" distance={35} />
      <pointLight position={[14, 8, -2]} intensity={0.9} color="#FF1744" distance={30} />
      <hemisphereLight args={["#1a2030", "#050508", 0.45]} />
    </>
  );
}

function SceneContent({ look }: { look: MutableRefObject<Look> }) {
  return (
    <>
      <SceneLights />
      <VrLookRig look={look} />
      <NightCity />
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={1.15}
          luminanceThreshold={0.18}
          luminanceSmoothing={0.65}
          mipmapBlur
        />
        {/* Soft edge only — keeps center fully open like VR */}
        <Vignette offset={0.25} darkness={0.55} />
      </EffectComposer>
    </>
  );
}

export function NeuralGlassCanvas() {
  const look = useRef<Look>({ x: 0, y: 0 });

  return (
    <div
      className="h-full w-full cursor-crosshair"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        look.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        look.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      }}
    >
      <Canvas
        camera={{ position: [0, 14.5, 0], fov: 88, near: 0.1, far: 120 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <SceneContent look={look} />
        </Suspense>
      </Canvas>
    </div>
  );
}
