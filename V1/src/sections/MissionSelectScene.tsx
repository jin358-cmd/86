"use client";

import { motion } from "framer-motion";
import { CORE_MODULES } from "@/data/content";
import { useExperience } from "@/hooks/useExperience";
import { playTone } from "@/lib/audio";

export function MissionSelectScene() {
  const { selectMission } = useExperience();

  return (
    <section className="relative min-h-[100dvh] px-6 py-28 md:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 max-w-3xl">
          <p className="font-mono text-xs tracking-[0.35em] text-gvg-cyan">
            GVG OS · CORE MODULES
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-[0.14em] text-gvg-yellow md:text-5xl">
            26 SYSTEM MODULES
          </h2>
          <p className="mt-4 font-body text-gvg-muted">
            沉浸式流程結束後進入平台首頁。選擇任一核心模組，開啟對應作業層。
          </p>
        </header>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CORE_MODULES.map((mod, i) => (
            <motion.button
              key={mod.id}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.02, 0.4) }}
              onMouseEnter={() => playTone("ui")}
              onClick={() => selectMission(mod.id)}
              className="group glass-panel interactive-card p-4 text-left transition hover:border-gvg-yellow/60 hover:shadow-[0_0_30px_rgba(252,238,10,0.12)]"
            >
              <p className="font-mono text-[10px] tracking-[0.3em] text-gvg-muted group-hover:text-gvg-cyan">
                MODULE {mod.code}
              </p>
              <h3 className="mt-2 font-display text-lg tracking-[0.14em] text-gvg-yellow md:text-xl">
                {mod.title}
              </h3>
              <p className="mt-1 font-hud text-sm tracking-[0.08em] text-gvg-text">
                {mod.zh}
              </p>
              <p className="mt-2 font-body text-xs leading-relaxed text-gvg-muted md:text-sm">
                {mod.detail}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
