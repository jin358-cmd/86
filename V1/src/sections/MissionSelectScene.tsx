"use client";

import { motion } from "framer-motion";
import { MISSIONS } from "@/data/content";
import { useExperience } from "@/hooks/useExperience";
import { playTone } from "@/lib/audio";

export function MissionSelectScene() {
  const { selectMission } = useExperience();

  return (
    <section className="relative min-h-[100dvh] px-6 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 max-w-2xl">
          <p className="font-mono text-xs tracking-[0.35em] text-gvg-cyan">
            MISSION SELECTION
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-[0.14em] text-gvg-yellow md:text-5xl">
            CHOOSE YOUR PATH
          </h2>
          <p className="mt-4 font-body text-gvg-muted">
            Each module opens a dedicated layer of the GVG Digital Universe.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {MISSIONS.map((mission, i) => (
            <motion.button
              key={mission.id}
              type="button"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onMouseEnter={() => playTone("ui")}
              onClick={() => selectMission(mission.id)}
              className="group glass-panel interactive-card p-5 text-left transition hover:border-gvg-yellow/60 hover:shadow-[0_0_30px_rgba(252,238,10,0.12)]"
            >
              <p className="font-mono text-[10px] tracking-[0.3em] text-gvg-muted group-hover:text-gvg-cyan">
                MODULE 0{i + 1}
              </p>
              <h3 className="mt-3 font-display text-2xl tracking-[0.2em] text-gvg-yellow">
                {mission.title}
              </h3>
              <p className="mt-2 font-hud text-sm tracking-[0.12em] text-gvg-text">
                {mission.subtitle}
              </p>
              <p className="mt-3 font-body text-sm text-gvg-muted">
                {mission.detail}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
