"use client";

import type { ReactNode } from "react";
import { Atmosphere } from "@/components/effects/Atmosphere";
import { CursorTrail } from "@/components/effects/CursorTrail";
import { SiteHeader } from "@/components/platform/SiteHeader";

export function PlatformShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-[100dvh] bg-gvg-bg text-gvg-text">
      <Atmosphere />
      <CursorTrail />
      <div className="relative z-10">
        <SiteHeader />
        {children}
      </div>
    </div>
  );
}
