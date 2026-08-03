"use client";

import { motion } from "framer-motion";
import { useMemo, useState, type ReactNode } from "react";
import {
  ENHANCEMENTS,
  HIERARCHY,
  WORLD_NODES,
  WORLD_ROUTES,
} from "@/data/content";
import { useExperience } from "@/hooks/useExperience";
import { playTone } from "@/lib/audio";

export function WorldIntroScene() {
  const { advance } = useExperience();
  const [hover, setHover] = useState<string | null>(null);

  const routes = useMemo(() => {
    const byId = Object.fromEntries(WORLD_NODES.map((n) => [n.id, n]));
    return WORLD_ROUTES.map(([a, b]) => {
      const from = byId[a];
      const to = byId[b];
      return { id: `${a}-${b}`, from, to };
    });
  }, []);

  return (
    <section className="relative min-h-[100dvh] px-6 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 max-w-2xl">
          <p className="font-mono text-xs tracking-[0.35em] text-gvg-cyan">
            WORLD INTRODUCTION
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-[0.14em] text-gvg-yellow md:text-5xl">
            GVG PROTOCOL
          </h2>
          <p className="mt-4 font-body text-gvg-muted">
            Three layers define the universe: who holds power, how humanity is
            enhanced, and which nodes keep the global grid alive.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-3">
          <ProtocolCard index="01" title="Hierarchy">
            <ul className="space-y-3">
              {HIERARCHY.map((item) => (
                <li key={item.id} className="border-l border-gvg-yellow/50 pl-3">
                  <p className="font-hud text-sm tracking-[0.18em] text-gvg-text">
                    {item.title}
                  </p>
                  <p className="mt-1 font-body text-xs text-gvg-muted">
                    {item.blurb}
                  </p>
                </li>
              ))}
            </ul>
          </ProtocolCard>

          <ProtocolCard index="02" title="Enhancement">
            <ul className="space-y-3">
              {ENHANCEMENTS.map((item) => (
                <li key={item.id} className="border-l border-gvg-cyan/50 pl-3">
                  <p className="font-hud text-sm tracking-[0.18em] text-gvg-text">
                    {item.title}
                  </p>
                  <p className="mt-1 font-body text-xs text-gvg-muted">
                    {item.blurb}
                  </p>
                </li>
              ))}
            </ul>
          </ProtocolCard>

          <ProtocolCard index="03" title="Districts">
            <div className="relative aspect-[4/3] overflow-hidden rounded border border-white/10 bg-black/40">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                {routes.map((r) => (
                  <line
                    key={r.id}
                    x1={r.from.x}
                    y1={r.from.y}
                    x2={r.to.x}
                    y2={r.to.y}
                    stroke={
                      hover === r.from.id || hover === r.to.id
                        ? "#FCEE0A"
                        : "rgba(0,229,255,0.35)"
                    }
                    strokeWidth={hover === r.from.id || hover === r.to.id ? 0.7 : 0.35}
                  />
                ))}
                {WORLD_NODES.map((node) => (
                  <g
                    key={node.id}
                    onMouseEnter={() => {
                      setHover(node.id);
                      playTone("ui");
                    }}
                    onMouseLeave={() => setHover(null)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={hover === node.id ? 2.4 : 1.6}
                      fill={hover === node.id ? "#FCEE0A" : "#00E5FF"}
                    />
                    <text
                      x={node.x}
                      y={node.y - 3.5}
                      textAnchor="middle"
                      fill="#ECECEC"
                      fontSize="3.2"
                      fontFamily="Rajdhani, sans-serif"
                    >
                      {node.name}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
            <p className="mt-3 font-mono text-[10px] tracking-wider text-gvg-muted">
              HOVER NODES · LIVE ROUTES: TW · US · JP · SG · DE · AE
            </p>
          </ProtocolCard>
        </div>

        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => {
              playTone("confirm");
              advance();
            }}
            className="rounded-full border border-gvg-yellow bg-gvg-yellow/10 px-8 py-3 font-display text-sm tracking-[0.28em] text-gvg-yellow transition hover:bg-gvg-yellow hover:text-black"
          >
            CONTINUE TO DASHBOARD
          </button>
        </div>
      </div>
    </section>
  );
}

function ProtocolCard({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      className="glass-panel p-5"
    >
      <p className="font-mono text-[10px] tracking-[0.3em] text-gvg-cyan">
        {index}
      </p>
      <h3 className="mt-2 font-display text-xl tracking-[0.16em] text-gvg-yellow">
        {title}
      </h3>
      <div className="mt-5">{children}</div>
    </motion.article>
  );
}
