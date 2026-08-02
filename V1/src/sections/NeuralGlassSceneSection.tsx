"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GLASS_SCAN_LINES } from "@/data/content";
import { playTone } from "@/lib/audio";

const NeuralGlassCanvas = dynamic(
  () =>
    import("@/components/three/NeuralGlassScene").then(
      (m) => m.NeuralGlassCanvas,
    ),
  { ssr: false, loading: () => <div className="h-full w-full bg-gvg-bg" /> },
);

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
      <div className="absolute inset-0">
        <NeuralGlassCanvas />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-end px-6 pb-16 pt-28 md:justify-center md:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel w-full max-w-md px-5 py-4"
        >
          <p className="font-display text-xs tracking-[0.35em] text-gvg-yellow">
            NEURAL GLASS
          </p>
          <p className="mt-2 font-body text-sm text-gvg-muted">
            Futuristic optics calibrating. Move your cursor to inspect the
            frame.
          </p>
          <ul className="mt-4 space-y-2 font-mono text-xs tracking-wider">
            <AnimatePresence>
              {GLASS_SCAN_LINES.slice(0, scan).map((line) => (
                <motion.li
                  key={line}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gvg-cyan"
                >
                  {line}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
