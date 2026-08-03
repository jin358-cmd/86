"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Atmosphere } from "@/components/effects/Atmosphere";
import { CursorTrail } from "@/components/effects/CursorTrail";
import { SiteHeader } from "@/components/platform/SiteHeader";
import { PAGE_IMAGES } from "@/data/commerce";
import { startAmbience, startSfxLoop, unlockAudio, isMuted } from "@/lib/audio";
import { useEffect } from "react";

type HoverBgContextValue = {
  bgImage: string | null;
  setHoverImage: (src: string | null) => void;
};

const HoverBgContext = createContext<HoverBgContextValue | null>(null);

export function useHoverBg() {
  const ctx = useContext(HoverBgContext);
  if (!ctx) {
    return {
      bgImage: null as string | null,
      setHoverImage: (() => undefined) as (src: string | null) => void,
    };
  }
  return ctx;
}

export function PlatformShell({
  children,
  defaultImage,
}: {
  children: ReactNode;
  defaultImage?: string;
}) {
  const [bgImage, setBgImage] = useState<string | null>(defaultImage ?? null);
  const [baseImage] = useState(defaultImage ?? null);

  useEffect(() => {
    void unlockAudio().then(() => {
      if (!isMuted()) {
        startAmbience();
        startSfxLoop();
      }
    });
  }, []);

  const setHoverImage = useCallback(
    (src: string | null) => {
      setBgImage(src ?? baseImage);
    },
    [baseImage],
  );

  const value = useMemo(
    () => ({ bgImage, setHoverImage }),
    [bgImage, setHoverImage],
  );

  return (
    <HoverBgContext.Provider value={value}>
      <div className="relative min-h-[100dvh] bg-gvg-bg text-gvg-text">
        <Atmosphere />
        <CursorTrail />
        {bgImage ? (
          <div className="pointer-events-none fixed inset-0 z-0">
            <Image
              key={bgImage}
              src={bgImage}
              alt=""
              fill
              className="object-cover opacity-25 transition-opacity duration-500"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gvg-bg/50 via-gvg-bg/78 to-gvg-bg" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(0,153,204,0.12),transparent_42%)]" />
          </div>
        ) : null}
        <div className="relative z-10">
          <SiteHeader
            onNavHover={(href) => {
              const img = PAGE_IMAGES[href];
              setHoverImage(img ?? null);
            }}
            onNavLeave={() => setHoverImage(baseImage)}
          />
          {children}
        </div>
      </div>
    </HoverBgContext.Provider>
  );
}
