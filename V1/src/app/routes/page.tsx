import { ModulePage } from "@/components/platform/ModulePage";
import { CORRIDORS, PAGES } from "@/data/platform";

export default function RoutesPage() {
  const page = PAGES.routes;
  return (
    <ModulePage
      code={page.code}
      title={page.title}
      zh={page.zh}
      lead={page.lead}
      image={page.image}
      features={page.features}
    >
      <div className="glass-panel overflow-hidden">
        <div className="border-b border-white/10 px-5 py-3 font-mono text-[10px] tracking-[0.28em] text-gvg-cyan">
          ACTIVE TRADE LANES
        </div>
        <ul className="divide-y divide-white/5">
          {CORRIDORS.map((c) => (
            <li
              key={`${c.from}-${c.to}`}
              className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
            >
              <p className="font-hud text-sm tracking-[0.12em] text-gvg-text">
                <span className="text-gvg-yellow">{c.from}</span>
                <span className="mx-2 text-gvg-muted">→</span>
                {c.to}
              </p>
              <p className="font-mono text-xs tracking-wider text-gvg-cyan">
                LOAD {c.load} · ETA {c.eta}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </ModulePage>
  );
}
