"use client";

type ToneKind = "boot" | "ui" | "confirm" | "warn" | "whoosh";

let audioCtx: AudioContext | null = null;
let ambienceNodes: { stop: () => void } | null = null;
let muted = false;

function ctx() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    audioCtx = new AC();
  }
  return audioCtx;
}

export function setMuted(value: boolean) {
  muted = value;
  if (muted) stopAmbience();
}

export function isMuted() {
  return muted;
}

export async function unlockAudio() {
  const c = ctx();
  if (!c) return;
  if (c.state === "suspended") await c.resume();
}

export function playTone(kind: ToneKind = "ui") {
  if (muted) return;
  const c = ctx();
  if (!c) return;

  const now = c.currentTime;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.connect(gain);
  gain.connect(c.destination);

  const presets: Record<
    ToneKind,
    { type: OscillatorType; f: number; dur: number; vol: number }
  > = {
    boot: { type: "sawtooth", f: 180, dur: 0.18, vol: 0.03 },
    ui: { type: "sine", f: 880, dur: 0.06, vol: 0.025 },
    confirm: { type: "triangle", f: 520, dur: 0.14, vol: 0.035 },
    warn: { type: "square", f: 240, dur: 0.12, vol: 0.02 },
    whoosh: { type: "sine", f: 120, dur: 0.35, vol: 0.04 },
  };

  const p = presets[kind];
  osc.type = p.type;
  osc.frequency.setValueAtTime(p.f, now);
  if (kind === "whoosh") {
    osc.frequency.exponentialRampToValueAtTime(40, now + p.dur);
  } else if (kind === "confirm") {
    osc.frequency.exponentialRampToValueAtTime(p.f * 1.6, now + p.dur);
  }

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(p.vol, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + p.dur);
  osc.start(now);
  osc.stop(now + p.dur + 0.02);
}

export function startAmbience() {
  if (muted || ambienceNodes) return;
  const c = ctx();
  if (!c) return;

  const master = c.createGain();
  master.gain.value = 0.018;
  master.connect(c.destination);

  const drone = c.createOscillator();
  drone.type = "sine";
  drone.frequency.value = 55;
  const droneGain = c.createGain();
  droneGain.gain.value = 0.7;
  drone.connect(droneGain);
  droneGain.connect(master);

  const shimmer = c.createOscillator();
  shimmer.type = "triangle";
  shimmer.frequency.value = 220;
  const shimmerGain = c.createGain();
  shimmerGain.gain.value = 0.15;
  const lfo = c.createOscillator();
  lfo.frequency.value = 0.08;
  const lfoGain = c.createGain();
  lfoGain.gain.value = 0.08;
  lfo.connect(lfoGain);
  lfoGain.connect(shimmerGain.gain);
  shimmer.connect(shimmerGain);
  shimmerGain.connect(master);

  drone.start();
  shimmer.start();
  lfo.start();

  ambienceNodes = {
    stop: () => {
      try {
        drone.stop();
        shimmer.stop();
        lfo.stop();
      } catch {
        /* already stopped */
      }
      master.disconnect();
      ambienceNodes = null;
    },
  };
}

export function stopAmbience() {
  ambienceNodes?.stop();
  ambienceNodes = null;
}
