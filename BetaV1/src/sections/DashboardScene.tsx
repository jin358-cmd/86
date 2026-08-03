"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useState, type ReactNode } from "react";
import { Bot, ChevronDown, Radio, Activity } from "lucide-react";
import { MISSIONS, type MissionId } from "@/data/content";
import { useExperience } from "@/hooks/useExperience";
import { playTone } from "@/lib/audio";
import {
  createInitialMissionMarkers,
  type BuildingMissionMarker,
  type WeatherMode,
} from "@/components/three/OsVrCityScene";

const OsVrCityCanvas = dynamic(
  () => import("@/components/three/OsVrCityScene").then((m) => m.OsVrCityCanvas),
  { ssr: false, loading: () => <div className="h-full w-full bg-gvg-bg" /> },
);

const WEATHERS: WeatherMode[] = ["CLEAR", "FOG", "NEON STORM", "ORBITAL"];

type AccordionId = "status" | "assistant" | "radio" | null;

export function DashboardScene() {
  const { selectedMission, assignMission } = useExperience();
  const activeMissionId: MissionId = selectedMission ?? "enter";
  const mission =
    MISSIONS.find((m) => m.id === activeMissionId) ?? MISSIONS[0];

  const [weather, setWeather] = useState<WeatherMode>("CLEAR");
  const [openPanel, setOpenPanel] = useState<AccordionId>("assistant");
  const [markers, setMarkers] = useState<BuildingMissionMarker[]>(() =>
    createInitialMissionMarkers(),
  );

  const activeDistrict = useMemo(() => {
    const hit = markers.find((m) => m.missionId === activeMissionId);
    return hit?.district ?? "Financial District";
  }, [markers, activeMissionId]);

  const onSwapMarkerMission = useCallback(
    (markerId: string) => {
      setMarkers((prev) =>
        prev.map((m) => {
          if (m.id !== markerId) return m;
          const idx = MISSIONS.findIndex((x) => x.id === m.missionId);
          const next = MISSIONS[(idx + 1) % MISSIONS.length];
          assignMission(next.id);
          return { ...m, missionId: next.id };
        }),
      );
    },
    [assignMission],
  );

  const togglePanel = (id: AccordionId) => {
    playTone("ui");
    setOpenPanel((cur) => (cur === id ? null : id));
  };

  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      <div className="absolute inset-0">
        <OsVrCityCanvas
          weather={weather}
          markers={markers}
          activeMissionId={activeMissionId}
          onSwapMarkerMission={onSwapMarkerMission}
        />
      </div>

      {/* Soft edge only — VR stays open in the center */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />

      <div className="pointer-events-none relative z-10 flex min-h-[100dvh] flex-col justify-between px-4 pb-8 pt-24 md:px-6 md:pb-10 md:pt-28">
        <div className="flex items-start justify-between gap-4">
          <div className="pointer-events-none max-w-xs">
            <p className="font-mono text-[10px] tracking-[0.28em] text-gvg-cyan">
              ACTIVE TASK · {activeDistrict.toUpperCase()}
            </p>
            <p className="mt-1 font-display text-lg tracking-[0.16em] text-gvg-yellow">
              {mission.title}
            </p>
            <p className="mt-1 font-body text-xs text-white/60 md:text-sm">
              {mission.detail}
            </p>
            <p className="mt-3 font-mono text-[10px] tracking-[0.2em] text-white/40">
              CLICK BUILDING CARDS TO SWAP · TAB FOR NAV
            </p>
          </div>

          {/* Right accordion panels */}
          <div className="pointer-events-auto flex w-full max-w-[280px] flex-col gap-2 md:max-w-[300px]">
            <AccordionPanel
              open={openPanel === "status"}
              onToggle={() => togglePanel("status")}
              icon={<Activity size={14} />}
              title="SYSTEM STATUS"
              accent="text-gvg-cyan"
            >
              <ul className="space-y-1.5 font-mono text-[10px] tracking-wider text-gvg-muted">
                <li className="text-gvg-cyan">SIGNAL 98%</li>
                <li>AI CORE · STABLE</li>
                <li>LATENCY 11ms</li>
                <li className="text-gvg-yellow">ONLINE</li>
              </ul>
            </AccordionPanel>

            <AccordionPanel
              open={openPanel === "assistant"}
              onToggle={() => togglePanel("assistant")}
              icon={<Bot size={14} />}
              title="AI ASSISTANT"
              accent="text-gvg-cyan"
            >
              <div className="space-y-2 font-body text-xs text-gvg-muted">
                <p className="rounded border border-white/10 bg-black/40 p-2.5 text-gvg-text">
                  Neural link stable. Recommend scanning AI District before Trade
                  Center routing.
                </p>
                <p className="rounded border border-white/10 bg-black/40 p-2.5">
                  Drone corridor density is elevated near Space Port. Reroute?
                </p>
              </div>
            </AccordionPanel>

            <AccordionPanel
              open={openPanel === "radio"}
              onToggle={() => togglePanel("radio")}
              icon={<Radio size={14} />}
              title="RADIO NET"
              accent="text-gvg-yellow"
            >
              <p className="font-mono text-[10px] tracking-wider text-gvg-yellow">
                CHANNEL · LIVE
              </p>
              <p className="mt-2 font-body text-xs text-gvg-muted">
                Twin sync pulse nominal. Billboard and transit feeds streaming.
              </p>
            </AccordionPanel>
          </div>
        </div>

        <div className="pointer-events-none flex flex-col items-center text-center">
          <p className="font-mono text-xs tracking-[0.35em] text-gvg-cyan">
            LIVE TWIN · GVG CITY
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-[0.16em] text-gvg-yellow md:text-5xl">
            COMMAND DECK
          </h2>
          <p className="mt-2 max-w-md font-body text-sm text-white/60">
            VR interactive OS. Mission cards float on random towers — click to
            reassign. Weather filters reshape the twin.
          </p>
          <div className="pointer-events-auto mt-5 flex flex-wrap justify-center gap-2">
            {WEATHERS.map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => {
                  playTone("ui");
                  setWeather(w);
                }}
                className={`rounded-full border px-3 py-1 font-hud text-[10px] tracking-[0.2em] transition ${
                  weather === w
                    ? "border-gvg-yellow bg-gvg-yellow/15 text-gvg-yellow"
                    : "border-white/15 bg-black/40 text-gvg-text hover:border-gvg-cyan/50"
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AccordionPanel({
  open,
  onToggle,
  icon,
  title,
  accent,
  children,
}: {
  open: boolean;
  onToggle: () => void;
  icon: ReactNode;
  title: string;
  accent: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden border border-white/15 bg-black/65 backdrop-blur-md">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left"
      >
        <span className={`flex items-center gap-2 ${accent}`}>
          {icon}
          <span className="font-hud text-[10px] tracking-[0.25em]">{title}</span>
        </span>
        <ChevronDown
          size={14}
          className={`text-gvg-muted transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/10 px-3 py-3">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
