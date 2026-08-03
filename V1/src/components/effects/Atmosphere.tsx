"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

export function Atmosphere({
  flash,
  shake,
  distort,
}: {
  flash?: boolean;
  shake?: boolean;
  distort?: boolean;
}) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    let timeout: number;
    const schedule = () => {
      const wait = 22000 + Math.random() * 22000;
      timeout = window.setTimeout(() => {
        setGlitch(true);
        window.setTimeout(() => setGlitch(false), 240);
        schedule();
      }, wait);
    };
    schedule();
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-[80]",
        shake && "animate-cam-shake",
        distort && "animate-lens-distort",
      )}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(180,200,220,0.28)_100%)]" />
      <div className="scanlines absolute inset-0 opacity-50" />
      <div className="noise absolute inset-0 opacity-[0.03]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(0,153,204,0.08),transparent_36%),radial-gradient(circle_at_82%_68%,rgba(212,20,122,0.06),transparent_40%)]" />

      <AnimatePresence>
        {glitch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 mix-blend-multiply"
            style={{
              background:
                "linear-gradient(90deg, rgba(225,29,72,0.12), transparent 40%, rgba(0,153,204,0.14))",
              transform: "translateX(-2px)",
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
            className="absolute inset-0 bg-white"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
