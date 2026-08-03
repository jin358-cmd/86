export const SCENES = ["boot", "hero", "hub"] as const;

export type SceneId = (typeof SCENES)[number];

export const SCENE_META: Record<
  SceneId,
  { label: string; autoAdvanceMs?: number }
> = {
  boot: { label: "BOOT", autoAdvanceMs: 4800 },
  hero: { label: "HERO", autoAdvanceMs: undefined },
  hub: { label: "HUB", autoAdvanceMs: undefined },
};

export function nextScene(current: SceneId): SceneId | null {
  const index = SCENES.indexOf(current);
  if (index < 0 || index >= SCENES.length - 1) return null;
  return SCENES[index + 1];
}

export function canSkip(scene: SceneId): boolean {
  return scene !== "hub";
}
