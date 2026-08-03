import { ModulePage } from "@/components/platform/ModulePage";
import { PAGES } from "@/data/platform";

export default function IntelPage() {
  const page = PAGES.intel;
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
          ALERT FEED
        </p>
        <ul className="mt-4 space-y-3">
          {[
            ["WARN", "Pacific lane congestion rising near LAX freight hub"],
            ["INFO", "EU tariff consultation window opens in 72 hours"],
            ["CRIT", "FX volatility spike on USD/TWD settlement pair"],
          ].map(([level, text]) => (
            <li
              key={text}
              className="flex gap-3 border-l-2 border-gvg-yellow/60 pl-3"
            >
              <span
                className={
                  level === "CRIT"
                    ? "font-mono text-xs text-gvg-danger"
                    : level === "WARN"
                      ? "font-mono text-xs text-gvg-yellow"
                      : "font-mono text-xs text-gvg-cyan"
                }
              >
                {level}
              </span>
              <span className="font-body text-sm text-gvg-text">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </ModulePage>
  );
}
