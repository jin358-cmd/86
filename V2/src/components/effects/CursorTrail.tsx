"use client";

import { useEffect, useRef } from "react";

type TrailPoint = { x: number; y: number };

type Shard = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  len: number;
  r: number;
  g: number;
  b: number;
};

/** Layer A: elongated comet drag · Layer B: short irregular colored burst */
export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.body.classList.add("gvg-cursor-active");

    let w = 0;
    let h = 0;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let prevMx = mx;
    let prevMy = my;
    let raf = 0;
    // Layer 1 — comet head lag
    let headX = mx;
    let headY = my;
    // Layer 2 — longer tail lag
    let tailX = mx;
    let tailY = my;
    const trail: TrailPoint[] = [];
    const shards: Shard[] = [];
    let burstCooldown = 0;

    const palette = [
      [0, 153, 204],
      [212, 20, 122],
      [123, 92, 255],
      [255, 255, 255],
      [0, 220, 180],
      [255, 180, 80],
    ] as const;

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
      const count = 8 + Math.floor(Math.min(speed / 10, 5));
      for (let i = 0; i < count; i += 1) {
        // Irregular angles — not even spokes
        const angle = Math.random() * Math.PI * 2;
        const force = 1.6 + Math.random() * 2.8 + speed * 0.035;
        const [r, g, b] = palette[Math.floor(Math.random() * palette.length)];
        shards.push({
          x,
          y,
          vx: Math.cos(angle) * force * (0.7 + Math.random() * 0.8),
          vy: Math.sin(angle) * force * (0.7 + Math.random() * 0.8),
          life: 0.55 + Math.random() * 0.35,
          len: 8 + Math.random() * 12,
          r,
          g,
          b,
        });
      }
      if (shards.length > 100) shards.splice(0, shards.length - 100);
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const dx = mx - prevMx;
      const dy = my - prevMy;
      const moveSpeed = Math.hypot(dx, dy);
      prevMx = mx;
      prevMy = my;

      // Layer 1: comet head (medium lag)
      headX += (mx - headX) * 0.32;
      headY += (my - headY) * 0.32;
      // Layer 2: comet tail (longer lag)
      tailX += (mx - tailX) * 0.12;
      tailY += (my - tailY) * 0.12;

      trail.unshift({ x: headX, y: headY });
      if (trail.length > 22) trail.pop();

      burstCooldown -= 1;
      if (moveSpeed > 1.6 && burstCooldown <= 0) {
        spawnBurst(mx, my, moveSpeed);
        burstCooldown = 2;
      }

      // ——— Layer 2: comet drag trail (elongated ribbon) ———
      if (trail.length > 1) {
        // Soft outer glow path
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        for (let i = 1; i < trail.length; i += 1) {
          ctx.lineTo(trail[i].x, trail[i].y);
        }
        ctx.strokeStyle = "rgba(0, 153, 204, 0.12)";
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();

        for (let i = 0; i < trail.length - 1; i += 1) {
          const a = trail[i];
          const b = trail[i + 1];
          const t = 1 - i / trail.length;
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `rgba(255,255,255,${t * 0.85})`);
          grad.addColorStop(0.35, `rgba(0,153,204,${t * 0.7})`);
          grad.addColorStop(1, `rgba(212,20,122,${t * 0.25})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = Math.max(1, 3.6 * t);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }

        // Tail tip comet nucleus from lagged point
        const tg = ctx.createRadialGradient(tailX, tailY, 0, tailX, tailY, 14);
        tg.addColorStop(0, "rgba(0,153,204,0.35)");
        tg.addColorStop(1, "rgba(0,153,204,0)");
        ctx.fillStyle = tg;
        ctx.beginPath();
        ctx.arc(tailX, tailY, 14, 0, Math.PI * 2);
        ctx.fill();
      }

      // ——— Layer 1: short irregular colored burst ———
      for (let i = shards.length - 1; i >= 0; i -= 1) {
        const s = shards[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.88;
        s.vy *= 0.88;
        s.life -= 0.06;
        if (s.life <= 0) {
          shards.splice(i, 1);
          continue;
        }
        const speed = Math.hypot(s.vx, s.vy) || 0.001;
        const ux = s.vx / speed;
        const uy = s.vy / speed;
        const len = s.len * s.life;
        const tx = s.x - ux * len;
        const ty = s.y - uy * len;
        const grad = ctx.createLinearGradient(tx, ty, s.x, s.y);
        grad.addColorStop(0, `rgba(${s.r},${s.g},${s.b},0)`);
        grad.addColorStop(1, `rgba(${s.r},${s.g},${s.b},${s.life * 0.9})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
      }

      // Pointer core (shared)
      ctx.beginPath();
      ctx.fillStyle = "rgba(255,255,255,0.98)";
      ctx.arc(mx, my, 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.strokeStyle = "rgba(0,153,204,0.9)";
      ctx.lineWidth = 1.5;
      ctx.arc(mx, my, 5.5, 0, Math.PI * 2);
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
