"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useExperience } from "@/hooks/useExperience";
import { SCENE_META, type SceneId } from "@/lib/experience";

/** Horizontal orbital belts — slower 3D rings around the title */
const ORBIT_BELTS = [
  { r: 132, dur: 38, count: 5, color: "#00c2e8", size: 5 },
  { r: 178, dur: 52, count: 6, color: "#7ad8ef", size: 4 },
  { r: 228, dur: 68, count: 4, color: "#ffffff", size: 3.5 },
] as const;

/** Left / right crossing satellite tracks (one each) */
const CROSS_TRACKS = [
  {
    id: "cross-left",
    r: 198,
    dur: 46,
    tiltY: -54,
    tiltX: 58,
    tiltZ: -22,
    reverse: false,
    color: "#00b7e0",
  },
  {
    id: "cross-right",
    r: 198,
    dur: 54,
    tiltY: 54,
    tiltX: 58,
    tiltZ: 22,
    reverse: true,
    color: "#e8f7ff",
  },
] as const;

export function StartGate() {
  const { begin, started } = useExperience();
  const [bursting, setBursting] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [stars] = useState(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: `${(i * 47) % 100}%`,
      top: `${(i * 29) % 100}%`,
      size: 1 + (i % 3),
      delay: `${(i % 12) * 0.35}s`,
      dur: `${3 + (i % 5)}s`,
    })),
  );

  const beltSats = useMemo(
    () =>
      ORBIT_BELTS.flatMap((belt, bi) =>
        Array.from({ length: belt.count }, (_, i) => ({
          id: `belt-${bi}-${i}`,
          ...belt,
          offset: (360 / belt.count) * i,
        })),
      ),
    [],
  );

  if (started) return null;

  const onInitialize = () => {
    setBursting(true);
    window.setTimeout(() => {
      void begin();
    }, 520);
  };

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#070b14] px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#12203a_0%,#070b14_62%,#04060c_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_28%,rgba(0,153,204,0.2),transparent_42%),radial-gradient(circle_at_72%_70%,rgba(0,180,220,0.1),transparent_40%)]" />
        {stars.map((s) => (
          <span
            key={s.id}
            className="absolute rounded-full bg-white/80"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animation: `star-twinkle ${s.dur} ease-in-out infinite`,
              animationDelay: s.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        <div className="relative mb-2 grid place-items-center px-10 py-20 md:px-20 md:py-24">
          {/* 3D orbital stage */}
          <div
            className="orbit-3d-stage pointer-events-none absolute inset-0 grid place-items-center"
            aria-hidden
          >
            {/* Equatorial belts (tilted → reads as 3D ellipses) */}
            {ORBIT_BELTS.map((belt) => (
              <div
                key={belt.r}
                className="orbit-3d-plane"
                style={{ transform: "rotateX(66deg)" }}
              >
                <div
                  className="orbit-3d-ring"
                  style={{
                    width: belt.r * 2,
                    height: belt.r * 2,
                  }}
                />
              </div>
            ))}

            {beltSats.map((sat) => (
              <div
                key={sat.id}
                className="orbit-3d-plane"
                style={{ transform: "rotateX(66deg)" }}
              >
                <div
                  className="orbit-3d-spinner"
                  style={{
                    animationDuration: `${sat.dur}s`,
                    animationDelay: `${(-(sat.offset / 360) * sat.dur).toFixed(3)}s`,
                  }}
                >
                  <span
                    className="orbit-3d-sat"
                    style={{
                      ["--sat-r" as string]: `${sat.r}px`,
                      width: sat.size,
                      height: sat.size,
                      background: sat.color,
                      boxShadow: `0 0 10px ${sat.color}, 0 0 18px rgba(0,180,220,0.45)`,
                    }}
                  />
                </div>
              </div>
            ))}

            {/* Left & right crossing satellite tracks (one each) */}
            {CROSS_TRACKS.map((track) => (
              <div
                key={track.id}
                className="orbit-3d-plane"
                style={{
                  transform: `rotateY(${track.tiltY}deg) rotateX(${track.tiltX}deg) rotateZ(${track.tiltZ}deg)`,
                }}
              >
                <div
                  className="orbit-3d-ring orbit-3d-ring-cross"
                  style={{
                    width: track.r * 2,
                    height: track.r * 2,
                  }}
                />
                <div
                  className={`orbit-3d-spinner ${track.reverse ? "orbit-3d-spinner-rev" : ""}`}
                  style={{ animationDuration: `${track.dur}s` }}
                >
                  <span
                    className="orbit-3d-sat orbit-3d-sat-cross"
                    style={{
                      ["--sat-r" as string]: `${track.r}px`,
                      width: 7,
                      height: 7,
                      background: track.color,
                      boxShadow: `0 0 12px ${track.color}, 0 0 22px rgba(0,183,224,0.55)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Title stack — proportion & color hierarchy */}
          <p className="relative z-10 font-mono text-[11px] font-medium tracking-[0.55em] text-gvg-cyan/90 md:text-sm md:tracking-[0.62em]">
            GVG OS
            <span className="mx-2 text-white/35">·</span>
            <span className="text-white/75">GLOBAL PLATFORM</span>
          </p>
          <h1 className="relative z-10 mt-6 font-display text-[2.35rem] leading-[1.05] tracking-[0.18em] text-white md:text-6xl md:tracking-[0.2em] lg:text-[4.25rem]">
            START
            <span className="mt-1 block text-[0.72em] tracking-[0.28em] text-gvg-cyan">
              EXPERIENCE
            </span>
          </h1>
          <p className="relative z-10 mt-6 max-w-md font-body text-sm leading-relaxed text-white/55 md:text-[15px]">
            科幻宇宙入口。以第一人稱穿越章節結點：Boot → Wear → Login → City →
            World → Dashboard。
          </p>
        </div>

        <div
          className="relative mt-4"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {/* Hover-only same-color radiate from rectangular button */}
          {hovering && !bursting ? (
            <>
              <span className="init-pulse-ring init-cyan" />
              <span className="init-pulse-ring init-cyan delay-1" />
              <span className="init-pulse-ring init-cyan delay-2" />
            </>
          ) : null}

          {/* Fine click burst */}
          {bursting && (
            <>
              <motion.span
                className="absolute left-1/2 top-1/2 h-px w-px -translate-x-1/2 -translate-y-1/2 rounded-full border border-gvg-cyan/80"
                initial={{ scale: 1, opacity: 0.9, borderWidth: 1 }}
                animate={{ scale: 90, opacity: 0, borderWidth: 0.5 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              />
              <motion.span
                className="absolute left-1/2 top-1/2 h-px w-px -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70"
                initial={{ scale: 1, opacity: 0.7, borderWidth: 0.5 }}
                animate={{ scale: 120, opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.04 }}
              />
            </>
          )}

          <button
            type="button"
            onClick={onInitialize}
            disabled={bursting}
            className="relative z-10 border border-gvg-cyan bg-gvg-cyan px-12 py-3.5 font-display text-sm tracking-[0.34em] text-white shadow-[0_0_24px_rgba(0,153,204,0.4)] transition hover:bg-gvg-cyan/90 disabled:opacity-80"
          >
            INITIALIZE
          </button>
        </div>
        <p className="mt-6 font-mono text-[10px] tracking-[0.3em] text-white/40">
          AUDIO + VISUAL SYSTEMS WILL ENGAGE
        </p>
      </div>
    </div>
  );
}

export function FirstPersonTransit({
  from,
  to,
  active,
}: {
  from: SceneId | null;
  to: SceneId | null;
  active: boolean;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (active) setVisible(true);
    else {
      const t = window.setTimeout(() => setVisible(false), 200);
      return () => window.clearTimeout(t);
    }
  }, [active]);

  if (!visible || !to) return null;

  const label = SCENE_META[to].label;
  const fromLabel = from ? SCENE_META[from].label : "GATE";

  return (
    <div className="pointer-events-none fixed inset-0 z-[105] overflow-hidden bg-[#05080f]">
      <div className="fp-tunnel absolute inset-0" />
      {Array.from({ length: 24 }).map((_, i) => (
        <span
          key={i}
          className="fp-starline absolute left-1/2 top-1/2 origin-left h-px bg-gradient-to-r from-white/90 via-gvg-cyan/50 to-transparent"
          style={{
            width: `${28 + (i % 5) * 12}%`,
            ["--r" as string]: `${(360 / 24) * i}deg`,
            transform: `rotate(${(360 / 24) * i}deg)`,
            animationDelay: `${(i % 8) * 0.05}s`,
          }}
        />
      ))}

      <div className="absolute inset-0 grid place-items-center">
        <motion.div
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{ scale: [0.2, 1.05, 1], opacity: [0, 1, 1] }}
          transition={{ duration: 0.9 }}
          className="relative grid place-items-center"
        >
          <span className="absolute size-40 rounded-full border border-gvg-cyan/40 animate-pulse-ring" />
          <span className="absolute size-24 rounded-full border border-white/30" />
          <div className="relative z-10 text-center">
            <p className="font-mono text-[10px] tracking-[0.4em] text-gvg-cyan">
              NODE EXIT · {fromLabel}
            </p>
            <p className="mt-3 font-display text-3xl tracking-[0.22em] text-white md:text-5xl">
              {label}
            </p>
            <p className="mt-2 font-mono text-[10px] tracking-[0.35em] text-white/55">
              NODE ENTER · FIRST PERSON
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
