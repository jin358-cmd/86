"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { DISTRICTS } from "@/data/content";

const GvgCityCanvas = dynamic(
  () => import("@/components/three/GvgCityScene").then((m) => m.GvgCityCanvas),
  { ssr: false, loading: () => <div className="h-full w-full bg-gvg-bg" /> },
);

export function CityRevealScene() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      <div className="absolute inset-0">
        <GvgCityCanvas />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/50" />

      <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-6 pb-20 pt-28 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <p className="font-mono text-xs tracking-[0.35em] text-gvg-cyan">
            ENTERING METROPOLIS
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-[0.12em] text-gvg-yellow md:text-6xl">
            GVG CITY
          </h2>
          <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-gvg-muted md:text-base">
            An original megacity of finance, AI, energy, and orbital logistics —
            not a copy of any game world. Fog, neon, and drone lanes form the
            living operating system of the skyline.
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap gap-2"
        >
          {DISTRICTS.map((d) => (
            <li
              key={d.id}
              className="rounded border border-white/10 bg-black/40 px-2.5 py-1 font-hud text-[10px] tracking-[0.18em] text-gvg-text backdrop-blur-md"
            >
              {d.name}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
