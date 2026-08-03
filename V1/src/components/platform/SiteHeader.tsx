"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/data/platform";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-gvg-yellow/15 bg-gvg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-9 place-items-center border border-gvg-yellow bg-gvg-yellow/10 font-display text-xs text-gvg-yellow">
            GVG
          </span>
          <span>
            <span className="block font-display text-sm tracking-[0.22em] text-gvg-yellow">
              TRADE OS
            </span>
            <span className="block font-mono text-[10px] tracking-[0.18em] text-gvg-muted">
              INTERNATIONAL PLATFORM
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href ||
                  Boolean(pathname?.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-2.5 py-1.5 font-hud text-[11px] tracking-[0.2em] transition",
                  active
                    ? "bg-gvg-yellow text-black"
                    : "text-gvg-muted hover:text-gvg-yellow",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-gvg-cyan">
          <span className="hidden sm:inline">NET.ONLINE</span>
          <span className="border border-gvg-danger/50 px-2 py-1 text-gvg-danger">
            ICE.LOW
          </span>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto border-t border-white/5 px-4 py-2 lg:hidden">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 border border-white/10 px-2 py-1 font-hud text-[10px] tracking-[0.16em] text-gvg-muted"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
