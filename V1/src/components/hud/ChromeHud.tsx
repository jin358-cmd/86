"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX, FastForward } from "lucide-react";
import { useExperience } from "@/hooks/useExperience";
import { useHudClock } from "@/hooks/useHudClock";
import { SCENE_META, SCENES } from "@/lib/experience";
import { cn } from "@/lib/cn";

export function ChromeHud() {
  const { scene, sceneIndex, skip, muted, toggleMute, started } =
    useExperience();
  const { time, date } = useHudClock();

  if (!started || scene === "boot") return null;

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="pointer-events-none fixed inset-x-0 top-0 z-[90] flex items-start justify-between gap-4 px-4 pt-3 md:px-6"
      >
        <div className="glass-panel pointer-events-auto px-3 py-2">
          <p className="font-display text-[10px] tracking-[0.35em] text-gvg-ink md:text-xs">
            GVG OS
          </p>
          <p className="font-hud text-[10px] tracking-[0.2em] text-gvg-muted">
            GLOBAL PLATFORM · {SCENE_META[scene].label}
          </p>
        </div>

        <nav className="glass-panel hidden items-center gap-3 px-3 py-2 md:flex">
          {SCENES.map((id, i) => (
            <span
              key={id}
              className={cn(
                "font-hud text-[10px] tracking-[0.2em]",
                i === sceneIndex ? "text-gvg-cyan" : "text-gvg-muted/70",
              )}
            >
              {SCENE_META[id].label}
            </span>
          ))}
        </nav>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={toggleMute}
            className="glass-panel grid h-9 w-9 place-items-center text-gvg-ink transition hover:text-gvg-cyan"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          {scene !== "dashboard" && (
            <button
              type="button"
              onClick={skip}
              className="glass-panel flex h-9 items-center gap-2 px-3 font-hud text-[10px] tracking-[0.25em] text-gvg-ink transition hover:text-gvg-cyan"
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

      <aside className="pointer-events-none fixed right-4 top-24 z-[90] hidden flex-col items-end gap-1 font-mono text-[10px] tracking-wider text-gvg-muted md:flex">
        <span className="text-gvg-cyan">SIGNAL 98%</span>
        <span>AI CORE · STABLE</span>
        <span className="text-gvg-magenta">BGM · FLOW</span>
        <span className="text-gvg-ink">ONLINE</span>
      </aside>
    </>
  );
}
