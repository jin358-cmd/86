"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PAGES } from "@/data/architecture";
import { PAGE_IMAGES } from "@/data/commerce";
import { cn } from "@/lib/cn";
import {
  playTone,
  startAmbience,
  startSfxLoop,
  unlockAudio,
  setMuted,
  isMuted,
} from "@/lib/audio";
import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const NAV = [
  ...PAGES.filter((p) =>
    ["/company", "/trade", "/marketplace", "/products", "/dashboard", "/commerce"].includes(
      p.href,
    ),
  ),
];

export function SiteHeader({
  onNavHover,
  onNavLeave,
}: {
  onNavHover?: (href: string) => void;
  onNavLeave?: () => void;
} = {}) {
  const pathname = usePathname();
  const [muted, setMutedState] = useState(false);

  useEffect(() => {
    void unlockAudio().then(() => {
      if (!isMuted()) {
        startAmbience();
        startSfxLoop();
      }
    });
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gvg-cyan/20 bg-gvg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <Link
          href="/"
          onClick={() => playTone("ui")}
          onMouseEnter={() => onNavHover?.("/")}
          className="flex items-center gap-3"
        >
          <span className="grid size-9 place-items-center border border-gvg-cyan bg-gvg-cyan/10 font-display text-xs text-gvg-cyan">
            GVG
          </span>
          <span>
            <span className="block font-display text-sm tracking-[0.2em] text-gvg-ink">
              GVG OS
            </span>
            <span className="block font-mono text-[10px] tracking-[0.16em] text-gvg-muted">
              GLOBAL PLATFORM
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 xl:flex"
          onMouseLeave={() => onNavLeave?.()}
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => {
                playTone("ui");
                onNavHover?.(item.href);
                // Prefetch visual switch via PAGE_IMAGES presence
                void PAGE_IMAGES[item.href];
              }}
              className={cn(
                "px-2 py-1 font-hud text-[10px] tracking-[0.16em] transition",
                pathname === item.href || pathname?.startsWith(`${item.href}/`)
                  ? "bg-gvg-cyan text-white"
                  : "text-gvg-muted hover:text-gvg-magenta",
              )}
            >
              {item.title.split(" ")[0]}
            </Link>
          ))}
          <Link
            href="/admin"
            onMouseEnter={() => onNavHover?.("/admin")}
            className="ml-2 border border-gvg-cyan/40 px-2 py-1 font-hud text-[10px] tracking-[0.16em] text-gvg-cyan"
          >
            ADMIN
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => {
            setMutedState((m) => {
              const next = !m;
              setMuted(next);
              if (!next) {
                startAmbience();
                startSfxLoop();
              }
              return next;
            });
          }}
          className="glass-panel grid h-9 w-9 place-items-center text-gvg-text"
          aria-label="Toggle music"
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </header>
  );
}
