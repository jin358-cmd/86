type Feature = {
  title: string;
  blurb: string;
};

export function FeatureGrid({
  features,
}: {
  features: readonly Feature[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {features.map((feature, index) => (
        <article
          key={feature.title}
          className="glass-panel border-l-2 border-l-gvg-yellow/70 p-5"
        >
          <p className="font-mono text-[10px] tracking-[0.28em] text-gvg-cyan">
            FN.{String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-2 font-display text-lg tracking-[0.14em] text-gvg-yellow">
            {feature.title}
          </h3>
          <p className="mt-3 font-body text-sm leading-relaxed text-gvg-muted">
            {feature.blurb}
          </p>
        </article>
      ))}
    </div>
  );
}
