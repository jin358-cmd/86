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

/** First-person VR look over the neon megacity canyon. */
function VrLookRig({ look }: { look: MutableRefObject<Look> }) {
  const { camera } = useThree();
  const yaw = useRef(0);
  const pitch = useRef(0.02);

  useFrame(() => {
    // Mouse left → look left; mouse right → look right
    yaw.current = THREE.MathUtils.lerp(yaw.current, look.current.x * 1.05, 0.07);
    pitch.current = THREE.MathUtils.lerp(
      pitch.current,
      look.current.y * 0.28,
      0.07,
    );
    // Rooftop-high vantage like the reference, facing the skyline
    camera.position.set(0, 18, 8);
    camera.rotation.order = "YXZ";
    camera.rotation.y = yaw.current;
    camera.rotation.x = -0.12 - pitch.current;
  });

  return null;
}

function BuildingShell({
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
        metalness={0.72}
        roughness={0.32}
      />
    </mesh>
  );
}

/** Warm window scatter across façades — dense lit megacity feel. */
function WindowField({
  center,
  size,
  seed,
}: {
  center: [number, number, number];
  size: [number, number, number];
  seed: number;
}) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const count = useMemo(() => {
    const cols = Math.max(3, Math.floor(size[0] * 3.2));
    const rows = Math.max(4, Math.floor(size[1] * 2.4));
    return cols * rows;
  }, [size]);

  useMemo(() => {
    // placement computed in useFrame first mount via layout effect pattern below
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const placed = useRef(false);

  useFrame(() => {
    if (!mesh.current || placed.current) return;
    placed.current = true;
    const cols = Math.max(3, Math.floor(size[0] * 3.2));
    const rows = Math.max(4, Math.floor(size[1] * 2.4));
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (i >= count) break;
        // Pseudo-random lit / dark windows
        const lit = Math.sin(seed * 12.3 + c * 2.1 + r * 4.7) > -0.15;
        if (!lit) {
          dummy.scale.set(0, 0, 0);
        } else {
          const x = center[0] - size[0] / 2 + 0.25 + (c / Math.max(1, cols - 1)) * (size[0] - 0.5);
          const y = center[1] - size[1] / 2 + 0.35 + (r / Math.max(1, rows - 1)) * (size[1] - 0.7);
          const z = center[2] + size[2] / 2 + 0.04;
          dummy.position.set(x, y, z);
          dummy.scale.set(0.12, 0.18, 0.04);
        }
        dummy.updateMatrix();
        mesh.current.setMatrixAt(i, dummy.matrix);
        i += 1;
      }
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#ffd9a0"
        emissive="#ffc878"
        emissiveIntensity={2.2}
        toneMapped={false}
      />
    </instancedMesh>
  );
}

function VerticalNeonStrip({
  position,
  height,
  color,
}: {
  position: [number, number, number];
  height: number;
  color: string;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.18, height, 0.08]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={3.2}
        toneMapped={false}
      />
    </mesh>
  );
}

