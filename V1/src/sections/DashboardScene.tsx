"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { CORE_MODULES, DISTRICTS } from "@/data/content";
import { useExperience } from "@/hooks/useExperience";
import { Bot, Crosshair, Radio } from "lucide-react";

const GvgCityCanvas = dynamic(
  () => import("@/components/three/GvgCityScene").then((m) => m.GvgCityCanvas),
  { ssr: false, loading: () => <div className="h-full w-full bg-gvg-bg" /> },
);

export function DashboardScene() {
  const { selectedMission, goTo, selectMission } = useExperience();
  const mod =
    CORE_MODULES.find((m) => m.id === selectedMission) ?? CORE_MODULES[0];

  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      <div className="absolute inset-0 opacity-90">
        <GvgCityCanvas interactive />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/80" />

      <div className="relative z-10 grid min-h-[100dvh] gap-4 px-4 pb-20 pt-24 md:grid-cols-[280px_1fr_280px] md:px-6 md:pt-28">
        <motion.aside
          initial={{ x: -24, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="glass-panel h-fit p-4"
        >
          <div className="mb-3 flex items-center gap-2 text-gvg-yellow">
            <Crosshair size={16} />
            <p className="font-hud text-xs tracking-[0.25em]">ACTIVE MODULE</p>
          </div>
          <p className="font-mono text-[10px] tracking-[0.28em] text-gvg-cyan">
            MODULE {mod.code}
          </p>
          <h3 className="mt-2 font-display text-xl tracking-[0.18em] text-gvg-text">
            {mod.title}
          </h3>
          <p className="mt-1 font-hud text-sm tracking-[0.1em] text-gvg-yellow">
            {mod.zh}
          </p>
          <p className="mt-3 font-body text-sm text-gvg-muted">{mod.detail}</p>
          <ul className="mt-5 space-y-2 font-mono text-[10px] tracking-wider text-gvg-muted">
            <li className="text-gvg-cyan">STATUS · ONLINE</li>
            <li>LAYER · CORE OS</li>
            <li>SECTOR · {DISTRICTS[0].name}</li>
          </ul>
          <button
            type="button"
            onClick={() => goTo("missions")}
            className="mt-6 w-full rounded border border-gvg-yellow/50 px-3 py-2 font-hud text-[10px] tracking-[0.25em] text-gvg-yellow transition hover:bg-gvg-yellow hover:text-black"
          >
            BACK TO MODULES
          </button>
        </motion.aside>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center text-center"
        >
          <p className="font-mono text-xs tracking-[0.35em] text-gvg-cyan">
            LIVE TWIN · GVG CITY
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-[0.16em] text-gvg-yellow md:text-5xl">
            {mod.title.toUpperCase()}
          </h2>
          <p className="mt-3 max-w-md font-body text-sm text-gvg-muted">
            模組已載入。整體視覺與沉浸式介面不變，此層作為「{mod.zh}
            」的作業入口。
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["CLEAR", "FOG", "NEON STORM", "ORBITAL"].map((w) => (
              <span
                key={w}
                className="rounded-full border border-white/10 bg-black/40 px-3 py-1 font-hud text-[10px] tracking-[0.2em] text-gvg-text"
              >
                {w}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.aside
          initial={{ x: 24, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="glass-panel h-fit max-h-[70vh] overflow-y-auto p-4 md:justify-self-end"
        >
          <div className="mb-3 flex items-center gap-2 text-gvg-cyan">
            <Bot size={16} />
            <p className="font-hud text-xs tracking-[0.25em]">AI ASSISTANT</p>
          </div>
          <div className="space-y-3 font-body text-sm text-gvg-muted">
            <p className="rounded border border-white/10 bg-black/30 p-3 text-gvg-text">
              Module {mod.code}「{mod.title}」已就緒。可由此切換其他核心模組。
            </p>
            <p className="rounded border border-white/10 bg-black/30 p-3">
              建議下一步：回到模組首頁，依業務流程串接 Trade、CRM 與 Logistics。
            </p>
          </div>
          <div className="mt-4 space-y-1">
            {CORE_MODULES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => selectMission(m.id)}
                className={`flex w-full items-center justify-between px-2 py-1 text-left font-mono text-[10px] tracking-wider transition ${
                  m.id === mod.id
                    ? "text-gvg-yellow"
                    : "text-gvg-muted hover:text-gvg-yellow"
                }`}
              >
                <span>{m.code}</span>
                <span>{m.title}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 font-mono text-[10px] tracking-wider text-gvg-yellow">
            <Radio size={14} />
            RADIO NET · LIVE
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
