"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BOOT_LINES } from "@/data/content";
import { useExperience } from "@/hooks/useExperience";
import { playTone } from "@/lib/audio";

export function BootScene() {
  const { advance } = useExperience();
  const [visible, setVisible] = useState(0);
  const done = visible >= BOOT_LINES.length;

  useEffect(() => {
    const timers: number[] = [];
    BOOT_LINES.forEach((_, i) => {
      timers.push(
        window.setTimeout(() => {
          setVisible(i + 1);
          playTone(i === BOOT_LINES.length - 1 ? "confirm" : "boot");
        }, 450 + i * 700),
      );
    });
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  // Bootloader complete → next program is WEAR / LINK
  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => {
      advance();
    }, 1100);
    return () => window.clearTimeout(t);
  }, [advance, done]);

  return (
    <section className="relative grid min-h-[100dvh] place-items-center px-6">
      <div className="w-full max-w-xl font-mono text-sm md:text-base">
        <p className="mb-6 font-display text-xs tracking-[0.4em] text-gvg-yellow">
          GVG OS · BOOTLOADER
        </p>
        <ul className="space-y-3">
          <AnimatePresence>
            {BOOT_LINES.slice(0, visible).map((line) => (
              <motion.li
                key={line}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 text-gvg-text"
              >
                <span className="text-gvg-cyan">›</span>
                <TypeLine text={line} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <AnimatePresence>
          {done ? (
            <motion.p
              key="next-wear"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 font-display text-sm tracking-[0.28em] text-gvg-yellow"
            >
              NEXT PROGRAM · WEAR
              <span className="mt-1 block font-mono text-[10px] tracking-[0.22em] text-gvg-cyan">
                NEURAL LINK
              </span>
            </motion.p>
          ) : null}
        </AnimatePresence>

        <div className="mt-8">
          <div className="mb-2 flex items-baseline justify-between font-mono text-[11px] tracking-[0.22em] text-gvg-yellow md:text-xs">
            <span>BOOT PROGRESS</span>
            <motion.span
              key={visible}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              className="tabular-nums"
            >
              {Math.round((visible / BOOT_LINES.length) * 100)}%
              <span className="ml-2 text-gvg-muted">
                {visible}/{BOOT_LINES.length}
              </span>
            </motion.span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-gvg-panel">
            <motion.div
              className="h-full bg-gvg-yellow"
              initial={{ width: "0%" }}
              animate={{
                width: `${(visible / BOOT_LINES.length) * 100}%`,
              }}
              transition={{ ease: "easeOut", duration: 0.35 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TypeLine({ text }: { text: string }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, 18);
    return () => window.clearInterval(id);
  }, [text]);
  return (
    <span>
      {out}
      <span className="animate-pulse text-gvg-yellow">▌</span>
    </span>
  );
}
