export const SCENES = [
  "boot",
  "wear",
  "neuralGlass",
  "login",
  "city",
  "world",
  "missions",
  "dashboard",
] as const;

export type SceneId = (typeof SCENES)[number];

export const SCENE_META: Record<
  SceneId,
  { label: string; autoAdvanceMs?: number }
> = {
  // Boot advances itself into WEAR when progress hits 100%
  boot: { label: "BOOT", autoAdvanceMs: undefined },
  wear: { label: "LINK", autoAdvanceMs: undefined },
  neuralGlass: { label: "OPTICS", autoAdvanceMs: 7000 },
  login: { label: "LOGIN", autoAdvanceMs: 4500 },
  city: { label: "CITY", autoAdvanceMs: 8000 },
  world: { label: "WORLD", autoAdvanceMs: undefined },
  missions: { label: "MISSION", autoAdvanceMs: undefined },
  dashboard: { label: "OS", autoAdvanceMs: undefined },
};

export function nextScene(current: SceneId): SceneId | null {
  const index = SCENES.indexOf(current);
  if (index < 0 || index >= SCENES.length - 1) return null;
  return SCENES[index + 1];
}

export function canSkip(scene: SceneId): boolean {
  return scene !== "dashboard";
}
