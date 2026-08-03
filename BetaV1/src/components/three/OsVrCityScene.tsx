"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Stars, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import {
  Suspense,
  useMemo,
  useRef,
  type MutableRefObject,
} from "react";
import * as THREE from "three";
import { DISTRICTS, MISSIONS, type MissionId } from "@/data/content";
import { playTone } from "@/lib/audio";

type Look = { x: number; y: number };
export type WeatherMode = "CLEAR" | "FOG" | "NEON STORM" | "ORBITAL";

export type BuildingMissionMarker = {
  id: string;
  position: [number, number, number];
  missionId: MissionId;
  district: string;
};

function VrLookRig({ look }: { look: MutableRefObject<Look> }) {
  const { camera } = useThree();
  const yaw = useRef(0);
  const pitch = useRef(0);

  useFrame(() => {
    yaw.current = THREE.MathUtils.lerp(yaw.current, look.current.x * 1.1, 0.07);
    pitch.current = THREE.MathUtils.lerp(
      pitch.current,
      look.current.y * 0.3,
      0.07,
    );
    camera.position.set(0, 16, 10);
    camera.rotation.order = "YXZ";
    camera.rotation.y = yaw.current;
    camera.rotation.x = -0.1 - pitch.current;
  });

  return null;
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
        emissiveIntensity={emissive ? 0.9 : 0}
        metalness={0.65}
        roughness={0.3}
      />
    </mesh>
  );
}

function MissionBuildingCard({
  marker,
  activeMissionId,
  onSwap,
}: {
  marker: BuildingMissionMarker;
  activeMissionId: MissionId;
  onSwap: (markerId: string) => void;
}) {
  const mission =
    MISSIONS.find((m) => m.id === marker.missionId) ?? MISSIONS[0];
  const isActive = mission.id === activeMissionId;

  return (
    <Html
      position={marker.position}
      center
      distanceFactor={14}
      zIndexRange={[40, 0]}
      style={{ pointerEvents: "auto" }}
    >
      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          playTone("ui");
          onSwap(marker.id);
        }}
        className={`w-[210px] border px-3 py-2.5 text-left backdrop-blur-sm transition ${
          isActive
            ? "border-gvg-yellow bg-black/80 shadow-[0_0_24px_rgba(252,238,10,0.35)]"
            : "border-white/20 bg-black/70 hover:border-gvg-cyan/70"
        }`}
      >
        <p className="font-mono text-[9px] tracking-[0.28em] text-gvg-cyan">
          {marker.district.toUpperCase()}
        </p>
        <p className="mt-1 font-display text-sm tracking-[0.18em] text-gvg-yellow">
          MISSION · {mission.title}
        </p>
        <p className="mt-1 font-body text-[11px] leading-snug text-white/70">
          {mission.detail}
        </p>
        <p className="mt-2 font-mono text-[9px] tracking-[0.2em] text-white/45">
          CLICK TO SWAP TASK
        </p>
      </button>
    </Html>
  );
}

