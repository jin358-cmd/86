"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { Atmosphere } from "@/components/effects/Atmosphere";
import { FloatingDust } from "@/components/effects/FloatingDust";
import { ChromeHud } from "@/components/hud/ChromeHud";
import {
  ExperienceProvider,
  useExperience,
} from "@/hooks/useExperience";
import { useLenis } from "@/hooks/useLenis";
import { BootScene } from "@/sections/BootScene";
import {
  NeuralGlassBackground,
  NeuralGlassSceneSection,
} from "@/sections/NeuralGlassSceneSection";
import { WearScene } from "@/sections/WearScene";
import { LoginScene } from "@/sections/LoginScene";
import { CityRevealScene } from "@/sections/CityRevealScene";
import { WorldIntroScene } from "@/sections/WorldIntroScene";
import { MissionSelectScene } from "@/sections/MissionSelectScene";
import { DashboardScene } from "@/sections/DashboardScene";

function StartGate() {
  const { begin, started } = useExperience();
  if (started) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-gvg-bg px-6">
      <div className="max-w-lg text-center">
        <p className="font-mono text-xs tracking-[0.4em] text-gvg-cyan">
          BETA V1 · BASED ON V1
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-[0.14em] text-gvg-yellow md:text-6xl">
          NEURAL LINK
        </h1>
        <p className="mt-2 font-display text-sm tracking-[0.28em] text-gvg-text md:text-base">
          GVG OS
        </p>
        <p className="mt-4 font-body text-gvg-muted">
          Beta V1 workspace from the original Neural Link cinematic build.
          Put on the headset and enter the GVG Digital Universe.
        </p>
        <button
          type="button"
          onClick={() => void begin()}
          className="mt-8 rounded-full border border-gvg-yellow bg-gvg-yellow px-8 py-3 font-display text-sm tracking-[0.28em] text-black transition hover:bg-transparent hover:text-gvg-yellow"
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
  const [fx, setFx] = useState({ flash: false, shake: false, distort: false });
  useLenis(
    started && (scene === "world" || scene === "missions" || scene === "dashboard"),
  );

  const onJackInEffects = useCallback((active: boolean) => {
    setFx({ flash: active, shake: active, distort: active });
  }, []);

  return (
    <>
      <Atmosphere {...fx} />
      <ChromeHud />
      <StartGate />

      {started && (
        <div
          className={
            transitioning ? "pointer-events-none opacity-40 blur-sm" : ""
          }
        >
          {/* Persist VR Night City under Optics + Wear so LINK sits in front */}
          {(scene === "neuralGlass" || scene === "wear") && (
            <div className="fixed inset-0 z-0">
              <NeuralGlassBackground />
            </div>
          )}

          {(scene === "boot" || scene === "login") && <FloatingDust />}
          <AnimatePresence mode="wait">
            <motion.div
              key={scene}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative z-10"
            >
              {scene === "boot" && <BootScene />}
              {scene === "neuralGlass" && <NeuralGlassSceneSection />}
              {scene === "wear" && (
                <WearScene onJackInEffects={onJackInEffects} />
              )}
              {scene === "login" && <LoginScene />}
              {scene === "city" && <CityRevealScene />}
              {scene === "world" && <WorldIntroScene />}
              {scene === "missions" && <MissionSelectScene />}
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
