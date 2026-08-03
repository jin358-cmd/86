"use client";

type ToneKind = "boot" | "ui" | "confirm" | "warn" | "whoosh";

let audioCtx: AudioContext | null = null;
let ambienceNodes: { stop: () => void } | null = null;
let sfxLoopId: number | null = null;
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
  if (muted) {
    stopAmbience();
    stopSfxLoop();
  }
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
    ui: { type: "sine", f: 880, dur: 0.06, vol: 0.02 },
    confirm: { type: "triangle", f: 520, dur: 0.14, vol: 0.03 },
    warn: { type: "square", f: 240, dur: 0.12, vol: 0.02 },
    whoosh: { type: "sine", f: 120, dur: 0.35, vol: 0.035 },
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

/** Continuous looping ambient BGM bed */
export function startAmbience() {
  if (muted || ambienceNodes) return;
  const c = ctx();
  if (!c) return;

  const master = c.createGain();
  master.gain.value = 0.028;
  master.connect(c.destination);

  const filter = c.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 900;
  filter.Q.value = 0.7;
  filter.connect(master);

  const drone = c.createOscillator();
  drone.type = "sine";
  drone.frequency.value = 48;
  const droneGain = c.createGain();
  droneGain.gain.value = 0.55;
  drone.connect(droneGain);
  droneGain.connect(filter);

  const pulse = c.createOscillator();
  pulse.type = "triangle";
  pulse.frequency.value = 96;
  const pulseGain = c.createGain();
  pulseGain.gain.value = 0.12;
  const lfo = c.createOscillator();
  lfo.frequency.value = 0.35;
  const lfoGain = c.createGain();
  lfoGain.gain.value = 0.1;
  lfo.connect(lfoGain);
  lfoGain.connect(pulseGain.gain);
  pulse.connect(pulseGain);
  pulseGain.connect(filter);

  const arp = c.createOscillator();
  arp.type = "sine";
  arp.frequency.value = 196;
  const arpGain = c.createGain();
  arpGain.gain.value = 0.04;
  const arpLfo = c.createOscillator();
  arpLfo.frequency.value = 2.5;
  const arpLfoGain = c.createGain();
  arpLfoGain.gain.value = 0.035;
  arpLfo.connect(arpLfoGain);
  arpLfoGain.connect(arpGain.gain);
  arp.connect(arpGain);
  arpGain.connect(master);

  const shimmer = c.createOscillator();
  shimmer.type = "sine";
  shimmer.frequency.value = 392;
  const shimmerGain = c.createGain();
  shimmerGain.gain.value = 0.018;
  shimmer.connect(shimmerGain);
  shimmerGain.connect(master);

  // Soft purple-ish fifth for cyber bed variety
  const fifth = c.createOscillator();
  fifth.type = "triangle";
  fifth.frequency.value = 72;
  const fifthGain = c.createGain();
  fifthGain.gain.value = 0.08;
  fifth.connect(fifthGain);
  fifthGain.connect(filter);

  drone.start();
  pulse.start();
  lfo.start();
  arp.start();
  arpLfo.start();
  shimmer.start();
  fifth.start();

  ambienceNodes = {
    stop: () => {
      try {
        drone.stop();
        pulse.stop();
        lfo.stop();
        arp.stop();
        arpLfo.stop();
        shimmer.stop();
        fifth.stop();
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

/** Soft UI SFX that rotate continuously while experience is active */
export function startSfxLoop() {
  if (muted || sfxLoopId !== null) return;
  const sequence: ToneKind[] = ["ui", "boot", "ui", "confirm", "ui", "whoosh"];
  let i = 0;
  sfxLoopId = window.setInterval(() => {
    if (muted) return;
    playTone(sequence[i % sequence.length]);
    i += 1;
  }, 4200);
}

export function stopSfxLoop() {
  if (sfxLoopId !== null) {
    window.clearInterval(sfxLoopId);
    sfxLoopId = null;
  }
}