function Traffic() {
  const group = useRef<THREE.Group>(null);
  const cars = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        radius: 10 + (i % 6) * 3,
        speed: 0.12 + (i % 4) * 0.04,
        y: 4 + (i % 7) * 1.1,
        color: i % 3 === 0 ? "#FCEE0A" : i % 3 === 1 ? "#00E5FF" : "#FF1744",
        phase: i * 0.5,
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
    });
  });

  return (
    <group ref={group}>
      {cars.map((c) => (
        <mesh key={c.id}>
          <boxGeometry args={[0.5, 0.1, 0.18]} />
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

function OsCityMesh({
  weather,
  markers,
  activeMissionId,
  onSwap,
}: {
  weather: WeatherMode;
  markers: BuildingMissionMarker[];
  activeMissionId: MissionId;
  onSwap: (markerId: string) => void;
}) {
  const buildings = useMemo(() => {
    const items: Array<{
      key: string;
      position: [number, number, number];
      size: [number, number, number];
      color: string;
      emissive?: string;
    }> = [];
    for (let x = -24; x <= 24; x += 2.6) {
      for (let z = -26; z <= 8; z += 2.6) {
        if (Math.hypot(x, z + 4) < 4.5) continue;
        if (Math.abs(x) < 3 && z > -16 && z < 5) continue;
        const h =
          5 +
          Math.abs(Math.sin(x * 0.5 + z * 0.32)) * 12 +
          Math.abs(Math.cos(x * 0.2 - z * 0.22)) * 7;
        const tall = h > 14;
        items.push({
          key: `${x}-${z}`,
          position: [x, h / 2, z],
          size: [1.8 + (tall ? 0.5 : 0), h, 1.8],
          color: tall ? "#0c0e16" : "#090b12",
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

  return (
    <group>
      <fog
        attach="fog"
        args={[
          weather === "FOG" ? "#0a1020" : "#03050a",
          weather === "FOG" ? 10 : 18,
          weather === "FOG" ? 38 : 58,
        ]}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[50, 72]} />
        <meshStandardMaterial color="#04060c" metalness={0.9} roughness={0.2} />
      </mesh>

      {buildings.map(({ key, ...b }) => (
        <Building key={key} {...b} />
      ))}

      <Building
        position={[0, 24, -28]}
        size={[4.5, 48, 4.5]}
        color="#080a10"
        emissive="#FCEE0A"
      />

      {markers.map((m) => (
        <MissionBuildingCard
          key={m.id}
          marker={m}
          activeMissionId={activeMissionId}
          onSwap={onSwap}
        />
      ))}

      <Traffic />
      <Sparkles
        count={weather === "NEON STORM" ? 220 : 120}
        scale={50}
        size={2}
        speed={weather === "ORBITAL" ? 0.5 : 0.25}
        color={weather === "NEON STORM" ? "#ff2da6" : "#FCEE0A"}
      />
      <Stars radius={90} depth={40} count={1600} factor={3} fade speed={0.5} />

      {(weather === "FOG" || weather === "NEON STORM") && (
        <mesh position={[0, 5, -8]}>
          <planeGeometry args={[70, 20]} />
          <meshStandardMaterial
            color={weather === "FOG" ? "#1a2848" : "#301028"}
            transparent
            opacity={weather === "FOG" ? 0.28 : 0.18}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

function Lights() {
  return (
    <>
      <color attach="background" args={["#02040a"]} />
      <ambientLight intensity={0.15} />
      <hemisphereLight args={["#1c2440", "#050508", 0.5]} />
      <pointLight
        position={[-8, 16, -8]}
        intensity={1.6}
        color="#00E5FF"
        distance={36}
      />
      <pointLight
        position={[10, 14, -10]}
        intensity={1.6}
        color="#ff2da6"
        distance={34}
      />
      <pointLight
        position={[0, 12, -6]}
        intensity={1.2}
        color="#FCEE0A"
        distance={28}
      />
    </>
  );
}

export function createInitialMissionMarkers(): BuildingMissionMarker[] {
  const spots: Array<[number, number, number]> = [
    [-9, 18, -12],
    [8, 16, -14],
    [-14, 14, -6],
    [13, 15, -8],
    [2, 20, -20],
    [-6, 13, -18],
  ];
  return spots.map((position, i) => ({
    id: `m-${i}`,
    position,
    missionId: MISSIONS[i % MISSIONS.length].id,
    district: DISTRICTS[i % DISTRICTS.length].name,
  }));
}

export function OsVrCityCanvas({
  weather,
  markers,
  activeMissionId,
  onSwapMarkerMission,
}: {
  weather: WeatherMode;
  markers: BuildingMissionMarker[];
  activeMissionId: MissionId;
  onSwapMarkerMission: (markerId: string) => void;
}) {
  const look = useRef<Look>({ x: 0, y: 0 });
  const bloomBoost = weather === "NEON STORM" || weather === "ORBITAL";

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
        camera={{ position: [0, 16, 10], fov: 80, near: 0.1, far: 140 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Lights />
          <VrLookRig look={look} />
          <OsCityMesh
            weather={weather}
            markers={markers}
            activeMissionId={activeMissionId}
            onSwap={onSwapMarkerMission}
          />
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={bloomBoost ? 1.45 : 1.1}
              luminanceThreshold={0.14}
              luminanceSmoothing={0.6}
              mipmapBlur
            />
            <Vignette offset={0.28} darkness={0.5} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
