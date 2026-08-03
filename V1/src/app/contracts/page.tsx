import { ModulePage } from "@/components/platform/ModulePage";
import { PAGES } from "@/data/platform";

export default function ContractsPage() {
  const page = PAGES.contracts;
  return (
    <ModulePage
      code={page.code}
      title={page.title}
      zh={page.zh}
      lead={page.lead}
      image={page.image}
      features={page.features}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {[
          ["CTX-9921", "FOB Kaohsiung · Semiconductors", "SIGNED"],
          ["CTX-8840", "CIF Rotterdam · Precision Parts", "ESCROW"],
          ["CTX-7712", "DDP Dubai · Cold Chain Goods", "DRAFT"],
          ["CTX-6605", "EXW Tokyo · Robotics Kits", "REVIEW"],
        ].map(([id, detail, status]) => (
          <article key={id} className="glass-panel p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-xs tracking-[0.2em] text-gvg-cyan">
                {id}
              </p>
              <span className="border border-gvg-yellow/40 px-2 py-0.5 font-mono text-[10px] tracking-wider text-gvg-yellow">
                {status}
              </span>
            </div>
            <p className="mt-3 font-hud text-sm tracking-[0.08em] text-gvg-text">
              {detail}
            </p>
          </article>
        ))}
      </div>
    </ModulePage>
  );
}
