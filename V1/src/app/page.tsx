import Image from "next/image";
import Link from "next/link";
import { CORRIDORS, HOME, NAV, PAGES, TICKERS } from "@/data/platform";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[100dvh] overflow-hidden">
        <Image
          src={HOME.image}
          alt="GVG international trade hub"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-gvg-bg via-transparent to-black/50" />

        <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 md:px-6">
          <p className="font-mono text-xs tracking-[0.35em] text-gvg-cyan">
            {HOME.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl tracking-[0.1em] text-gvg-yellow md:text-6xl lg:text-7xl">
            {HOME.title}
          </h1>
          <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-gvg-text/90 md:text-lg">
            {HOME.lead}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/markets"
              className="border border-gvg-yellow bg-gvg-yellow px-6 py-3 font-display text-sm tracking-[0.24em] text-black transition hover:bg-transparent hover:text-gvg-yellow"
            >
              ENTER MARKETS
            </Link>
            <Link
              href="/routes"
              className="border border-gvg-cyan/60 px-6 py-3 font-display text-sm tracking-[0.24em] text-gvg-cyan transition hover:bg-gvg-cyan hover:text-black"
            >
              VIEW ROUTES
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            {HOME.stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-panel px-4 py-3"
              >
                <p className="font-mono text-[10px] tracking-[0.2em] text-gvg-muted">
                  {stat.label}
                </p>
                <p className="mt-1 font-display text-xl tracking-[0.12em] text-gvg-yellow">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/50">
        <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4 py-3 md:px-6">
          {TICKERS.map((t) => (
            <div
              key={t.symbol}
              className="flex shrink-0 items-center gap-3 font-mono text-xs tracking-wider"
            >
              <span className="text-gvg-text">{t.symbol}</span>
              <span
                className={
                  t.tone === "up" ? "text-gvg-cyan" : "text-gvg-danger"
                }
              >
                {t.change}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <header className="mb-8 max-w-2xl">
          <p className="font-mono text-xs tracking-[0.3em] text-gvg-cyan">
            PLATFORM MODULES
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-[0.14em] text-gvg-yellow">
            功能頁面
          </h2>
          <p className="mt-3 font-body text-gvg-muted">
            每個模組都配備對應的賽博朋克視覺與業務敘事，覆蓋交易全鏈路。
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {NAV.filter((n) => n.href !== "/").map((item) => {
            const key = item.href.replace("/", "") as keyof typeof PAGES;
            const page = PAGES[key];
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group glass-panel overflow-hidden transition hover:border-gvg-yellow/50"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={page.image}
                    alt={page.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <p className="absolute left-3 top-3 font-mono text-[10px] tracking-[0.28em] text-gvg-cyan">
                    {page.code}
                  </p>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-xl tracking-[0.16em] text-gvg-yellow">
                    {page.title}
                  </h3>
                  <p className="mt-1 font-hud text-sm tracking-[0.12em] text-gvg-text">
                    {page.zh}
                  </p>
                  <p className="mt-3 font-body text-sm text-gvg-muted">
                    {page.lead}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-t border-white/10 bg-black/30">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <h2 className="font-display text-2xl tracking-[0.14em] text-gvg-yellow">
            LIVE CORRIDORS
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 font-mono text-[10px] tracking-[0.2em] text-gvg-muted">
                  <th className="px-3 py-3">FROM</th>
                  <th className="px-3 py-3">TO</th>
                  <th className="px-3 py-3">LOAD</th>
                  <th className="px-3 py-3">ETA</th>
                </tr>
              </thead>
              <tbody>
                {CORRIDORS.map((row) => (
                  <tr
                    key={`${row.from}-${row.to}`}
                    className="border-b border-white/5 font-hud text-sm text-gvg-text"
                  >
                    <td className="px-3 py-3 text-gvg-yellow">{row.from}</td>
                    <td className="px-3 py-3">{row.to}</td>
                    <td className="px-3 py-3 text-gvg-cyan">{row.load}</td>
                    <td className="px-3 py-3 text-gvg-muted">{row.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
