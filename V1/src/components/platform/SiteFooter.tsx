import Link from "next/link";
import { NAV } from "@/data/platform";

export function SiteFooter() {
  return (
    <footer className="border-t border-gvg-yellow/15 bg-black/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <p className="font-display text-sm tracking-[0.22em] text-gvg-yellow">
            GVG INTERNATIONAL TRADE
          </p>
          <p className="mt-1 font-mono text-[10px] tracking-wider text-gvg-muted">
            CYBERPUNK TRADE OS · V1
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {NAV.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-hud text-[10px] tracking-[0.2em] text-gvg-muted hover:text-gvg-yellow"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
