import Image from "next/image";
import Link from "next/link";
import { PAGE_DETAILS, PAGES, type PageLink } from "@/data/architecture";
import { PAGE_IMAGES } from "@/data/commerce";

export function SectionPage({ page }: { page: PageLink }) {
  const detail = PAGE_DETAILS[page.href];
  const image = PAGE_IMAGES[page.href];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
      <p className="font-mono text-xs tracking-[0.35em] text-gvg-cyan">
        MODULE {page.code} · PHASE {page.phase}
      </p>
      <h1 className="mt-3 font-display text-4xl tracking-[0.12em] text-gvg-yellow md:text-5xl">
        {page.title}
      </h1>
      <p className="mt-2 font-hud text-lg tracking-[0.1em] text-gvg-text">
        {page.zh}
      </p>
      <p className="mt-4 max-w-2xl font-body text-gvg-muted">{page.blurb}</p>

      {image ? (
        <div className="relative mt-8 aspect-[16/7] overflow-hidden border border-white/10">
          <Image
            src={image}
            alt={page.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
          <p className="absolute bottom-3 left-4 font-mono text-[10px] tracking-[0.24em] text-gvg-cyan">
            VISFEED // {page.code}
          </p>
        </div>
      ) : null}

      {detail ? (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="glass-panel p-6">
            <h2 className="font-display text-2xl tracking-[0.14em] text-gvg-yellow">
              {detail.headline}
            </h2>
            <ul className="mt-5 space-y-3">
              {detail.points.map((point) => (
                <li
                  key={point}
                  className="border-l border-gvg-yellow/50 pl-3 font-body text-sm text-gvg-text"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-panel p-6">
            <p className="font-mono text-[10px] tracking-[0.28em] text-gvg-cyan">
              ACTIONS
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {detail.actions.map((action) => (
                <button
                  key={action}
                  type="button"
                  className="border border-gvg-yellow/50 px-4 py-3 text-left font-hud text-sm tracking-[0.14em] text-gvg-yellow transition hover:bg-gvg-yellow hover:text-black"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-12">
        <p className="font-mono text-[10px] tracking-[0.28em] text-gvg-muted">
          RELATED MODULES
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {PAGES.filter((p) => p.phase === page.phase && p.href !== page.href)
            .slice(0, 6)
            .map((rel) => (
              <Link
                key={rel.href}
                href={rel.href}
                className="border border-white/10 px-3 py-2 font-hud text-[10px] tracking-[0.16em] text-gvg-muted hover:border-gvg-yellow/50 hover:text-gvg-yellow"
              >
                {rel.code} {rel.title}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