function PortraitBillboard({
  position,
  color,
  scale = 1,
  rotationY = 0,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  rotationY?: number;
}) {
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {/* Frame */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[3.4, 5.2, 0.12]} />
        <meshStandardMaterial color="#0a0a0e" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Face glow plate */}
      <mesh>
        <planeGeometry args={[3, 4.6]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.6}
          transparent
          opacity={0.85}
          toneMapped={false}
        />
      </mesh>
      {/* Abstract portrait silhouette */}
      <mesh position={[0, 0.4, 0.03]}>
        <circleGeometry args={[0.85, 24]} />
        <meshStandardMaterial
          color="#120818"
          emissive={color}
          emissiveIntensity={0.35}
        />
      </mesh>
      <mesh position={[0, -0.9, 0.03]}>
        <capsuleGeometry args={[0.7, 1.1, 6, 12]} />
        <meshStandardMaterial
          color="#120818"
          emissive={color}
          emissiveIntensity={0.25}
        />
      </mesh>
      {/* Brand bar */}
      <mesh position={[0, -2.15, 0.04]}>
        <planeGeometry args={[2.6, 0.35]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={color}
          emissiveIntensity={2.5}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function NeonKanjiCluster({
  position,
  colors,
}: {
  position: [number, number, number];
  colors: string[];
}) {
  return (
    <group position={position}>
      {colors.map((c, i) => (
        <group key={i} position={[i * 0.55 - (colors.length * 0.55) / 2, 0, 0]}>
          {/* Fake glyph blocks stacked like neon characters */}
          <mesh position={[0, 0.55, 0]}>
            <boxGeometry args={[0.42, 0.42, 0.06]} />
            <meshStandardMaterial
              color={c}
              emissive={c}
              emissiveIntensity={2.8}
              toneMapped={false}
            />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.42, 0.42, 0.06]} />
            <meshStandardMaterial
              color={c}
              emissive={c}
              emissiveIntensity={2.4}
              toneMapped={false}
            />
          </mesh>
          <mesh position={[0, -0.55, 0]}>
            <boxGeometry args={[0.42, 0.42, 0.06]} />
            <meshStandardMaterial
              color={c}
              emissive={c}
              emissiveIntensity={2.8}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** Cyan holographic koi swimming between towers. */
function HoloKoi() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    const x = Math.sin(t * 0.35) * 14;
    const y = 14 + Math.sin(t * 0.7) * 2.2;
    const z = -12 + Math.cos(t * 0.28) * 6;
    group.current.position.set(x, y, z);
    group.current.rotation.y = Math.atan2(
      Math.cos(t * 0.35) * 14 * 0.35,
      -Math.sin(t * 0.28) * 6 * 0.28,
    );
    group.current.rotation.z = Math.sin(t * 1.4) * 0.25;
  });

  const holo = (
    <meshStandardMaterial
      color="#4df0ff"
      emissive="#00E5FF"
      emissiveIntensity={2.8}
      transparent
      opacity={0.42}
      depthWrite={false}
      toneMapped={false}
      side={THREE.DoubleSide}
    />
  );

  return (
    <group ref={group}>
      {/* Body */}
      <mesh scale={[1.8, 0.55, 0.7]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[1, 24, 16]} />
        {holo}
      </mesh>
      {/* Head taper */}
      <mesh position={[1.6, 0.05, 0]} scale={[0.7, 0.4, 0.45]}>
        <sphereGeometry args={[1, 16, 12]} />
        {holo}
      </mesh>
      {/* Tail */}
      <mesh position={[-1.7, 0.1, 0]} rotation={[0, 0, 0.4]}>
        <coneGeometry args={[0.55, 1.4, 3]} />
        {holo}
      </mesh>
      {/* Fins */}
      <mesh position={[0.2, 0.35, 0]} rotation={[0.5, 0, 0]}>
        <coneGeometry args={[0.35, 0.9, 3]} />
        {holo}
      </mesh>
      <pointLight color="#00E5FF" intensity={2.2} distance={12} />
    </group>
  );
}

/** Magenta holographic figure standing among towers. */
function HoloFigure() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.position.y = 8 + Math.sin(t * 0.9) * 0.35;
    const mat = (group.current.children[0] as THREE.Mesh)
      ?.material as THREE.MeshStandardMaterial;
    if (mat) mat.opacity = 0.28 + Math.sin(t * 2.2) * 0.08;
  });

  const holo = (
    <meshStandardMaterial
      color="#ff4dc8"
      emissive="#ff2da6"
      emissiveIntensity={3}
      transparent
      opacity={0.32}
      depthWrite={false}
      toneMapped={false}
      side={THREE.DoubleSide}
    />
  );

  return (
    <group ref={group} position={[6, 8, -14]} scale={2.4}>
      <mesh position={[0, 1.55, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        {holo}
      </mesh>
      <mesh position={[0, 0.55, 0]}>
        <capsuleGeometry args={[0.32, 0.9, 6, 12]} />
        {holo}
      </mesh>
      <mesh position={[0, -0.55, 0]}>
        <coneGeometry args={[0.55, 1.4, 6]} />
        {holo}
      </mesh>
      <pointLight color="#ff2da6" intensity={2.5} distance={14} position={[0, 1, 0]} />
    </group>
  );
}

function ElevatedMonorail() {
  const train = useRef<THREE.Group>(null);
  const path = useMemo(() => {
    // Canyon path ahead of camera
    const pts = [
      new THREE.Vector3(-22, 7.5, -6),
      new THREE.Vector3(-8, 8.2, -10),
      new THREE.Vector3(4, 8.5, -12),
      new THREE.Vector3(16, 8, -8),
      new THREE.Vector3(24, 7.2, -2),
    ];
    return new THREE.CatmullRomCurve3(pts);
  }, []);

  const railGeom = useMemo(() => {
    return new THREE.TubeGeometry(path, 64, 0.08, 8, false);
  }, [path]);

  useFrame(({ clock }) => {
    if (!train.current) return;
    const t = (clock.getElapsedTime() * 0.05) % 1;
    const p = path.getPointAt(t);
    const look = path.getPointAt((t + 0.02) % 1);
    train.current.position.copy(p);
    train.current.lookAt(look);
  });

  return (
    <group>
      <mesh geometry={railGeom}>
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={1.4}
          toneMapped={false}
        />
      </mesh>
      <group ref={train}>
        {[-1.2, -0.4, 0.4, 1.2].map((z, i) => (
          <mesh key={i} position={[0, 0.15, z]}>
            <boxGeometry args={[0.5, 0.28, 0.7]} />
            <meshStandardMaterial
              color="#FCEE0A"
              emissive={i % 2 ? "#00E5FF" : "#FCEE0A"}
              emissiveIntensity={2.5}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function AerialTraffic() {
  const group = useRef<THREE.Group>(null);
  const cars = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        radius: 9 + (i % 8) * 3.4,
        speed: 0.1 + (i % 5) * 0.035,
        y: 5 + (i % 9) * 1.15,
        color: i % 3 === 0 ? "#FCEE0A" : i % 3 === 1 ? "#00E5FF" : "#FF1744",
        phase: i * 0.48,
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
          <boxGeometry args={[0.6, 0.1, 0.2]} />
          <meshStandardMaterial
            color={c.color}
            emissive={c.color}
            emissiveIntensity={2.2}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function SmogLayers() {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (a.current) a.current.position.x = Math.sin(t * 0.05) * 3;
    if (b.current) b.current.position.x = Math.cos(t * 0.04) * 4;
  });

  return (
    <group>
      <mesh ref={a} position={[0, 4, -8]} rotation={[-0.08, 0, 0]}>
        <planeGeometry args={[70, 18]} />
        <meshStandardMaterial
          color="#1a2040"
          transparent
          opacity={0.22}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={b} position={[2, 2.5, -4]} rotation={[-0.05, 0.1, 0]}>
        <planeGeometry args={[60, 12]} />
        <meshStandardMaterial
          color="#241028"
          transparent
          opacity={0.16}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function RainStreaks() {
  const ref = useRef<THREE.Points>(null);
  const { positions, speeds } = useMemo(() => {
    const count = 1100;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = Math.random() * 45;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
      speeds[i] = 9 + Math.random() * 16;
    }
    return { positions, speeds };
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < speeds.length; i++) {
      arr[i * 3 + 1] -= speeds[i] * delta;
      if (arr[i * 3 + 1] < 0) arr[i * 3 + 1] = 40 + Math.random() * 6;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#a8d8ff"
        size={0.07}
        transparent
        opacity={0.4}
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
      seed: number;
      strip?: string;
    }> = [];

    for (let x = -26; x <= 26; x += 2.4) {
      for (let z = -28; z <= 10; z += 2.4) {
        const dist = Math.hypot(x, z + 6);
        if (dist < 4) continue;
        // Leave a canyon corridor in front of the camera
        if (Math.abs(x) < 3.2 && z > -18 && z < 6) continue;

        const h =
          5 +
          Math.abs(Math.sin(x * 0.48 + z * 0.35)) * 14 +
          Math.abs(Math.cos(x * 0.18 - z * 0.25)) * 8;
        const tall = h > 16;
        const stripRoll = Math.sin(x * 2.2 + z * 1.1);
        items.push({
          key: `${x}-${z}`,
          position: [x, h / 2, z],
          size: [
            1.7 + (tall ? 0.6 : 0) + (Math.abs(x) % 3) * 0.15,
            h,
            1.7 + (tall ? 0.5 : 0),
          ],
          color: tall ? "#0b0d14" : "#080a10",
          seed: x * 17 + z * 31,
          strip:
            stripRoll > 0.55
              ? "#00E5FF"
              : stripRoll < -0.55
                ? "#ff2da6"
                : stripRoll > 0.2
                  ? "#FF1744"
                  : undefined,
        });
      }
    }
    return items;
  }, []);

  return (
    <group>
      {/* Wet reflective plaza / rooftops */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[55, 80]} />
        <meshStandardMaterial
          color="#04050a"
          metalness={0.92}
          roughness={0.18}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, -6]}>
        <planeGeometry args={[40, 50]} />
        <meshStandardMaterial
          color="#050814"
          emissive="#1a1040"
          emissiveIntensity={0.25}
          metalness={0.95}
          roughness={0.12}
          transparent
          opacity={0.7}
        />
      </mesh>

      {buildings.map(({ key, seed, strip, ...b }) => (
        <group key={key}>
          <BuildingShell {...b} />
          <WindowField center={b.position} size={b.size} seed={seed} />
          {strip ? (
            <VerticalNeonStrip
              position={[
                b.position[0] + b.size[0] / 2 + 0.12,
                b.position[1],
                b.position[2],
              ]}
              height={b.size[1] * 0.85}
              color={strip}
            />
          ) : null}
        </group>
      ))}

      {/* Landmark towers */}
      <BuildingShell position={[-8, 22, -22]} size={[4, 44, 4]} color="#090b12" />
      <WindowField center={[-8, 22, -22]} size={[4, 44, 4]} seed={101} />
      <BuildingShell position={[10, 20, -24]} size={[3.5, 40, 3.5]} color="#090b12" />
      <WindowField center={[10, 20, -24]} size={[3.5, 40, 3.5]} seed={202} />
      <BuildingShell position={[0, 26, -30]} size={[5, 52, 5]} color="#070910" />
      <WindowField center={[0, 26, -30]} size={[5, 52, 5]} seed={303} />

      {/* Portrait / brand billboards — original GVG-style, not game IP */}
      <PortraitBillboard
        position={[-10, 16, -15]}
        color="#00E5FF"
        scale={1.15}
        rotationY={0.25}
      />
      <PortraitBillboard
        position={[12, 14, -17]}
        color="#ff2da6"
        scale={1.05}
        rotationY={-0.35}
      />
      <PortraitBillboard
        position={[3, 20, -26]}
        color="#FF1744"
        scale={1.35}
        rotationY={0.05}
      />

      <NeonKanjiCluster
        position={[-5, 11, -11]}
        colors={["#00E5FF", "#ff2da6", "#FCEE0A"]}
      />
      <NeonKanjiCluster
        position={[8, 9, -9]}
        colors={["#FF1744", "#00E5FF"]}
      />
      <NeonKanjiCluster
        position={[-14, 8, -7]}
        colors={["#ff2da6", "#FCEE0A", "#00E5FF", "#FF1744"]}
      />

      {/* Horizontal neon banners */}
      <mesh position={[0, 12, -13]}>
        <planeGeometry args={[8, 0.7]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={2.6}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[-12, 7, -12]} rotation={[0, 0.4, 0]}>
        <planeGeometry args={[5, 0.5]} />
        <meshStandardMaterial
          color="#ff2da6"
          emissive="#ff2da6"
          emissiveIntensity={2.8}
          toneMapped={false}
        />
      </mesh>

      <HoloKoi />
      <HoloFigure />
      <ElevatedMonorail />
      <AerialTraffic />
      <SmogLayers />
      <RainStreaks />
      <Sparkles
        count={160}
        scale={55}
        size={2}
        speed={0.22}
        color="#ff8ad8"
      />
      <Stars radius={100} depth={45} count={2000} factor={3.4} fade speed={0.45} />
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <color attach="background" args={["#02040a"]} />
      <fog attach="fog" args={["#050812", 22, 62]} />
      <ambientLight intensity={0.12} />
      <hemisphereLight args={["#1c2440", "#050508", 0.55]} />
      <directionalLight position={[6, 30, 10]} intensity={0.25} color="#6a7aaa" />
      <pointLight position={[-8, 18, -10]} intensity={2} color="#00E5FF" distance={40} />
      <pointLight position={[10, 16, -12]} intensity={2.2} color="#ff2da6" distance={38} />
      <pointLight position={[0, 14, -8]} intensity={1.4} color="#FF1744" distance={30} />
      <pointLight position={[0, 6, 0]} intensity={0.6} color="#4050a0" distance={25} />
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
          intensity={1.35}
          luminanceThreshold={0.12}
          luminanceSmoothing={0.55}
          mipmapBlur
        />
        <Vignette offset={0.28} darkness={0.5} />
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
        camera={{ position: [0, 18, 8], fov: 82, near: 0.1, far: 140 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <SceneContent look={look} />
        </Suspense>
      </Canvas>
    </div>
  );
}
