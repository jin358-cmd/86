"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  canSkip,
  nextScene,
  SCENE_META,
  SCENES,
  type SceneId,
} from "@/lib/experience";
import {
  playTone,
  startAmbience,
  unlockAudio,
  setMuted,
  isMuted,
  startSfxLoop,
  stopSfxLoop,
} from "@/lib/audio";
import type { MissionId } from "@/data/content";

export type GeoStatus = "idle" | "pending" | "granted" | "denied" | "unavailable";

export type GeoPosition = {
  lat: number;
  lon: number;
  accuracy: number | null;
};

type ExperienceContextValue = {
  scene: SceneId;
  sceneIndex: number;
  transitioning: boolean;
  selectedMission: MissionId;
  muted: boolean;
  goTo: (scene: SceneId) => void;
  advance: () => void;
  skip: () => void;
  selectMission: (id: MissionId) => void;
  toggleMute: () => void;
  begin: () => Promise<void>;
  started: boolean;
  geoStatus: GeoStatus;
  geo: GeoPosition | null;
  locationConfirmed: boolean;
  confirmLocation: () => void;
  requestLocation: () => void;
};

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [scene, setScene] = useState<SceneId>("boot");
  const [started, setStarted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [selectedMission, setSelectedMission] = useState<MissionId>("landing");
  const [muted, setMutedState] = useState(false);
  const [geoStatus, setGeoStatus] = useState<GeoStatus>("idle");
  const [geo, setGeo] = useState<GeoPosition | null>(null);
  const [locationConfirmed, setLocationConfirmed] = useState(false);

  const sceneIndex = SCENES.indexOf(scene);

  const goTo = useCallback((next: SceneId) => {
    setTransitioning(true);
    playTone("whoosh");
    window.setTimeout(() => {
      setScene(next);
      setTransitioning(false);
    }, 420);
  }, []);

  const advance = useCallback(() => {
    const n = nextScene(scene);
    if (n) goTo(n);
  }, [goTo, scene]);

  const skip = useCallback(() => {
    if (!canSkip(scene)) return;
    playTone("ui");
    if (scene === "boot" || scene === "wear") {
      goTo("login");
      return;
    }
    if (scene === "login" || scene === "city") {
      goTo("world");
      return;
    }
    if (scene === "world") {
      goTo("dashboard");
      return;
    }
    advance();
  }, [advance, goTo, scene]);

  const selectMission = useCallback((id: MissionId) => {
    setSelectedMission(id);
    playTone("confirm");
  }, []);

  const requestLocation = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setGeoStatus("unavailable");
      return;
    }
    setGeoStatus("pending");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeo({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          accuracy: pos.coords.accuracy ?? null,
        });
        setGeoStatus("granted");
        playTone("confirm");
      },
      () => {
        setGeoStatus("denied");
        playTone("warn");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  }, []);

  const confirmLocation = useCallback(() => {
    setLocationConfirmed(true);
    playTone("confirm");
  }, []);

  const toggleMute = useCallback(() => {
    setMutedState((m) => {
      const next = !m;
      setMuted(next);
      if (!next) {
        startAmbience();
        startSfxLoop();
      } else {
        stopSfxLoop();
      }
      return next;
    });
  }, []);

  const begin = useCallback(async () => {
    await unlockAudio();
    startAmbience();
    startSfxLoop();
    setStarted(true);
    playTone("boot");
  }, []);

  useEffect(() => {
    if (!started) return;
    const auto = SCENE_META[scene].autoAdvanceMs;
    if (!auto) return;
    const t = window.setTimeout(() => advance(), auto);
    return () => window.clearTimeout(t);
  }, [advance, scene, started]);

  useEffect(() => {
    setMuted(muted);
    if (!muted && isMuted()) {
      /* sync */
    }
  }, [muted]);

  const value = useMemo(
    () => ({
      scene,
      sceneIndex,
      transitioning,
      selectedMission,
      muted,
      goTo,
      advance,
      skip,
      selectMission,
      toggleMute,
      begin,
      started,
      geoStatus,
      geo,
      locationConfirmed,
      confirmLocation,
      requestLocation,
    }),
    [
      scene,
      sceneIndex,
      transitioning,
      selectedMission,
      muted,
      goTo,
      advance,
      skip,
      selectMission,
      toggleMute,
      begin,
      started,
      geoStatus,
      geo,
      locationConfirmed,
      confirmLocation,
      requestLocation,
    ],
  );

  return (
    <ExperienceContext.Provider value={value}>
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  const ctx = useContext(ExperienceContext);
  if (!ctx) {
    throw new Error("useExperience must be used within ExperienceProvider");
  }
  return ctx;
}
