"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GLASS_SCAN_LINES } from "@/data/content";
import { playTone } from "@/lib/audio";

/** Optics HUD only — VR canvas is owned by Experience for wear continuity. */
export function NeuralGlassSceneSection() {
  const [scan, setScan] = useState(0);

  useEffect(() => {
    const timers = GLASS_SCAN_LINES.map((_, i) =>
      window.setTimeout(() => {
        setScan(i + 1);
        playTone("ui");
      }, 900 + i * 1300),
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-between px-5 pt-6 md:px-8 md:pt-8">
        <div>
          <p className="font-display text-xs tracking-[0.4em] text-gvg-yellow">
            VR OPTICS
          </p>
          <p className="mt-1 font-mono text-[10px] tracking-[0.28em] text-gvg-cyan">
            PANORAMIC · NIGHT CITY FEED
          </p>
        </div>
        <p className="font-mono text-[10px] tracking-[0.22em] text-white/45">
          LOOK TO EXPLORE
        </p>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-5 pb-10 md:px-8 md:pb-12">
        <p className="mb-3 max-w-lg font-body text-sm text-white/60 md:text-[15px]">
          Full-field Neural Link view — neon towers, holo ads, monorail lanes,
          and canyon haze. Move the cursor to look across the night megacity.
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] tracking-wider">
          <AnimatePresence>
            {GLASS_SCAN_LINES.slice(0, scan).map((line) => (
              <motion.li
                key={line}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gvg-cyan"
              >
                {line}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  );
}

export const NeuralGlassBackground = dynamic(
  () =>
    import("@/components/three/NeuralGlassScene").then(
      (m) => m.NeuralGlassCanvas,
    ),
  { ssr: false, loading: () => <div className="h-full w-full bg-gvg-bg" /> },
);
