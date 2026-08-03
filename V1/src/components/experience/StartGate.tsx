"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useExperience } from "@/hooks/useExperience";
import { SCENE_META, type SceneId } from "@/lib/experience";

const ORBITS = [
  { r: 120, dur: 14, count: 6, color: "bg-gvg-cyan" },
  { r: 170, dur: 22, count: 8, color: "bg-gvg-magenta" },
  { r: 220, dur: 30, count: 5, color: "bg-white" },
] as const;

export function StartGate() {
  const { begin, started } = useExperience();
  const [bursting, setBursting] = useState(false);
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
    }, 650);
  };

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#070b14] px-6">
      {/* Cosmos field */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#12203a_0%,#070b14_62%,#04060c_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,153,204,0.22),transparent_40%),radial-gradient(circle_at_78%_65%,rgba(212,20,122,0.2),transparent_42%)]" />
        {/* Magenta elongated streaks */}
        <div className="gvg-magenta-streaks absolute inset-0 opacity-80" />
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
        {/* Soft nebula bands */}
        <div className="absolute left-[-10%] top-[18%] h-24 w-[120%] rotate-[-8deg] bg-gradient-to-r from-transparent via-gvg-magenta/25 to-transparent blur-2xl" />
        <div className="absolute left-[-5%] top-[58%] h-16 w-[110%] rotate-[6deg] bg-gradient-to-r from-transparent via-gvg-purple/20 to-transparent blur-xl" />
      </div>

      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        {/* Orbital ring system around copy */}
        <div className="relative mb-2 grid place-items-center px-10 py-16 md:px-16 md:py-20">
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            {ORBITS.map((o) => (
              <div
                key={o.r}
                className="absolute rounded-full border border-white/10"
                style={{ width: o.r * 2, height: o.r * 2 }}
              />
            ))}
            {satellites.map((sat) => (
              <span
                key={sat.id}
                className="absolute left-1/2 top-1/2"
                style={{
                  animation: `orbit-spin ${sat.dur}s linear infinite`,
                  animationDelay: `${(-(sat.offset / 360) * sat.dur).toFixed(3)}s`,
                }}
              >
                <span
                  className={`block rounded-full shadow-[0_0_10px_rgba(255,255,255,0.85)] ${sat.color}`}
                  style={{
                    width: sat.size,
                    height: sat.size,
                    marginLeft: -sat.size / 2,
                    marginTop: -sat.size / 2,
                    transform: `translateX(${sat.r}px)`,
                  }}
                />
              </span>
            ))}
          </div>

          <p className="relative z-10 font-mono text-base tracking-[0.42em] text-gvg-cyan md:text-xl lg:text-2xl">
            GVG OS · GLOBAL PLATFORM
          </p>
          <h1 className="relative z-10 mt-5 font-display text-4xl tracking-[0.14em] text-white md:text-6xl lg:text-7xl">
            START EXPERIENCE
          </h1>
          <p className="relative z-10 mt-5 max-w-md font-body text-sm text-white/70 md:text-base">
            科幻宇宙入口。點擊後以第一人稱視角穿越章節結點：Boot → Wear → Login
            → City → World → Dashboard。
          </p>
        </div>

        <div className="relative mt-2">
          {/* Radial diffusion rings from button */}
          <span className="init-pulse-ring" />
          <span className="init-pulse-ring delay-1" />
          <span className="init-pulse-ring delay-2" />
          {bursting && (
            <>
              <motion.span
                className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gvg-cyan"
                initial={{ scale: 1, opacity: 0.9 }}
                animate={{ scale: 28, opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
              <motion.span
                className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gvg-magenta"
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ scale: 36, opacity: 0 }}
                transition={{ duration: 0.85, ease: "easeOut", delay: 0.05 }}
              />
            </>
          )}
          <button
            type="button"
            onClick={onInitialize}
            disabled={bursting}
            className="relative z-10 border border-gvg-cyan bg-gvg-cyan px-10 py-3.5 font-display text-sm tracking-[0.32em] text-white shadow-[0_0_28px_rgba(0,153,204,0.45)] transition hover:bg-transparent hover:text-gvg-cyan disabled:opacity-80"
          >
            INITIALIZE
          </button>
        </div>
        <p className="mt-6 font-mono text-[10px] tracking-[0.28em] text-white/45">
          AUDIO + VISUAL SYSTEMS WILL ENGAGE
        </p>
      </div>
    </div>
  );
}

/** First-person chapter node transit between scenes */
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
      <div className="gvg-magenta-streaks absolute inset-0 opacity-70" />
      {/* Rushing star lines (first person) */}
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
          <span className="absolute size-24 rounded-full border border-gvg-magenta/50" />
          <div className="relative z-10 text-center">
            <p className="font-mono text-[10px] tracking-[0.4em] text-gvg-cyan">
              NODE EXIT · {fromLabel}
            </p>
            <p className="mt-3 font-display text-3xl tracking-[0.22em] text-white md:text-5xl">
              {label}
            </p>
            <p className="mt-2 font-mono text-[10px] tracking-[0.35em] text-gvg-magenta">
              NODE ENTER · FIRST PERSON
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
