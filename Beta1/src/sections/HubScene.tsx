"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PHASES, PAGES } from "@/data/architecture";
import { playTone } from "@/lib/audio";

export function HubScene() {
  return (
    <section className="relative min-h-[100dvh] px-6 py-28 md:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 max-w-3xl">
          <p className="font-mono text-xs tracking-[0.35em] text-gvg-cyan">
            GVG OS · GLOBAL PLATFORM
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-[0.12em] text-gvg-yellow md:text-5xl">
            PLATFORM ARCHITECTURE
          </h2>
          <p className="mt-4 font-body text-gvg-muted">
            品牌入口完成。依 Phase 選擇功能模組，進入對應作業頁面。
          </p>
        </header>

        <div className="space-y-12">
          {PHASES.map((phase) => {
            const pages = PAGES.filter(
              (p) => p.phase === phase.id && p.href !== "/",
            );
            if (phase.id === 1) {
              // include company & why; hero is current cinematic
            }
            const list =
              phase.id === 1
                ? PAGES.filter((p) => p.phase === 1)
                : pages.length
                  ? pages
                  : PAGES.filter((p) => p.phase === phase.id);

            return (
              <div key={phase.id}>
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.3em] text-gvg-cyan">
                      PHASE {phase.id}
                    </p>
                    <h3 className="mt-1 font-display text-xl tracking-[0.14em] text-gvg-yellow md:text-2xl">
                      {phase.title}
                    </h3>
                    <p className="mt-1 font-hud text-sm text-gvg-text">
                      {phase.zh} · {phase.blurb}
                    </p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {list.map((page, i) => (
                    <motion.div
                      key={page.href}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: Math.min(i * 0.03, 0.3) }}
                    >
                      <Link
                        href={page.href === "/" ? "/#hero" : page.href}
                        onMouseEnter={() => playTone("ui")}
                        onClick={() => playTone("confirm")}
                        className="group glass-panel interactive-card block h-full p-4 transition hover:border-gvg-yellow/60"
                      >
                        <p className="font-mono text-[10px] tracking-[0.28em] text-gvg-muted group-hover:text-gvg-cyan">
                          {page.code}
                        </p>
                        <h4 className="mt-2 font-display text-lg tracking-[0.12em] text-gvg-yellow">
                          {page.title}
                        </h4>
                        <p className="mt-1 font-hud text-sm text-gvg-text">
                          {page.zh}
                        </p>
                        <p className="mt-2 font-body text-xs leading-relaxed text-gvg-muted">
                          {page.blurb}
                        </p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
