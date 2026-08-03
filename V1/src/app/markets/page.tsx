import { ModulePage } from "@/components/platform/ModulePage";
import { PAGES } from "@/data/platform";

export default function MarketsPage() {
  const page = PAGES.markets;
  return (
    <ModulePage
      code={page.code}
      title={page.title}
      zh={page.zh}
      lead={page.lead}
      image={page.image}
      features={page.features}
    >
      <div className="glass-panel p-5">
        <p className="font-mono text-[10px] tracking-[0.28em] text-gvg-cyan">
          MARKET DESKS
        </p>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {["Metals", "Energy", "Semiconductors"].map((desk) => (
            <li
              key={desk}
              className="border border-white/10 bg-black/30 px-4 py-3 font-hud tracking-[0.14em] text-gvg-text"
            >
              {desk}
            </li>
          ))}
        </ul>
      </div>
    </ModulePage>
  );
}
