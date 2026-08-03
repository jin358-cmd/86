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
    boot: { type: "triangle", f: 320, dur: 0.14, vol: 0.02 },
    ui: { type: "sine", f: 1040, dur: 0.045, vol: 0.012 },
    confirm: { type: "sine", f: 660, dur: 0.1, vol: 0.016 },
    warn: { type: "square", f: 240, dur: 0.1, vol: 0.014 },
    whoosh: { type: "sine", f: 280, dur: 0.28, vol: 0.02 },
    flow: { type: "sine", f: 784, dur: 0.16, vol: 0.01 },
  };

  const p = presets[kind];
  osc.type = p.type;
  osc.frequency.setValueAtTime(p.f, now);
  if (kind === "whoosh") {
    osc.frequency.exponentialRampToValueAtTime(90, now + p.dur);
  } else if (kind === "confirm") {
    osc.frequency.exponentialRampToValueAtTime(p.f * 1.45, now + p.dur);
  } else if (kind === "flow") {
    osc.frequency.exponentialRampToValueAtTime(p.f * 1.25, now + p.dur);
  }

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(p.vol, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + p.dur);
  osc.start(now);
  osc.stop(now + p.dur + 0.02);
}

/**
 * Light, brisk flowing tech BGM — brighter arps, soft pulse, airy pad
 */
export function startAmbience() {
  if (muted || ambienceNodes) return;
  const c = ctx();
  if (!c) return;

  const master = c.createGain();
  master.gain.value = 0.026;
  master.connect(c.destination);

  const filter = c.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1400;
  filter.Q.value = 0.55;
  filter.connect(master);

  // Gentle breeze sweep
  const sweep = c.createOscillator();
  sweep.frequency.value = 0.14;
  const sweepGain = c.createGain();
  sweepGain.gain.value = 520;
  sweep.connect(sweepGain);
  sweepGain.connect(filter.frequency);
  filter.frequency.setValueAtTime(1400, c.currentTime);

  // Light airy pad (higher, softer)
  const pad = c.createOscillator();
  pad.type = "sine";
  pad.frequency.value = 196;
  const padGain = c.createGain();
  padGain.gain.value = 0.12;
  pad.connect(padGain);
  padGain.connect(filter);

  const pad2 = c.createOscillator();
  pad2.type = "triangle";
  pad2.frequency.value = 246.94; // B3
  const pad2Gain = c.createGain();
  pad2Gain.gain.value = 0.07;
  pad2.connect(pad2Gain);
  pad2Gain.connect(filter);

  // Brisk soft pulse
  const pulse = c.createOscillator();
  pulse.type = "sine";
  pulse.frequency.value = 392;
  const pulseGain = c.createGain();
  pulseGain.gain.value = 0.03;
  const lfo = c.createOscillator();
  lfo.frequency.value = 1.6; // livelier
  const lfoGain = c.createGain();
  lfoGain.gain.value = 0.028;
  lfo.connect(lfoGain);
  lfoGain.connect(pulseGain.gain);
  pulse.connect(pulseGain);
  pulseGain.connect(master);

  // Bright flowing arpeggio
  const arp = c.createOscillator();
  arp.type = "sine";
  arp.frequency.value = 523.25; // C5
  const arpGain = c.createGain();
  arpGain.gain.value = 0.028;
  const arpLfo = c.createOscillator();
  arpLfo.frequency.value = 4.8;
  const arpLfoGain = c.createGain();
  arpLfoGain.gain.value = 0.024;
  arpLfo.connect(arpLfoGain);
  arpLfoGain.connect(arpGain.gain);
  const arpDrift = c.createOscillator();
  arpDrift.frequency.value = 0.25;
  const arpDriftGain = c.createGain();
  arpDriftGain.gain.value = 48;
  arpDrift.connect(arpDriftGain);
  arpDriftGain.connect(arp.frequency);
  arp.connect(arpGain);
  arpGain.connect(master);

  // High sparkle
  const sparkle = c.createOscillator();
  sparkle.type = "sine";
  sparkle.frequency.value = 784;
  const sparkleGain = c.createGain();
  sparkleGain.gain.value = 0.01;
  const sparkLfo = c.createOscillator();
  sparkLfo.frequency.value = 2.2;
  const sparkLfoGain = c.createGain();
  sparkLfoGain.gain.value = 0.008;
  sparkLfo.connect(sparkLfoGain);
  sparkLfoGain.connect(sparkleGain.gain);
  sparkle.connect(sparkleGain);
  sparkleGain.connect(master);

  // Soft fifth for lift
  const fifth = c.createOscillator();
  fifth.type = "sine";
  fifth.frequency.value = 293.66;
  const fifthGain = c.createGain();
  fifthGain.gain.value = 0.05;
  fifth.connect(fifthGain);
  fifthGain.connect(filter);

  pad.start();
  pad2.start();
  pulse.start();
  lfo.start();
  arp.start();
  arpLfo.start();
  arpDrift.start();
  sparkle.start();
  sparkLfo.start();
  fifth.start();
  sweep.start();

  ambienceNodes = {
    stop: () => {
      try {
        pad.stop();
        pad2.stop();
        pulse.stop();
        lfo.stop();
        arp.stop();
        arpLfo.stop();
        arpDrift.stop();
        sparkle.stop();
        sparkLfo.stop();
        fifth.stop();
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

/** Light flowing ticks */
export function startSfxLoop() {
  if (muted || sfxLoopId !== null) return;
  const sequence: ToneKind[] = ["flow", "ui", "flow", "confirm", "flow", "ui"];
  let i = 0;
  sfxLoopId = window.setInterval(() => {
    if (muted) return;
    playTone(sequence[i % sequence.length]);
    i += 1;
  }, 2800);
}

export function stopSfxLoop() {
  if (sfxLoopId !== null) {
    window.clearInterval(sfxLoopId);
    sfxLoopId = null;
  }
}
