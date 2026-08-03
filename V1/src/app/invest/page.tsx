import { ModulePage } from "@/components/platform/ModulePage";
import { PAGES } from "@/data/platform";

export default function InvestPage() {
  const page = PAGES.invest;
  return (
    <ModulePage
      code={page.code}
      title={page.title}
      zh={page.zh}
      lead={page.lead}
      image={page.image}
      features={page.features}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["CORRIDOR ALPHA", "12.4% APY", "Pacific spine capacity notes"],
          ["COLDCHAIN BETA", "9.1% APY", "Temperature-controlled logistics"],
          ["SETTLE GAMMA", "7.8% APY", "Liquidity for dual-rail clearing"],
        ].map(([name, apy, blurb]) => (
          <article key={name} className="glass-panel p-5">
            <p className="font-mono text-[10px] tracking-[0.24em] text-gvg-cyan">
              FUND
            </p>
            <h3 className="mt-2 font-display text-lg tracking-[0.12em] text-gvg-yellow">
              {name}
            </h3>
            <p className="mt-3 font-display text-2xl text-gvg-text">{apy}</p>
            <p className="mt-2 font-body text-sm text-gvg-muted">{blurb}</p>
          </article>
        ))}
      </div>
    </ModulePage>
  );
}
