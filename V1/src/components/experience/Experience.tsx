"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Atmosphere } from "@/components/effects/Atmosphere";
import { CursorTrail } from "@/components/effects/CursorTrail";
import { FloatingDust } from "@/components/effects/FloatingDust";
import { ChromeHud } from "@/components/hud/ChromeHud";
import {
  ExperienceProvider,
  useExperience,
} from "@/hooks/useExperience";
import { useLenis } from "@/hooks/useLenis";
import { BootScene } from "@/sections/BootScene";
import { WearScene } from "@/sections/WearScene";
import { LoginScene } from "@/sections/LoginScene";
import { CityRevealScene } from "@/sections/CityRevealScene";
import { WorldIntroScene } from "@/sections/WorldIntroScene";
import { DashboardScene } from "@/sections/DashboardScene";
import { playTone } from "@/lib/audio";

const COUNTDOWN_FROM = 5;

function EntryGate() {
  const {
    begin,
    started,
    geoStatus,
    geo,
    locationConfirmed,
    confirmLocation,
    requestLocation,
  } = useExperience();
  const [count, setCount] = useState(COUNTDOWN_FROM);
  const [countdownDone, setCountdownDone] = useState(false);

  useEffect(() => {
    if (started) return;
    requestLocation();
  }, [requestLocation, started]);

  useEffect(() => {
    if (geoStatus === "granted" && !locationConfirmed) {
      confirmLocation();
    }
  }, [geoStatus, locationConfirmed, confirmLocation]);

  useEffect(() => {
    if (started || countdownDone) return;
    if (count <= 0) {
      setCountdownDone(true);
      playTone("confirm");
      return;
    }
    const t = window.setTimeout(() => {
      setCount((c) => c - 1);
      playTone("boot");
    }, 1000);
    return () => window.clearTimeout(t);
  }, [count, countdownDone, started]);

  if (started) return null;

  const geoLabel =
    geoStatus === "pending"
      ? "定位中…"
      : geoStatus === "granted" && geo
        ? `${geo.lat.toFixed(4)}°, ${geo.lon.toFixed(4)}°`
        : geoStatus === "denied"
          ? "定位權限被拒 — 可手動確認繼續"
          : geoStatus === "unavailable"
            ? "此裝置不支援定位"
            : "等待裝置定位";

  const canEnter = countdownDone && (locationConfirmed || geoStatus === "granted");

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-gvg-bg px-6">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,255,0.25),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(0,229,255,0.12),transparent_40%)]" />
      </div>

      <div className="relative z-10 max-w-lg text-center">
        <p className="font-mono text-xs tracking-[0.4em] text-gvg-cyan">
          GVG OS · SYSTEM GATE
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-[0.14em] text-gvg-yellow md:text-5xl">
          ENTRY SEQUENCE
        </h1>
        <p className="mt-4 font-body text-gvg-muted">
          讀取倒數完成後，請確認設備使用者位置，再進入 Boot → Wear → Login →
          City → World → Dashboard。
        </p>

        <div className="mt-8 grid place-items-center">
          <div className="relative grid size-28 place-items-center rounded-full border border-gvg-purple/50 bg-black/50">
            <span className="font-display text-5xl tracking-widest text-white">
              {countdownDone ? "OK" : count}
            </span>
            <span className="absolute -bottom-6 font-mono text-[10px] tracking-[0.3em] text-gvg-purple">
              LOAD COUNTDOWN
            </span>
          </div>
        </div>

        <div className="glass-panel mt-12 px-5 py-4 text-left">
          <p className="font-mono text-[10px] tracking-[0.28em] text-gvg-cyan">
            DEVICE · USER LOCATION
          </p>
          <p className="mt-2 font-hud text-sm tracking-[0.12em] text-gvg-text">
            {geoLabel}
          </p>
          {geo?.accuracy != null && geoStatus === "granted" ? (
            <p className="mt-1 font-mono text-[10px] text-gvg-muted">
              ACC ±{Math.round(geo.accuracy)}m
            </p>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => requestLocation()}
              className="border border-white/20 px-3 py-2 font-hud text-[10px] tracking-[0.2em] text-gvg-muted transition hover:border-gvg-purple hover:text-white"
            >
              RE-SCAN GPS
            </button>
            <button
              type="button"
              onClick={() => confirmLocation()}
              className="border border-gvg-purple/60 px-3 py-2 font-hud text-[10px] tracking-[0.2em] text-gvg-purple transition hover:bg-gvg-purple hover:text-black"
            >
              CONFIRM POSITION
            </button>
          </div>
          {locationConfirmed || geoStatus === "granted" ? (
            <p className="mt-3 font-mono text-[10px] tracking-wider text-gvg-yellow">
              LOCATION LOCKED · READY
            </p>
          ) : null}
        </div>

        <button
          type="button"
          disabled={!canEnter}
          onClick={() => void begin()}
          className="mt-8 border border-gvg-yellow bg-gvg-yellow px-8 py-3 font-display text-sm tracking-[0.28em] text-black transition enabled:hover:bg-transparent enabled:hover:text-gvg-yellow disabled:cursor-not-allowed disabled:opacity-40"
        >
          INITIALIZE
        </button>
        <p className="mt-4 font-mono text-[10px] tracking-wider text-gvg-muted">
          BGM + SFX LOOP · METEOR CURSOR · HUD ONLINE
        </p>
      </div>
    </div>
  );
}

function SceneStage() {
  const { scene, transitioning, started } = useExperience();
  const [jackIn, setJackIn] = useState(false);
  useLenis(started && scene === "dashboard");

  return (
    <>
      <Atmosphere />
      <CursorTrail />
      <ChromeHud />
      <EntryGate />

      {started && (
        <div
          className={
            transitioning || jackIn
              ? "pointer-events-none opacity-40 blur-sm"
              : ""
          }
        >
          {(scene === "boot" || scene === "wear" || scene === "login") && (
            <FloatingDust />
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={scene}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {scene === "boot" && <BootScene />}
              {scene === "wear" && (
                <WearScene onJackInEffects={setJackIn} />
              )}
              {scene === "login" && <LoginScene />}
              {scene === "city" && <CityRevealScene />}
              {scene === "world" && <WorldIntroScene />}
              {scene === "dashboard" && <DashboardScene />}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

export function Experience() {
  return (
    <ExperienceProvider>
      <main className="relative min-h-[100dvh] overflow-x-hidden bg-gvg-bg text-gvg-text">
        <SceneStage />
      </main>
    </ExperienceProvider>
  );
}
