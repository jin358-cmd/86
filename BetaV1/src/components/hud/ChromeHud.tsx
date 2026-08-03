"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Volume2, VolumeX, FastForward } from "lucide-react";
import { useExperience } from "@/hooks/useExperience";
import { useHudClock } from "@/hooks/useHudClock";
import { SCENE_META, SCENES } from "@/lib/experience";
import { cn } from "@/lib/cn";

export function ChromeHud() {
  const { scene, sceneIndex, skip, muted, toggleMute, started } =
    useExperience();
  const { time, date } = useHudClock();
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      e.preventDefault();
      setNavOpen((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Reset nav closed when scene changes
  useEffect(() => {
    setNavOpen(false);
  }, [scene]);

  if (!started || scene === "boot") return null;

  const isOs = scene === "dashboard";

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="pointer-events-none fixed inset-x-0 top-0 z-[90] flex items-start justify-between gap-4 px-4 pt-3 md:px-6"
      >
        <div className="glass-panel pointer-events-auto px-3 py-2">
          <p className="font-display text-[10px] tracking-[0.35em] text-gvg-yellow md:text-xs">
            GVG OS
          </p>
          <p className="font-hud text-[10px] tracking-[0.2em] text-gvg-muted">
            BETA V1 · {SCENE_META[scene].label}
          </p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <AnimatePresence>
            {navOpen ? (
              <motion.nav
                key="scene-nav"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="glass-panel flex flex-wrap items-center justify-center gap-2 px-3 py-2 md:gap-3"
              >
                {SCENES.map((id, i) => (
                  <span
                    key={id}
                    className={cn(
                      "font-hud text-[10px] tracking-[0.2em]",
                      i === sceneIndex ? "text-gvg-yellow" : "text-gvg-muted/70",
                    )}
                  >
                    {SCENE_META[id].label}
                  </span>
                ))}
              </motion.nav>
            ) : (
              <motion.p
                key="tab-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded border border-white/10 bg-black/40 px-2 py-1 font-mono text-[9px] tracking-[0.22em] text-white/40"
              >
                TAB · NAV
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={toggleMute}
            className="glass-panel grid h-9 w-9 place-items-center text-gvg-text transition hover:text-gvg-yellow"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          {scene !== "dashboard" && (
            <button
              type="button"
              onClick={skip}
              className="glass-panel flex h-9 items-center gap-2 px-3 font-hud text-[10px] tracking-[0.25em] text-gvg-text transition hover:text-gvg-yellow"
            >
              <FastForward size={14} />
              SKIP
            </button>
          )}
        </div>
      </motion.header>

      <aside className="pointer-events-none fixed left-4 top-24 z-[90] hidden flex-col gap-1 font-mono text-[10px] tracking-wider text-gvg-muted md:flex">
        <span>LAT 25.0330</span>
        <span>LON 121.5654</span>
        <span>GPS · GVG-NODE-07</span>
        <span>{date}</span>
        <span className="text-gvg-cyan">{time}</span>
      </aside>

      {/* Right telemetry moved into OS accordion on dashboard */}
      {!isOs && (
        <aside className="pointer-events-none fixed right-4 top-24 z-[90] hidden flex-col items-end gap-1 font-mono text-[10px] tracking-wider text-gvg-muted md:flex">
          <span className="text-gvg-cyan">SIGNAL 98%</span>
          <span>AI CORE · STABLE</span>
          <span>LATENCY 11ms</span>
          <span className="text-gvg-yellow">ONLINE</span>
        </aside>
      )}

      {scene === "login" && (
        <footer className="pointer-events-none fixed inset-x-0 bottom-4 z-[90] flex justify-center px-4">
          <div className="glass-panel flex flex-wrap items-center justify-center gap-4 px-4 py-2 font-hud text-[10px] tracking-[0.22em] text-gvg-muted md:gap-8">
            <span>IDENTITY VERIFIED</span>
            <span className="text-gvg-text">ACCESS LEVEL</span>
            <span className="text-gvg-yellow">ROOT</span>
          </div>
        </footer>
      )}
    </>
  );
}
