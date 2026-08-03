"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useExperience } from "@/hooks/useExperience";
import { SCENE_META, type SceneId } from "@/lib/experience";

/**
 * Flat circular orbits centered on the title block.
 * Ring diameter = 2r; satellites travel on the same r path.
 */
const ORBITS = [
  { r: 120, dur: 28, count: 6, color: "bg-gvg-cyan" },
  { r: 170, dur: 40, count: 8, color: "bg-gvg-cyan/70" },
  { r: 220, dur: 54, count: 5, color: "bg-white" },
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

  const satellites = useMemo(
    () =>
      ORBITS.flatMap((orbit, oi) =>
        Array.from({ length: orbit.count }, (_, i) => ({
          id: `${oi}-${i}`,
          r: orbit.r,
          dur: orbit.dur,
          color: orbit.color,
          offset: (360 / orbit.count) * i,
          size: oi === 1 ? 5 : 3.5,
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
        <div className="relative mb-2 grid min-h-[340px] w-full place-items-center px-10 py-16 md:min-h-[420px] md:px-16 md:py-20">
          {/*
            Single shared center for rings + satellites.
            Each ring is a circle of radius r; each sat uses translateX(r)
            so the trail sits exactly on the ring, around the title.
          */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
            aria-hidden
          >
            {ORBITS.map((orbit) => (
              <div
                key={orbit.r}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gvg-cyan/25"
                style={{
                  width: orbit.r * 2,
                  height: orbit.r * 2,
                  boxShadow: "0 0 20px rgba(0,153,204,0.08) inset",
                }}
              />
            ))}

            {satellites.map((sat) => (
              <span
                key={sat.id}
                className="absolute left-1/2 top-1/2"
                style={{
                  width: 0,
                  height: 0,
                  animation: `orbit-spin ${sat.dur}s linear infinite`,
                  animationDelay: `${(-(sat.offset / 360) * sat.dur).toFixed(3)}s`,
                }}
              >
                <span
                  className={`absolute block rounded-full shadow-[0_0_10px_rgba(255,255,255,0.85)] ${sat.color}`}
                  style={{
                    width: sat.size,
                    height: sat.size,
                    left: sat.r,
                    top: -sat.size / 2,
                    marginLeft: -sat.size / 2,
                  }}
                />
              </span>
            ))}
          </div>

          {/* Brand-first title stack — GVG OS is the hero signal */}
          <div className="relative z-10">
            <p className="font-mono text-[11px] font-medium tracking-[0.55em] text-gvg-cyan/90 md:text-sm md:tracking-[0.62em]">
              BETA 1.0
              <span className="mx-2 text-white/35">·</span>
              <span className="text-white/75">INTERNAL PREVIEW</span>
            </p>
            <h1 className="mt-5 font-display text-[2.6rem] leading-[1.02] tracking-[0.16em] text-white md:text-7xl md:tracking-[0.18em] lg:text-[5rem]">
              GVG OS
            </h1>
            <p className="mt-3 font-display text-lg tracking-[0.32em] text-gvg-cyan md:text-2xl md:tracking-[0.38em]">
              START EXPERIENCE
            </p>
            <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-white/55 md:text-[15px]">
              Beta 第1版。宇宙進場後以第一人稱穿越章節：Boot → Wear → Login →
              City → World → Dashboard。
            </p>
          </div>
        </div>

        <div
          className="relative mt-4"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {hovering && !bursting ? (
            <>
              <span className="init-pulse-ring init-cyan" />
              <span className="init-pulse-ring init-cyan delay-1" />
              <span className="init-pulse-ring init-cyan delay-2" />
            </>
          ) : null}

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
