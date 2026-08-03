"use client";

import { useEffect, useRef } from "react";

type TrailPoint = {
  x: number;
  y: number;
};

type Shard = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  len: number;
  hue: "cyan" | "magenta" | "white";
};

const TRAIL_MAX = 28;
const SHARD_BURST = 12;

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // Always enable custom cursor on fine pointers; also on coarse if user moves
    document.body.classList.add("gvg-cursor-active");

    let w = 0;
    let h = 0;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let prevMx = mx;
    let prevMy = my;
    let raf = 0;
    let dragX = mx;
    let dragY = my;
    const trail: TrailPoint[] = [];
    const shards: Shard[] = [];
    let burstCooldown = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnBurst = (x: number, y: number, speed: number) => {
      const count = SHARD_BURST + Math.floor(Math.min(speed / 6, 8));
      for (let i = 0; i < count; i += 1) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
        const force = 3.2 + Math.random() * 4.8 + speed * 0.08;
        const hues: Shard["hue"][] = ["cyan", "magenta", "white"];
        shards.push({
          x,
          y,
          vx: Math.cos(angle) * force,
          vy: Math.sin(angle) * force,
          life: 1,
          len: 22 + Math.random() * 28,
          hue: hues[i % hues.length],
        });
      }
      if (shards.length > 140) shards.splice(0, shards.length - 140);
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const colorFor = (hue: Shard["hue"], a: number) => {
      if (hue === "cyan") return `rgba(0, 153, 204, ${a})`;
      if (hue === "magenta") return `rgba(212, 20, 122, ${a})`;
      return `rgba(255, 255, 255, ${a})`;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const dx = mx - prevMx;
      const dy = my - prevMy;
      const moveSpeed = Math.hypot(dx, dy);
      prevMx = mx;
      prevMy = my;

      // Longer drag lag for stretched trail
      dragX += (mx - dragX) * 0.18;
      dragY += (my - dragY) * 0.18;

      trail.unshift({ x: dragX, y: dragY });
      if (trail.length > TRAIL_MAX) trail.pop();

      burstCooldown -= 1;
      if (moveSpeed > 1.4 && burstCooldown <= 0) {
        spawnBurst(mx, my, moveSpeed);
        burstCooldown = 1;
      }

      // Elongated drag ribbon
      if (trail.length > 1) {
        for (let i = 0; i < trail.length - 1; i += 1) {
          const a = trail[i];
          const b = trail[i + 1];
          const alpha = (1 - i / trail.length) * 0.7;
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `rgba(0, 153, 204, ${alpha})`);
          grad.addColorStop(0.55, `rgba(212, 20, 122, ${alpha * 0.75})`);
          grad.addColorStop(1, `rgba(255, 255, 255, ${alpha * 0.35})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = Math.max(1, 4.2 - i * 0.12);
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Long outward burst shards
      for (let i = shards.length - 1; i >= 0; i -= 1) {
        const s = shards[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.935;
        s.vy *= 0.935;
        s.life -= 0.028;
        if (s.life <= 0) {
          shards.splice(i, 1);
          continue;
        }
        const speed = Math.hypot(s.vx, s.vy) || 0.001;
        const ux = s.vx / speed;
        const uy = s.vy / speed;
        const len = s.len * (0.45 + s.life * 0.55);
        const tx = s.x - ux * len;
        const ty = s.y - uy * len;
        const grad = ctx.createLinearGradient(tx, ty, s.x, s.y);
        grad.addColorStop(0, colorFor(s.hue, 0));
        grad.addColorStop(1, colorFor(s.hue, s.life * 0.95));
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.7;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
      }

      // Always-visible core pointer
      ctx.beginPath();
      ctx.fillStyle = "rgba(212, 20, 122, 0.35)";
      ctx.arc(mx, my, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = "rgba(255, 255, 255, 0.98)";
      ctx.arc(mx, my, 2.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.strokeStyle = "rgba(0, 153, 204, 0.95)";
      ctx.lineWidth = 1.8;
      ctx.arc(mx, my, 6.5, 0, Math.PI * 2);
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    };

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
      className="pointer-events-none fixed inset-0 z-[120]"
      aria-hidden
    />
  );
}
