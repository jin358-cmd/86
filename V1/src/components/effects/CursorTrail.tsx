"use client";

import { useEffect, useRef } from "react";

type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  width: number;
  hue: "yellow" | "cyan";
  lag: number;
};

type Spark = {
  x: number;
  y: number;
  life: number;
  vx: number;
  vy: number;
};

const METEOR_COUNT = 5;

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

    document.body.classList.add("gvg-cursor-active");

    let w = 0;
    let h = 0;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let prevMx = mx;
    let prevMy = my;
    let raf = 0;
    const sparks: Spark[] = [];

    const meteors: Meteor[] = Array.from({ length: METEOR_COUNT }, (_, i) => ({
      x: mx,
      y: my,
      vx: 0,
      vy: 0,
      len: 28 + i * 10,
      width: 1.6 + i * 0.25,
      hue: i % 2 === 0 ? "yellow" : "cyan",
      lag: 0.18 + i * 0.08,
    }));

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

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const drawMeteor = (m: Meteor) => {
      const speed = Math.hypot(m.vx, m.vy) || 0.001;
      const ux = m.vx / speed;
      const uy = m.vy / speed;
      const tailX = m.x - ux * m.len;
      const tailY = m.y - uy * m.len;

      const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
      if (m.hue === "yellow") {
        grad.addColorStop(0, "rgba(252, 238, 10, 0)");
        grad.addColorStop(0.45, "rgba(252, 238, 10, 0.35)");
        grad.addColorStop(1, "rgba(255, 255, 220, 0.95)");
      } else {
        grad.addColorStop(0, "rgba(0, 229, 255, 0)");
        grad.addColorStop(0.45, "rgba(0, 229, 255, 0.35)");
        grad.addColorStop(1, "rgba(200, 250, 255, 0.95)");
      }

      ctx.strokeStyle = grad;
      ctx.lineWidth = m.width;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(m.x, m.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.fillStyle =
        m.hue === "yellow"
          ? "rgba(252, 238, 10, 0.9)"
          : "rgba(0, 229, 255, 0.9)";
      ctx.arc(m.x, m.y, m.width * 1.1, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const dx = mx - prevMx;
      const dy = my - prevMy;
      prevMx = mx;
      prevMy = my;

      // spawn soft sparks when moving
      const moveSpeed = Math.hypot(dx, dy);
      if (moveSpeed > 1.5) {
        sparks.push({
          x: mx,
          y: my,
          life: 1,
          vx: -dx * 0.08 + (Math.random() - 0.5) * 0.8,
          vy: -dy * 0.08 + (Math.random() - 0.5) * 0.8,
        });
        if (sparks.length > 40) sparks.splice(0, sparks.length - 40);
      }

      for (const m of meteors) {
        const tx = mx;
        const ty = my;
        // critically-damped-ish smooth follow
        m.vx += (tx - m.x) * m.lag;
        m.vy += (ty - m.y) * m.lag;
        m.vx *= 0.78;
        m.vy *= 0.78;
        m.x += m.vx;
        m.y += m.vy;
        drawMeteor(m);
      }

      for (let i = sparks.length - 1; i >= 0; i -= 1) {
        const s = sparks[i];
        s.life -= 0.04;
        s.x += s.vx;
        s.y += s.vy;
        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(252, 238, 10, ${s.life * 0.5})`;
        ctx.arc(s.x, s.y, 1.6 * s.life, 0, Math.PI * 2);
        ctx.fill();
      }

      // subtle core at pointer
      ctx.beginPath();
      ctx.fillStyle = "rgba(252, 238, 10, 0.75)";
      ctx.arc(mx, my, 2.4, 0, Math.PI * 2);
      ctx.fill();

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
      className="pointer-events-none fixed inset-0 z-[95] mix-blend-screen"
      aria-hidden
    />
  );
}
