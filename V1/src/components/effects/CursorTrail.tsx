"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  life: number;
};

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    let w = 0;
    let h = 0;
    let mx = -100;
    let my = -100;
    let tx = -100;
    let ty = -100;
    const particles: Particle[] = [];
    let raf = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      for (let i = 0; i < 2; i += 1) {
        particles.push({
          x: mx + (Math.random() - 0.5) * 8,
          y: my + (Math.random() - 0.5) * 8,
          life: 1,
        });
      }
      if (particles.length > 80) particles.splice(0, particles.length - 80);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      tx += (mx - tx) * 0.35;
      ty += (my - ty) * 0.35;

      // trailing particles
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];
        p.life -= 0.035;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(252, 238, 10, ${p.life * 0.45})`;
        ctx.arc(p.x, p.y, 2.2 * p.life, 0, Math.PI * 2);
        ctx.fill();
      }

      // outer cyan ring
      ctx.beginPath();
      ctx.strokeStyle = "rgba(0, 229, 255, 0.55)";
      ctx.lineWidth = 1;
      ctx.arc(tx, ty, 16, 0, Math.PI * 2);
      ctx.stroke();

      // inner yellow core
      ctx.beginPath();
      ctx.fillStyle = "rgba(252, 238, 10, 0.85)";
      ctx.arc(tx, ty, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // crosshair ticks
      ctx.strokeStyle = "rgba(252, 238, 10, 0.4)";
      ctx.beginPath();
      ctx.moveTo(tx - 22, ty);
      ctx.lineTo(tx - 12, ty);
      ctx.moveTo(tx + 12, ty);
      ctx.lineTo(tx + 22, ty);
      ctx.moveTo(tx, ty - 22);
      ctx.lineTo(tx, ty - 12);
      ctx.moveTo(tx, ty + 12);
      ctx.lineTo(tx, ty + 22);
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    };

    document.body.classList.add("gvg-cursor-active");

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      document.body.classList.remove("gvg-cursor-active");
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[95] mix-blend-screen"
      aria-hidden
    />
  );
}
