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
} from "@/lib/audio";
import { MISSIONS, type MissionId } from "@/data/content";

type ExperienceContextValue = {
  scene: SceneId;
  sceneIndex: number;
  transitioning: boolean;
  selectedMission: MissionId | null;
  muted: boolean;
  goTo: (scene: SceneId) => void;
  advance: () => void;
  skip: () => void;
  selectMission: (id: MissionId) => void;
  assignMission: (id: MissionId) => void;
  cycleMission: () => void;
  toggleMute: () => void;
  begin: () => Promise<void>;
  started: boolean;
};

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [scene, setScene] = useState<SceneId>("boot");
  const [started, setStarted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [selectedMission, setSelectedMission] = useState<MissionId | null>(
    null,
  );
  const [muted, setMutedState] = useState(false);

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
    // Skip cinematic prologue → world intro
    if (scene === "boot" || scene === "neuralGlass" || scene === "wear") {
      goTo("login");
      return;
    }
    if (scene === "login" || scene === "city") {
      goTo("world");
      return;
    }
    advance();
  }, [advance, goTo, scene]);

  const selectMission = useCallback(
    (id: MissionId) => {
      setSelectedMission(id);
      playTone("confirm");
      goTo("dashboard");
    },
    [goTo],
  );

  const assignMission = useCallback((id: MissionId) => {
    setSelectedMission(id);
    playTone("ui");
  }, []);

  const cycleMission = useCallback(() => {
    setSelectedMission((current) => {
      const idx = MISSIONS.findIndex((m) => m.id === current);
      const next = MISSIONS[(idx < 0 ? 0 : idx + 1) % MISSIONS.length];
      playTone("ui");
      return next.id;
    });
  }, []);

  const toggleMute = useCallback(() => {
    setMutedState((m) => {
      const next = !m;
      setMuted(next);
      if (!next) startAmbience();
      return next;
    });
  }, []);

  const begin = useCallback(async () => {
    await unlockAudio();
    startAmbience();
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
      /* sync helper */
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
      assignMission,
      cycleMission,
      toggleMute,
      begin,
      started,
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
      assignMission,
      cycleMission,
      toggleMute,
      begin,
      started,
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
