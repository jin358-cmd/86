"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { WEAR_PROGRESS } from "@/data/content";
import { useExperience } from "@/hooks/useExperience";
import { playTone } from "@/lib/audio";

/** WEAR / LINK UI — sits in front of the persistent VR Night City feed. */
export function WearScene({
  onJackInEffects,
}: {
  onJackInEffects: (active: boolean) => void;
}) {
  const { advance } = useExperience();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loading) return;
    let step = 0;
    const run = () => {
      if (step >= WEAR_PROGRESS.length) {
        onJackInEffects(true);
        playTone("whoosh");
        window.setTimeout(() => {
          onJackInEffects(false);
          advance();
        }, 900);
        return;
      }
      setProgress(WEAR_PROGRESS[step]);
      playTone(step === WEAR_PROGRESS.length - 1 ? "confirm" : "ui");
      step += 1;
      window.setTimeout(run, 380);
    };
    run();
  }, [advance, loading, onJackInEffects]);

  return (
    <section className="pointer-events-none relative grid min-h-[100dvh] place-items-center px-6">
      {/* Soft vignette only — VR city stays visible behind */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,rgba(0,0,0,0.45)_72%,rgba(0,0,0,0.72)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(252,238,10,0.1),transparent_50%)]" />

      <div className="relative z-10 grid place-items-center">
        <div className="hud-rings absolute size-[min(78vw,420px)]" aria-hidden>
          <span className="ring ring-a" />
          <span className="ring ring-b" />
          <span className="ring ring-c" />
        </div>

        <button
          type="button"
          disabled={loading}
          onClick={() => {
            if (loading) return;
            setLoading(true);
            playTone("confirm");
          }}
          className="group pointer-events-auto relative z-10 grid size-[min(48vw,210px)] place-items-center rounded-full border-2 border-gvg-yellow bg-[radial-gradient(circle_at_50%_40%,rgba(252,238,10,0.28),rgba(8,8,8,0.55)_72%)] shadow-[0_0_50px_rgba(252,238,10,0.35)] backdrop-blur-[2px] transition hover:scale-[1.03] disabled:cursor-wait"
        >
          <span className="absolute inset-[-12%] animate-pulse-ring rounded-full border border-gvg-yellow/50" />
          <span className="text-center">
            <span className="block font-display text-sm tracking-[0.22em] text-gvg-yellow md:text-base">
              {loading ? `${progress}%` : "WEAR"}
            </span>
            <span className="mt-1 block font-hud text-[10px] tracking-[0.28em] text-white/70">
              {loading ? "LINKING" : "NEURAL LINK"}
            </span>
          </span>
        </button>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute bottom-16 z-10 font-hud text-xs tracking-[0.3em] text-white/70"
      >
        PUT ON THE HEADSET · ENTER GVG CITY
      </motion.p>
    </section>
  );
}
