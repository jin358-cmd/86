import { ModulePage } from "@/components/platform/ModulePage";
import { PAGES } from "@/data/platform";

export default function PartnersPage() {
  const page = PAGES.partners;
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
          ["CORPO", "Mega buyers with multi-year offtake"],
          ["ALLIANCE", "Shared credit and lane priority"],
          ["OPERATOR", "Customs, insurance, last-mile desks"],
          ["SUPPLIER", "Factories and bonded warehouses"],
          ["CARRIER", "Ocean, air, and drone fleets"],
          ["FINTECH", "Settlement and FX rails"],
        ].map(([tier, blurb]) => (
          <article key={tier} className="glass-panel p-4">
            <p className="font-display text-lg tracking-[0.16em] text-gvg-yellow">
              {tier}
            </p>
            <p className="mt-2 font-body text-sm text-gvg-muted">{blurb}</p>
          </article>
        ))}
      </div>
    </ModulePage>
  );
}
