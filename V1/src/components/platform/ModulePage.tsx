import type { ReactNode } from "react";
import { FeatureGrid } from "@/components/platform/FeatureGrid";
import { MediaPanel } from "@/components/platform/MediaPanel";
import { PageHero } from "@/components/platform/PageHero";

type Feature = { title: string; blurb: string };

type ModulePageProps = {
  code: string;
  title: string;
  zh: string;
  lead: string;
  image: string;
  features: readonly Feature[];
  children?: ReactNode;
};

export function ModulePage({
  code,
  title,
  zh,
  lead,
  image,
  features,
  children,
}: ModulePageProps) {
  return (
    <>
      <PageHero code={code} title={title} zh={zh} lead={lead} image={image} />
      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="mb-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-gvg-cyan">
              FUNCTION LAYER
            </p>
            <h2 className="mt-2 font-display text-2xl tracking-[0.14em] text-gvg-yellow md:text-3xl">
              CORE CAPABILITIES
            </h2>
            <p className="mt-3 max-w-xl font-body text-gvg-muted">
              延續賽博朋克視覺語言：Dark Surface、Cyber Yellow、掃描線 HUD
              與玻璃擬態，把貿易流程做成可操作的數位介面。
            </p>
          </div>
          <MediaPanel image={image} caption={`VISFEED // ${title} // LIVE`} />
        </div>
        <FeatureGrid features={features} />
        {children ? <div className="mt-12">{children}</div> : null}
      </section>
    </>
  );
}
