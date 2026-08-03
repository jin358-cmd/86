"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
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
import { WearScene } from "@/sections/WearScene";
import { LoginScene } from "@/sections/LoginScene";
import { CityRevealScene } from "@/sections/CityRevealScene";
import { WorldIntroScene } from "@/sections/WorldIntroScene";
import { DashboardScene } from "@/sections/DashboardScene";

function StartGate() {
  const { begin, started } = useExperience();
  if (started) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-gvg-bg px-6">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,180,255,0.18),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(255,45,149,0.12),transparent_40%)]" />
      </div>
      <div className="relative z-10 max-w-lg text-center">
        <p className="font-mono text-xs tracking-[0.4em] text-gvg-cyan">
          GVG OS · GLOBAL PLATFORM
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-[0.14em] text-gvg-ink md:text-6xl">
          START EXPERIENCE
        </h1>
        <p className="mt-4 font-body text-gvg-muted">
          進入 Global Vista Group 電影級品牌入口。點擊後啟動科技流動 BGM 與 HUD
          特效。
        </p>
        <button
          type="button"
          onClick={() => void begin()}
          className="mt-8 border border-gvg-cyan bg-gvg-cyan px-8 py-3 font-display text-sm tracking-[0.28em] text-white transition hover:bg-transparent hover:text-gvg-cyan"
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
  const [jackIn, setJackIn] = useState(false);
  useLenis(started && scene === "dashboard");

  return (
    <>
      <Atmosphere />
      <CursorTrail />
      <ChromeHud />
      <StartGate />

      {started && (
        <div
          className={
            transitioning || jackIn
              ? "pointer-events-none opacity-40 blur-sm"
              : ""
          }
        >
          {(scene === "boot" || scene === "wear" || scene === "login") && (
            <FloatingDust />
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={scene}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {scene === "boot" && <BootScene />}
              {scene === "wear" && <WearScene onJackInEffects={setJackIn} />}
              {scene === "login" && <LoginScene />}
              {scene === "city" && <CityRevealScene />}
              {scene === "world" && <WorldIntroScene />}
              {scene === "dashboard" && <DashboardScene />}
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
