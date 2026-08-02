"use client";

import { useMemo } from "react";

export function FloatingDust({ count = 28 }: { count?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        top: `${(i % 100)}%`,
        size: 1 + (i % 3),
        delay: `${(i % 10) * 0.4}s`,
        duration: `${8 + (i % 7)}s`,
      })),
    [count],
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full bg-gvg-yellow/40"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            animation: `dust-float ${d.duration} linear infinite`,
            animationDelay: d.delay,
          }}
        />
      ))}
    </div>
  );
}
