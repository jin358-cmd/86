"use client";

type ToneKind = "boot" | "ui" | "confirm" | "warn" | "whoosh" | "flow";

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
    boot: { type: "sawtooth", f: 180, dur: 0.18, vol: 0.025 },
    ui: { type: "sine", f: 920, dur: 0.05, vol: 0.015 },
    confirm: { type: "triangle", f: 540, dur: 0.12, vol: 0.022 },
    warn: { type: "square", f: 240, dur: 0.1, vol: 0.016 },
    whoosh: { type: "sine", f: 140, dur: 0.32, vol: 0.028 },
    flow: { type: "sine", f: 660, dur: 0.22, vol: 0.012 },
  };

  const p = presets[kind];
  osc.type = p.type;
  osc.frequency.setValueAtTime(p.f, now);
  if (kind === "whoosh") {
    osc.frequency.exponentialRampToValueAtTime(40, now + p.dur);
  } else if (kind === "confirm") {
    osc.frequency.exponentialRampToValueAtTime(p.f * 1.55, now + p.dur);
  } else if (kind === "flow") {
    osc.frequency.exponentialRampToValueAtTime(p.f * 1.35, now + p.dur);
  }

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(p.vol, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + p.dur);
  osc.start(now);
  osc.stop(now + p.dur + 0.02);
}

/**
 * Continuous tech-flowing ambient BGM:
 * low drone + sweeping filter + soft arpeggio + data-tick shimmer
 */
export function startAmbience() {
  if (muted || ambienceNodes) return;
  const c = ctx();
  if (!c) return;

  const master = c.createGain();
  master.gain.value = 0.032;
  master.connect(c.destination);

  const filter = c.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 720;
  filter.Q.value = 0.9;
  filter.connect(master);

  // Slow sweeping filter = "flowing" tech feel
  const sweep = c.createOscillator();
  sweep.frequency.value = 0.07;
  const sweepGain = c.createGain();
  sweepGain.gain.value = 480;
  sweep.connect(sweepGain);
  sweepGain.connect(filter.frequency);
  filter.frequency.setValueAtTime(720, c.currentTime);

  const drone = c.createOscillator();
  drone.type = "sine";
  drone.frequency.value = 55;
  const droneGain = c.createGain();
  droneGain.gain.value = 0.42;
  drone.connect(droneGain);
  droneGain.connect(filter);

  const sub = c.createOscillator();
  sub.type = "triangle";
  sub.frequency.value = 82.5;
  const subGain = c.createGain();
  subGain.gain.value = 0.16;
  sub.connect(subGain);
  subGain.connect(filter);

  const pulse = c.createOscillator();
  pulse.type = "triangle";
  pulse.frequency.value = 110;
  const pulseGain = c.createGain();
  pulseGain.gain.value = 0.08;
  const lfo = c.createOscillator();
  lfo.frequency.value = 0.42;
  const lfoGain = c.createGain();
  lfoGain.gain.value = 0.07;
  lfo.connect(lfoGain);
  lfoGain.connect(pulseGain.gain);
  pulse.connect(pulseGain);
  pulseGain.connect(filter);

  // Flowing arpeggio bed
  const arp = c.createOscillator();
  arp.type = "sine";
  arp.frequency.value = 220;
  const arpGain = c.createGain();
  arpGain.gain.value = 0.035;
  const arpLfo = c.createOscillator();
  arpLfo.frequency.value = 3.2;
  const arpLfoGain = c.createGain();
  arpLfoGain.gain.value = 0.03;
  arpLfo.connect(arpLfoGain);
  arpLfoGain.connect(arpGain.gain);
  // gentle pitch drift
  const arpDrift = c.createOscillator();
  arpDrift.frequency.value = 0.11;
  const arpDriftGain = c.createGain();
  arpDriftGain.gain.value = 28;
  arpDrift.connect(arpDriftGain);
  arpDriftGain.connect(arp.frequency);
  arp.connect(arpGain);
  arpGain.connect(master);

  const shimmer = c.createOscillator();
  shimmer.type = "sine";
  shimmer.frequency.value = 440;
  const shimmerGain = c.createGain();
  shimmerGain.gain.value = 0.014;
  const shimLfo = c.createOscillator();
  shimLfo.frequency.value = 0.22;
  const shimLfoGain = c.createGain();
  shimLfoGain.gain.value = 0.01;
  shimLfo.connect(shimLfoGain);
  shimLfoGain.connect(shimmerGain.gain);
  shimmer.connect(shimmerGain);
  shimmerGain.connect(master);

  // Soft noise bed via detuned high sine as data stream
  const data = c.createOscillator();
  data.type = "square";
  data.frequency.value = 880;
  const dataGain = c.createGain();
  dataGain.gain.value = 0.004;
  const dataFilter = c.createBiquadFilter();
  dataFilter.type = "bandpass";
  dataFilter.frequency.value = 1200;
  dataFilter.Q.value = 4;
  const dataLfo = c.createOscillator();
  dataLfo.frequency.value = 5.5;
  const dataLfoGain = c.createGain();
  dataLfoGain.gain.value = 0.0035;
  dataLfo.connect(dataLfoGain);
  dataLfoGain.connect(dataGain.gain);
  data.connect(dataFilter);
  dataFilter.connect(dataGain);
  dataGain.connect(master);

  drone.start();
  sub.start();
  pulse.start();
  lfo.start();
  arp.start();
  arpLfo.start();
  arpDrift.start();
  shimmer.start();
  shimLfo.start();
  data.start();
  dataLfo.start();
  sweep.start();

  ambienceNodes = {
    stop: () => {
      try {
        drone.stop();
        sub.stop();
        pulse.stop();
        lfo.stop();
        arp.stop();
        arpLfo.stop();
        arpDrift.stop();
        shimmer.stop();
        shimLfo.stop();
        data.stop();
        dataLfo.stop();
        sweep.stop();
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

/** Soft flowing tech ticks while experience is active */
export function startSfxLoop() {
  if (muted || sfxLoopId !== null) return;
  const sequence: ToneKind[] = ["flow", "ui", "flow", "confirm", "flow", "whoosh"];
  let i = 0;
  sfxLoopId = window.setInterval(() => {
    if (muted) return;
    playTone(sequence[i % sequence.length]);
    i += 1;
  }, 3600);
}

export function stopSfxLoop() {
  if (sfxLoopId !== null) {
    window.clearInterval(sfxLoopId);
    sfxLoopId = null;
  }
}
