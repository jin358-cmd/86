"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function LoginScene() {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelRef.current) return;
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 28, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: "power3.out" },
    );
  }, []);

  return (
    <section className="relative grid min-h-[100dvh] place-items-center overflow-hidden px-6">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-1/2 top-1/2 size-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gvg-yellow/20" />
        <div className="absolute left-1/2 top-1/2 size-[50vmax] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gvg-cyan/20" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(252,238,10,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(252,238,10,0.04)_1px,transparent_1px)] bg-size-[48px_48px] [mask-image:radial-gradient(circle,black,transparent_70%)]" />
      </div>

      <div
        ref={panelRef}
        className="glass-panel relative z-10 w-full max-w-lg px-6 py-8 text-center opacity-0"
      >
        <p className="font-mono text-[10px] tracking-[0.35em] text-gvg-cyan">
          AUTH SEQUENCE
        </p>
        <h2 className="mt-3 font-display text-3xl tracking-[0.18em] text-gvg-yellow md:text-4xl">
          SYSTEM LOGIN
        </h2>
        <p className="mt-4 font-body text-sm text-gvg-muted md:text-base">
          Biometrics accepted. Neural signature matched. Welcome to GVG OS 3.0.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-3 font-mono text-[10px] tracking-wider text-gvg-muted">
          <div className="rounded border border-white/10 bg-black/30 px-2 py-3">
            <p className="text-gvg-yellow">USER</p>
            <p className="mt-1 text-gvg-text">OPERATOR</p>
          </div>
          <div className="rounded border border-white/10 bg-black/30 px-2 py-3">
            <p className="text-gvg-yellow">CLEARANCE</p>
            <p className="mt-1 text-gvg-text">ROOT</p>
          </div>
          <div className="rounded border border-white/10 bg-black/30 px-2 py-3">
            <p className="text-gvg-yellow">NODE</p>
            <p className="mt-1 text-gvg-text">GVG-07</p>
          </div>
        </div>
      </div>
    </section>
  );
}
