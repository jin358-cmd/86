"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Atmosphere } from "@/components/effects/Atmosphere";
import { CursorTrail } from "@/components/effects/CursorTrail";
import { FloatingDust } from "@/components/effects/FloatingDust";
import { ChromeHud } from "@/components/hud/ChromeHud";
import {
  ExperienceProvider,
  useExperience,
} from "@/hooks/useExperience";
import { useLenis } from "@/hooks/useLenis";
import { BootScene } from "@/sections/BootScene";
import { HeroScene } from "@/sections/HeroScene";
import { HubScene } from "@/sections/HubScene";

function StartGate() {
  const { begin, started } = useExperience();
  if (started) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-gvg-bg px-6">
      <div className="max-w-lg text-center">
        <p className="font-mono text-xs tracking-[0.4em] text-gvg-cyan">
          GVG OS · GLOBAL PLATFORM
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-[0.14em] text-gvg-yellow md:text-6xl">
          START EXPERIENCE
        </h1>
        <p className="mt-4 font-body text-gvg-muted">
          進入 Global Vista Group 電影級品牌入口。科技背景音樂與 HUD
          特效將同步啟動。
        </p>
        <button
          type="button"
          onClick={() => void begin()}
          className="mt-8 border border-gvg-yellow bg-gvg-yellow px-8 py-3 font-display text-sm tracking-[0.28em] text-black transition hover:bg-transparent hover:text-gvg-yellow"
        >
          INITIALIZE
        </button>
        <p className="mt-4 font-mono text-[10px] tracking-wider text-gvg-muted">
          AUDIO + VISUAL SYSTEMS WILL ENGAGE
        </p>
      </div>
    </div>
  );
}

function SceneStage() {
  const { scene, transitioning, started } = useExperience();
  useLenis(started && scene === "hub");

  return (
    <>
      <Atmosphere />
      <CursorTrail />
      <ChromeHud />
      <StartGate />

      {started && (
        <div
          className={
            transitioning ? "pointer-events-none opacity-40 blur-sm" : ""
          }
        >
          {(scene === "boot" || scene === "hero") && <FloatingDust />}
          <AnimatePresence mode="wait">
            <motion.div
              key={scene}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {scene === "boot" && <BootScene />}
              {scene === "hero" && <HeroScene />}
              {scene === "hub" && <HubScene />}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

export function Experience() {
  return (
    <ExperienceProvider>
      <main className="relative min-h-[100dvh] overflow-x-hidden bg-gvg-bg text-gvg-text">
        <SceneStage />
      </main>
    </ExperienceProvider>
  );
}
