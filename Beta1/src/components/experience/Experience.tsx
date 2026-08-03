"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Atmosphere } from "@/components/effects/Atmosphere";
import { CursorTrail } from "@/components/effects/CursorTrail";
import { FloatingDust } from "@/components/effects/FloatingDust";
import { ChromeHud } from "@/components/hud/ChromeHud";
import {
  FirstPersonTransit,
  StartGate,
} from "@/components/experience/StartGate";
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
import type { SceneId } from "@/lib/experience";

function SceneStage() {
  const { scene, transitioning, started, transitFrom, transitTo } =
    useExperience();
  const [jackIn, setJackIn] = useState(false);
  useLenis(started && scene === "dashboard");

  return (
    <>
      <Atmosphere />
      <CursorTrail />
      <ChromeHud />
      <StartGate />
      <FirstPersonTransit
        from={transitFrom}
        to={transitTo}
        active={started && transitioning}
      />

      {started && (
        <div
          className={
            transitioning || jackIn
              ? "pointer-events-none opacity-30 blur-sm"
              : ""
          }
        >
          {(scene === "boot" || scene === "wear" || scene === "login") && (
            <FloatingDust />
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={scene}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.55 }}
            >
              {scene === "boot" && <BootScene />}
              {scene === "wear" && <WearScene onJackInEffects={setJackIn} />}
              {scene === "login" && <LoginScene />}
              {scene === "city" && <CityRevealScene />}
              {scene === "world" && <WorldIntroScene />}
              {scene === "dashboard" && <DashboardScene />}
            </motion.div>
          </AnimatePresence>

          <ChapterNodeBadge scene={scene} />
        </div>
      )}
    </>
  );
}

function ChapterNodeBadge({ scene }: { scene: SceneId }) {
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[90] -translate-x-1/2">
      <div className="glass-panel flex items-center gap-3 px-4 py-2">
        <span className="size-2 animate-pulse rounded-full bg-gvg-magenta shadow-[0_0_10px_rgba(212,20,122,0.8)]" />
        <p className="font-mono text-[10px] tracking-[0.28em] text-gvg-ink">
          BETA 1 · NODE · {scene.toUpperCase()}
        </p>
      </div>
    </div>
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
