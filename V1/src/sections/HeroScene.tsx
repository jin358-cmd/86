"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useExperience } from "@/hooks/useExperience";
import { playTone } from "@/lib/audio";

const GvgCityCanvas = dynamic(
  () => import("@/components/three/GvgCityScene").then((m) => m.GvgCityCanvas),
  { ssr: false, loading: () => <div className="h-full w-full bg-gvg-bg" /> },
);

export function HeroScene() {
  const { advance } = useExperience();

  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      <div className="absolute inset-0">
        <GvgCityCanvas />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.75)_85%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-gvg-bg via-black/40 to-black/70" />

      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-xs tracking-[0.4em] text-gvg-cyan"
        >
          GLOBAL VISTA GROUP · AI BOOT SEQUENCE
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-5 grid size-20 place-items-center border border-gvg-yellow bg-gvg-yellow/10 font-display text-xl tracking-[0.2em] text-gvg-yellow shadow-[0_0_40px_rgba(252,238,10,0.25)]"
        >
          GVG
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-6 font-display text-4xl tracking-[0.14em] text-gvg-yellow md:text-6xl"
        >
          HERO CINEMATIC
        </motion.h1>
        <p className="mt-4 max-w-xl font-body text-gvg-muted">
          全螢幕動畫 · 全球星系背景 · Cyberpunk HUD · AI 啟動畫面。
          使用者進入網站，像進入一部電影。
        </p>
        <button
          type="button"
          onClick={() => {
            playTone("confirm");
            advance();
          }}
          className="mt-10 border border-gvg-yellow bg-gvg-yellow px-8 py-3 font-display text-sm tracking-[0.28em] text-black transition hover:bg-transparent hover:text-gvg-yellow"
        >
          START EXPERIENCE
        </button>
      </div>
    </section>
  );
}
